import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NutritionInsights } from "@/components/nutrition/NutritionInsights";
import { MealPlanCard } from "@/components/nutrition/MealPlanCard";

const FatToMuscularPlan = () => {
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
              Fat to Muscular Workout Plan
            </h1>
            <p className="text-muted-foreground text-lg">
              5-Day workout split with meal plan and progress tracking
            </p>
          </div>

          {/* Progress Tracking Section */}
          <NutritionInsights />

          {/* Meal Plan Section */}
          <MealPlanCard isPaidPlan={true} />

          {/* Day 1 - Chest & Triceps */}
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-6 text-primary">Day 1 – Chest & Triceps (Monday)</h2>
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Push-ups – 4×15</h4>
                <p className="text-muted-foreground">Bodyweight exercise for chest activation</p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Bench Press (or floor press) – 4×10</h4>
                <p className="text-muted-foreground">Primary chest builder</p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Dumbbell Flys – 3×12</h4>
                <p className="text-muted-foreground">Chest isolation movement</p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Tricep Dips – 3×12</h4>
                <p className="text-muted-foreground">Compound triceps exercise</p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Overhead Tricep Extension – 3×12</h4>
                <p className="text-muted-foreground">Triceps isolation</p>
              </div>
            </div>
          </div>

          {/* Day 2 - Back & Biceps */}
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-6 text-primary">Day 2 – Back & Biceps (Tuesday)</h2>
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Pull-ups (or inverted rows) – 4×8–10</h4>
                <p className="text-muted-foreground">Primary back exercise</p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Bent-over Rows – 4×10</h4>
                <p className="text-muted-foreground">Compound back builder</p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Lat Pulldowns (if in gym) – 3×12</h4>
                <p className="text-muted-foreground">Lat development</p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Barbell or Dumbbell Curls – 3×12</h4>
                <p className="text-muted-foreground">Primary biceps exercise</p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Hammer Curls – 3×12</h4>
                <p className="text-muted-foreground">Brachialis and biceps development</p>
              </div>
            </div>
          </div>

          {/* Day 3 - Legs & Core */}
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-6 text-primary">Day 3 – Legs & Core (Wednesday)</h2>
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Squats – 4×15</h4>
                <p className="text-muted-foreground">Primary leg compound movement</p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Lunges – 3×12 each leg</h4>
                <p className="text-muted-foreground">Unilateral leg development</p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Leg Press (or wall sits) – 3×12</h4>
                <p className="text-muted-foreground">Quad focused exercise</p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Calf Raises – 3×20</h4>
                <p className="text-muted-foreground">Calf development</p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Planks – 3×1 min</h4>
                <p className="text-muted-foreground">Core stability</p>
              </div>
            </div>
          </div>

          {/* Day 4 - Shoulders & Abs */}
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-6 text-primary">Day 4 – Shoulders & Abs (Thursday)</h2>
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Shoulder Press – 4×10</h4>
                <p className="text-muted-foreground">Primary shoulder builder</p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Lateral Raises – 3×12</h4>
                <p className="text-muted-foreground">Side deltoid isolation</p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Front Raises – 3×12</h4>
                <p className="text-muted-foreground">Front deltoid isolation</p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Shrugs – 3×15</h4>
                <p className="text-muted-foreground">Trap development</p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Crunches – 3×20</h4>
                <p className="text-muted-foreground">Upper abs</p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Leg Raises – 3×15</h4>
                <p className="text-muted-foreground">Lower abs</p>
              </div>
            </div>
          </div>

          {/* Day 5 - Full Body & Cardio */}
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-6 text-primary">Day 5 – Full Body & Cardio (Friday)</h2>
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Burpees – 3×15</h4>
                <p className="text-muted-foreground">Full body conditioning</p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Jump Squats – 3×20</h4>
                <p className="text-muted-foreground">Explosive leg power</p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Push-ups – 3×20</h4>
                <p className="text-muted-foreground">Upper body endurance</p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Mountain Climbers – 3×40 sec</h4>
                <p className="text-muted-foreground">Core and cardio</p>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">20–30 min light jog / cycling</h4>
                <p className="text-muted-foreground">Fat burning cardio</p>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-6 text-primary">💡 Tips for Success</h2>
            <div className="space-y-4">
              <div className="glass-card p-4 rounded-lg">
                <p className="text-muted-foreground">• Warm up 5–10 min (jump rope, jogging)</p>
              </div>
              <div className="glass-card p-4 rounded-lg">
                <p className="text-muted-foreground">• Rest 30–60 sec between sets</p>
              </div>
              <div className="glass-card p-4 rounded-lg">
                <p className="text-muted-foreground">• Eat high protein (chicken, eggs, paneer, tofu, lentils)</p>
              </div>
              <div className="glass-card p-4 rounded-lg">
                <p className="text-muted-foreground">• Sleep 7–8 hours</p>
              </div>
              <div className="glass-card p-4 rounded-lg">
                <p className="text-muted-foreground">• Track your progress weekly</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FatToMuscularPlan;
