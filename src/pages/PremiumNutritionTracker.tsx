import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coffee, Sun, Moon, Apple as AppleIcon, Droplets, LogOut, ArrowLeft } from 'lucide-react';
import logo from '@/assets/fitin-final-logo.jpg';
import { MealCard } from '@/components/nutrition/MealCard';
import { Macronutrients } from '@/components/nutrition/Macronutrients';
import { RestDayCalendar } from '@/components/nutrition/RestDayCalendar';
import { QuickActions } from '@/components/nutrition/QuickActions';
import { NutritionInsights } from '@/components/nutrition/NutritionInsights';
import { CalorieCalculator } from '@/components/nutrition/CalorieCalculator';
import { SocialMediaGate } from '@/components/nutrition/SocialMediaGate';
import { WaterIntake } from '@/components/nutrition/WaterIntake';
import { BarcodeScanner } from '@/components/nutrition/BarcodeScanner';
import { TrainerSupport } from '@/components/nutrition/TrainerSupport';
import { StrengthProgressionChart } from '@/components/nutrition/StrengthProgressionChart';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const PremiumNutritionTracker = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('today');
  const [selectedMealType, setSelectedMealType] = useState<string | null>(null);
  const [step, setStep] = useState<'calculator' | 'social' | 'tracker'>('calculator');
  const [maintenanceCalories, setMaintenanceCalories] = useState(2000);
  const [goal, setGoal] = useState<'maintain' | 'cut' | 'bulk'>('maintain');

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

  // Redirect to free tracker if user doesn't have paid plan
  useEffect(() => {
    if (userPlan && !isPaidPlan) {
      navigate('/nutrition-tracker');
    }
  }, [userPlan, isPaidPlan, navigate]);

  const handleCaloriesCalculated = (calories: number, selectedGoal: 'maintain' | 'cut' | 'bulk') => {
    let targetCalories = calories;
    
    if (selectedGoal === 'cut') {
      targetCalories = Math.round(calories * 0.8); // 20% deficit
    } else if (selectedGoal === 'bulk') {
      targetCalories = Math.round(calories * 1.15); // 15% surplus
    }
    
    setMaintenanceCalories(targetCalories);
    setGoal(selectedGoal);
    setStep('social');
  };

  const handleSocialComplete = () => {
    setStep('tracker');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const meals = [
    { type: 'breakfast', label: 'Breakfast', calories: 350, icon: Coffee, color: 'bg-orange-500' },
    { type: 'lunch', label: 'Lunch', calories: 420, icon: Sun, color: 'bg-yellow-500' },
    { type: 'dinner', label: 'Dinner', calories: 312, icon: Moon, color: 'bg-purple-500' },
    { type: 'snacks', label: 'Snacks', calories: 174, icon: AppleIcon, color: 'bg-green-500' },
  ];

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  // Show calculator step
  if (step === 'calculator') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12">
        <div className="container mx-auto px-4">
          <CalorieCalculator onCalculated={handleCaloriesCalculated} />
        </div>
      </div>
    );
  }

  // Show social media gate
  if (step === 'social') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12">
        <div className="container mx-auto px-4">
          <SocialMediaGate onComplete={handleSocialComplete} />
        </div>
      </div>
    );
  }

  // Show main tracker
  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <img src={logo} alt="FitIn" className="h-12 w-auto" />
            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="text-muted-foreground hover:text-primary gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-primary gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-gradient">Premium Nutrition Tracker</span>
              </h1>
              <p className="text-muted-foreground">
                Your goal: <span className="font-semibold text-primary capitalize">{goal}</span> • Target: {maintenanceCalories} kcal/day
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                ✨ Meal plans and calendar managed by certified trainers
              </p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="glass-card p-1 mb-8">
              <TabsTrigger value="today" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Today
              </TabsTrigger>
              <TabsTrigger value="insights" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Insights
              </TabsTrigger>
            </TabsList>

            {/* Today Tab */}
            <TabsContent value="today" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column - Meals */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Meal Cards */}
                  <div className="glass-card p-6 rounded-2xl">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {meals.map((meal) => (
                        <MealCard
                          key={meal.type}
                          type={meal.type}
                          label={meal.label}
                          calories={meal.calories}
                          icon={meal.icon}
                          color={meal.color}
                          onClick={() => setSelectedMealType(meal.type)}
                          isSelected={selectedMealType === meal.type}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Water Intake & Barcode Scanner */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <WaterIntake />
                    <BarcodeScanner />
                  </div>

                  {/* Quick Actions */}
                  <QuickActions />

                  {/* Strength Progression Chart */}
                  <StrengthProgressionChart />
                </div>

                {/* Right Column - Stats */}
                <div className="space-y-6">
                  {/* Macronutrients */}
                  <Macronutrients selectedMeal={selectedMealType} />

                  {/* Trainer Support */}
                  <TrainerSupport />

                  {/* Rest Day Calendar */}
                  <RestDayCalendar />
                </div>
              </div>
            </TabsContent>

            {/* Insights Tab */}
            <TabsContent value="insights">
              <NutritionInsights />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumNutritionTracker;
