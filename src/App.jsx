import React, { useState } from 'react';
import Header from './components/Header';
import FoodSearch from './components/FoodSearch';
import NutrientSummary from './components/NutrientSummary';
import DailyIntake from './components/DailyIntake';

export default function App() {
  const [selectedFood, setSelectedFood] = useState(null);
  const [servingSize, setServingSize] = useState(100);
  const [intake, setIntake] = useState([]);
  const [goals, setGoals] = useState({
    calories: 2000,
    protein: 75,
    carbs: 275,
    fat: 70,
    fiber: 28,
    sugar: 50,
    sodium: 2300,
  });

  function handleSelect(food) {
    setSelectedFood(food);
    setServingSize(100);
  }

  function handleAddToLog(entry) {
    setIntake((prev) => [entry, ...prev]);
  }

  function handleClear() {
    setIntake([]);
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header />

      <main className="mx-auto max-w-md px-4 pb-24 pt-4">
        <section className="space-y-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
            <h2 className="text-base font-semibold mb-1">Check nutrients fast</h2>
            <p className="text-sm text-neutral-600">Mobile-friendly search with instant macro breakdown.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <FoodSearch onSelect={handleSelect} />
          </div>

          <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <NutrientSummary
              food={selectedFood}
              servingSize={servingSize}
              setServingSize={setServingSize}
              onAddToLog={handleAddToLog}
            />
          </div>

          <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <DailyIntake goals={goals} setGoals={setGoals} intake={intake} onClear={handleClear} />
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur border-t border-neutral-200">
        <div className="mx-auto max-w-md px-6 py-3 flex items-center justify-between text-sm text-neutral-600">
          <span>Made for mobile · Nutrient Checker</span>
          <a className="text-emerald-600 font-medium" href="#top">Top</a>
        </div>
      </nav>
    </div>
  );
}
