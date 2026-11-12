// Recipe: see README.md "Adding a recipe" for field meanings.
addRecipe({
  id: "butterbean-hummus",
  name: "Butter Bean Hummus",
  meal: "Snack",
  tags: ["no-cook", "quick"],
  allergens: [],
  servings: 8, servingLabel: "3-tbsp portions",
  time: "5 min",
  source: { name: "SR Nutrition", url: "https://www.srnutrition.co.uk/2021/09/butterbean-hummus-recipe/" },
  ingredients: [
    { k: "butter_beans", q: 1.75, u: "cup", t: "butter beans or chickpeas, drained and rinsed (1 × 540 mL can)" },
    { k: "garlic", q: 2, u: "clove", t: "garlic, crushed" },
    { k: "cumin", q: 1, u: "tsp", t: "ground cumin" },
    { k: "paprika", q: 1, u: "tsp", t: "paprika, plus extra to sprinkle" },
    { k: "lemon", q: 1, u: "tbsp", t: "lemon juice", shop: { q: 0.5, u: "each" } },
    { k: "olive_oil", q: 4, u: "tbsp", t: "olive oil" },
    { k: "salt", q: 1, u: "pinch", t: "salt (not needed for kids)", opt: true },
  ],
  steps: [
    "Blend everything until smooth, scraping down the sides a few times.",
    "Taste, and add more spice or oil if needed. A Canadian can is a bit bigger than the UK tin in the original, so add a splash of water if it's thick.",
    "Sprinkle a little paprika on top to serve.",
  ],
  storage: "Fridge in a glass jar with a thin layer of oil on top: 3–4 days.",
  kidNotes: "No tahini, so it's sesame-free. Serve with red pepper or cucumber sticks for vitamin C, or spread on toast. The cumin adds a surprising amount of iron.",
  kidPortion: 1, kidPortionLabel: "3 tbsp",
  nutrition: { basis: "estimate", kcal: 92, protein: 1.9, carbs: 5.9, fat: 6.9, fibre: 1.9, iron: 0.7, vitC: 1 },
});
