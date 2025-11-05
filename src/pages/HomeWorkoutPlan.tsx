import { motion } from "framer-motion";
import { ArrowLeft, Dumbbell, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NutritionInsights } from "@/components/nutrition/NutritionInsights";
import { MealPlanCard } from "@/components/nutrition/MealPlanCard";
import pushUpVid1 from "@/assets/pushupvid1.mp4";
import pushUpVid2 from "@/assets/pushupvid2.mp4";

const HomeWorkoutPlan = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/workout-planner')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Workout Planner
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Home Workout Plan
            </h1>
            <p className="text-muted-foreground text-lg">
              Complete workout program with no equipment needed
            </p>
          </div>

          <NutritionInsights />

          <MealPlanCard isPaidPlan={true} />

          {/* Monday - Upper Body (Push Focus) */}
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-6 text-primary">Monday: Upper Body (Push Focus)</h2>
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Push-ups - 4×12-15</h4>
                <div className="max-w-md">
                  <video
                    controls
                    className="w-full rounded-lg"
                    src={pushUpVid1}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p className="text-muted-foreground mt-4">
                  Keep your body in a straight line from head to heels. Lower yourself until your chest nearly touches the floor.
                </p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Pike Push-ups (for shoulders) - 3×10</h4>
                <p className="text-muted-foreground">
                  Start in downward dog position. Bend your elbows to lower your head toward the floor, then push back up.
                </p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Dips on chair/bed - 3×12</h4>
                <p className="text-muted-foreground">
                  Position hands shoulder-width apart on the edge. Lower your body by bending elbows to 90 degrees, then push back up.
                </p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Shoulder Taps - 3×20</h4>
                <div className="max-w-md">
                  <video
                    controls
                    className="w-full rounded-lg"
                    src={pushUpVid2}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p className="text-muted-foreground mt-4">
                  Hold plank position. Tap opposite shoulder with each hand while keeping your core stable.
                </p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Plank - 3×45 sec</h4>
                <p className="text-muted-foreground">
                  Maintain a straight line from head to heels. Engage your core and hold the position.
                </p>
              </div>
            </div>
          </div>

          {/* Tuesday - Lower Body (Legs & Core) */}
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-6 text-primary">Tuesday: Lower Body (Legs & Core)</h2>
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Squats - 4×15</h4>
                <p className="text-muted-foreground">
                  Stand with feet shoulder-width apart. Lower your hips back and down, keeping chest up. Push through heels to return.
                </p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Lunges - 3×12 each leg</h4>
                <p className="text-muted-foreground">
                  Step forward with one leg, lowering your hips until both knees are bent at 90 degrees. Push back to start.
                </p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Glute Bridge - 3×15</h4>
                <p className="text-muted-foreground">
                  Lie on your back with knees bent. Lift your hips up, squeezing glutes at the top, then lower back down.
                </p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Calf Raises - 3×20</h4>
                <p className="text-muted-foreground">
                  Stand on edge of a step. Raise heels as high as possible, then lower below step level for full range of motion.
                </p>
              </div>
            </div>
          </div>

          {/* Wednesday - Pull & Core Strength */}
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-6 text-primary">Wednesday: Pull & Core Strength</h2>
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Inverted Rows (under sturdy table) - 3×10</h4>
                <p className="text-muted-foreground">
                  Lie under a table, grab the edge, and pull your chest up to the table. Keep your body straight.
                </p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Superman Hold - 3×30 sec</h4>
                <p className="text-muted-foreground">
                  Lie face down. Simultaneously lift arms and legs off the ground, squeezing lower back muscles.
                </p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Reverse Snow Angels - 3×12</h4>
                <p className="text-muted-foreground">
                  Lie face down. Move arms in a snow angel pattern while keeping them slightly off the ground.
                </p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Plank with Shoulder Taps - 3×12</h4>
                <p className="text-muted-foreground">
                  Hold plank position and tap opposite shoulders alternately. Minimize hip rotation.
                </p>
              </div>
            </div>
          </div>

          {/* Must Follow Guidelines */}
          <div className="glass-card p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">Must Follow Guidelines</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass-card p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <Dumbbell className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-2">Warm-up (5 minutes)</h4>
                    <p className="text-sm text-muted-foreground">
                      Jumping jacks, arm circles, spot jog to prepare your body
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-2">Stretch after each workout</h4>
                    <p className="text-sm text-muted-foreground">
                      Focus on muscles worked, hold stretches 20-30 seconds
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <Dumbbell className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-2">Eat clean</h4>
                    <p className="text-sm text-muted-foreground">
                      Protein + vegetables + complex carbs for optimal results
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-2">Sleep well, stay hydrated</h4>
                    <p className="text-sm text-muted-foreground">
                      7-9 hours sleep, drink 2-3 liters of water daily
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeWorkoutPlan;
