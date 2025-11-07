import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, LogOut, Camera, ArrowRight } from 'lucide-react';
import logo from '@/assets/fitin-final-logo.jpg';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { calculateCalories } from '@/lib/calorieCalculator';

const PremiumNutritionTracker = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch user details
  const { data: userDetails, isLoading: detailsLoading } = useQuery({
    queryKey: ['user-details'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('user_details')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch user plan
  const { data: userPlan } = useQuery({
    queryKey: ['user-plan'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      
      const { data } = await supabase
        .from('user_plans')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      return data;
    },
  });

  const isPaidPlan = userPlan?.plan_type === 'paid';

  // Redirect to premium details if user hasn't filled details
  useEffect(() => {
    if (!detailsLoading && !userDetails) {
      navigate('/premium-details');
    }
  }, [userDetails, detailsLoading, navigate]);

  // Redirect to free tracker if user doesn't have paid plan
  useEffect(() => {
    if (userPlan && !isPaidPlan) {
      navigate('/nutrition-tracker');
    }
  }, [userPlan, isPaidPlan, navigate]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  // Save user goal mutation
  const saveGoalMutation = useMutation({
    mutationFn: async (goalData: { goal_type: 'cut' | 'bulk' | 'maintain'; calories: any }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('user_goals')
        .upsert({
          user_id: user.id,
          goal_type: goalData.goal_type,
          maintenance_calories: goalData.calories.maintenance_calories,
          target_calories: goalData.calories.calories,
          protein_grams: goalData.calories.protein,
          carbs_grams: goalData.calories.carbs,
          fat_grams: goalData.calories.fat,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-goals'] });
    },
  });
  
  const selectGoal = async (goal: 'maintain' | 'cut' | 'bulk') => {
    if (!userDetails) return;

    // Calculate calories based on user details
    const calorieResults = calculateCalories({
      height: Number(userDetails.height),
      weight: Number(userDetails.weight),
      age: userDetails.age,
      gender: userDetails.gender as 'male' | 'female',
      activity_level: userDetails.activity_level as any,
    });

    let targetCalories = calorieResults.maintenance_calories;
    let protein = calorieResults.protein_grams;
    let carbs = calorieResults.carbs_grams;
    let fat = calorieResults.fat_grams;

    if (goal === 'cut') {
      targetCalories = calorieResults.cut_calories;
      protein = Math.round((targetCalories * 0.3) / 4);
      carbs = Math.round((targetCalories * 0.45) / 4);
      fat = Math.round((targetCalories * 0.25) / 9);
    } else if (goal === 'bulk') {
      targetCalories = calorieResults.bulk_calories;
      protein = Math.round((targetCalories * 0.3) / 4);
      carbs = Math.round((targetCalories * 0.45) / 4);
      fat = Math.round((targetCalories * 0.25) / 9);
    }

    // Save goal to database
    await saveGoalMutation.mutateAsync({
      goal_type: goal,
      calories: {
        maintenance_calories: calorieResults.maintenance_calories,
        calories: targetCalories,
        protein,
        carbs,
        fat,
      },
    });

    toast.success(`${goal.charAt(0).toUpperCase() + goal.slice(1)} plan selected! Target: ${targetCalories} kcal/day`);

    // Navigate to appropriate page
    if (goal === 'cut') {
      navigate('/cut-diet-logs');
    } else if (goal === 'bulk') {
      navigate('/bulk-diet-logs');
    } else {
      navigate('/maintenance-diet-logs');
    }
  };

  // Calculate calories dynamically
  const maintenanceCalories = userDetails 
    ? calculateCalories({
        height: Number(userDetails.height),
        weight: Number(userDetails.weight),
        age: userDetails.age,
        gender: userDetails.gender as 'male' | 'female',
        activity_level: userDetails.activity_level as any,
      }).maintenance_calories
    : 2100;

  if (detailsLoading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4 py-12">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 border-b border-border/50 bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/premium')}
                className="text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <img src={logo} alt="FitIn" className="h-10 w-auto" />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => navigate('/progress-gallery')}
                className="border-primary/50 hover:bg-primary/10"
              >
                <Camera className="w-4 h-4 mr-2" />
                Progress Gallery
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-primary"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl mt-20"
      >
        <div className="text-center mb-12">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Choose Your <span className="text-gradient">Goal</span>
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg"
          >
            Select your fitness goal to get a personalized meal plan
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => selectGoal('cut')}
            className="cursor-pointer group"
          >
            <Card className="glass-card p-8 rounded-2xl hover:border-primary/50 border-2 border-transparent transition-all h-full">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                  <span className="text-4xl">🔥</span>
                </div>
                <h3 className="text-3xl font-bold mb-3">Cut</h3>
                <p className="text-muted-foreground mb-4 text-lg">Lose fat, get lean</p>
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
                  <p className="text-2xl font-bold text-red-400">{Math.round(maintenanceCalories * 0.8)} kcal</p>
                  <p className="text-sm text-muted-foreground">20% deficit</p>
                </div>
                <Button className="w-full bg-red-500 hover:bg-red-600">
                  Start Cutting
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => selectGoal('maintain')}
            className="cursor-pointer group"
          >
            <Card className="glass-card p-8 rounded-2xl hover:border-primary/50 border-2 border-transparent transition-all h-full">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                  <span className="text-4xl">⚖️</span>
                </div>
                <h3 className="text-3xl font-bold mb-3">Maintain</h3>
                <p className="text-muted-foreground mb-4 text-lg">Stay at current weight</p>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-4">
                  <p className="text-2xl font-bold text-blue-400">{maintenanceCalories} kcal</p>
                  <p className="text-sm text-muted-foreground">Maintenance</p>
                </div>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  Maintain Weight
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => selectGoal('bulk')}
            className="cursor-pointer group"
          >
            <Card className="glass-card p-8 rounded-2xl hover:border-primary/50 border-2 border-transparent transition-all h-full">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                  <span className="text-4xl">💪</span>
                </div>
                <h3 className="text-3xl font-bold mb-3">Bulk</h3>
                <p className="text-muted-foreground mb-4 text-lg">Build muscle mass</p>
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-4">
                  <p className="text-2xl font-bold text-green-400">{Math.round(maintenanceCalories * 1.15)} kcal</p>
                  <p className="text-sm text-muted-foreground">15% surplus</p>
                </div>
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  Start Bulking
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PremiumNutritionTracker;
