-- Add weight_lbs column to workout_logs table
ALTER TABLE public.workout_logs
ADD COLUMN weight_lbs numeric;