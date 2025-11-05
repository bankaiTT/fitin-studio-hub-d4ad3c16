import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type Step = 'auth' | 'height' | 'weight' | 'age' | 'activity' | 'diet' | 'photo';
type AuthMode = 'signin' | 'signup';

interface OnboardingChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingChatbot = ({ isOpen, onClose }: OnboardingChatbotProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<Step>('auth');
  const [authMode, setAuthMode] = useState<AuthMode>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [heightValue, setHeightValue] = useState('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [weightValue, setWeightValue] = useState('');
  const [age, setAge] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [dietPreference, setDietPreference] = useState<'veg' | 'non-veg' | ''>('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise' },
    { value: 'light', label: 'Lightly Active', desc: '1-3 days/week' },
    { value: 'moderate', label: 'Moderately Active', desc: '3-5 days/week' },
    { value: 'very', label: 'Very Active', desc: '6-7 days/week' },
  ];

  const handleAuth = async () => {
    setIsLoading(true);
    try {
      if (authMode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: `${window.location.origin}/`
          }
        });
        if (error) throw error;
        toast({ title: 'Account created! Please continue with your profile.' });
        setStep('height');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        // Check if profile is complete
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await (supabase as any)
            .from('profiles')
            .select('onboarding_completed')
            .eq('user_id', user.id)
            .single();
          
          if (profile && (profile as any).onboarding_completed) {
            navigate('/dashboard');
          } else {
            setStep('height');
          }
        }
      }
    } catch (error: any) {
      toast({ 
        title: 'Error', 
        description: error.message, 
        variant: 'destructive' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Simple implementation - in production, you'd show a camera interface
      toast({ title: 'Camera permission granted!' });
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      toast({ 
        title: 'Camera access denied', 
        description: 'Please allow camera access or upload a photo instead.',
        variant: 'destructive'
      });
    }
  };

  const completeOnboarding = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await (supabase as any)
        .from('profiles')
        .update({
          height_cm: heightUnit === 'cm' ? parseFloat(heightValue) : null,
          height_ft: heightUnit === 'ft' ? parseFloat(heightValue) : null,
          weight_kg: weightUnit === 'kg' ? parseFloat(weightValue) : null,
          weight_lbs: weightUnit === 'lbs' ? parseFloat(weightValue) : null,
          age: parseInt(age),
          activity_level: activityLevel,
          diet_preference: dietPreference,
          onboarding_completed: true,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({ title: 'Profile completed! Redirecting...' });
      navigate('/dashboard');
    } catch (error: any) {
      toast({ 
        title: 'Error', 
        description: error.message, 
        variant: 'destructive' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'auth':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">
              {authMode === 'signup' ? 'Create Your Account' : 'Welcome Back!'}
            </h3>
            <p className="text-muted-foreground">
              {authMode === 'signup' 
                ? "Let's get started with your fitness journey" 
                : 'Sign in to continue'}
            </p>
            
            {authMode === 'signup' && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
              />
            )}
            
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
            />
            
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
            />
            
            <Button 
              onClick={handleAuth} 
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isLoading ? 'Loading...' : authMode === 'signup' ? 'Sign Up' : 'Sign In'}
            </Button>
            
            <button
              onClick={() => setAuthMode(authMode === 'signup' ? 'signin' : 'signup')}
              className="text-sm text-primary hover:underline w-full text-center"
            >
              {authMode === 'signup' 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"}
            </button>
          </div>
        );

      case 'height':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">What's your height?</h3>
            <p className="text-muted-foreground">This helps us personalize your fitness plan</p>
            
            <div className="flex gap-2">
              <Button
                variant={heightUnit === 'cm' ? 'default' : 'outline'}
                onClick={() => setHeightUnit('cm')}
                className="flex-1"
              >
                cm
              </Button>
              <Button
                variant={heightUnit === 'ft' ? 'default' : 'outline'}
                onClick={() => setHeightUnit('ft')}
                className="flex-1"
              >
                ft
              </Button>
            </div>
            
            <input
              type="number"
              placeholder={heightUnit === 'cm' ? 'e.g., 175' : 'e.g., 5.9'}
              value={heightValue}
              onChange={(e) => setHeightValue(e.target.value)}
              className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
            />
            
            <Button 
              onClick={() => setStep('weight')}
              disabled={!heightValue}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Next
            </Button>
          </div>
        );

      case 'weight':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">What's your weight?</h3>
            <p className="text-muted-foreground">We'll use this to track your progress</p>
            
            <div className="flex gap-2">
              <Button
                variant={weightUnit === 'kg' ? 'default' : 'outline'}
                onClick={() => setWeightUnit('kg')}
                className="flex-1"
              >
                kg
              </Button>
              <Button
                variant={weightUnit === 'lbs' ? 'default' : 'outline'}
                onClick={() => setWeightUnit('lbs')}
                className="flex-1"
              >
                lbs
              </Button>
            </div>
            
            <input
              type="number"
              placeholder={weightUnit === 'kg' ? 'e.g., 70' : 'e.g., 154'}
              value={weightValue}
              onChange={(e) => setWeightValue(e.target.value)}
              className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
            />
            
            <Button 
              onClick={() => setStep('age')}
              disabled={!weightValue}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Next
            </Button>
          </div>
        );

      case 'age':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">How old are you?</h3>
            <p className="text-muted-foreground">Age helps us customize your fitness recommendations</p>
            
            <input
              type="number"
              placeholder="e.g., 25"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
            />
            
            <Button 
              onClick={() => setStep('activity')}
              disabled={!age}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Next
            </Button>
          </div>
        );

      case 'activity':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Activity Level</h3>
            <p className="text-muted-foreground">How active are you typically?</p>
            
            <div className="space-y-2">
              {activityLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setActivityLevel(level.value)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    activityLevel === level.value
                      ? 'bg-primary/20 border-primary'
                      : 'bg-background/50 border-border/50 hover:border-primary/50'
                  }`}
                >
                  <div className="font-semibold text-white">{level.label}</div>
                  <div className="text-sm text-muted-foreground">{level.desc}</div>
                </button>
              ))}
            </div>
            
            <Button 
              onClick={() => setStep('diet')}
              disabled={!activityLevel}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Next
            </Button>
          </div>
        );

      case 'diet':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Diet Preference</h3>
            <p className="text-muted-foreground">What's your dietary preference?</p>
            
            <div className="space-y-2">
              <button
                onClick={() => setDietPreference('veg')}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  dietPreference === 'veg'
                    ? 'bg-primary/20 border-primary'
                    : 'bg-background/50 border-border/50 hover:border-primary/50'
                }`}
              >
                <div className="font-semibold text-white">Vegetarian</div>
                <div className="text-sm text-muted-foreground">Plant-based diet</div>
              </button>
              
              <button
                onClick={() => setDietPreference('non-veg')}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  dietPreference === 'non-veg'
                    ? 'bg-primary/20 border-primary'
                    : 'bg-background/50 border-border/50 hover:border-primary/50'
                }`}
              >
                <div className="font-semibold text-white">Non-Vegetarian</div>
                <div className="text-sm text-muted-foreground">Includes all food types</div>
              </button>
            </div>
            
            <Button 
              onClick={() => setStep('photo')}
              disabled={!dietPreference}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Next
            </Button>
          </div>
        );

      case 'photo':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Add a Profile Photo</h3>
            <p className="text-muted-foreground">Optional - helps personalize your experience</p>
            
            {photoPreview && (
              <div className="flex justify-center">
                <img 
                  src={photoPreview} 
                  alt="Preview" 
                  className="w-32 h-32 rounded-full object-cover border-2 border-primary"
                />
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleCameraCapture}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                Use Camera
              </Button>
              
              <label className="cursor-pointer">
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  asChild
                >
                  <span>
                    <Upload className="w-4 h-4" />
                    Upload Photo
                  </span>
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
            
            <Button 
              onClick={completeOnboarding}
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isLoading ? 'Completing...' : 'Complete Profile'}
            </Button>
            
            <button
              onClick={completeOnboarding}
              className="text-sm text-muted-foreground hover:text-primary w-full text-center"
            >
              Skip for now
            </button>
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-card p-8 rounded-2xl max-w-md w-full relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            {renderStep()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OnboardingChatbot;
