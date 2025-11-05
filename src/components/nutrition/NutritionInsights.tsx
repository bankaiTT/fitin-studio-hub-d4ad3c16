import { Card } from '@/components/ui/card';
import { Lightbulb, TrendingUp, Trophy, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const NutritionInsights = () => {
  return (
    <div className="space-y-6">
      {/* Daily Tip */}
      <Card className="glass-card p-6 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Daily Nutrition Tip</h3>
            <p className="text-muted-foreground">
              Aim to include protein in every meal to help maintain muscle mass and keep you feeling full longer. 
              Try to get 20-30g of protein per meal for optimal results.
            </p>
          </div>
        </div>
      </Card>

      {/* This Week Stats */}
      <Card className="glass-card p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">This Week</h3>
          <TrendingUp className="w-5 h-5 text-green-500" />
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">5</div>
            <p className="text-muted-foreground">Days Logged</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">92%</div>
            <p className="text-muted-foreground">Goal Achievement</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
          <Trophy className="w-5 h-5 text-green-500" />
          <p className="text-green-500 font-semibold">Great consistency this week!</p>
        </div>
      </Card>

      {/* Recent Foods */}
      <Card className="glass-card p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Recent Foods</h3>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
            <Clock className="w-4 h-4" />
            View All
          </Button>
        </div>
        
        <div className="space-y-3">
          {[
            { name: 'Grilled Chicken Breast', calories: 165, image: '🍗' },
            { name: 'Greek Yogurt', calories: 59, image: '🥛' },
            { name: 'Banana', calories: 89, image: '🍌' },
            { name: 'Almonds', calories: 579, image: '🥜' },
          ].map((food) => (
            <div
              key={food.name}
              className="flex items-center justify-between p-3 glass-card rounded-lg cursor-pointer hover:shadow-lavender-glow transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                  {food.image}
                </div>
                <div>
                  <h4 className="font-semibold">{food.name}</h4>
                  <p className="text-sm text-muted-foreground">{food.calories} cal per serving</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-2xl">
                +
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
