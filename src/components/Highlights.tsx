import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Code, BookOpen } from 'lucide-react';
import stemImg from '@/assets/stem-learning.jpg';
import techImg from '@/assets/technical-training.jpg';
import entranceImg from '@/assets/entrance-coaching.jpg';

const highlights = [
  {
    title: 'STEM Learning',
    description: 'Experience the Atom of STEM Learning for Grade 1-10. Coding for Kids, Robotics, Python & Web Development.',
    icon: GraduationCap,
    image: stemImg,
  },
  {
    title: 'Technical Courses',
    description: 'Master programming languages like C, Java, Python with hands-on projects and industry-relevant curriculum.',
    icon: Code,
    image: techImg,
  },
  {
    title: 'Entrance Coaching',
    description: 'Expert preparation for PGCET MCA, PGCET MBA and other competitive exams with proven success track record.',
    icon: BookOpen,
    image: entranceImg,
  },
];

const HighlightCard = ({ highlight, index }: { highlight: typeof highlights[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="feature-card group"
    >
      <div className="relative h-80 overflow-hidden">
        <img
          src={highlight.image}
          alt={highlight.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="feature-card-overlay" />
        
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-primary/90 flex items-center justify-center">
              <highlight.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">{highlight.title}</h3>
          </div>
          <p className="text-white/90 text-sm leading-relaxed">{highlight.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Highlights = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="section-padding bg-muted" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">What We Offer</h2>
          <p className="section-subtitle">
            Comprehensive learning programs designed to nurture talent and build future leaders
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <HighlightCard key={highlight.title} highlight={highlight} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
