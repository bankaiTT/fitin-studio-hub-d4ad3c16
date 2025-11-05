import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Activity, TrendingUp, Calendar, Award, Dumbbell, Apple, Clock } from 'lucide-react';
import logo from '@/assets/fitin-final-logo.jpg';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const stats = [
    { icon: Activity, label: 'Workouts This Week', value: '5', color: 'text-primary' },
    { icon: TrendingUp, label: 'Total Progress', value: '68%', color: 'text-green-500' },
    { icon: Calendar, label: 'Days Active', value: '23', color: 'text-blue-500' },
    { icon: Award, label: 'Achievements', value: '12', color: 'text-yellow-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <img src={logo} alt="FitIn" className="h-12 w-auto" />
            <Button
              variant="ghost"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate('/home');
              }}
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome Back, <span className="text-gradient">Champion</span>
              </h1>
              <p className="text-muted-foreground">
                Here's your fitness progress overview
              </p>
            </div>
            <div className="mt-4 md:mt-0 glass-card px-6 py-4 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Live Time</span>
              </div>
              <p className="text-2xl font-bold text-gradient">{formatTime()}</p>
              <p className="text-sm text-muted-foreground mt-1">{formatDate()}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-6 rounded-2xl hover:shadow-lavender-glow transition-all duration-300"
              >
                <div className={`${stat.color} mb-4`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Placeholder sections */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-card p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-bold mb-4">Recent Workouts</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-border/30">
                    <div>
                      <p className="font-semibold">Workout Session {i}</p>
                      <p className="text-sm text-muted-foreground">45 minutes</p>
                    </div>
                    <div className="text-primary font-semibold">Completed</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="glass-card p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-bold mb-4">Upcoming Sessions</h2>
              <div className="space-y-4">
                {['Monday', 'Wednesday', 'Friday'].map((day, i) => (
                  <div key={day} className="flex items-center justify-between py-3 border-b border-border/30">
                    <div>
                      <p className="font-semibold">{day} - Strength Training</p>
                      <p className="text-sm text-muted-foreground">6:00 AM</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-primary/50">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 grid md:grid-cols-2 gap-6"
          >
            <div
              onClick={() => navigate('/workout-planner')}
              className="glass-card p-8 rounded-2xl cursor-pointer hover:shadow-lavender-glow transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 p-4 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Dumbbell className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Workout Planner</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Schedule your workouts in advance to stay on track with your fitness goals.
              </p>
              <Button className="w-full bg-primary text-primary-foreground hover:shadow-lavender-glow">
                Plan Workouts
              </Button>
            </div>

            <div
              onClick={() => navigate('/nutrition-tracker')}
              className="glass-card p-8 rounded-2xl cursor-pointer hover:shadow-lavender-glow transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 p-4 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Apple className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Nutrition Tracker</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Track your meals, monitor nutrition, and achieve your health goals.
              </p>
              <Button className="w-full bg-primary text-primary-foreground hover:shadow-lavender-glow">
                Track Nutrition
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
