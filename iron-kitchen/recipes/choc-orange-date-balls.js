// Recipe: see README.md "Adding a recipe" for field meanings.
addRecipe({
  id: "choc-orange-date-balls",
  name: "Chocolate Orange Date Balls",
  meal: "Snack",
  tags: ["no-cook", "freezer"],
  allergens: ["tree nuts"],
  servings: 15, servingLabel: "small balls",
  time: "15 min",
  source: { name: "Kids Eat in Color", url: "https://kidseatincolor.com/no-bake-chocolate-orange-date-balls/" },
  ingredients: [
    { k: "dates", q: 1.33, u: "cup", t: "pitted dates" },
    { k: "walnuts", q: 1, u: "cup", t: "walnuts (or sunflower/pumpkin seeds for nut-free)" },
    { k: "cacao", q: 0.25, u: "cup", t: "cacao or cocoa powder" },
    { k: "orange", q: 1, u: "tbsp", t: "orange zest (about 1 orange)", shop: { q: 1, u: "each" } },
    { k: "vanilla", q: 1, u: "tsp", t: "vanilla" },
  ],
  steps: [
    "Put everything in a food processor and blend until the mixture turns oily and sticks together.",
    "Roll into small balls.",
  ],
  storage: "Not stated by the source. Our suggestion: fridge 1 week, freezer 3 months.",
  kidNotes: "The source warns these are chewy and not suitable for toddlers as whole balls. Serve in small broken-up pieces while seated. Whole nuts are a choking risk under 4, but these are fully ground. Eat the orange itself on the side for vitamin C.",
  kidPortion: 1, kidPortionLabel: "1 ball, in pieces",
  nutrition: { basis: "estimate", kcal: 91, protein: 1.6, carbs: 13.4, fat: 4.6, fibre: 2, iron: 0.5, vitC: 0.5,
    note: "The source says it makes 5 servings; we split it into about 15 small balls." },
});
