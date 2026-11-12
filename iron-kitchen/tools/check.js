#!/usr/bin/env node
/*
 * Recipe data checker. Run:  node tools/check.js
 * GitHub runs this before every deploy and refuses to publish if it fails,
 * so a typo in a recipe can't break the live site.
 */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const ctx = vm.createContext({});
const load = f => vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename: f });
const problems = [];
const fail = msg => problems.push(msg);

load("data/catalog.js");
load("recipes/index.js");
const { ITEMS, AISLES, RECIPE_FILES } = vm.runInContext("({ ITEMS, AISLES, RECIPE_FILES })", ctx);

// Every listed name has a file, and every file is listed.
const files = fs.readdirSync(path.join(root, "recipes")).filter(f => f.endsWith(".js") && f !== "index.js").map(f => f.slice(0, -3));
for (const n of RECIPE_FILES) if (!files.includes(n)) fail(`recipes/index.js lists "${n}" but recipes/${n}.js does not exist`);
for (const f of files) if (!RECIPE_FILES.includes(f)) fail(`recipes/${f}.js exists but is not listed in recipes/index.js`);
const dupes = RECIPE_FILES.filter((n, i) => RECIPE_FILES.indexOf(n) !== i);
if (dupes.length) fail(`recipes/index.js lists these twice: ${dupes.join(", ")}`);

for (const [k, v] of Object.entries(ITEMS)) {
  if (!AISLES.includes(v.aisle)) fail(`ITEMS.${k}: aisle "${v.aisle}" is not in AISLES`);
}

const TAGS = ["no-cook", "freezer", "quick"];
const MEALS = ["Breakfast", "Lunch / dinner", "Snack"];
for (const name of RECIPE_FILES.filter(n => files.includes(n))) {
  const before = vm.runInContext("RECIPES.length", ctx);
  try { load(`recipes/${name}.js`); }
  catch (e) { fail(`recipes/${name}.js: JavaScript error: ${e.message}`); continue; }
  if (vm.runInContext("RECIPES.length", ctx) !== before + 1) { fail(`recipes/${name}.js must call addRecipe({...}) exactly once`); continue; }
  const r = vm.runInContext("RECIPES[RECIPES.length - 1]", ctx);
  const where = `recipes/${name}.js`;
  if (r.id !== name) fail(`${where}: id "${r.id}" must match the file name "${name}"`);
  for (const f of ["name", "meal", "time", "servingLabel", "kidPortionLabel", "kidNotes"]) if (typeof r[f] !== "string" || !r[f]) fail(`${where}: "${f}" is missing`);
  if (!MEALS.includes(r.meal)) fail(`${where}: meal must be one of ${MEALS.join(" / ")}`);
  if (!(r.servings > 0)) fail(`${where}: servings must be a positive number`);
  if (!(r.kidPortion > 0)) fail(`${where}: kidPortion must be a positive number`);
  if (!Array.isArray(r.tags) || r.tags.some(t => !TAGS.includes(t))) fail(`${where}: tags may only contain ${TAGS.join(", ")}`);
  if (!Array.isArray(r.allergens)) fail(`${where}: allergens must be a list (use [] for none)`);
  if (!r.source || !/^https?:\/\//.test(r.source.url || "")) fail(`${where}: source.url is missing`);
  if (!Array.isArray(r.steps) || !r.steps.length) fail(`${where}: needs at least one step`);
  if (!Array.isArray(r.ingredients) || !r.ingredients.length) fail(`${where}: needs ingredients`);
  else r.ingredients.forEach((ing, i) => {
    const w = `${where} ingredient ${i + 1}`;
    if (!ITEMS[ing.k]) fail(`${w}: "${ing.k}" is not in ITEMS (data/catalog.js)`);
    if (!(ing.q > 0)) fail(`${w}: q must be a positive number`);
    if (!ing.u || !ing.t) fail(`${w}: needs u (unit) and t (text)`);
    if (ing.shop && !(ing.shop.q > 0 && ing.shop.u)) fail(`${w}: shop needs q and u`);
  });
  const n = r.nutrition;
  if (n && n.basis !== "label") {
    for (const f of ["kcal", "protein", "carbs", "fat", "fibre", "iron", "vitC"]) if (typeof n[f] !== "number") fail(`${where}: nutrition.${f} must be a number`);
  }
}

if (problems.length) {
  console.error(`✗ ${problems.length} problem(s):\n  - ` + problems.join("\n  - "));
  process.exit(1);
}
console.log(`✓ ${RECIPE_FILES.length} recipes, ${Object.keys(ITEMS).length} ingredients: all good`);
