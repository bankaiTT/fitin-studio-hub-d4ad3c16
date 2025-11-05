import { Progress } from '@/components/ui/progress';
import { Beef, Wheat, Droplet } from 'lucide-react';

interface MacronutrientsProps {
  selectedMeal?: string | null;
}

export const Macronutrients = ({ selectedMeal }: MacronutrientsProps) => {
  // Meal-specific macros
  const mealMacros: Record<string, { protein: number; carbs: number; fats: number }> = {
    breakfast: { protein: 25, carbs: 45, fats: 15 },
    lunch: { protein: 35, carbs: 50, fats: 18 },
    dinner: { protein: 30, carbs: 35, fats: 12 },
    snacks: { protein: 10, carbs: 20, fats: 8 },
  };

  // Overall macros (sum of all meals)
  const overallMacros = {
    protein: 100,
    carbs: 150,
    fats: 53,
  };

  // Choose macros based on selection
  const displayMacros = selectedMeal && mealMacros[selectedMeal] 
    ? mealMacros[selectedMeal] 
    : overallMacros;

  const title = selectedMeal 
    ? `${selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)} Macros`
    : 'Overall Macronutrients';

  const macros = [
    { label: 'Protein', current: displayMacros.protein, target: selectedMeal ? 40 : 120, icon: Beef, color: 'text-blue-500', progressColor: 'bg-blue-500' },
    { label: 'Carbs', current: displayMacros.carbs, target: selectedMeal ? 60 : 200, icon: Wheat, color: 'text-green-500', progressColor: 'bg-green-500' },
    { label: 'Fats', current: displayMacros.fats, target: selectedMeal ? 25 : 70, icon: Droplet, color: 'text-yellow-500', progressColor: 'bg-yellow-500' },
  ];

  return (
    <div className="glass-card p-6 rounded-2xl">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="space-y-4">
        {macros.map((macro) => {
          const percentage = (macro.current / macro.target) * 100;
          return (
            <div key={macro.label}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <macro.icon className={`w-4 h-4 ${macro.color}`} />
                  <span className="font-semibold">{macro.label}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {macro.current}g / {macro.target}g
                </span>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
