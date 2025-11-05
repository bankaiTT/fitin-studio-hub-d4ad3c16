-- Add DELETE policy for user_plans table
CREATE POLICY "Users can delete their own plan"
ON public.user_plans
FOR DELETE
USING (auth.uid() = user_id);