import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, TrendingUp, Utensils, Activity } from 'lucide-react';
import gymBackground from '@/assets/gymbackgroundprem.jpg';
import logo from '@/assets/fitin-final-logo.jpg';

interface MealData {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const Premium = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'welcome' | 'details' | 'dashboard'>('welcome');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [goal, setGoal] = useState('muscle-gain');
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  // Redirect to the correct premium tracker
  useEffect(() => {
    navigate('/premium-nutrition-tracker', { replace: true });
  }, [navigate]);

  // Sample meal data
  const meals: MealData[] = [
    { name: 'Breakfast', calories: 520, protein: 35, carbs: 45, fats: 18 },
    { name: 'Lunch', calories: 680, protein: 45, carbs: 60, fats: 22 },
    { name: 'Snack', calories: 250, protein: 15, carbs: 30, fats: 8 },
    { name: 'Dinner', calories: 620, protein: 42, carbs: 55, fats: 20 },
  ];

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFats = meals.reduce((sum, meal) => sum + meal.fats, 0);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (height && weight && age) {
      setStep('dashboard');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen relative flex items-center justify-center"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${gymBackground})` }}
            >
              <div className="absolute inset-0 bg-black/70" />
            </div>
            
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative z-10 text-center px-4"
            >
              <img src={logo} alt="FitIn Premium" className="h-20 w-auto mx-auto mb-8" />
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
                Welcome to <span className="text-gradient">Premium</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
                Your personalized fitness journey starts here. Track nutrition, monitor progress, and achieve your goals.
              </p>
              <Button
                size="lg"
                onClick={() => setStep('details')}
                className="text-lg px-8 py-6 bg-primary hover:shadow-lavender-glow"
              >
                Get Started <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        )}

        {step === 'details' && (
          <motion.div
            key="details"
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

              <form onSubmit={handleDetailsSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    placeholder="175"
                    required
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

                <Button type="submit" className="w-full">
                  Continue to Dashboard <ArrowRight className="ml-2" />
                </Button>
              </form>
            </Card>
          </motion.div>
        )}

        {step === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="min-h-screen bg-gradient-dark"
          >
            {/* Header */}
            <div className="border-b border-border/50 bg-background/50 backdrop-blur-md">
              <div className="container mx-auto px-4 py-4">
                <img src={logo} alt="FitIn" className="h-12 w-auto" />
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="container mx-auto px-4 py-12">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl font-bold mb-2">
                  Your <span className="text-gradient">Progress Report</span>
                </h1>
                <p className="text-muted-foreground mb-8">Track your daily nutrition and reach your goals</p>

                {/* Stats Overview */}
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                  <Card className="glass-card p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Utensils className="w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Total Calories</span>
                    </div>
                    <p className="text-3xl font-bold text-gradient">{totalCalories}</p>
                    <p className="text-xs text-muted-foreground mt-1">kcal/day</p>
                  </Card>

                  <Card className="glass-card p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">Protein</span>
                    </div>
                    <p className="text-3xl font-bold">{totalProtein}g</p>
                    <p className="text-xs text-muted-foreground mt-1">per day</p>
                  </Card>

                  <Card className="glass-card p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Activity className="w-5 h-5 text-blue-500" />
                      <span className="text-sm text-muted-foreground">Carbs</span>
                    </div>
                    <p className="text-3xl font-bold">{totalCarbs}g</p>
                    <p className="text-xs text-muted-foreground mt-1">per day</p>
                  </Card>

                  <Card className="glass-card p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Activity className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm text-muted-foreground">Fats</span>
                    </div>
                    <p className="text-3xl font-bold">{totalFats}g</p>
                    <p className="text-xs text-muted-foreground mt-1">per day</p>
                  </Card>
                </div>

                {/* Meals Section */}
                <Card className="glass-card p-8 rounded-2xl">
                  <h2 className="text-2xl font-bold mb-6">Daily Nutrition Tracker</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {meals.map((meal) => (
                      <motion.div
                        key={meal.name}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedMeal(selectedMeal === meal.name ? null : meal.name)}
                        className="bg-background/50 border border-border/50 rounded-xl p-6 cursor-pointer hover:border-primary/50 transition-all"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-semibold">{meal.name}</h3>
                          <span className="text-2xl font-bold text-primary">{meal.calories}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">kcal</p>

                        <AnimatePresence>
                          {selectedMeal === meal.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="border-t border-border/30 pt-4 space-y-2"
                            >
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Protein</span>
                                <span className="font-semibold">{meal.protein}g</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Carbs</span>
                                <span className="font-semibold">{meal.carbs}g</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Fats</span>
                                <span className="font-semibold">{meal.fats}g</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                    <p className="text-sm text-muted-foreground mb-2">Daily Total</p>
                    <p className="text-4xl font-bold text-gradient">{totalCalories} kcal</p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Premium;
