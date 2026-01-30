import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Atom, Code2, GraduationCap, Calculator, Languages, Brain } from 'lucide-react';

const courseCategories = [
  {
    icon: Atom,
    title: 'STEM Learning',
    tagline: 'Experience the Atom of STEM Learning',
    courses: ['Coding for Kids', 'Scratch & Block Coding', 'Python', 'Web Development', 'Robotics'],
    color: 'from-rose-500 to-red-600',
  },
  {
    icon: Code2,
    title: 'Technical Training',
    tagline: 'Master Industry-Ready Skills',
    courses: ['C Programming', 'Java', 'Python Advanced', 'Data Structures', 'Algorithms'],
    color: 'from-red-500 to-rose-600',
  },
  {
    icon: GraduationCap,
    title: 'Entrance Coaching',
    tagline: 'Your Gateway to Success',
    courses: ['PGCET - MCA', 'PGCET - MBA', 'Competitive Exams'],
    color: 'from-rose-600 to-red-700',
  },
  {
    icon: Calculator,
    title: 'Finance & Commerce',
    tagline: 'Build Business Acumen',
    courses: ['Income Tax & GST', 'Accounts', 'Business', 'Economics', 'Statistics'],
    color: 'from-red-600 to-rose-700',
  },
  {
    icon: Languages,
    title: 'Language Courses',
    tagline: 'Communicate with Confidence',
    courses: ['Kannada', 'Sanskrit', 'Hindi'],
    color: 'from-rose-500 to-red-500',
  },
  {
    icon: Brain,
    title: 'Personal Development',
    tagline: 'Unlock Your Potential',
    courses: ['Meditation', 'Psychology', 'Soft Skills'],
    color: 'from-red-500 to-rose-600',
  },
];

const CourseCard = ({ category, index }: { category: typeof courseCategories[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative p-6 rounded-2xl bg-card border border-border overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
        {/* Gradient Accent */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color}`} />
        
        {/* Icon */}
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <category.icon className="w-7 h-7 text-white" />
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-bold mb-1 font-display">{category.title}</h3>
        <p className="text-sm text-primary font-medium mb-4">{category.tagline}</p>
        
        {/* Course List */}
        <ul className="space-y-2">
          {category.courses.map((course) => (
            <li key={course} className="flex items-center text-muted-foreground text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
              {course}
            </li>
          ))}
        </ul>
        
        {/* Learn More */}
        <motion.a
          href="#contact"
          className="mt-6 inline-flex items-center text-primary font-medium text-sm group/link"
          whileHover={{ x: 5 }}
        >
          Learn More
          <svg className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>
      </div>
    </motion.div>
  );
};

const Courses = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="courses" className="section-padding bg-muted" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">Our Courses</h2>
          <p className="section-subtitle">
            Explore our diverse range of courses designed for learners at every level
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courseCategories.map((category, index) => (
            <CourseCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
