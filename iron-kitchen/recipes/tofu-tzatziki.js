// Recipe: see README.md "Adding a recipe" for field meanings.
addRecipe({
  id: "tofu-tzatziki",
  name: "Tofu Tzatziki",
  meal: "Snack",
  tags: ["no-cook", "quick"],
  allergens: ["soy", "milk (or use plant yogurt)"],
  servings: 8, servingLabel: "3-tbsp portions",
  time: "10 min",
  source: { name: "SR Nutrition", url: "https://www.srnutrition.co.uk/2024/08/iron-rich-dips-for-babies-and-toddlers/" },
  ingredients: [
    { k: "tofu", q: 280, u: "g", t: "firm tofu (most of a 350 g block)" },
    { k: "yogurt", q: 1, u: "tbsp", t: "Greek or plant-based yogurt" },
    { k: "garlic", q: 1, u: "clove", t: "garlic, crushed" },
    { k: "lemon", q: 0.5, u: "each", t: "lemon, juiced" },
    { k: "olive_oil", q: 2, u: "tbsp", t: "olive oil" },
    { k: "cucumber", q: 0.5, u: "each", t: "English cucumber" },
  ],
  steps: [
    "Blend everything except the cucumber until completely smooth. Scrape into a bowl.",
    "Grate the cucumber, wrap it in a clean tea towel and squeeze out as much water as you can.",
    "Stir the cucumber into the dip.",
  ],
  storage: "Fridge: up to 2 days (source).",
  kidNotes: "High in protein, and calcium-set tofu also gives calcium. Good with pita, veggie sticks or the fritters.",
  kidPortion: 1, kidPortionLabel: "3 tbsp",
  nutrition: { basis: "estimate", kcal: 86, protein: 6.4, carbs: 2, fat: 6.5, fibre: 0.9, iron: 1, vitC: 1.6 },
});
