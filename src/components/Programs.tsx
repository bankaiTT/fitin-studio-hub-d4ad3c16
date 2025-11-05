import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Dumbbell, Heart, Flame, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Programs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const programs = [
    {
      icon: Dumbbell,
      title: 'Strength Training',
      description: 'Build muscle, increase strength, and transform your physique with our progressive strength programs.',
      features: ['Progressive overload', 'Compound movements', 'Customized splits'],
    },
    {
      icon: Flame,
      title: 'Fat Loss',
      description: 'Scientifically-backed programs combining cardio and resistance training for optimal fat burning.',
      features: ['HIIT workouts', 'Metabolic training', 'Nutrition guidance'],
    },
    {
      icon: Heart,
      title: 'Athletic Performance',
      description: 'Enhance your athletic abilities with sport-specific training and conditioning programs.',
      features: ['Speed & agility', 'Power development', 'Sport-specific drills'],
    },
    {
      icon: Brain,
      title: 'Wellness & Recovery',
      description: 'Focus on mobility, flexibility, and recovery to optimize your overall well-being.',
      features: ['Yoga & stretching', 'Mobility work', 'Stress management'],
    },
  ];

  return (
    <section id="programs" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-gradient">Programs</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our expertly designed programs tailored to help you achieve your specific fitness goals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl hover:shadow-lavender-glow transition-all duration-300 group hover:scale-105"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <program.icon className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">{program.title}</h3>
              <p className="text-muted-foreground mb-6">{program.description}</p>
              
              <ul className="space-y-2 mb-6">
                {program.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button
                variant="outline"
                className="w-full border-primary/50 hover:bg-primary/10 hover:border-primary"
              >
                Learn More
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
