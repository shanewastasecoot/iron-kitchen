// Recipe: see README.md "Adding a recipe" for field meanings.
addRecipe({
  id: "green-popsicles",
  name: "Green Smoothie Popsicles",
  meal: "Snack",
  tags: ["no-cook", "freezer"],
  allergens: [],
  servings: 6, servingLabel: "popsicles",
  time: "10 min + 4 h freeze",
  source: { name: "Boston Children's Hospital (PEHC)", url: "https://www.childrenshospital.org/sites/default/files/2023-03/pehc-iron-rich-recipes.pdf" },
  ingredients: [
    { k: "kale", q: 0.5, u: "cup", t: "kale, chopped", shop: { q: 1, u: "bunch" } },
    { k: "spinach", q: 0.5, u: "cup", t: "spinach, chopped", shop: { q: 15, u: "g" } },
    { k: "banana", q: 0.5, u: "each", t: "small banana, frozen" },
    { k: "kiwi", q: 0.5, u: "cup", t: "kiwi, chopped", shop: { q: 1, u: "each" } },
    { k: "pineapple", q: 0.5, u: "cup", t: "pineapple, chopped" },
    { k: "chia", q: 1, u: "tsp", t: "chia seeds" },
    { k: "orange_juice", q: 0.5, u: "cup", t: "orange juice" },
  ],
  steps: [
    "Blend everything until smooth. Add a splash more juice or water if it is too thick.",
    "Pour into popsicle moulds up to the fill line.",
    "Freeze at least 4 hours, or overnight. Or skip the freezer and serve as a smoothie.",
  ],
  storage: "Freezer: about 1 month.",
  kidNotes: "Not very high in iron on its own (~0.3 mg each), but very high in vitamin C. Serve it alongside an iron-rich snack such as the protein balls, so the vitamin C helps the iron absorb.",
  kidPortion: 1, kidPortionLabel: "1 popsicle",
  nutrition: { basis: "estimate", kcal: 37, protein: 0.6, carbs: 9, fat: 0.3, fibre: 1.3, iron: 0.3, vitC: 36 },
});
