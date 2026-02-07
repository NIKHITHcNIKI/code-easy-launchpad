import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Lightbulb, Wrench, Briefcase } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Expert Faculty',
    description: 'Learn from industry professionals and experienced educators who bring real-world insights to every class.',
  },
  {
    icon: Lightbulb,
    title: 'Holistic Development',
    description: 'Focus on critical thinking, creativity, and problem-solving skills that go beyond textbook learning.',
  },
  {
    icon: Wrench,
    title: 'Hands-on Learning Approach',
    description: 'Get practical experience through real-world projects and industry case studies that prepare you for the job market.',
  },
  {
    icon: Briefcase,
    title: 'Career Support & Placement Assistance',
    description: 'Comprehensive career services including resume building, interview preparation, and placement assistance.',
  },
];

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">What Sets Us Apart?</h2>
          <h3 className="text-xl text-primary font-semibold mb-4">Leading IT Training Institute in Tumkur</h3>
          <p className="section-subtitle">
            We're committed to providing the best learning experience for every student
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <motion.div
                className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 font-display">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;