import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Camera, Upload } from 'lucide-react';

const PersonalDetails = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
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

  useEffect(() => {
    const signupData = sessionStorage.getItem('signupData');
    if (!signupData) {
      navigate('/signup');
    }
  }, [navigate]);

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
      toast.success('Camera permission granted!');
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      toast.error('Camera access denied. Please upload a photo instead.');
    }
  };

  const completeSignup = async () => {
    setIsLoading(true);
    try {
      const signupData = JSON.parse(sessionStorage.getItem('signupData') || '{}');
      
      // Check if user is already logged in
      const { data: { session } } = await supabase.auth.getSession();
      let userId = session?.user?.id;

      // Only sign up if not already logged in
      if (!userId) {
        const { data, error: signupError } = await supabase.auth.signUp({
          email: signupData.email,
          password: signupData.password,
          options: {
            data: { full_name: signupData.name },
            emailRedirectTo: `${window.location.origin}/`
          }
        });

        if (signupError) {
          // If user already exists, try to sign them in instead
          if (signupError.message.includes('already registered')) {
            const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
              email: signupData.email,
              password: signupData.password,
            });
            
            if (signInError) throw signInError;
            userId = signInData.user?.id;
          } else {
            throw signupError;
          }
        } else {
          userId = data.user?.id;
        }
      }

      if (!userId) throw new Error('Failed to authenticate user');

      const { error: profileError } = await (supabase as any)
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
        .eq('user_id', userId);

      if (profileError) throw profileError;

      sessionStorage.removeItem('signupData');
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
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
              onClick={() => setStep(2)}
              disabled={!heightValue}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Next
            </Button>
          </div>
        );

      case 2:
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
              onClick={() => setStep(3)}
              disabled={!weightValue}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Next
            </Button>
          </div>
        );

      case 3:
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
              onClick={() => setStep(4)}
              disabled={!age}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Next
            </Button>
          </div>
        );

      case 4:
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
              onClick={() => setStep(5)}
              disabled={!activityLevel}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Next
            </Button>
          </div>
        );

      case 5:
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
              onClick={() => setStep(6)}
              disabled={!dietPreference}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Next
            </Button>
          </div>
        );

      case 6:
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
              onClick={completeSignup}
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isLoading ? 'Completing...' : 'Complete Profile'}
            </Button>
            
            <button
              onClick={completeSignup}
              className="text-sm text-muted-foreground hover:text-primary w-full text-center"
            >
              Skip for now
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark-radial" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-card p-8 rounded-2xl w-full max-w-md relative z-10"
      >
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-white">Personal Details</h2>
            <span className="text-sm text-muted-foreground">Step {step} of 6</span>
          </div>
          <div className="h-2 bg-background/50 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 6) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {renderStep()}
      </motion.div>
    </div>
  );
};

export default PersonalDetails;
