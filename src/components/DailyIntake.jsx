import React, { useMemo } from 'react';
import { Target, Trash2 } from 'lucide-react';

function ProgressBar({ value, max, color = 'emerald' }) {
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

export default function DailyIntake({ goals, setGoals, intake, onClear }) {
  const totals = useMemo(() => {
    return intake.reduce(
      (acc, i) => ({
        calories: acc.calories + (i.nutrients?.calories || 0),
        protein: acc.protein + (i.nutrients?.protein || 0),
        carbs: acc.carbs + (i.nutrients?.carbs || 0),
        fat: acc.fat + (i.nutrients?.fat || 0),
        fiber: acc.fiber + (i.nutrients?.fiber || 0),
        sugar: acc.sugar + (i.nutrients?.sugar || 0),
        sodium: acc.sodium + (i.nutrients?.sodium || 0),
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0 }
    );
  }, [intake]);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Target className="size-5 text-emerald-600" />
          <h3 className="font-semibold">Daily Goals</h3>
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-2 text-sm text-rose-600 hover:text-rose-700"
        >
          <Trash2 className="size-4" /> Clear log
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <GoalRow label="Calories" unit="kcal" value={totals.calories} goal={goals.calories} onGoal={(v) => setGoals({ ...goals, calories: v })} color="amber" />
        <GoalRow label="Protein" unit="g" value={totals.protein} goal={goals.protein} onGoal={(v) => setGoals({ ...goals, protein: v })} color="cyan" />
        <GoalRow label="Carbs" unit="g" value={totals.carbs} goal={goals.carbs} onGoal={(v) => setGoals({ ...goals, carbs: v })} color="emerald" />
        <GoalRow label="Fat" unit="g" value={totals.fat} goal={goals.fat} onGoal={(v) => setGoals({ ...goals, fat: v })} color="rose" />
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-neutral-700 mb-2">Logged items</h4>
        <div className="space-y-2 max-h-48 overflow-auto pr-1">
          {intake.length === 0 && (
            <div className="text-sm text-neutral-500">No items added yet.</div>
          )}
          {intake.map((i, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 rounded-lg border border-neutral-200 bg-white">
              <div>
                <div className="text-sm font-medium">{i.food.name}</div>
                <div className="text-xs text-neutral-500">{i.grams}g • {Math.round(i.nutrients.calories)} kcal</div>
              </div>
              <div className="text-xs text-neutral-600 font-medium">
                P {Math.round(i.nutrients.protein)}g · C {Math.round(i.nutrients.carbs)}g · F {Math.round(i.nutrients.fat)}g
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GoalRow({ label, unit, value, goal, onGoal, color }) {
  return (
    <div className="p-3 rounded-xl bg-white border border-neutral-200 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-neutral-500">{label}</div>
        <div className="text-xs text-neutral-400">{Math.round(value)} / {goal} {unit}</div>
      </div>
      <ProgressBar value={value} max={goal} color={color} />
      <div className="mt-2 flex items-center gap-2 text-sm">
        <span className="text-neutral-500">Goal</span>
        <input
          type="number"
          min={0}
          value={goal}
          onChange={(e) => onGoal(Math.max(0, Number(e.target.value) || 0))}
          className="w-24 px-2 py-1 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
        />
        <span className="text-neutral-400">{unit}</span>
      </div>
    </div>
  );
}
