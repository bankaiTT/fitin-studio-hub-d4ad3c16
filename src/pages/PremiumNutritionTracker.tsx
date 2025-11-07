import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, LogOut, Camera, ArrowRight } from 'lucide-react';
import logo from '@/assets/fitin-final-logo.jpg';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const PremiumNutritionTracker = () => {
  const navigate = useNavigate();
  const [maintenanceCalories, setMaintenanceCalories] = useState(2100);

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
  
  const selectGoal = (goal: 'maintain' | 'cut' | 'bulk') => {
    let targetCalories = maintenanceCalories;
    
    if (goal === 'cut') {
      targetCalories = Math.round(maintenanceCalories * 0.8);
      navigate('/cut-diet-logs');
    } else if (goal === 'bulk') {
      targetCalories = Math.round(maintenanceCalories * 1.15);
      navigate('/bulk-diet-logs');
    } else {
      navigate('/maintenance-diet-logs');
    }
    
    toast.success(`${goal.charAt(0).toUpperCase() + goal.slice(1)} plan selected! Target: ${targetCalories} kcal/day`);
  };
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
