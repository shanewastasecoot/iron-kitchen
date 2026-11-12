// Recipe: see README.md "Adding a recipe" for field meanings.
addRecipe({
  id: "classic-hummus",
  name: "Hummus (or Green Pea Hummus)",
  meal: "Snack",
  tags: ["no-cook", "quick"],
  allergens: ["sesame"],
  servings: 8, servingLabel: "3-tbsp portions",
  time: "10 min",
  source: { name: "SR Nutrition", url: "https://www.srnutrition.co.uk/2024/08/iron-rich-dips-for-babies-and-toddlers/" },
  ingredients: [
    { k: "chickpeas", q: 1.75, u: "cup", t: "chickpeas, drained (1 × 540 mL can)" },
    { k: "olive_oil", q: 3, u: "tbsp", t: "olive oil" },
    { k: "garlic", q: 1, u: "clove", t: "garlic, crushed" },
    { k: "lemon", q: 1, u: "each", t: "lemon, juiced" },
    { k: "tahini", q: 1, u: "tbsp", t: "tahini" },
    { k: "peas", q: 0.5, u: "cup", t: "cooked peas, for green hummus", opt: true },
  ],
  steps: [
    "Put everything in a food processor with 3 tbsp water.",
    "Blend until smooth. Add more water if it's thick; the Canadian can is a bit bigger than the original's.",
    "Green hummus: add the peas before blending, plus a few more tablespoons of water.",
  ],
  storage: "Fridge: up to 2 days (source).",
  kidNotes: "Contains sesame (tahini). Only serve it once sesame has been safely introduced. Lemon juice helps the iron absorb. Serve with cucumber and red pepper sticks or warm pita.",
  kidPortion: 1, kidPortionLabel: "3 tbsp",
  nutrition: { basis: "estimate", kcal: 110, protein: 3, carbs: 9, fat: 7.1, fibre: 2.6, iron: 0.6, vitC: 2.4,
    note: "Without the optional peas." },
});
