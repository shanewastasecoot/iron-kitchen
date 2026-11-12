// Recipe: see README.md "Adding a recipe" for field meanings.
addRecipe({
  id: "veggie-eggs",
  name: "Veggie-Speckled Scrambled Eggs",
  meal: "Breakfast",
  tags: ["quick"],
  allergens: ["egg"],
  servings: 1, servingLabel: "plate",
  time: "10 min",
  source: { name: "Boston Children's Hospital (PEHC)", url: "https://www.childrenshospital.org/sites/default/files/2023-03/pehc-iron-rich-recipes.pdf" },
  ingredients: [
    { k: "eggs", q: 2, u: "each", t: "eggs" },
    { k: "spinach", q: 1, u: "tbsp", t: "cooked spinach, chopped", shop: { q: 18, u: "g" } },
    { k: "black_beans", q: 2, u: "tbsp", t: "black beans, rinsed" },
    { k: "peas", q: 2, u: "tbsp", t: "frozen peas" },
    { k: "olive_oil", q: 1, u: "tsp", t: "oil or butter" },
    { k: "strawberries", q: 3, u: "each", t: "strawberries, on the side", shop: { q: 36, u: "g" } },
  ],
  steps: [
    "Warm the oil in a non-stick pan over medium-low heat. Add the peas, spinach and beans and heat through, 1–2 minutes.",
    "Beat the eggs, pour them in and stir gently until just set.",
    "Serve with strawberries or other berries on the side for vitamin C.",
  ],
  storage: "Best fresh.",
  kidNotes: "Cook the eggs fully for toddlers. Squash the peas and beans slightly for the 15-month-old.",
  kidPortion: 0.5, kidPortionLabel: "½ plate",
  nutrition: { basis: "estimate", kcal: 240, protein: 16, carbs: 12, fat: 14, fibre: 4, iron: 3, vitC: 24 },
});
