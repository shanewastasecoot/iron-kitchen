"use strict";

/* ---------- Storage (per device; safe if storage is blocked) ---------- */
const store = {
  get(key, fallback) {
    try { const v = localStorage.getItem("ik." + key); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem("ik." + key, JSON.stringify(value)); } catch { /* ignore */ }
  },
};

const state = {
  favs: new Set(store.get("favs", [])),
  plan: store.get("plan", {}),          // { recipeId: servings }
  have: store.get("have", {}),          // { itemKey: true/false } overrides
  filters: { meal: "All", toggles: new Set(), q: "" },
  detailServings: {},                   // recipeId -> servings shown on detail page
};
const save = () => {
  store.set("favs", [...state.favs]);
  store.set("plan", state.plan);
  store.set("have", state.have);
};

let byId = {};

/* ---------- Units & formatting ---------- */
const VOL = { pinch: 0.31, tsp: 4.929, tbsp: 14.787, cup: 236.6, ml: 1, l: 1000, pint: 473 };
const MASS = { g: 1, kg: 1000, oz: 28.35, lb: 453.6 };
const family = u => (u in VOL ? "vol" : u in MASS ? "mass" : "count:" + u);
const toBase = (q, u) => (u in VOL ? q * VOL[u] : u in MASS ? q * MASS[u] : q);

const FRACS = [[0, ""], [1/8, "⅛"], [1/4, "¼"], [1/3, "⅓"], [3/8, "⅜"], [1/2, "½"], [5/8, "⅝"], [2/3, "⅔"], [3/4, "¾"], [7/8, "⅞"], [1, ""]];
function frac(n) {
  if (n <= 0) return "0";
  let whole = Math.floor(n), rest = n - whole, best = FRACS[0];
  for (const f of FRACS) if (Math.abs(f[0] - rest) < Math.abs(best[0] - rest)) best = f;
  if (best[0] === 1) { whole += 1; best = FRACS[0]; }
  if (whole === 0 && !best[1]) return "⅛";
  return (whole ? String(whole) : "") + best[1];
}
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const plural = (u, n) => {
  if (u === "each") return "";
  if (n <= 1) return u;
  if (/(ch|sh|s|x)$/.test(u)) return u + "es";
  return u + "s";
};

/** Quantity text for a recipe line, after scaling. */
function fmtRecipeQty(q, u) {
  if (u in MASS) return (u === "g" ? Math.round(q) : frac(q)) + " " + u;
  if (u === "ml") return Math.round(q) + " mL";
  if (u in VOL) return frac(q) + " " + (u === "pinch" || (u === "cup" && q > 1.01) ? plural(u, q) : u);
  if (u === "each") return frac(q);
  return frac(q) + " " + plural(u, q);
}

/** Friendly volume for shopping: base ml -> cups / tbsp / tsp. */
function fmtVol(ml) {
  if (ml >= VOL.cup / 4 - 0.5) {
    const cups = Math.ceil((ml / VOL.cup) * 4) / 4;           // round up to ¼ cup
    return frac(cups) + (cups > 1 ? " cups" : " cup");
  }
  if (ml >= VOL.tbsp - 0.5) return frac(Math.ceil((ml / VOL.tbsp) * 2) / 2) + " tbsp";
  if (ml < VOL.tsp / 4) return "a pinch";
  return frac(Math.ceil((ml / VOL.tsp) * 4) / 4) + " tsp";
}
function fmtMl(ml) {
  if (ml >= 1000) return (Math.round(ml / 100) / 10) + " L";
  return Math.ceil(ml / 10) * 10 + " mL";
}
function fmtMass(g) {
  if (g >= 1000) return (Math.round(g / 100) / 10) + " kg";
  return (g < 50 ? Math.ceil(g / 5) * 5 : Math.ceil(g / 10) * 10) + " g";
}

