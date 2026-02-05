import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import buildingImg from '@/assets/code-easy-building.png';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="about" className="section-padding bg-muted" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title mb-6">About Code Easy</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Code Easy is a premier educational institute based in Tumkur, dedicated to making 
              quality education accessible to students of all ages. From young learners taking 
              their first steps in STEM to graduates preparing for competitive exams, we provide 
              comprehensive learning solutions.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our vision is to nurture the next generation of innovators, problem-solvers, and 
              leaders through practical, industry-relevant education. We believe in learning by 
              doing, and our curriculum reflects this philosophy.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
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
                alt="Code Easy Building - STEM Education and Training Center" 
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
