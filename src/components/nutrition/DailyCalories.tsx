import { Progress } from '@/components/ui/progress';
import { Flame } from 'lucide-react';

interface DailyCaloriesProps {
  consumed: number;
  target: number;
}

export const DailyCalories = ({ consumed, target }: DailyCaloriesProps) => {
  const remaining = target - consumed;
  const percentage = (consumed / target) * 100;

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold">Daily Calories</h3>
      </div>
      <div className="text-center mb-4">
        <div className="text-4xl font-bold mb-1">
          <span className="text-gradient">{consumed}</span>
          <span className="text-muted-foreground text-2xl"> / {target}</span>
        </div>
      </div>
      <Progress value={percentage} className="h-3 mb-2" />
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Consumed</span>
        <span className="text-green-500 font-semibold">{remaining} remaining</span>
      </div>
    </div>
  );
};
