import React from 'react';

function round(num) {
  return Math.round(num * 10) / 10;
}

function calcForServing(per100g, grams) {
  const factor = grams / 100;
  const keys = ['calories', 'protein', 'carbs', 'fat', 'fiber', 'sugar', 'sodium'];
  const result = {};
  keys.forEach((k) => {
    result[k] = (per100g[k] || 0) * factor;
  });
  return result;
}

function Progress({ value, max, color = 'emerald' }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full bg-${color}-500`}
        style={{ width: `${isFinite(pct) ? pct : 0}%` }}
      />
    </div>
  );
}

export default function NutrientSummary({ food, servingSize, setServingSize, onAddToLog }) {
  if (!food) {
    return (
      <div className="text-center text-sm text-neutral-500">
        Select a food above to see detailed nutrients.
      </div>
    );
  }

  const n = calcForServing(food.per100g, servingSize);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">{food.name}</h3>
        <div className="text-sm text-neutral-500">per {servingSize}g</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl bg-white border border-neutral-200 shadow-sm">
          <div className="text-xs text-neutral-500">Calories</div>
          <div className="text-2xl font-semibold">{Math.round(n.calories)}</div>
          <div className="mt-2"><Progress value={n.calories} max={800} /></div>
        </div>
        <div className="p-3 rounded-xl bg-white border border-neutral-200 shadow-sm">
          <div className="text-xs text-neutral-500">Protein</div>
          <div className="text-xl font-semibold">{round(n.protein)} g</div>
          <div className="mt-2"><Progress value={n.protein} max={60} color="cyan" /></div>
        </div>
        <div className="p-3 rounded-xl bg-white border border-neutral-200 shadow-sm">
          <div className="text-xs text-neutral-500">Carbs</div>
          <div className="text-xl font-semibold">{round(n.carbs)} g</div>
          <div className="mt-2"><Progress value={n.carbs} max={300} color="amber" /></div>
        </div>
        <div className="p-3 rounded-xl bg-white border border-neutral-200 shadow-sm">
          <div className="text-xs text-neutral-500">Fat</div>
          <div className="text-xl font-semibold">{round(n.fat)} g</div>
          <div className="mt-2"><Progress value={n.fat} max={100} color="rose" /></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-3">
        <div className="p-3 rounded-xl bg-white border border-neutral-200 shadow-sm">
          <div className="text-[11px] text-neutral-500">Fiber</div>
          <div className="text-base font-semibold">{round(n.fiber)} g</div>
        </div>
        <div className="p-3 rounded-xl bg-white border border-neutral-200 shadow-sm">
          <div className="text-[11px] text-neutral-500">Sugar</div>
          <div className="text-base font-semibold">{round(n.sugar)} g</div>
        </div>
        <div className="p-3 rounded-xl bg-white border border-neutral-200 shadow-sm">
          <div className="text-[11px] text-neutral-500">Sodium</div>
          <div className="text-base font-semibold">{Math.round(n.sodium)} mg</div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <label className="text-sm text-neutral-600">Serving size (g)</label>
        <input
          type="number"
          min={1}
          step={5}
          value={servingSize}
          onChange={(e) => setServingSize(Math.max(1, Number(e.target.value) || 0))}
          className="w-28 px-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        />
        <button
          onClick={() => onAddToLog({ food, grams: servingSize, nutrients: n })}
          className="ml-auto px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow-sm active:scale-[0.99]"
        >
          Add to daily log
        </button>
      </div>
    </div>
  );
}