/* ---------- Shopping list maths ---------- */
function buildShoppingList() {
  const lines = {}; // key -> { item, parts: {family: {base, unit}}, recipes:Set, allOpt }
  for (const [id, servings] of Object.entries(state.plan)) {
    const r = byId[id]; if (!r) continue;
    const factor = servings / r.servings;
    for (const ing of r.ingredients) {
      const item = ITEMS[ing.k];
      if (!item) { console.warn("Unknown item", ing.k); continue; }
      const src = ing.shop || ing;
      const fam = family(src.u);
      const line = lines[ing.k] ||= { key: ing.k, item, parts: {}, recipes: new Set(), allOpt: true };
      const p = line.parts[fam] ||= { base: 0, unit: src.u };
      p.base += toBase(src.q * factor, src.u);
      line.recipes.add(r.name);
      if (!ing.opt) line.allOpt = false;
    }
  }
  return Object.values(lines).map(line => {
    const texts = [];
    let packText = "";
    for (const [fam, p] of Object.entries(line.parts)) {
      let t;
      if (fam === "vol") {
        t = line.item.metric ? fmtMl(p.base) : fmtVol(p.base);
        if (line.item.gPerCup) t += ` (≈${fmtMass((p.base / VOL.cup) * line.item.gPerCup)})`;
      } else if (fam === "mass") {
        t = fmtMass(p.base);
      } else {
        const unit = fam.slice(6);
        const n = line.item.roundUp ? Math.ceil(p.base - 1e-9) : p.base;
        t = (line.item.roundUp ? String(n) : frac(n)) + (plural(unit, n) ? " " + plural(unit, n) : "");
      }
      texts.push(t);
      const pk = line.item.pack;
      if (pk && family(pk.u) === fam && !packText) {
        const n = Math.max(1, Math.ceil(p.base / toBase(pk.q, pk.u) - 0.12));
        packText = `${n} × ${pk.label}`;
      }
    }
    const qty = texts.join(" + ") + (packText ? ` — ${packText}` : "");
    const have = line.key in state.have ? state.have[line.key] : !!line.item.staple;
    return { ...line, qty, have };
  }).sort((a, b) =>
    AISLES.indexOf(a.item.aisle) - AISLES.indexOf(b.item.aisle) || a.item.name.localeCompare(b.item.name));
}

function shoppingText(list) {
  return list.filter(l => !l.have)
    .map(l => `${l.item.name} — ${l.qty}${l.allOpt ? " (optional)" : ""}`)
    .join("\n");
}

/* ---------- Small UI helpers ---------- */
const $ = sel => document.querySelector(sel);
let toastTimer;
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}
function updateBadge() {
  const n = Object.keys(state.plan).length, b = $("#listBadge");
  b.hidden = !n; b.textContent = n;
}
function setTop(html) { $("#topbar").innerHTML = html; }
function setActionbar(html) { $("#actionbar").innerHTML = html ? `<div class="actionbar"><div class="wrap">${html}</div></div>` : ""; }

const TAG_LABEL = { "no-cook": "No-cook", freezer: "Freezer-friendly", quick: "Quick" };
function ironPill(r) {
  const n = r.nutrition;
  return n && typeof n.iron === "number" ? `<span class="pill iron">${n.iron} mg iron</span>` : `<span class="pill iron">Iron: see label</span>`;
}
function vcPill(r) {
  return r.nutrition && r.nutrition.vitC >= 15 ? `<span class="pill vc">Vit C boost</span>` : "";
}

/* ---------- Views ---------- */
const TOGGLES = [
  { id: "no-cook", label: "No-cook", test: r => r.tags.includes("no-cook") },
  { id: "freezer", label: "Freezer-friendly", test: r => r.tags.includes("freezer") },
  { id: "quick", label: "Quick", test: r => r.tags.includes("quick") },
  { id: "nut-free", label: "Nut-free", test: r => !r.allergens.some(a => /nut|peanut/.test(a)) },
  { id: "egg-free", label: "Egg-free", test: r => !r.allergens.includes("egg") },
];
const MEALS = ["All", "Breakfast", "Lunch / dinner", "Snack"];

function recipeCard(r) {
  const fav = state.favs.has(r.id), on = r.id in state.plan;
  return `<article class="card rcard">
    <a class="main" href="#/r/${r.id}">
      <h3>${esc(r.name)}</h3>
      <div class="meta">${esc(r.meal)} · ${esc(r.time)}</div>
      <div class="pills">${ironPill(r)}${vcPill(r)}${r.tags.map(t => `<span class="pill">${TAG_LABEL[t] || t}</span>`).join("")}</div>
    </a>
    <div class="side">
      <button class="iconbtn fav" data-fav="${r.id}" aria-pressed="${fav}" aria-label="Favourite">${fav ? "♥" : "♡"}</button>
      <button class="addbtn" data-add="${r.id}" aria-pressed="${on}">${on ? "✓ List" : "+ List"}</button>
    </div>
  </article>`;
}

