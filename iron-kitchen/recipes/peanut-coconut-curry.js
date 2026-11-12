// Recipe: see README.md "Adding a recipe" for field meanings.
addRecipe({
  id: "peanut-coconut-curry",
  name: "15-Minute Peanut Coconut Curry",
  meal: "Lunch / dinner",
  tags: ["quick", "freezer"],
  allergens: ["peanut", "soy (if tofu)"],
  servings: 4, servingLabel: "toddler portions",
  time: "15 min",
  source: { name: "SR Nutrition", url: "https://www.srnutrition.co.uk/2026/04/toddler-friendly-peanut-coconut-curry/" },
  ingredients: [
    { k: "coconut_milk", q: 400, u: "ml", t: "can coconut milk (light works too)" },
    { k: "frozen_veg", q: 1, u: "cup", t: "frozen mixed veg, peas, corn or carrots (2 handfuls)" },
    { k: "peanut_butter", q: 1, u: "tbsp", t: "natural smooth peanut butter (no salt or sugar added)" },
    { k: "chickpeas", q: 1.75, u: "cup", t: "chickpeas, drained (1 can), or cubed tofu or cooked chicken" },
    { k: "rice_brown", q: 100, u: "g", t: "brown rice or noodles, to serve", opt: true },
  ],
  steps: [
    "Cook the frozen veg in a saucepan over medium heat for a few minutes, stirring, until they start to soften.",
    "Pour in the coconut milk and stir in the peanut butter until smooth.",
    "Add the chickpeas (or tofu or chicken) and simmer gently for 8–10 minutes until hot and the veg is tender.",
    "Serve over rice or noodles.",
  ],
  storage: "Fridge: up to 2 days. Freezes well (source).",
  kidNotes: "Blend or mash to suit each child. This one is high in fat from the coconut milk, so light coconut milk is a fine swap. Low in vitamin C, so serve fruit such as orange, kiwi or berries alongside.",
  kidPortion: 1, kidPortionLabel: "1 toddler portion",
  nutrition: { basis: "estimate", kcal: 347, protein: 9, carbs: 25, fat: 25, fibre: 6.5, iron: 3.3, vitC: 1,
    note: "Without rice. Iron in canned coconut milk varies a lot by brand; we assumed a mid-range value." },
});
