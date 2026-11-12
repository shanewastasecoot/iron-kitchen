// Recipe: see README.md "Adding a recipe" for field meanings.
addRecipe({
  id: "nut-butter-toast",
  name: "Nut Butter Toast with Fruit",
  meal: "Breakfast",
  tags: ["quick"],
  allergens: ["wheat", "tree nuts"],
  servings: 1, servingLabel: "slice",
  time: "5 min",
  source: { name: "Boston Children's Hospital (PEHC)", url: "https://www.childrenshospital.org/sites/default/files/2023-03/pehc-iron-rich-recipes.pdf" },
  ingredients: [
    { k: "bread", q: 1, u: "slice", t: "whole wheat bread" },
    { k: "cashew_butter", q: 1, u: "tbsp", t: "cashew butter (best for iron; or sunflower, almond, peanut)" },
    { k: "banana", q: 0.5, u: "each", t: "banana, sliced (or sliced strawberries)" },
  ],
  steps: [
    "Toast the bread.",
    "Spread thinly with nut butter and top with fruit.",
  ],
  storage: "",
  kidNotes: "Spread nut butter thinly for the 15-month-old and cut into strips. Iron per tbsp: cashew 0.85 mg > sunflower 0.7 > almond 0.6 > peanut 0.3. Strawberries add vitamin C; banana adds very little.",
  kidPortion: 1, kidPortionLabel: "1 slice",
  nutrition: { basis: "estimate", kcal: 227, protein: 7.4, carbs: 32, fat: 9, fibre: 3.8, iron: 2, vitC: 5 },
});
