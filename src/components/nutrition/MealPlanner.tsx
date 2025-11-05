import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Plus } from 'lucide-react';

export const MealPlanner = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  return (
    <div className="space-y-6">
      <Card className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold">Weekly Meal Plan</h3>
          </div>
          <Button className="bg-primary text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Add Meal
          </Button>
        </div>

        <div className="space-y-4">
          {days.map((day) => (
            <Card key={day} className="glass-card p-4">
              <h4 className="font-bold mb-3">{day}</h4>
              <div className="grid md:grid-cols-4 gap-3">
                {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((meal) => (
                  <div key={meal} className="glass-card p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">{meal}</p>
                    <p className="text-sm font-semibold">Not planned</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};
