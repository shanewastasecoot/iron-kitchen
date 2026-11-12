// Recipe: see README.md "Adding a recipe" for field meanings.
addRecipe({
  id: "protein-balls",
  name: "Chocolate Protein Balls",
  meal: "Snack",
  tags: ["no-cook", "freezer"],
  allergens: ["tree nuts", "sesame"],
  servings: 12, servingLabel: "balls",
  time: "10 min",
  source: { name: "With Extra Veg", url: "https://withextraveg.net/iron-rich-chocolate-protein-balls/" },
  ingredients: [
    { k: "cashews", q: 1, u: "cup", t: "raw cashews" },
    { k: "pumpkin_seeds", q: 1, u: "cup", t: "pumpkin seeds" },
    { k: "sesame", q: 0.25, u: "cup", t: "sesame seeds" },
    { k: "cacao", q: 0.25, u: "cup", t: "cacao or cocoa powder" },
    { k: "dates", q: 1, u: "cup", t: "Medjool dates, pitted" },
  ],
  steps: [
    "If your dates are firm or dry, cover them with boiling water for about 10 minutes, then drain.",
    "Blitz the cashews, pumpkin seeds and sesame seeds in a food processor until they look like coarse crumbs. Do the dry ingredients first; dates added first tend to clump on the blade.",
    "Add the dates and cacao. Process until the mixture sticks together when you pinch it.",
    "Too dry? Add a few more dates or 1–2 tbsp water and pulse again.",
    "Roll into 12 balls. Eat right away or chill.",
  ],
  storage: "Fridge: about 4 days in a sealed container. Freezer: up to 3 months, layered with parchment.",
  kidNotes: "For the 15-month-old: squash a ball flat and cut into small pieces. The mix is dense and sticky. Serve with berries, orange or kiwi to help the iron absorb. Nut-free option: replace the cashews with extra pumpkin seeds.",
  kidPortion: 0.5, kidPortionLabel: "½ ball",
  nutrition: { basis: "source", kcal: 195, protein: 6.7, carbs: 13.5, fat: 12.9, fibre: 3, iron: 2.8, vitC: 0 },
});
