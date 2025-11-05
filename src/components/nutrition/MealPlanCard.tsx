import { Card } from '@/components/ui/card';

interface MealPlanCardProps {
  isPaidPlan?: boolean;
}

export const MealPlanCard = ({ isPaidPlan = true }: MealPlanCardProps) => {
  return (
    <div className="glass-card p-8 rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-primary">5 Meal Daily Plan</h2>
      <div className="space-y-4">
        <Card className="glass-card p-6 rounded-lg">
          <h4 className="font-medium mb-2 text-lg">Meal 1: Breakfast (7:00 AM)</h4>
          <p className="text-muted-foreground">Oats with protein powder, banana, and almonds</p>
          {isPaidPlan && <p className="text-sm text-primary mt-1">~450 calories</p>}
        </Card>
        
        <Card className="glass-card p-6 rounded-lg">
          <h4 className="font-medium mb-2 text-lg">Meal 2: Mid-Morning (10:00 AM)</h4>
          <p className="text-muted-foreground">Greek yogurt with berries and honey</p>
          {isPaidPlan && <p className="text-sm text-primary mt-1">~300 calories</p>}
        </Card>
        
        <Card className="glass-card p-6 rounded-lg">
          <h4 className="font-medium mb-2 text-lg">Meal 3: Lunch (1:00 PM)</h4>
          <p className="text-muted-foreground">Grilled chicken, brown rice, and vegetables</p>
          {isPaidPlan && <p className="text-sm text-primary mt-1">~600 calories</p>}
        </Card>
        
        <Card className="glass-card p-6 rounded-lg">
          <h4 className="font-medium mb-2 text-lg">Meal 4: Pre-Workout (4:00 PM)</h4>
          <p className="text-muted-foreground">Banana with peanut butter and protein shake</p>
          {isPaidPlan && <p className="text-sm text-primary mt-1">~400 calories</p>}
        </Card>
        
        <Card className="glass-card p-6 rounded-lg">
          <h4 className="font-medium mb-2 text-lg">Meal 5: Dinner (7:30 PM)</h4>
          <p className="text-muted-foreground">Salmon, sweet potato, and green salad</p>
          {isPaidPlan && <p className="text-sm text-primary mt-1">~550 calories</p>}
        </Card>
      </div>
    </div>
  );
};
