import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import ctaBg from '@/assets/cta-bg.jpg';

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="cta-section"
      style={{ backgroundImage: `url(${ctaBg})` }}
    >
      <div className="cta-overlay" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-display">
            Start Your STEM Journey Today
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join our next Python bootcamp or Cybersecurity batch. Take the first step towards 
            a brighter future in tech.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-5 h-5" />
              Enroll Now
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-foreground font-semibold hover:bg-white/90 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5" />
              Contact Us Today
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;