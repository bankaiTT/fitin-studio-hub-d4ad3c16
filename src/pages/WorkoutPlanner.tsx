import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Dumbbell, Heart, Zap, Target, Plus, Home, Calculator, TrendingUp, TrendingDown, Lock, User, ClipboardList, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import logo from '@/assets/fitin-final-logo.jpg';
import benchPressVid1 from '@/assets/benchpressvid1.mp4';
import benchPressVid2 from '@/assets/benchpressvid2.mp4';
import pushUpVid1 from '@/assets/pushupvid1.mp4';
import pushUpVid2 from '@/assets/pushupvid2.mp4';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface WorkoutLog {
  id: string;
  workout_type: string;
  sets: number;
  reps: number;
  rest_time_seconds: number;
  total_workout_time_minutes: number;
  workout_date: string;
  notes: string;
}

const WorkoutPlanner = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCalorieCalculator, setShowCalorieCalculator] = useState(false);
  const [showWorkoutLogger, setShowWorkoutLogger] = useState(false);
  const [userPlan, setUserPlan] = useState<'free' | 'paid'>('free');
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [showPersonalizedModal, setShowPersonalizedModal] = useState(false);
  
  // Calorie Calculator States
  const [calcAge, setCalcAge] = useState('');
  const [calcHeight, setCalcHeight] = useState('');
  const [calcWeight, setCalcWeight] = useState('');
  const [calcGender, setCalcGender] = useState('male');
  const [calcActivityLevel, setCalcActivityLevel] = useState('sedentary');
  const [calculatedCalories, setCalculatedCalories] = useState<number | null>(null);
  
  // Workout Logger States
  const [logSets, setLogSets] = useState('');
  const [logReps, setLogReps] = useState('');
  const [logRestTime, setLogRestTime] = useState('');
  const [logTotalTime, setLogTotalTime] = useState('');
  const [logNotes, setLogNotes] = useState('');
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const premiumPlan = {
    id: 'personalized', 
    name: 'Personalized Custom Workout Plan', 
    icon: User, 
    description: 'Get a fully customized plan from our lead trainer', 
    isPaid: true, 
    isPersonalized: true 
  };

  const workoutCategories = [
    { id: 'strength-training', name: 'Strength Training', icon: Dumbbell, description: '5 meals per day for muscle building', meals: 5, isPaid: false },
    { id: 'power-lifting', name: 'Power Lifting', icon: Zap, description: '5 meals per day for strength gains', meals: 5, isPaid: false },
    { id: 'skinny-to-muscular', name: 'Skinny to Muscular', icon: TrendingUp, description: '5 meals per day for mass gain', meals: 5, isPaid: false },
    { id: 'fat-to-muscular', name: 'Fat to Muscular', icon: Target, description: '5 meals per day for body transformation', meals: 5, isPaid: false },
    { id: 'maintain-calorie', name: 'Maintain Calorie Workout', icon: Heart, description: 'Balanced meal plan for maintenance', meals: 5, isPaid: false },
    { id: 'home-workout', name: 'Home Workout', icon: Home, description: 'No equipment needed workouts', meals: 5, isPaid: false },
    { id: 'custom', name: 'Personal Customize Workout', icon: Plus, description: 'Create your own personalized routine', meals: 5, isPaid: false },
    { id: 'cardio', name: 'Cardio Training', icon: Heart, description: 'Improve cardiovascular endurance', meals: 5, isPaid: false },
  ];

  useEffect(() => {
    fetchUserData();
    fetchWorkoutLogs();
  }, []);

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Fetch user profile
    const { data: profile } = await (supabase as any)
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    setUserProfile(profile);

    // Fetch user plan
    const { data: plan } = await (supabase as any)
      .from('user_plans')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (plan) {
      setUserPlan((plan as any).plan_type as 'free' | 'paid');
    } else {
      // Create default free plan
      await (supabase as any)
        .from('user_plans')
        .insert({ user_id: user.id, plan_type: 'free' });
    }
  };

  const fetchWorkoutLogs = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await (supabase as any)
      .from('workout_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('workout_date', { ascending: false })
      .limit(30);

    if (error) {
      console.error('Error fetching workout logs:', error);
    } else {
      setWorkoutLogs(data || []);
    }
  };

  const calculateCalories = () => {
    const age = parseInt(calcAge);
    const height = parseFloat(calcHeight);
    const weight = parseFloat(calcWeight);

    if (!age || !height || !weight) {
      toast.error('Please fill in all fields');
      return;
    }

    // Mifflin-St Jeor Equation
    let bmr;
    if (calcGender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Activity level multiplier
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };

    const tdee = bmr * activityMultipliers[calcActivityLevel];
    setCalculatedCalories(Math.round(tdee));
  };

  const saveWorkoutLog = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error('Please log in to save workout logs');
      return;
    }

    if (!selectedCategory || !logSets || !logReps) {
      toast.error('Please fill in required fields');
      return;
    }

    const { error } = await (supabase as any)
      .from('workout_logs')
      .insert({
        user_id: user.id,
        workout_type: selectedCategory,
        sets: parseInt(logSets),
        reps: parseInt(logReps),
        rest_time_seconds: parseInt(logRestTime) || 0,
        total_workout_time_minutes: parseInt(logTotalTime) || 0,
        notes: logNotes,
      });

    if (error) {
      toast.error('Failed to save workout log');
      console.error(error);
    } else {
      toast.success('Workout logged successfully!');
      setLogSets('');
      setLogReps('');
      setLogRestTime('');
      setLogTotalTime('');
      setLogNotes('');
      setShowWorkoutLogger(false);
      fetchWorkoutLogs();
    }
  };

  const getChartData = () => {
    const groupedByDate = workoutLogs.reduce((acc, log) => {
      const date = new Date(log.workout_date).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { date, totalSets: 0, totalReps: 0, count: 0 };
      }
      acc[date].totalSets += log.sets || 0;
      acc[date].totalReps += log.reps || 0;
      acc[date].count += 1;
      return acc;
    }, {} as Record<string, { date: string; totalSets: number; totalReps: number; count: number }>);

    return Object.values(groupedByDate).reverse().slice(0, 10);
  };

  const handleWorkoutLoggerClick = () => {
    if (userPlan === 'free') {
      setShowPremiumModal(true);
    } else {
      setShowWorkoutLogger(!showWorkoutLogger);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Premium Required Modal */}
      <Dialog open={showPremiumModal} onOpenChange={setShowPremiumModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Lock className="w-6 h-6 text-primary" />
              Premium Feature
            </DialogTitle>
            <DialogDescription className="text-base mt-4">
              The Workout Logger is a premium feature. Upgrade to track your workouts, monitor progress, and achieve your fitness goals faster!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="glass-card p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Premium Benefits:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-primary" />
                  Track all your workouts with detailed logs
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Visualize your progress with interactive charts
                </li>
                <li className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  Set and achieve your fitness goals
                </li>
                <li className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-primary" />
                  Access advanced calorie calculations
                </li>
              </ul>
            </div>
            <Button 
              onClick={() => {
                setShowPremiumModal(false);
                navigate('/premium-nutrition-tracker');
              }} 
              className="w-full"
            >
              Upgrade to Premium
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Personalized Plan Modal */}
      <Dialog open={showPersonalizedModal} onOpenChange={setShowPersonalizedModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">OUR CUSTOMIZE WORKOUT PLAN</DialogTitle>
            <DialogDescription className="text-base mt-4">
              Get the ultimate fitness experience with our premium personalized training program
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex items-start gap-3">
              <User className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1 text-base">CONVERSATION WITH PROFESSIONAL TRAINER</h3>
                <p className="text-sm text-muted-foreground">Everything will be discussed with your personal trainer to understand your goals and current fitness level</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ClipboardList className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1 text-base">CUSTOMIZE WORKOUT AND DIET PLAN ACCORDING TO YOUR GOALS</h3>
                <p className="text-sm text-muted-foreground">Our lead trainer will personally write your diet plans and workout routines based on your current physique and specific goals</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1 text-base">REGULAR TRAINING AND 24x7 HELP WITH OUR TRAINER</h3>
                <p className="text-sm text-muted-foreground">Receive continuous support and guidance with rest days strategically marked to optimize your recovery and results</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/premium-nutrition-tracker')} 
              className="w-full"
            >
              Get Premium Plan
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div className="border-b border-border/50 bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <img src={logo} alt="FitIn" className="h-10 w-auto" />
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-primary"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                <span className="text-gradient">Workout Planner</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Schedule your workouts and track your progress
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setShowCalorieCalculator(!showCalorieCalculator)}
                className="flex items-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calorie Calculator
              </Button>
              <Button
                variant="outline"
                onClick={handleWorkoutLoggerClick}
                className="flex items-center gap-2"
              >
                {userPlan === 'free' && <Lock className="w-5 h-5" />}
                {userPlan === 'paid' && <Plus className="w-5 h-5" />}
                Log Workout
              </Button>
            </div>
          </div>

          {/* Calorie Calculator */}
          {showCalorieCalculator && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 rounded-2xl mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">Calorie Calculator</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Age</label>
                  <input
                    type="number"
                    value={calcAge}
                    onChange={(e) => setCalcAge(e.target.value)}
                    className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                    placeholder="25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Gender</label>
                  <select
                    value={calcGender}
                    onChange={(e) => setCalcGender(e.target.value)}
                    className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Height (cm)</label>
                  <input
                    type="number"
                    value={calcHeight}
                    onChange={(e) => setCalcHeight(e.target.value)}
                    className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                    placeholder="170"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={calcWeight}
                    onChange={(e) => setCalcWeight(e.target.value)}
                    className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                    placeholder="70"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Activity Level</label>
                  <select
                    value={calcActivityLevel}
                    onChange={(e) => setCalcActivityLevel(e.target.value)}
                    className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                  >
                    <option value="sedentary">Sedentary (little to no exercise)</option>
                    <option value="light">Light (exercise 1-3 days/week)</option>
                    <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                    <option value="active">Active (exercise 6-7 days/week)</option>
                    <option value="veryActive">Very Active (intense exercise daily)</option>
                  </select>
                </div>
              </div>
              <Button onClick={calculateCalories} className="w-full mb-4">
                Calculate Calories
              </Button>
              {calculatedCalories !== null && (
                <div className="glass-card p-6 rounded-lg text-center">
                  <p className="text-muted-foreground mb-2">Your Maintenance Calories</p>
                  <p className="text-4xl font-bold text-primary">{calculatedCalories} cal</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    This is the amount of calories you need to maintain your current weight
                  </p>
                  
                  <div className="mt-6 pt-6 border-t border-border/50">
                    <p className="text-muted-foreground mb-4">Want a customized plan?</p>
                    <div className="flex gap-3">
                      <Button 
                        onClick={() => navigate('/premium-nutrition-tracker')}
                        className="flex-1"
                        variant="outline"
                      >
                        <TrendingDown className="w-4 h-4 mr-2" />
                        Cut
                      </Button>
                      <Button 
                        onClick={() => navigate('/premium-nutrition-tracker')}
                        className="flex-1"
                        variant="outline"
                      >
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Bulk
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Workout Logger */}
          {showWorkoutLogger && userPlan === 'paid' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 rounded-2xl mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">Log Your Workout</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Workout Type</label>
                  <select
                    value={selectedCategory || ''}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                  >
                    <option value="">Select workout type</option>
                    {workoutCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Sets</label>
                    <input
                      type="number"
                      value={logSets}
                      onChange={(e) => setLogSets(e.target.value)}
                      className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                      placeholder="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Reps</label>
                    <input
                      type="number"
                      value={logReps}
                      onChange={(e) => setLogReps(e.target.value)}
                      className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                      placeholder="12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Rest Time (seconds)</label>
                    <input
                      type="number"
                      value={logRestTime}
                      onChange={(e) => setLogRestTime(e.target.value)}
                      className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                      placeholder="60"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Total Workout Time (minutes)</label>
                    <input
                      type="number"
                      value={logTotalTime}
                      onChange={(e) => setLogTotalTime(e.target.value)}
                      className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                      placeholder="45"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Notes</label>
                  <textarea
                    value={logNotes}
                    onChange={(e) => setLogNotes(e.target.value)}
                    placeholder="Add any notes about your workout..."
                    rows={3}
                    className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-2 focus:border-primary focus:outline-none resize-none"
                  />
                </div>
                <Button onClick={saveWorkoutLog} className="w-full">
                  Save Workout Log
                </Button>
              </div>
            </motion.div>
          )}

          {/* Strength Progress Graph */}
          {workoutLogs.length > 0 && userPlan === 'paid' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 rounded-2xl mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">Strength Progress</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Line type="monotone" dataKey="totalSets" stroke="#8b5cf6" name="Total Sets" strokeWidth={2} />
                  <Line type="monotone" dataKey="totalReps" stroke="#06b6d4" name="Total Reps" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {/* Premium Personalized Plan - Featured */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => setShowPersonalizedModal(true)}
            className="glass-card p-8 rounded-2xl cursor-pointer transition-all duration-300 relative hover:shadow-lavender-glow border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-500/10 to-primary/10 mb-8"
          >
            <div className="absolute top-4 right-4">
              <span className="text-xs bg-yellow-500 text-black font-bold px-3 py-1 rounded-full">
                PREMIUM
              </span>
            </div>
            <div className="mb-4 text-yellow-500">
              <User className="w-16 h-16" />
            </div>
            <h3 className="text-3xl font-bold mb-2">Personalized Custom Workout Plan</h3>
            <p className="text-muted-foreground text-base mb-4">Get a fully customized plan from our lead trainer</p>
            <ul className="space-y-2 mb-4 text-sm">
              <li className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <span>Conversation with Professional Trainer</span>
              </li>
              <li className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-primary" />
                <span>Customize Workout and Diet Plan</span>
              </li>
              <li className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>24x7 Help with Our Trainer</span>
              </li>
            </ul>
            <Button 
              onClick={() => navigate('/premium-nutrition-tracker')}
              className="w-full bg-yellow-500 text-black hover:bg-yellow-400"
            >
              Get Premium Plan
            </Button>
          </motion.div>

          {/* Regular Workout Categories Grid */}
          <h2 className="text-2xl font-bold mb-6">Free Workout Plans</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workoutCategories.map((category, index) => {
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => {
                    if (category.id === 'skinny-to-muscular') {
                      navigate('/skinny-to-muscular-plan');
                    } else if (category.id === 'fat-to-muscular') {
                      navigate('/fat-to-muscular-plan');
                    } else if (category.id === 'home-workout') {
                      navigate('/home-workout-plan');
                    } else {
                      setSelectedCategory(category.id);
                    }
                  }}
                  className={`glass-card p-8 rounded-2xl cursor-pointer transition-all duration-300 relative ${
                    selectedCategory === category.id
                      ? 'shadow-lavender-glow border-2 border-primary'
                      : 'hover:shadow-lavender-glow'
                  }`}
                >
                  <div className="mb-4 text-primary">
                    <category.icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-primary text-xs font-medium">{category.meals} meals per day</p>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                      Free
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Selected Workout Nutrition Page */}
          {selectedCategory && !showWorkoutLogger && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 glass-card p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-bold mb-6">
                {workoutCategories.find(c => c.id === selectedCategory)?.name} - Nutrition Plan
              </h2>
              <p className="text-muted-foreground mb-6">
                Recommended 5 meals per day for optimal results with your {workoutCategories.find(c => c.id === selectedCategory)?.name.toLowerCase()} program
              </p>


              <div className="grid md:grid-cols-2 gap-6">
                {/* Meal Plan */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Daily Meal Plan</h3>

                  <div className="glass-card p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Meal 1: Breakfast (7:00 AM)</h4>
                    <p className="text-sm text-muted-foreground">Oats with protein powder, banana, and almonds</p>
                    {userPlan === 'paid' && <p className="text-xs text-primary mt-1">~450 calories</p>}
                  </div>

                  <div className="glass-card p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Meal 2: Mid-Morning (10:00 AM)</h4>
                    <p className="text-sm text-muted-foreground">Greek yogurt with berries and honey</p>
                    {userPlan === 'paid' && <p className="text-xs text-primary mt-1">~300 calories</p>}
                  </div>

                  <div className="glass-card p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Meal 3: Lunch (1:00 PM)</h4>
                    <p className="text-sm text-muted-foreground">Grilled chicken, brown rice, and vegetables</p>
                    {userPlan === 'paid' && <p className="text-xs text-primary mt-1">~600 calories</p>}
                  </div>

                  <div className="glass-card p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Meal 4: Pre-Workout (4:00 PM)</h4>
                    <p className="text-sm text-muted-foreground">Banana with peanut butter and protein shake</p>
                    {userPlan === 'paid' && <p className="text-xs text-primary mt-1">~400 calories</p>}
                  </div>

                  <div className="glass-card p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Meal 5: Dinner (7:30 PM)</h4>
                    <p className="text-sm text-muted-foreground">Salmon, sweet potato, and green salad</p>
                    {userPlan === 'paid' && <p className="text-xs text-primary mt-1">~550 calories</p>}
                  </div>
                </div>

                {/* Workout Schedule */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Workout Schedule</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Session Date</label>
                      <input
                        type="date"
                        className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Session Time</label>
                      <input
                        type="time"
                        className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                      <input
                        type="number"
                        placeholder="60"
                        className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Workout Notes</label>
                      <textarea
                        placeholder="Add specific exercises or goals..."
                        rows={4}
                        className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-2 focus:border-primary focus:outline-none resize-none"
                      />
                    </div>
                    <Button className="w-full bg-primary text-primary-foreground hover:shadow-lavender-glow">
                      Schedule Workout Session
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default WorkoutPlanner;
