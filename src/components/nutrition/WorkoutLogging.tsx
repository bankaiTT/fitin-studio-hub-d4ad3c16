import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dumbbell, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const WorkoutLogging = () => {
  const [workoutType, setWorkoutType] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const logWorkout = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('workout_logs')
        .insert({
          user_id: user.id,
          workout_type: workoutType,
          sets: parseInt(sets),
          reps: parseInt(reps),
          weight_lbs: weight ? parseFloat(weight) : null,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workout-logs'] });
      toast({
        title: 'Workout logged!',
        description: 'Your workout has been successfully recorded.',
      });
      setWorkoutType('');
      setSets('');
      setReps('');
      setWeight('');
    },
  });

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Dumbbell className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold">Workout Logging</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="workout-type">Exercise Type</Label>
          <Select value={workoutType} onValueChange={setWorkoutType}>
            <SelectTrigger id="workout-type" className="glass-card border-border">
              <SelectValue placeholder="Select exercise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bench-press">Bench Press</SelectItem>
              <SelectItem value="squat">Squat</SelectItem>
              <SelectItem value="deadlift">Deadlift</SelectItem>
              <SelectItem value="overhead-press">Overhead Press</SelectItem>
              <SelectItem value="barbell-row">Barbell Row</SelectItem>
              <SelectItem value="pull-ups">Pull-ups</SelectItem>
              <SelectItem value="dips">Dips</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="sets">Sets</Label>
            <Input
              id="sets"
              type="number"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              placeholder="3"
              className="glass-card border-border"
            />
          </div>
          <div>
            <Label htmlFor="reps">Reps</Label>
            <Input
              id="reps"
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              placeholder="10"
              className="glass-card border-border"
            />
          </div>
          <div>
            <Label htmlFor="weight">Weight (lbs)</Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="135"
              className="glass-card border-border"
            />
          </div>
        </div>

        <Button
          onClick={() => logWorkout.mutate()}
          disabled={!workoutType || !sets || !reps || logWorkout.isPending}
          className="w-full bg-primary text-primary-foreground hover:shadow-lavender-glow"
        >
          <Plus className="w-4 h-4 mr-2" />
          Log Workout
        </Button>
      </div>
    </Card>
  );
};
