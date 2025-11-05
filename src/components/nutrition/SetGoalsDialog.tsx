import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const SetGoalsDialog = () => {
  const [open, setOpen] = useState(false);
  const [goalType, setGoalType] = useState('');
  const [goalValue, setGoalValue] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createGoal = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('user_goals')
        .insert({
          user_id: user.id,
          goal_type: goalType,
          goal_value: goalValue,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-goals'] });
      toast({
        title: 'Goal set!',
        description: 'Your fitness goal has been created.',
      });
      setOpen(false);
      setGoalType('');
      setGoalValue('');
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:shadow-lavender-glow">
          <Target className="w-4 h-4 mr-2" />
          Set Goals
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl">Set Your Goals</DialogTitle>
          <DialogDescription>
            Define your fitness and nutrition goals
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="goal-type">Goal Type</Label>
            <Select value={goalType} onValueChange={setGoalType}>
              <SelectTrigger id="goal-type" className="glass-card border-border">
                <SelectValue placeholder="Select goal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weight-loss">Weight Loss</SelectItem>
                <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                <SelectItem value="strength">Strength Increase</SelectItem>
                <SelectItem value="endurance">Endurance</SelectItem>
                <SelectItem value="workout-frequency">Workout Frequency</SelectItem>
                <SelectItem value="nutrition">Nutrition Target</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="goal-value">Goal Value</Label>
            <Input
              id="goal-value"
              value={goalValue}
              onChange={(e) => setGoalValue(e.target.value)}
              placeholder="e.g., 10 lbs, 5 workouts/week"
              className="glass-card border-border"
            />
          </div>

          <Button
            onClick={() => createGoal.mutate()}
            disabled={!goalType || !goalValue || createGoal.isPending}
            className="w-full bg-primary text-primary-foreground"
          >
            Create Goal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
