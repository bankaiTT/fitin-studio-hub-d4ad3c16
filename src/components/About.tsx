import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Users, Zap } from 'lucide-react';
import fitnessImage from '@/assets/fitnessplaceholder.png';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Target,
      title: 'Goal-Oriented',
      description: 'Personalized plans tailored to your specific fitness goals',
    },
    {
      icon: Users,
      title: 'Expert Trainers',
      description: 'Learn from certified professionals with years of experience',
    },
    {
      icon: Zap,
      title: 'Holistic Approach',
      description: 'Combining fitness, nutrition, and mental wellness',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-gradient">FitIn</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              At FitIn, we believe fitness is more than just physical transformation—it's
              a journey of self-discovery and empowerment. Our holistic approach combines
              cutting-edge training methods with personalized nutrition guidance and mental
              wellness support.
            </p>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Whether you're just starting your fitness journey or looking to break through
              plateaus, our expert trainers are here to guide you every step of the way.
            </p>

            {/* Feature cards */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-start space-x-4 glass-card p-4 rounded-lg hover:shadow-lavender-glow transition-all duration-300"
                >
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image placeholder with gradient overlay */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden glass-card relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10" />
              <img 
                src={fitnessImage} 
                alt="Fitness Training" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating accent element */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
