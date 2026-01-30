import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Mail, Phone, Award } from 'lucide-react';

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

          {/* Right - Mentor Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold font-display">Meet Our Mentor</h3>
              </div>

              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-red-700 flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-white font-display">M</span>
                </div>
                <h4 className="text-xl font-semibold mb-1">Expert Faculty</h4>
                <p className="text-sm text-muted-foreground mb-4">Founder & Lead Instructor</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Qualifications</p>
                    <p className="text-sm text-muted-foreground">M.Tech, B.Ed with 10+ years teaching experience</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Location</p>
                    <p className="text-sm text-muted-foreground">Tumkur, Karnataka</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
