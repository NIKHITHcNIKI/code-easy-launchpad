import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Atom, Code2, GraduationCap, Calculator, Languages, Brain, Clock, Users, ArrowRight } from 'lucide-react';

// Course images
import stemImg from '@/assets/course-stem.jpg';
import technicalImg from '@/assets/course-technical.jpg';
import entranceImg from '@/assets/course-entrance.jpg';
import financeImg from '@/assets/course-finance.jpg';
import languageImg from '@/assets/course-language.jpg';
import personalImg from '@/assets/course-personal.jpg';

const courseCategories = [
  {
    icon: Atom,
    title: 'STEM Learning',
    tagline: 'Experience the Atom of STEM Learning',
    description: 'Ignite curiosity and build future innovators with hands-on science, technology, engineering, and mathematics education.',
    courses: ['Coding for Kids', 'Scratch & Block Coding', 'Python Basics', 'Web Development', 'Robotics'],
    duration: '3-6 months',
    ageGroup: 'Grade 1-10',
    image: stemImg,
  },
  {
    icon: Code2,
    title: 'Technical Training',
    tagline: 'Master Industry-Ready Skills',
    description: 'Comprehensive programming courses designed to prepare you for a successful career in software development.',
    courses: ['C Programming', 'Java', 'Python Advanced', 'Data Structures', 'Algorithms'],
    duration: '4-8 months',
    ageGroup: 'PU & Degree',
    image: technicalImg,
  },
  {
    icon: GraduationCap,
    title: 'Entrance Coaching',
    tagline: 'Your Gateway to Success',
    description: 'Expert coaching for competitive entrance exams with proven strategies and comprehensive study materials.',
    courses: ['PGCET - MCA', 'PGCET - MBA', 'Competitive Exams', 'Mock Tests'],
    duration: '6-12 months',
    ageGroup: 'Graduates',
    image: entranceImg,
  },
  {
    icon: Calculator,
    title: 'Finance & Commerce',
    tagline: 'Build Business Acumen',
    description: 'Master the fundamentals of finance, accounting, and commerce to excel in the business world.',
    courses: ['Income Tax & GST', 'Accounts', 'Business Studies', 'Economics', 'Statistics'],
    duration: '3-6 months',
    ageGroup: 'PU & Degree',
    image: financeImg,
  },
  {
    icon: Languages,
    title: 'Language Courses',
    tagline: 'Communicate with Confidence',
    description: 'Learn regional and classical languages to enhance communication skills and cultural understanding.',
    courses: ['Kannada', 'Sanskrit', 'Hindi', 'Grammar', 'Literature'],
    duration: '3-4 months',
    ageGroup: 'All Ages',
    image: languageImg,
  },
  {
    icon: Brain,
    title: 'Personal Development',
    tagline: 'Unlock Your Potential',
    description: 'Develop essential life skills, emotional intelligence, and mindfulness for holistic personal growth.',
    courses: ['Meditation', 'Psychology', 'Soft Skills', 'Public Speaking'],
    duration: '2-3 months',
    ageGroup: 'All Ages',
    image: personalImg,
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
      <div className="relative rounded-2xl overflow-hidden bg-card border border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
        {/* Image Section */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Icon Badge */}
          <div className="absolute top-4 left-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <category.icon className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          
          {/* Title on Image */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white font-display mb-1">{category.title}</h3>
            <p className="text-white/80 text-sm">{category.tagline}</p>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-6">
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            {category.description}
          </p>
          
          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span>{category.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-4 h-4 text-primary" />
              <span>{category.ageGroup}</span>
            </div>
          </div>
          
          {/* Course Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {category.courses.slice(0, 3).map((course) => (
              <span
                key={course}
                className="px-3 py-1 text-xs font-medium rounded-full bg-accent text-accent-foreground"
              >
                {course}
              </span>
            ))}
            {category.courses.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                +{category.courses.length - 3} more
              </span>
            )}
          </div>
          
          {/* CTA Button */}
          <motion.a
            href="#contact"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium transition-all duration-300 hover:bg-primary/90"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Enroll Now
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
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