function viewRecipes(favsOnly) {
  setTop(`<h1>${favsOnly ? "Favourites" : "Iron Kitchen"}</h1>`);
  setActionbar("");
  const f = state.filters;
  const q = f.q.trim().toLowerCase();
  let list = RECIPES.filter(r =>
    (!favsOnly || state.favs.has(r.id)) &&
    (f.meal === "All" || r.meal === f.meal) &&
    [...f.toggles].every(t => TOGGLES.find(x => x.id === t).test(r)) &&
    (!q || (r.name + " " + r.ingredients.map(i => i.t).join(" ")).toLowerCase().includes(q)));

  const tips = favsOnly ? "" : `<details class="card tips"><summary>Iron tips for toddlers</summary>
    <ul>${IRON_TIPS.map(t => `<li>${esc(t)}</li>`).join("")}</ul></details>`;

  let empty = "";
  if (!list.length) {
    empty = favsOnly && !state.favs.size
      ? `<div class="empty">No favourites yet.<br>Tap ♡ on a recipe to save it here.</div>`
      : `<div class="empty">No recipes match.<br><button class="linkbtn" data-clear-filters>Clear filters</button></div>`;
  }

  $("#app").innerHTML = `
    <input class="search" type="search" placeholder="Search recipes or ingredients" value="${esc(f.q)}" id="search" aria-label="Search">
    <div class="chips" role="group" aria-label="Meal">${MEALS.map(m =>
      `<button class="chip" data-meal="${m}" aria-pressed="${f.meal === m}">${m}</button>`).join("")}</div>
    <div class="chips" role="group" aria-label="Filters">${TOGGLES.map(t =>
      `<button class="chip" data-toggle="${t.id}" aria-pressed="${f.toggles.has(t.id)}">${t.label}</button>`).join("")}</div>
    ${tips}
    ${list.map(recipeCard).join("")}
    ${empty}`;

  const s = $("#search");
  s.addEventListener("input", () => {
    f.q = s.value;
    const pos = s.selectionStart;
    render();
    const s2 = $("#search"); s2.focus(); s2.setSelectionRange(pos, pos);
  });
}

function viewDetail(id) {
  const r = byId[id];
  if (!r) { location.hash = "#/"; return; }
  const servings = state.detailServings[id] ?? state.plan[id] ?? r.servings;
  state.detailServings[id] = servings;
  const factor = servings / r.servings;
  const n = r.nutrition || {};
  const fav = state.favs.has(r.id), on = r.id in state.plan;

  setTop(`<button class="iconbtn" data-back aria-label="Back">←</button><h1>${esc(r.name)}</h1>
    <button class="iconbtn fav" data-fav="${r.id}" aria-pressed="${fav}" aria-label="Favourite">${fav ? "♥" : "♡"}</button>`);

  let nutritionHtml;
  if (typeof n.iron === "number") {
    const kidIron = n.iron * r.kidPortion;
    const pct = need => Math.round((kidIron / need) * 100);
    nutritionHtml = `
      <div class="ngrid">
        <div class="hi"><b>${n.iron} mg</b><span>Iron</span></div>
        <div><b>${n.vitC} mg</b><span>Vitamin C</span></div>
        <div><b>${n.kcal}</b><span>Calories</span></div>
        <div><b>${n.protein} g</b><span>Protein</span></div>
        <div><b>${n.carbs} g</b><span>Carbs</span></div>
        <div><b>${n.fat} g</b><span>Fat</span></div>
      </div>
      <p class="small" style="margin:8px 0 0">Per ${esc(r.servingLabel.replace(/s$/, ""))} · fibre ${n.fibre} g · ${n.basis === "source" ? "values published by the source" : "estimated from ingredients"}.</p>
      <div class="kid" style="margin-top:12px">
        <strong>Toddler portion (${esc(r.kidPortionLabel)}): ≈${Math.round(kidIron * 10) / 10} mg iron</strong><br>
        ${pct(7)}% of daily need for age 1–3 (7 mg) · ${pct(10)}% for age 4–8 (10 mg)
      </div>`;
  } else {
    nutritionHtml = `<p class="note" style="margin:0">${esc(n.note || "No nutrition data.")}</p>`;
  }

  $("#app").innerHTML = `<div class="detail">
    <h2>${esc(r.name)}</h2>
    <div class="meta">${esc(r.meal)} · ${esc(r.time)}</div>
    <div class="pills">${ironPill(r)}${vcPill(r)}${r.tags.map(t => `<span class="pill">${TAG_LABEL[t] || t}</span>`).join("")}</div>
    <p class="small">Allergens: ${r.allergens.length ? esc(r.allergens.join(", ")) : "none of the priority allergens"}</p>

    <section class="card section">
      <div class="row"><h4 style="margin:0">Ingredients</h4>
        <div class="stepper">
          <button data-serv="-1" aria-label="Fewer servings">−</button>
          <output>${servings}</output>
          <button data-serv="1" aria-label="More servings">+</button>
        </div>
      </div>
      <p class="small" style="margin:4px 0 8px;text-align:right">${esc(r.servingLabel)}</p>
      <ul class="ing">${r.ingredients.map(i =>
        `<li><span class="q">${fmtRecipeQty(i.q * factor, i.u)}</span> ${esc(i.t)}${i.opt ? ' <span class="opt">(optional)</span>' : ""}</li>`).join("")}</ul>
    </section>

    <section class="card section">
      <h4>Method <span class="small">(tap a step when it's done)</span></h4>
      <ol class="steps">${r.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
    </section>

    <section class="kid"><strong>For the kids:</strong> ${esc(r.kidNotes)}</section>

    <section class="card section" style="margin-top:12px">
      <h4>Nutrition</h4>
      ${nutritionHtml}
      ${n.note && typeof n.iron === "number" ? `<p class="note" style="margin:12px 0 0">${esc(n.note)}</p>` : ""}
    </section>

    ${r.storage ? `<section class="card section"><h4>Storage</h4><p style="margin:0">${esc(r.storage)}</p></section>` : ""}
    <p class="small">Source: <a href="${esc(r.source.url)}" target="_blank" rel="noopener">${esc(r.source.name)}</a></p>
    <div class="spacer"></div>
  </div>`;

  setActionbar(on
    ? `<button class="btn" data-remove="${r.id}">Remove from list</button><a class="btn done" href="#/list" style="display:grid;place-items:center;text-decoration:none">✓ On list (${state.plan[r.id]}) — view</a>`
    : `<button class="btn primary" data-add-detail="${r.id}">+ Add ${servings} ${esc(r.servingLabel)} to shopping list</button>`);
}

