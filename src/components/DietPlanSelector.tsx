import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Apple, TrendingUp, TrendingDown, Heart, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface DietPlan {
  id: string;
  name: string;
  icon: any;
  description: string;
  isPaid: boolean;
  route: string;
}

const DietPlanSelector = () => {
  const navigate = useNavigate();
  const [userPlan, setUserPlan] = useState<'free' | 'paid'>('free');

  const dietPlans: DietPlan[] = [
    {
      id: 'maintenance',
      name: 'Maintenance Diet',
      icon: Heart,
      description: 'Maintain your current physique with balanced nutrition',
      isPaid: false,
      route: '/maintenance-diet-logs'
    },
    {
      id: 'bulking',
      name: 'Bulking Diet',
      icon: TrendingUp,
      description: 'Build muscle mass with high-calorie nutrition plans',
      isPaid: false,
      route: '/diet-planner?plan=bulking'
    },
    {
      id: 'cutting',
      name: 'Cutting Diet',
      icon: TrendingDown,
      description: 'Reduce body fat while maintaining muscle mass',
      isPaid: false,
      route: '/diet-planner?plan=cutting'
    }
  ];

  useEffect(() => {
    fetchUserPlan();
  }, []);

  const fetchUserPlan = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: plan } = await (supabase as any)
      .from('user_plans')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (plan) {
      setUserPlan((plan as any).plan_type as 'free' | 'paid');
    }
  };

  const handlePlanClick = (plan: DietPlan) => {
    if (plan.isPaid && userPlan === 'free') {
      toast.error('Upgrade to premium to access this diet plan');
      return;
    }
    navigate(plan.route);
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {dietPlans.map((plan, index) => (
        <motion.div
          key={plan.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          onClick={() => handlePlanClick(plan)}
          className={`glass-card p-8 rounded-2xl cursor-pointer transition-all duration-300 ${
            plan.isPaid && userPlan === 'free'
              ? 'opacity-60 hover:opacity-80'
              : 'hover:shadow-lavender-glow'
          }`}
        >
          <div className="relative">
            <div className={`mb-4 ${plan.isPaid && userPlan === 'free' ? 'opacity-50' : 'text-primary'}`}>
              <plan.icon className="w-12 h-12" />
            </div>
            {plan.isPaid && userPlan === 'free' && (
              <div className="absolute top-0 right-0">
                <Lock className="w-6 h-6 text-yellow-500" />
              </div>
            )}
          </div>
          <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
          <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
          {plan.isPaid && userPlan === 'free' && (
            <div className="mt-4">
              <span className="text-xs bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full">
                Premium Plan
              </span>
            </div>
          )}
          {!plan.isPaid && (
            <div className="mt-4">
              <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">
                Free Plan
              </span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default DietPlanSelector;
