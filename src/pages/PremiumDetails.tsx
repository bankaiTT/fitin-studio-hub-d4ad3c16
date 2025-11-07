import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import logo from '@/assets/fitin-final-logo.jpg';

const detailsSchema = z.object({
  height: z.number().min(100, 'Height must be at least 100 cm').max(250, 'Height must be less than 250 cm'),
  weight: z.number().min(30, 'Weight must be at least 30 kg').max(300, 'Weight must be less than 300 kg'),
  age: z.number().min(13, 'Age must be at least 13').max(100, 'Age must be less than 100'),
  goal: z.enum(['muscle-gain', 'fat-loss', 'maintenance']),
});

const PremiumDetails = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [goal, setGoal] = useState('muscle-gain');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = {
        height: parseFloat(height),
        weight: parseFloat(weight),
        age: parseInt(age),
        goal,
      };

      const validatedData = detailsSchema.parse(data);

      // Store in localStorage for now
      localStorage.setItem('premium_onboarding', JSON.stringify(validatedData));

      toast.success('Details saved successfully!');
      navigate('/premium');
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error('Failed to save details. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen bg-gradient-dark flex items-center justify-center px-4 py-12"
    >
      <Card className="glass-card p-8 rounded-2xl w-full max-w-md">
        <img src={logo} alt="FitIn" className="h-12 w-auto mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-2 text-center">Personal Details</h2>
        <p className="text-muted-foreground text-center mb-8">
          Help us personalize your experience
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none"
              placeholder="175"
              required
              min="100"
              max="250"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none"
              placeholder="70"
              required
              min="30"
              max="300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none"
              placeholder="25"
              required
              min="13"
              max="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Fitness Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none"
            >
              <option value="muscle-gain">Muscle Gain</option>
              <option value="fat-loss">Fat Loss</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Continue to Dashboard'} <ArrowRight className="ml-2" />
          </Button>
        </form>
      </Card>
    </motion.div>
  );
};

export default PremiumDetails;
