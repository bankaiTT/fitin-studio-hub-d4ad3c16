-- Add diet_preference column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS diet_preference text;