function viewList() {
  setTop(`<h1>Shopping list</h1>${Object.keys(state.plan).length ? `<button class="linkbtn" data-clear-list>Clear</button>` : ""}`);
  const ids = Object.keys(state.plan);
  if (!ids.length) {
    setActionbar("");
    $("#app").innerHTML = `<div class="empty">Your list is empty.<br>Tap <b>+ List</b> on any recipe to add it.<br><br><a href="#/">Browse recipes</a></div>`;
    return;
  }
  const list = buildShoppingList();
  const need = list.filter(l => !l.have).length;
  let html = `<div class="aisle">Recipes (${ids.length})</div><div class="card">${ids.map(id => {
    const r = byId[id];
    return `<div class="plan-item">
      <a class="name" href="#/r/${id}" style="text-decoration:none;color:inherit">${esc(r.name)}<small>${state.plan[id]} ${esc(r.servingLabel)}</small></a>
      <div class="stepper">
        <button data-plan="${id}" data-d="-1" aria-label="Fewer">−</button>
        <button data-plan="${id}" data-d="1" aria-label="More">+</button>
      </div>
      <button class="iconbtn" data-remove="${id}" aria-label="Remove">✕</button>
    </div>`;
  }).join("")}</div>
  <p class="small" style="margin:12px 4px 0">Tap anything you already have. Ticked items are left out when you share. Pantry staples start ticked.</p>`;

  let aisle = "";
  for (const l of list) {
    if (l.item.aisle !== aisle) {
      html += (aisle ? "</div>" : "") + `<div class="aisle">${esc(l.item.aisle)}</div><div class="card">`;
      aisle = l.item.aisle;
    }
    html += `<div class="shop-row${l.have ? " have" : ""}" data-have="${l.key}" role="checkbox" aria-checked="${l.have}" tabindex="0">
      <span class="box">${l.have ? "✓" : ""}</span>
      <span class="txt">${esc(l.item.name)} — <span class="qty">${esc(l.qty)}</span>${l.allOpt ? ' <span class="opt">(optional)</span>' : ""}
      <span class="for">${esc([...l.recipes].join(", "))}</span></span>
    </div>`;
  }
  html += "</div><div class=\"spacer\"></div>";
  $("#app").innerHTML = html;

  setActionbar(`<button class="btn" data-copy ${need ? "" : "disabled"}>Copy</button>
    <button class="btn primary" data-share ${need ? "" : "disabled"}>Share to Keep (${need})</button>`);
}

/* ---------- Router ---------- */
function render() {
  const h = location.hash || "#/";
  let nav = "recipes";
  if (h.startsWith("#/r/")) { viewDetail(decodeURIComponent(h.slice(4))); nav = ""; }
  else if (h === "#/fav") { viewRecipes(true); nav = "fav"; }
  else if (h === "#/list") { viewList(); nav = "list"; }
  else viewRecipes(false);
  document.querySelectorAll("[data-nav]").forEach(a => a.classList.toggle("active", a.dataset.nav === nav));
  updateBadge();
}
let lastHash = location.hash;
window.addEventListener("hashchange", () => {
  if (location.hash !== lastHash) window.scrollTo(0, 0);
  lastHash = location.hash;
  render();
});

