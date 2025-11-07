import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Apple, Coffee, Beef, Moon, Calendar, Salad, Activity } from 'lucide-react';
import logo from '@/assets/fitin-final-logo.jpg';
import { useState } from 'react';

const MaintenanceDietLogs = () => {
  const navigate = useNavigate();
  const [currentDate] = useState(new Date());

  const nutritionGoals = [
    { label: 'Calories', value: 2100, current: 0, color: 'text-primary' },
    { label: 'Protein', value: 130, unit: 'g', current: 0, color: 'text-green-500' },
    { label: 'Carbs', value: 230, unit: 'g', current: 0, color: 'text-blue-500' },
    { label: 'Fat', value: 60, unit: 'g', current: 0, color: 'text-yellow-500' },
  ];

  const mealTypes = [
    { id: 'breakfast', name: 'Breakfast', icon: Coffee, time: '8:00 AM' },
    { id: 'lunch', name: 'Lunch', icon: Apple, time: '12:30 PM' },
    { id: 'snack', name: 'Snack', icon: Beef, time: '4:00 PM' },
    { id: 'evening-snack', name: 'Evening Snack', icon: Salad, time: '6:00 PM' },
    { id: 'dinner', name: 'Dinner', icon: Moon, time: '7:30 PM' },
  ];

  const cardioActivities = [
    { id: 'walking', name: 'Walking', calories: 150 },
    { id: 'running', name: 'Running', calories: 400 },
    { id: 'cycling', name: 'Cycling', calories: 300 },
    { id: 'swimming', name: 'Swimming', calories: 350 },
    { id: 'jump-rope', name: 'Jump Rope', calories: 450 },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
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
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-gradient">Maintenance Diet Plan</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Track your daily meals and maintain your current physique
              </p>
            </div>
            <div className="glass-card px-6 py-3 rounded-xl flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{formatDate(currentDate)}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Sidebar - Nutrition Overview & Cardio */}
            <div className="lg:col-span-1 space-y-6">
              {/* Nutrition Overview */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-card p-8 rounded-2xl"
              >
                <h2 className="text-2xl font-bold mb-6">Daily Goals</h2>
                <div className="space-y-6">
                  {nutritionGoals.map((goal, index) => (
                    <motion.div
                      key={goal.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{goal.label}</span>
                        <span className={`text-sm font-bold ${goal.color}`}>
                          {goal.current} / {goal.value}{goal.unit || ' cals'}
                        </span>
                      </div>
                      <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary/50 rounded-full transition-all duration-500"
                          style={{ width: `${(goal.current / goal.value) * 100}%` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Cardio Options */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-card p-6 rounded-2xl"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Cardio Activities
                </h3>
                <div className="space-y-3">
                  {cardioActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="p-3 bg-background/30 rounded-lg border border-border/30 hover:border-primary/50 transition-all cursor-pointer"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-sm">{activity.name}</h4>
                        <span className="bg-primary/20 px-2 py-1 rounded text-xs">
                          {activity.calories} cal/30min
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Meal Recommendations */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass-card p-6 rounded-2xl"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Salad className="w-5 h-5 text-primary" />
                  Meal Suggestions
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-background/30 rounded-lg border border-border/30 hover:border-primary/50 transition-all cursor-pointer">
                    <h4 className="font-semibold text-sm mb-1">Grilled Chicken Salad</h4>
                    <p className="text-xs text-muted-foreground mb-2">High protein, low carb</p>
                    <div className="flex gap-2 text-xs">
                      <span className="bg-primary/20 px-2 py-1 rounded">350 cal</span>
                      <span className="bg-green-500/20 px-2 py-1 rounded">45g protein</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-background/30 rounded-lg border border-border/30 hover:border-primary/50 transition-all cursor-pointer">
                    <h4 className="font-semibold text-sm mb-1">Quinoa Buddha Bowl</h4>
                    <p className="text-xs text-muted-foreground mb-2">Balanced & nutritious</p>
                    <div className="flex gap-2 text-xs">
                      <span className="bg-primary/20 px-2 py-1 rounded">420 cal</span>
                      <span className="bg-blue-500/20 px-2 py-1 rounded">55g carbs</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-background/30 rounded-lg border border-border/30 hover:border-primary/50 transition-all cursor-pointer">
                    <h4 className="font-semibold text-sm mb-1">Salmon with Veggies</h4>
                    <p className="text-xs text-muted-foreground mb-2">Omega-3 rich dinner</p>
                    <div className="flex gap-2 text-xs">
                      <span className="bg-primary/20 px-2 py-1 rounded">480 cal</span>
                      <span className="bg-yellow-500/20 px-2 py-1 rounded">22g fat</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Meal Logging */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold">Log Your Meals</h2>
                
                {mealTypes.map((meal, index) => (
                  <motion.div
                    key={meal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="glass-card p-6 rounded-2xl hover:shadow-lavender-glow transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <meal.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{meal.name}</h3>
                          <p className="text-sm text-muted-foreground">{meal.time}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="border-primary/50">
                        Add Food
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="e.g., Chicken, Rice & Vegetables"
                        className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-2 text-sm focus:border-primary focus:outline-none"
                      />
                      <div className="grid grid-cols-4 gap-2">
                        <input
                          type="number"
                          placeholder="Calories"
                          className="bg-background/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary focus:outline-none"
                        />
                        <input
                          type="number"
                          placeholder="Protein (g)"
                          className="bg-background/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary focus:outline-none"
                        />
                        <input
                          type="number"
                          placeholder="Carbs (g)"
                          className="bg-background/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary focus:outline-none"
                        />
                        <input
                          type="number"
                          placeholder="Fat (g)"
                          className="bg-background/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary focus:outline-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}

                <Button className="w-full bg-primary text-primary-foreground hover:shadow-lavender-glow">
                  Save Today's Log
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MaintenanceDietLogs;
