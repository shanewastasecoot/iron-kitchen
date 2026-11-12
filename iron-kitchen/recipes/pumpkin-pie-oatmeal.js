// Recipe: see README.md "Adding a recipe" for field meanings.
addRecipe({
  id: "pumpkin-pie-oatmeal",
  name: "Pumpkin Pie Oatmeal",
  meal: "Breakfast",
  tags: ["quick"],
  allergens: [],
  servings: 3, servingLabel: "bowls",
  time: "17 min",
  source: { name: "Kids Eat in Color", url: "https://kidseatincolor.com/pumpkin-pie-oatmeal-recipe-for-kids/" },
  ingredients: [
    { k: "oats", q: 1.5, u: "cup", t: "rolled oats" },
    { k: "pumpkin_puree", q: 0.75, u: "cup", t: "pumpkin purée" },
    { k: "pumpkin_spice", q: 0.5, u: "tsp", t: "pumpkin pie spice (or cinnamon)" },
    { k: "coconut_oil", q: 1, u: "tbsp", t: "coconut oil" },
    { k: "raisins", q: 0.25, u: "cup", t: "raisins, to top", opt: true, shop: { q: 40, u: "g" } },
    { k: "maple_syrup", q: 1, u: "tbsp", t: "maple syrup, to top", opt: true },
  ],
  steps: [
    "Put the oats, pumpkin, spice, coconut oil and 2½ cups (625 mL) water in a pot.",
    "Cook over medium heat, stirring, until thick and bubbling, about 10–12 minutes. You can also microwave it in short bursts.",
    "Top with raisins and a little maple syrup if you like.",
  ],
  storage: "Not stated. Our suggestion: fridge 3 days; reheat with a splash of water.",
  kidNotes: "Cooking with water rather than milk helps iron absorption. Chop the raisins for the 15-month-old. Honey is OK for both kids now (over 12 months), but maple works just as well. Add berries for vitamin C.",
  kidPortion: 0.5, kidPortionLabel: "½ bowl",
  nutrition: { basis: "estimate", kcal: 212, protein: 5.9, carbs: 32, fat: 7.3, fibre: 5.8, iron: 2.6, vitC: 2.5,
    note: "Without toppings." },
});
