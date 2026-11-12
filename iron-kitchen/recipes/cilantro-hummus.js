// Recipe: see README.md "Adding a recipe" for field meanings.
addRecipe({
  id: "cilantro-hummus",
  name: "Cilantro Hummus",
  meal: "Snack",
  tags: [],
  allergens: ["sesame"],
  servings: 4, servingLabel: "servings",
  time: "20 min",
  source: { name: "Kids Eat in Color", url: "https://kidseatincolor.com/easy-cilantro-hummus-recipe/" },
  ingredients: [
    { k: "chickpeas", q: 1.75, u: "cup", t: "chickpeas, drained and rinsed (1 × 540 mL can)" },
    { k: "garlic", q: 1, u: "clove", t: "garlic" },
    { k: "tahini", q: 0.33, u: "cup", t: "tahini" },
    { k: "lemon", q: 3, u: "tbsp", t: "fresh lemon juice", shop: { q: 1, u: "each" } },
    { k: "salt", q: 0.25, u: "tsp", t: "salt (source says ½–1 tsp; we cut it for toddlers)" },
    { k: "cilantro", q: 1, u: "cup", t: "fresh cilantro, stems included", shop: { q: 1, u: "bunch" } },
  ],
  steps: [
    "Cover the chickpeas with water in a small pot. Boil 10–15 minutes; longer makes a smoother hummus. Drain, keeping the cooking water.",
    "Blend the chickpeas, garlic, tahini, lemon juice and salt for 1–2 minutes.",
    "Add the cooking water a spoonful at a time until it's as smooth as you like.",
    "Add the cilantro and blend until it's fully mixed in.",
  ],
  storage: "Fridge: up to 4 days in a lidded container (source).",
  kidNotes: "Contains sesame. If someone is allergic to sesame, the source suggests cashew butter instead (a tree nut) or leaving the tahini out. Serve with pita, cucumber, peppers or carrots.",
  kidPortion: 0.5, kidPortionLabel: "½ serving",
  nutrition: { basis: "estimate", kcal: 228, protein: 8.8, carbs: 21.5, fat: 12.9, fibre: 6.8, iron: 1.9, vitC: 6 },
});
