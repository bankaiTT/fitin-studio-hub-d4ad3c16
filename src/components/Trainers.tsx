import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import nihalBack from '@/assets/nihalback1.jpg';
import nihalBody from '@/assets/nihalbody1.jpg';
import asifKhan1 from '@/assets/asifkhan1.jpg';
import asifKhan2 from '@/assets/asifkhan2.jpg';

const Trainers = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const trainers = [
    {
      name: 'Nihaldeep Singh',
      title: 'Lead Trainer & Transformation Coach',
      images: [nihalBack, nihalBody],
      expertise: ['Strength', 'Conditioning', 'Nutrition'],
      bio: 'Certified trainer with 3+ years of experience helping clients achieve their fitness goals through personalized training and holistic wellness approaches.',
    },
    {
      name: 'Asif Khan',
      title: 'Lead Trainer & Transformation Coach',
      images: [asifKhan1, asifKhan2],
      expertise: ['Powerlifting', 'Athletics', 'Nutrition'],
      bio: 'Expert powerlifting and athletics coach with 9+ years of experience. Holds a degree in training and nutrition, and has transformed 100+ lives through dedicated coaching.',
    },
  ];

  return (
    <section id="trainers" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Your <span className="text-gradient">Trainers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Train with certified experts who are passionate about helping you reach your full potential.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {trainers.map((trainer, index) => (
            <motion.div
              key={`${trainer.name}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-card rounded-2xl overflow-hidden hover:shadow-lavender-glow transition-all duration-500 group"
            >
              {/* Trainer Images */}
              <div className="relative overflow-hidden aspect-[3/4] grid grid-cols-2">
                {trainer.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`${trainer.name} ${imgIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
                
                {/* Social Links Overlay */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href="#"
                    className="bg-primary/20 backdrop-blur-sm p-2 rounded-lg hover:bg-primary/40 transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-foreground" />
                  </a>
                  <a
                    href="#"
                    className="bg-primary/20 backdrop-blur-sm p-2 rounded-lg hover:bg-primary/40 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-foreground" />
                  </a>
                  <a
                    href="#"
                    className="bg-primary/20 backdrop-blur-sm p-2 rounded-lg hover:bg-primary/40 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-foreground" />
                  </a>
                </div>
              </div>

              {/* Trainer Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{trainer.name}</h3>
                <p className="text-primary mb-4">{trainer.title}</p>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {trainer.bio}
                </p>
                
                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2">
                  {trainer.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
