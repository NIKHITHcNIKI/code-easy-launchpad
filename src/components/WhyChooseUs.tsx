import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Target, Wallet, Award, Clock, HeartHandshake } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Experienced Mentors',
    description: 'Learn from industry experts and qualified educators with years of teaching experience.',
  },
  {
    icon: Target,
    title: 'Practical Learning',
    description: 'Hands-on projects and real-world applications to reinforce theoretical concepts.',
  },
  {
    icon: Wallet,
    title: 'Affordable Fees',
    description: 'Quality education at competitive prices, making learning accessible to everyone.',
  },
  {
    icon: Award,
    title: 'Proven Results',
    description: 'Track record of student success in competitive exams and career placements.',
  },
  {
    icon: Clock,
    title: 'Flexible Timing',
    description: 'Batch timings designed to accommodate school, college, and working professionals.',
  },
  {
    icon: HeartHandshake,
    title: 'Personal Attention',
    description: 'Small batch sizes ensuring individual attention and personalized guidance.',
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
          <h2 className="section-title mb-4">Why Choose Code Easy?</h2>
          <p className="section-subtitle">
            We're committed to providing the best learning experience for every student
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