/* ---------- Actions (one delegated listener) ---------- */
function addToPlan(id, servings) {
  state.plan[id] = servings ?? byId[id].servings;
  save(); toast(`Added ${byId[id].name}`);
}
function removeFromPlan(id) {
  delete state.plan[id]; save(); toast(`Removed ${byId[id].name}`);
}

async function shareList() {
  const text = shoppingText(buildShoppingList());
  const title = "Groceries " + new Date().toLocaleDateString("en-CA", { month: "short", day: "numeric" });
  if (navigator.share) {
    try { await navigator.share({ title, text }); return; }
    catch (e) { if (e.name === "AbortError") return; }
  }
  await copyText(text);
  toast("Copied. Paste into a Keep note.");
}
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch { /* ignore */ }
    ta.remove(); return true;
  }
}

document.addEventListener("click", async e => {
  const t = e.target.closest("button, [data-have], ol.steps li");
  if (!t) return;
  const d = t.dataset;

  if (d.fav) {
    state.favs.has(d.fav) ? state.favs.delete(d.fav) : state.favs.add(d.fav);
    save(); render();
  } else if (d.add) {
    d.add in state.plan ? removeFromPlan(d.add) : addToPlan(d.add);
    render();
  } else if (d.addDetail) {
    addToPlan(d.addDetail, state.detailServings[d.addDetail]); render();
  } else if (d.remove) {
    removeFromPlan(d.remove); render();
  } else if (d.serv) {
    const id = location.hash.slice(4);
    const next = Math.max(1, (state.detailServings[id] || 1) + Number(d.serv));
    state.detailServings[id] = next;
    if (id in state.plan) { state.plan[id] = next; save(); }
    render();
  } else if (d.plan) {
    state.plan[d.plan] = Math.max(1, state.plan[d.plan] + Number(d.d));
    state.detailServings[d.plan] = state.plan[d.plan];
    save(); render();
  } else if (d.have) {
    const row = buildShoppingList().find(l => l.key === d.have);
    state.have[d.have] = !(row && row.have);
    save(); render();
  } else if (d.meal) {
    state.filters.meal = d.meal; render();
  } else if (d.toggle) {
    const s = state.filters.toggles;
    s.has(d.toggle) ? s.delete(d.toggle) : s.add(d.toggle); render();
  } else if ("clearFilters" in d) {
    state.filters = { meal: "All", toggles: new Set(), q: "" }; render();
  } else if ("clearList" in d) {
    if (confirm("Clear all recipes from the shopping list?")) {
      state.plan = {}; state.have = {}; state.detailServings = {}; save(); render();
    }
  } else if ("share" in d) {
    shareList();
  } else if ("copy" in d) {
    await copyText(shoppingText(buildShoppingList()));
    toast("Copied. In Keep: paste, then ⋮ → Show checkboxes.");
  } else if ("back" in d) {
    history.length > 1 ? history.back() : (location.hash = "#/");
  } else if (t.matches("ol.steps li")) {
    t.classList.toggle("done");
  }
});
document.addEventListener("keydown", e => {
  if ((e.key === "Enter" || e.key === " ") && e.target.dataset && e.target.dataset.have) {
    e.preventDefault(); e.target.click();
  }
});

/* ---------- Load recipe files, then start ---------- */
function loadScript(src) {
  return new Promise(resolve => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve(true);
    s.onerror = () => { console.warn("Could not load", src); resolve(false); };
    document.head.appendChild(s);
  });
}
async function start() {
  $("#app").innerHTML = '<div class="empty">Loading recipes…</div>';
  const results = await Promise.all(RECIPE_FILES.map(n => loadScript(`recipes/${n}.js`)));
  // Keep the order from recipes/index.js regardless of load order
  const order = Object.fromEntries(RECIPE_FILES.map((n, i) => [n, i]));
  RECIPES.sort((a, b) => (order[a.id] ?? 999) - (order[b.id] ?? 999));
  byId = Object.fromEntries(RECIPES.map(r => [r.id, r]));
  for (const id of Object.keys(state.plan)) if (!byId[id]) delete state.plan[id];
  render();
  const missing = results.filter(ok => !ok).length;
  if (missing) toast(`${missing} recipe(s) couldn't load. Check your connection.`);
}
start();

/* ---------- Offline support ---------- */
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
