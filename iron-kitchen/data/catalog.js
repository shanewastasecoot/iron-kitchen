/*
 * Iron Kitchen — shared catalogue (aisles, ingredients, tips)
 * ------------------------------------------------------------------
 * Recipes live in recipes/<id>.js (one file each), listed in recipes/index.js.
 * Every ingredient "k" in a recipe must exist in ITEMS below (that is how the shopping
 * list knows what to combine and which aisle it belongs in).
 *
 * Units: tsp, tbsp, cup, ml, l, g, kg, oz, lb, or any count word
 * (each, clove, slice, box, bunch ...). Volumes combine with volumes,
 * weights with weights, counts with the same count word.
 *
 * Ingredient fields:
 *   k     item key (see ITEMS)
 *   q     quantity (number, for the recipe's default servings)
 *   u     unit
 *   t     text shown after the quantity in the recipe
 *   shop  optional {q,u} — what to buy, if different from the recipe
 *         amount (e.g. "1 cup chopped onion" -> buy 1 onion)
 *   opt   true = optional ingredient
 *
 * Nutrition is per serving. basis: "source" = numbers published by the
 * source; "estimate" = calculated from ingredients (USDA FoodData Central
 * values). Treat all of it as approximate.
 */

const AISLES = [
  "Produce",
  "Meat & tofu",
  "Dairy & eggs",
  "Bread & tortillas",
  "Canned & jarred",
  "Dry goods & bulk",
  "Breakfast",
  "Frozen",
  "Pantry staples",
];

