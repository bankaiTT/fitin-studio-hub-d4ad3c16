import { Card } from '@/components/ui/card';
import { StrengthProgressionChart } from '@/components/nutrition/StrengthProgressionChart';
import { WorkoutLogging } from '@/components/nutrition/WorkoutLogging';
import { Dumbbell, CheckCircle } from 'lucide-react';

const workoutRoutines = [
  {
    day: 'Monday',
    title: 'Upper Body (Push Focus)',
    exercises: [
      'Push-ups – 4×12–15',
      'Pike Push-ups (for shoulders) – 3×10',
      'Dips on chair/bed – 3×12',
      'Shoulder Taps – 3×20',
      'Plank – 3×45 sec',
    ],
  },
  {
    day: 'Tuesday',
    title: 'Lower Body (Legs & Core)',
    exercises: [
      'Squats – 4×15',
      'Lunges – 3×12 each leg',
      'Glute Bridge – 3×15',
      'Calf Raises – 3×20',
    ],
  },
  {
    day: 'Wednesday',
    title: 'Pull & Core Strength',
    exercises: [
      'Inverted Rows (under sturdy table) – 3×10',
      'Superman Hold – 3×30 sec',
      'Reverse Snow Angels – 3×12',
      'Plank with Shoulder Taps – 3×12',
    ],
  },
];

const mustFollow = [
  'Warm-up 5 min (jumping jacks, arm circles, spot jog)',
  'Stretch after each workout',
  'Eat clean: protein + veggies + complex carbs',
  'Sleep well, stay hydrated',
];

export const HomeWorkouts = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Home Workout Routines</h2>
          <p className="text-muted-foreground">Your weekly workout plan</p>
        </div>

        {/* Workout Routines */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {workoutRoutines.map((routine) => (
            <Card key={routine.day} className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Dumbbell className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">{routine.day}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{routine.title}</p>
              <ul className="space-y-2">
                {routine.exercises.map((exercise, idx) => (
                  <li key={idx} className="text-sm flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{exercise}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Must Follow */}
        <Card className="glass-card p-6 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold">Must Follow</h3>
          </div>
          <ul className="grid md:grid-cols-2 gap-3">
            {mustFollow.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Strength Progress Chart */}
        <div className="mb-12">
          <StrengthProgressionChart />
        </div>

        {/* Workout Logging */}
        <WorkoutLogging />
      </div>
    </section>
  );
};
