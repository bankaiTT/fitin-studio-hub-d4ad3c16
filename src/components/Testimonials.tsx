import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import promitAfter from '@/assets/promitback1-2.jpg';
import promitBefore from '@/assets/promitback2-2.jpg';

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Promit Bhar',
      role: 'Fitness Enthusiast',
      content: 'I saw results after following 4 months of the routine prescribed, and finally after 10 months of being as consistent as possible, I have achieved a pretty ideal physique.',
      rating: 5,
      imageAfter: promitAfter,
      imageBefore: promitBefore,
      type: 'transformation',
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Client <span className="text-gradient">Success Stories</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from real people who transformed their lives with FitIn.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-8 md:p-12 relative">
            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
              <Button
                size="icon"
                variant="outline"
                onClick={prevTestimonial}
                className="pointer-events-auto border-primary/50 hover:bg-primary/10 hover:border-primary"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={nextTestimonial}
                className="pointer-events-auto border-primary/50 hover:bg-primary/10 hover:border-primary"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Testimonial Content */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center px-12"
            >
              {/* Before/After Images */}
              <div className="mb-6">
                {testimonials[currentIndex].type === 'transformation' ? (
                  <div className="flex gap-4 justify-center items-center">
                    <div className="relative">
                      <div className="w-48 h-48 rounded-lg overflow-hidden border-4 border-primary/20">
                        <img
                          src={testimonials[currentIndex].imageBefore}
                          alt="Before transformation"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-muted px-4 py-1 rounded-full">
                        <span className="text-sm font-semibold">Before</span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-48 h-48 rounded-lg overflow-hidden border-4 border-primary/20">
                        <img
                          src={testimonials[currentIndex].imageAfter}
                          alt="After transformation"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full">
                        <span className="text-sm font-semibold text-primary-foreground">After</span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Rating */}
              <div className="flex justify-center space-x-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed italic">
                "{testimonials[currentIndex].content}"
              </p>

              {/* Author */}
              <div>
                <p className="font-bold text-xl">{testimonials[currentIndex].name}</p>
                <p className="text-muted-foreground">{testimonials[currentIndex].role}</p>
              </div>
            </motion.div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
