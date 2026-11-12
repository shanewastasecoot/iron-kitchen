// Recipe: see README.md "Adding a recipe" for field meanings.
addRecipe({
  id: "fortified-cereal",
  name: "Iron-Fortified Cereal & Berries",
  meal: "Breakfast",
  tags: ["no-cook", "quick"],
  allergens: ["varies by brand"],
  servings: 1, servingLabel: "bowl",
  time: "2 min",
  source: { name: "Boston Children's Hospital (PEHC)", url: "https://www.childrenshospital.org/sites/default/files/2023-03/pehc-iron-rich-recipes.pdf" },
  ingredients: [
    { k: "cereal", q: 0.75, u: "cup", t: "iron-fortified cereal (or ¼ cup dry infant cereal)" },
    { k: "strawberries", q: 0.25, u: "cup", t: "sliced strawberries or other berries", shop: { q: 40, u: "g" } },
  ],
  steps: [
    "Pour the cereal, top with berries.",
    "Add milk or a fortified drink if you like (see note).",
  ],
  storage: "",
  kidNotes: "Iron content varies a lot between brands, and the US figures in the source don't apply to Canadian cereals. On Canadian labels, iron is shown as % Daily Value (100% = 18 mg), so 25% DV ≈ 4.5 mg. Infant cereals are some of the most iron-rich options and work well for the 15-month-old. Keep milk modest at iron-focused meals.",
  kidPortion: 0.5, kidPortionLabel: "½ bowl",
  nutrition: { basis: "label", note: "Varies by brand. Check the % Daily Value for iron on the box." },
});
