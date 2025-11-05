import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

// Simple built-in food dataset (per 100g)
const FOOD_DATA = [
  {
    name: 'Apple',
    per100g: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, sugar: 10.4, sodium: 1 },
  },
  {
    name: 'Banana',
    per100g: { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, sugar: 12.2, sodium: 1 },
  },
  {
    name: 'Chicken Breast (cooked)',
    per100g: { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, sugar: 0, sodium: 74 },
  },
  {
    name: 'White Rice (cooked)',
    per100g: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, sugar: 0.1, sodium: 1 },
  },
  {
    name: 'Broccoli',
    per100g: { calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6, sugar: 1.7, sodium: 33 },
  },
  {
    name: 'Almonds',
    per100g: { calories: 579, protein: 21.2, carbs: 21.6, fat: 49.9, fiber: 12.5, sugar: 4.4, sodium: 1 },
  },
  {
    name: 'Whole Milk',
    per100g: { calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, fiber: 0, sugar: 5.1, sodium: 43 },
  },
];

export default function FoodSearch({ onSelect }) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query) return FOOD_DATA.slice(0, 5);
    const q = query.toLowerCase();
    return FOOD_DATA.filter((f) => f.name.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-neutral-700 mb-2">Search food</label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-neutral-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Banana, Chicken Breast"
          className="w-full pl-10 pr-3 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm"
        />
      </div>

      <ul className="mt-3 divide-y divide-neutral-100 rounded-xl border border-neutral-200 overflow-hidden">
        {results.map((item) => (
          <li
            key={item.name}
            className="flex items-center justify-between p-3 bg-white hover:bg-neutral-50 cursor-pointer"
            onClick={() => onSelect(item)}
          >
            <div>
              <p className="font-medium text-sm">{item.name}</p>
              <p className="text-xs text-neutral-500">{item.per100g.calories} kcal per 100g</p>
            </div>
            <button className="text-emerald-600 text-sm font-semibold">Select</button>
          </li>
        ))}
        {results.length === 0 && (
          <li className="p-4 text-center text-sm text-neutral-500 bg-white">No matches found</li>
        )}
      </ul>
    </div>
  );
}
