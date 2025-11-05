import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { CalendarDays } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const RestDayCalendar = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch rest days
  const { data: restDays } = useQuery({
    queryKey: ['rest-days'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('rest_days')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data.map(rd => new Date(rd.rest_date));
    },
  });

  const toggleRestDay = useMutation({
    mutationFn: async (date: Date) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const dateStr = date.toISOString().split('T')[0];
      
      // Check if date exists
      const { data: existing } = await supabase
        .from('rest_days')
        .select('*')
        .eq('user_id', user.id)
        .eq('rest_date', dateStr)
        .single();

      if (existing) {
        // Delete rest day
        const { error } = await supabase
          .from('rest_days')
          .delete()
          .eq('id', existing.id);
        if (error) throw error;
      } else {
        // Add rest day
        const { error } = await supabase
          .from('rest_days')
          .insert({ user_id: user.id, rest_date: dateStr });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rest-days'] });
      toast({
        title: 'Rest day updated',
        description: 'Your rest day calendar has been updated.',
      });
    },
  });

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold">Rest Days</h3>
      </div>
      <div className="flex justify-center">
        <Calendar
          mode="multiple"
          selected={restDays || []}
          onSelect={(dates) => {
            if (dates && dates.length > 0) {
              const lastDate = dates[dates.length - 1];
              toggleRestDay.mutate(lastDate);
            }
          }}
          className="rounded-md border border-border"
        />
      </div>
      <p className="text-xs text-muted-foreground mt-3 text-center">
        Click dates to mark/unmark rest days
      </p>
    </div>
  );
};
