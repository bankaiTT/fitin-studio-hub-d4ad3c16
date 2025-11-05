import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplets, Plus, Minus } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const WaterIntake = () => {
  const [glasses, setGlasses] = useState(0);
  const target = 8;
  const percentage = (glasses / target) * 100;

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Droplets className="w-5 h-5 text-cyan-500" />
        <h3 className="text-xl font-bold">Water Intake</h3>
      </div>

      <div className="text-center mb-4">
        <div className="text-4xl font-bold mb-2">
          <span className="text-cyan-500">{glasses}</span>
          <span className="text-muted-foreground text-2xl"> / {target}</span>
        </div>
        <p className="text-sm text-muted-foreground">glasses today</p>
      </div>

      <Progress value={percentage} className="h-3 mb-4" />

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setGlasses(Math.max(0, glasses - 1))}
          disabled={glasses === 0}
          className="flex-1"
        >
          <Minus className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          onClick={() => setGlasses(Math.min(target, glasses + 1))}
          disabled={glasses >= target}
          className="flex-1"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Glass
        </Button>
      </div>

      {glasses >= target && (
        <p className="text-sm text-center text-green-500 mt-3 font-semibold">
          🎉 Daily goal achieved!
        </p>
      )}
    </Card>
  );
};
