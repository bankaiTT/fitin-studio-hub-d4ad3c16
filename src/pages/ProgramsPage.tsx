import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const ProgramsPage = () => {
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const durations = ['15 minutes', '30 minutes', '45 minutes', '60+ minutes'];
  const equipment = ['Bodyweight Only', 'Dumbbells', 'Resistance Bands', 'Full Gym Access'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const goals = ['Weight Loss', 'Muscle Gain', 'Flexibility', 'Endurance'];

  const handleCheckboxChange = (
    value: string,
    selectedItems: string[],
    setSelectedItems: (items: string[]) => void
  ) => {
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter((item) => item !== value));
    } else {
      setSelectedItems([...selectedItems, value]);
    }
  };

  const programs = [
    {
      title: 'Full Body Strength',
      duration: '45 minutes',
      equipment: 'Full Gym Access',
      level: 'Intermediate',
      goal: 'Muscle Gain',
    },
    {
      title: 'HIIT Fat Burn',
      duration: '30 minutes',
      equipment: 'Bodyweight Only',
      level: 'Beginner',
      goal: 'Weight Loss',
    },
    {
      title: 'Yoga Flow',
      duration: '60+ minutes',
      equipment: 'Bodyweight Only',
      level: 'Beginner',
      goal: 'Flexibility',
    },
    {
      title: 'Athletic Performance',
      duration: '45 minutes',
      equipment: 'Full Gym Access',
      level: 'Advanced',
      goal: 'Endurance',
    },
    {
      title: 'Quick Morning Workout',
      duration: '15 minutes',
      equipment: 'Dumbbells',
      level: 'Beginner',
      goal: 'Muscle Gain',
    },
    {
      title: 'Resistance Band Training',
      duration: '30 minutes',
      equipment: 'Resistance Bands',
      level: 'Intermediate',
      goal: 'Weight Loss',
    },
  ];

  const filteredPrograms = programs.filter((program) => {
    if (selectedDurations.length && !selectedDurations.includes(program.duration)) return false;
    if (selectedEquipment.length && !selectedEquipment.includes(program.equipment)) return false;
    if (selectedLevels.length && !selectedLevels.includes(program.level)) return false;
    if (selectedGoals.length && !selectedGoals.includes(program.goal)) return false;
    return true;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Workout <span className="text-gradient">Programs</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the perfect program tailored to your fitness goals and schedule
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-2xl p-6 space-y-8 sticky top-24">
                <div>
                  <h3 className="text-xl font-bold mb-4">Filters</h3>
                </div>

                {/* Duration */}
                <div>
                  <h4 className="font-semibold mb-3">DURATION</h4>
                  <div className="space-y-3">
                    {durations.map((duration) => (
                      <div key={duration} className="flex items-center space-x-2">
                        <Checkbox
                          id={duration}
                          checked={selectedDurations.includes(duration)}
                          onCheckedChange={() =>
                            handleCheckboxChange(duration, selectedDurations, setSelectedDurations)
                          }
                        />
                        <label
                          htmlFor={duration}
                          className="text-sm cursor-pointer select-none"
                        >
                          {duration}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equipment */}
                <div>
                  <h4 className="font-semibold mb-3">EQUIPMENT</h4>
                  <div className="space-y-3">
                    {equipment.map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={item}
                          checked={selectedEquipment.includes(item)}
                          onCheckedChange={() =>
                            handleCheckboxChange(item, selectedEquipment, setSelectedEquipment)
                          }
                        />
                        <label
                          htmlFor={item}
                          className="text-sm cursor-pointer select-none"
                        >
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fitness Level */}
                <div>
                  <h4 className="font-semibold mb-3">FITNESS LEVEL</h4>
                  <div className="space-y-3">
                    {levels.map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox
                          id={level}
                          checked={selectedLevels.includes(level)}
                          onCheckedChange={() =>
                            handleCheckboxChange(level, selectedLevels, setSelectedLevels)
                          }
                        />
                        <label
                          htmlFor={level}
                          className="text-sm cursor-pointer select-none"
                        >
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Goals */}
                <div>
                  <h4 className="font-semibold mb-3">GOALS</h4>
                  <div className="space-y-3">
                    {goals.map((goal) => (
                      <div key={goal} className="flex items-center space-x-2">
                        <Checkbox
                          id={goal}
                          checked={selectedGoals.includes(goal)}
                          onCheckedChange={() =>
                            handleCheckboxChange(goal, selectedGoals, setSelectedGoals)
                          }
                        />
                        <label
                          htmlFor={goal}
                          className="text-sm cursor-pointer select-none"
                        >
                          {goal}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Programs Grid */}
            <div className="lg:col-span-3">
              <div className="mb-4 text-muted-foreground">
                Showing {filteredPrograms.length} program{filteredPrograms.length !== 1 ? 's' : ''}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {filteredPrograms.map((program, index) => (
                  <motion.div
                    key={program.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="glass-card rounded-2xl p-6 hover:shadow-lavender-glow transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold mb-4">{program.title}</h3>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="font-semibold mr-2">Duration:</span>
                        {program.duration}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="font-semibold mr-2">Equipment:</span>
                        {program.equipment}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="font-semibold mr-2">Level:</span>
                        {program.level}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="font-semibold mr-2">Goal:</span>
                        {program.goal}
                      </div>
                    </div>
                    <Button className="w-full">Start Program</Button>
                  </motion.div>
                ))}
              </div>
              {filteredPrograms.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No programs match your selected filters. Try adjusting your criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProgramsPage;
