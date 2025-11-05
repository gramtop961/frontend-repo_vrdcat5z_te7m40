import React from 'react';
import { Apple, Flame, Target } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-neutral-200">
      <div className="mx-auto max-w-md px-4 py-3 flex items-center gap-3">
        <div className="size-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white grid place-items-center shadow-sm">
          <Apple className="size-6" />
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-semibold tracking-tight">Nutrient Checker</h1>
          <p className="text-xs text-neutral-500 leading-tight">
            Search foods, check macros, and track your daily goals.
          </p>
        </div>
        <div className="flex items-center gap-2 text-emerald-600">
          <Flame className="size-5" />
          <Target className="size-5" />
        </div>
      </div>
    </header>
  );
}