const ITEMS = {
  // Produce
  onion:        { name: "Yellow onion", aisle: "Produce", roundUp: true },
  red_onion:    { name: "Red onion (small)", aisle: "Produce", roundUp: true },
  carrot:       { name: "Carrot", aisle: "Produce", roundUp: true },
  celery:       { name: "Celery", aisle: "Produce", roundUp: true },
  tomato:       { name: "Tomato (large)", aisle: "Produce", roundUp: true },
  garlic:       { name: "Garlic", aisle: "Produce", roundUp: true, pack: { q: 10, u: "clove", label: "head" } },
  cilantro:     { name: "Cilantro", aisle: "Produce", roundUp: true },
  parsley:      { name: "Flat-leaf parsley", aisle: "Produce", roundUp: true },
  basil:        { name: "Fresh basil", aisle: "Produce", roundUp: true },
  arugula:      { name: "Arugula", aisle: "Produce", pack: { q: 142, u: "g", label: "142 g clamshell" } },
  green_onion:  { name: "Green onions", aisle: "Produce", pack: { q: 6, u: "each", label: "bunch" } },
  lemon:        { name: "Lemon", aisle: "Produce", roundUp: true },
  orange:       { name: "Orange", aisle: "Produce", roundUp: true },
  cucumber:     { name: "English cucumber", aisle: "Produce", roundUp: true },
  zucchini:     { name: "Zucchini", aisle: "Produce", roundUp: true },
  eggplant:     { name: "Eggplant", aisle: "Produce", roundUp: true },
  red_pepper:   { name: "Red bell pepper", aisle: "Produce", roundUp: true },
  potato:       { name: "Potato (large)", aisle: "Produce", roundUp: true },
  sweet_potato: { name: "Sweet potato", aisle: "Produce", roundUp: true },
  cauliflower:  { name: "Cauliflower", aisle: "Produce", pack: { q: 600, u: "g", label: "head" } },
  mushrooms:    { name: "Mushrooms", aisle: "Produce", pack: { q: 227, u: "g", label: "227 g pack" } },
  cherry_tomatoes: { name: "Cherry tomatoes", aisle: "Produce", pack: { q: 25, u: "each", label: "pint" } },
  lime:         { name: "Lime", aisle: "Produce", roundUp: true },
  avocado:      { name: "Avocado", aisle: "Produce", roundUp: true },
  lettuce:      { name: "Lettuce", aisle: "Produce", roundUp: true },
  strawberries: { name: "Strawberries", aisle: "Produce", pack: { q: 454, u: "g", label: "454 g clamshell" } },
  spinach:      { name: "Baby spinach", aisle: "Produce", pack: { q: 142, u: "g", label: "142 g clamshell" } },
  broccoli:     { name: "Broccoli", aisle: "Produce", pack: { q: 300, u: "g", label: "crown" } },
  kale:         { name: "Kale", aisle: "Produce", roundUp: true },
  banana:       { name: "Banana", aisle: "Produce", roundUp: true },
  kiwi:         { name: "Kiwi", aisle: "Produce", roundUp: true },
  pineapple:    { name: "Pineapple, chopped (fresh or canned)", aisle: "Produce" },

  // Meat & tofu
  chicken:      { name: "Chicken breast (or firm tofu)", aisle: "Meat & tofu" },
  ground_beef:  { name: "Lean ground beef", aisle: "Meat & tofu", pack: { q: 454, u: "g", label: "454 g pack" } },
  ground_turkey:{ name: "Ground turkey", aisle: "Meat & tofu", pack: { q: 450, u: "g", label: "450 g pack" } },
  tofu:         { name: "Firm tofu", aisle: "Meat & tofu", pack: { q: 350, u: "g", label: "350 g block" } },

  // Dairy & eggs
  eggs:         { name: "Eggs", aisle: "Dairy & eggs", pack: { q: 12, u: "each", label: "dozen" } },
  cheese:       { name: "Cheddar cheese", aisle: "Dairy & eggs" },
  mozzarella:   { name: "Mozzarella, shredded", aisle: "Dairy & eggs" },
  milk:         { name: "Milk", aisle: "Dairy & eggs", metric: true },
  yogurt:       { name: "Plain Greek yogurt", aisle: "Dairy & eggs" },
  sour_cream:   { name: "Sour cream", aisle: "Dairy & eggs" },
  orange_juice: { name: "Orange juice", aisle: "Dairy & eggs", pack: { q: 1750, u: "ml", label: "1.75 L carton" } },

  // Bread & tortillas
  tortillas:    { name: "Whole wheat tortillas", aisle: "Bread & tortillas", pack: { q: 10, u: "each", label: "pack of 10" } },
  bread:        { name: "Whole wheat bread", aisle: "Bread & tortillas", pack: { q: 20, u: "slice", label: "loaf" } },

  // Canned & jarred
  black_beans:  { name: "Black beans, canned", aisle: "Canned & jarred", pack: { q: 1.75, u: "cup", label: "540 mL can" } },
  veg_broth:    { name: "Vegetable broth (low sodium)", aisle: "Canned & jarred", pack: { q: 900, u: "ml", label: "900 mL carton" } },
  marinara:     { name: "Marinara / pasta sauce", aisle: "Canned & jarred", pack: { q: 650, u: "ml", label: "650 mL jar" } },
  canned_tomatoes: { name: "Diced tomatoes, canned", aisle: "Canned & jarred", metric: true, pack: { q: 398, u: "ml", label: "398 mL can" } },
  tomato_paste: { name: "Tomato paste", aisle: "Canned & jarred", pack: { q: 156, u: "ml", label: "156 mL can" } },
  chickpeas:    { name: "Chickpeas, canned", aisle: "Canned & jarred", pack: { q: 1.75, u: "cup", label: "540 mL can" } },
  kidney_beans: { name: "Red kidney beans, canned", aisle: "Canned & jarred", pack: { q: 1.75, u: "cup", label: "540 mL can" } },
  butter_beans: { name: "Butter beans / lima beans, canned", aisle: "Canned & jarred", pack: { q: 1.75, u: "cup", label: "540 mL can" } },
  lentils_canned: { name: "Lentils, canned", aisle: "Canned & jarred", pack: { q: 1.75, u: "cup", label: "540 mL can" } },
  coconut_milk: { name: "Coconut milk, canned", aisle: "Canned & jarred", metric: true, pack: { q: 400, u: "ml", label: "400 mL can" } },
  pumpkin_puree:{ name: "Pumpkin purée (not pie filling)", aisle: "Canned & jarred", pack: { q: 398, u: "ml", label: "398 mL can" } },
  tahini:       { name: "Tahini", aisle: "Canned & jarred" },
  peanut_butter:{ name: "Peanut butter", aisle: "Canned & jarred" },
  cashew_butter:{ name: "Cashew butter (or any nut/seed butter)", aisle: "Canned & jarred" },

  // Dry goods & bulk
  lentils_dry:  { name: "Dried green or brown lentils", aisle: "Dry goods & bulk", pack: { q: 900, u: "g", label: "900 g bag" } },
  red_lentils:  { name: "Dried red lentils", aisle: "Dry goods & bulk", pack: { q: 900, u: "g", label: "900 g bag" } },
  pasta_ww:     { name: "Pasta (whole wheat has more iron)", aisle: "Dry goods & bulk", pack: { q: 900, u: "g", label: "900 g box" } },
  cashews:      { name: "Raw cashews", aisle: "Dry goods & bulk", gPerCup: 137 },
  pumpkin_seeds:{ name: "Pumpkin seeds (pepitas)", aisle: "Dry goods & bulk", gPerCup: 130 },
  sesame:       { name: "Sesame seeds", aisle: "Dry goods & bulk", gPerCup: 144 },
  chia:         { name: "Chia seeds", aisle: "Dry goods & bulk" },
  cacao:        { name: "Cacao or cocoa powder", aisle: "Dry goods & bulk", gPerCup: 86 },
  dates:        { name: "Medjool dates, pitted", aisle: "Dry goods & bulk", gPerCup: 175 },
  raisins:      { name: "Raisins", aisle: "Dry goods & bulk" },
  walnuts:      { name: "Walnuts", aisle: "Dry goods & bulk", gPerCup: 100 },
  flax:         { name: "Ground flaxseed", aisle: "Dry goods & bulk" },
  rice_basmati: { name: "Basmati rice", aisle: "Dry goods & bulk" },
  rice_brown:   { name: "Brown rice", aisle: "Dry goods & bulk" },

  // Breakfast
  oats:         { name: "Rolled oats", aisle: "Breakfast", gPerCup: 80 },
  cereal:       { name: "Iron-fortified cereal (compare labels)", aisle: "Breakfast" },

  // Frozen
  peas:         { name: "Frozen peas", aisle: "Frozen", gPerCup: 145 },
  frozen_veg:   { name: "Frozen mixed vegetables", aisle: "Frozen" },

  // Pantry staples (start ticked as "have it" on the shopping list)
  olive_oil:    { name: "Olive oil (or cooking oil)", aisle: "Pantry staples", staple: true },
  maple_syrup:  { name: "Maple syrup", aisle: "Pantry staples", staple: true },
  salt:         { name: "Salt", aisle: "Pantry staples", staple: true },
  pepper:       { name: "Black pepper", aisle: "Pantry staples", staple: true },
  flour:        { name: "All-purpose flour", aisle: "Pantry staples", staple: true },
  baking_powder:{ name: "Baking powder", aisle: "Pantry staples", staple: true },
  coconut_oil:  { name: "Coconut oil", aisle: "Pantry staples", staple: true },
  vanilla:      { name: "Vanilla extract", aisle: "Pantry staples", staple: true },
  cumin:        { name: "Ground cumin", aisle: "Pantry staples", staple: true },
  paprika:      { name: "Paprika", aisle: "Pantry staples", staple: true },
  turmeric:     { name: "Ground turmeric", aisle: "Pantry staples", staple: true },
  coriander_ground: { name: "Ground coriander", aisle: "Pantry staples", staple: true },
  chili_powder: { name: "Mild chili powder", aisle: "Pantry staples", staple: true },
  curry_powder: { name: "Mild curry powder", aisle: "Pantry staples", staple: true },
  italian_herbs:{ name: "Dried mixed herbs (Italian seasoning)", aisle: "Pantry staples", staple: true },
  pumpkin_spice:{ name: "Pumpkin pie spice (or cinnamon)", aisle: "Pantry staples", staple: true },
};

const IRON_TIPS = [
  "Daily iron needs: about 7 mg for ages 1–3 and 10 mg for ages 4–8.",
  "Serve vitamin C foods (berries, oranges, kiwi, peppers, tomatoes, broccoli) at the same meal as plant iron. It helps the body absorb the iron.",
  "Lots of cow's milk can crowd out iron-rich foods and reduce absorption. Ask your doctor how much milk is right for your toddler.",
  "No whole nuts, whole grapes, popcorn or thick globs of nut butter under age 4. Grind, slice, flatten or spread thinly.",
  "Nutrition numbers here are estimates, not medical advice. Talk to your doctor if you are worried about iron.",
];

/* Each recipes/<id>.js file calls addRecipe({...}). */
const RECIPES = [];
function addRecipe(r) { RECIPES.push(r); }
