import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import buildingImg from '@/assets/code-easy-building.png';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="about" className="section-padding bg-muted" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">About Codeeasy Tumkur</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold font-display mb-4 text-primary">Who We Are</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                As Tumkur's premier institute, our mission is to nurture talent by providing 
                interactive STEM classes and comprehensive IT training programs. We're dedicated 
                to making quality education accessible to students of all ages.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold font-display mb-4 text-primary">Our Vision</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                To equip our students with the skills needed for success in the digital age 
                and tech industries. We believe in learning by doing, and our curriculum 
                reflects this philosophy through hands-on projects and real-world applications.
              </p>
            </div>

            <motion.a
              href="#courses"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              whileHover={{ x: 5 }}
            >
              Learn More About Us
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary font-display">500+</p>
                <p className="text-sm text-muted-foreground">Students Taught</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary font-display">15+</p>
                <p className="text-sm text-muted-foreground">Courses Offered</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary font-display">95%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Building Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img 
                src={buildingImg} 
                alt="Codeeasy Building - STEM Education and IT Training Center in Tumkur" 
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;