// Recipe: see README.md "Adding a recipe" for field meanings.
addRecipe({
  id: "oatmeal-bowl",
  name: "Strawberry Raisin Oatmeal",
  meal: "Breakfast",
  tags: ["quick"],
  allergens: ["peanut"],
  servings: 1, servingLabel: "bowl",
  time: "10 min",
  source: { name: "Boston Children's Hospital (PEHC)", url: "https://www.childrenshospital.org/sites/default/files/2023-03/pehc-iron-rich-recipes.pdf" },
  ingredients: [
    { k: "oats", q: 0.5, u: "cup", t: "rolled oats (or iron-fortified instant oatmeal)" },
    { k: "strawberries", q: 3, u: "each", t: "strawberries, chopped", shop: { q: 36, u: "g" } },
    { k: "raisins", q: 1, u: "box", t: "raisins (small, 14 g)", shop: { q: 14, u: "g" } },
    { k: "peanut_butter", q: 1, u: "tbsp", t: "peanut butter" },
  ],
  steps: [
    "Cook the oats with about 1 cup water on the stove (5 min) or in the microwave (2–3 min), stirring partway.",
    "Stir in the peanut butter while hot so it melts in.",
    "Top with chopped strawberries and raisins.",
  ],
  storage: "Best fresh. Cooked oats keep 3 days in the fridge.",
  kidNotes: "Stir the peanut butter in well; thick globs can be a choking risk at 15 months. Chop the raisins for the little one. Cook the oats in water, not milk, to help iron absorption.",
  kidPortion: 0.5, kidPortionLabel: "½ bowl",
  nutrition: { basis: "estimate", kcal: 300, protein: 9, carbs: 42, fat: 10.5, fibre: 6, iron: 2.4, vitC: 21,
    note: "The source lists 6.9 mg iron for ½ cup oatmeal. That only applies to iron-fortified instant oatmeal; plain rolled oats give ≈1.7 mg. Check the box." },
});
