import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

export const StrengthProgressionChart = () => {
  const { data: workoutLogs } = useQuery({
    queryKey: ['workout-logs'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('workout_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('workout_date', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  // Process workout logs into chart data
  const processChartData = () => {
    if (!workoutLogs || workoutLogs.length === 0) {
      return [
        { date: 'No data', 'bench-press': 0, squat: 0, deadlift: 0 },
      ];
    }

    // Group by date and workout type
    const groupedData: Record<string, Record<string, number>> = {};
    
    workoutLogs.forEach(log => {
      const date = format(new Date(log.workout_date), 'MMM dd');
      if (!groupedData[date]) {
        groupedData[date] = {};
      }
      
      // Use the weight if available, otherwise use reps as a metric
      const value = log.weight_lbs || (log.reps || 0);
      groupedData[date][log.workout_type] = value;
    });

    // Convert to array format for recharts
    return Object.entries(groupedData).map(([date, exercises]) => ({
      date,
      ...exercises,
    }));
  };

  const data = processChartData();

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold">Progress Report</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="bench-press" 
            stroke="hsl(265 100% 83%)" 
            strokeWidth={2}
            name="Bench Press"
            connectNulls
          />
          <Line 
            type="monotone" 
            dataKey="squat" 
            stroke="#10b981" 
            strokeWidth={2}
            name="Squat"
            connectNulls
          />
          <Line 
            type="monotone" 
            dataKey="deadlift" 
            stroke="#f59e0b" 
            strokeWidth={2}
            name="Deadlift"
            connectNulls
          />
          <Line 
            type="monotone" 
            dataKey="overhead-press" 
            stroke="#3b82f6" 
            strokeWidth={2}
            name="Overhead Press"
            connectNulls
          />
          <Line 
            type="monotone" 
            dataKey="barbell-row" 
            stroke="#ec4899" 
            strokeWidth={2}
            name="Barbell Row"
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
