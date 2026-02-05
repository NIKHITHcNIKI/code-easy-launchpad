import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Atom, Code2, GraduationCap, Calculator, Languages, Brain, Clock, Users, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
    courses: [
      { name: 'Coding for Kids', duration: '3 months', level: 'Beginner', description: 'Introduction to programming concepts through fun games and activities' },
      { name: 'Scratch & Block Coding', duration: '2 months', level: 'Beginner', description: 'Visual programming for young minds using drag-and-drop blocks' },
      { name: 'Python Basics', duration: '4 months', level: 'Intermediate', description: 'Learn Python programming from scratch with projects' },
      { name: 'Web Development', duration: '6 months', level: 'Intermediate', description: 'Build websites using HTML, CSS, and JavaScript' },
      { name: 'Robotics', duration: '4 months', level: 'Intermediate', description: 'Hands-on robotics with Arduino and sensors' },
    ],
    duration: '3-6 months',
    ageGroup: 'Grade 1-10',
    image: stemImg,
  },
  {
    icon: Code2,
    title: 'Technical Training',
    tagline: 'Master Industry-Ready Skills',
    description: 'Comprehensive programming courses designed to prepare you for a successful career in software development.',
    courses: [
      { name: 'C Programming', duration: '3 months', level: 'Beginner', description: 'Foundation of programming with C language' },
      { name: 'Java', duration: '4 months', level: 'Intermediate', description: 'Object-oriented programming with Java' },
      { name: 'Python Advanced', duration: '4 months', level: 'Advanced', description: 'Advanced Python with libraries and frameworks' },
      { name: 'Data Structures', duration: '3 months', level: 'Intermediate', description: 'Essential data structures for efficient coding' },
      { name: 'Algorithms', duration: '3 months', level: 'Advanced', description: 'Algorithm design and problem-solving techniques' },
    ],
    duration: '4-8 months',
    ageGroup: 'PU & Degree',
    image: technicalImg,
  },
  {
    icon: GraduationCap,
    title: 'Entrance Coaching',
    tagline: 'Your Gateway to Success',
    description: 'Expert coaching for competitive entrance exams with proven strategies and comprehensive study materials.',
    courses: [
      { name: 'PGCET - MCA', duration: '6 months', level: 'Advanced', description: 'Complete preparation for PGCET MCA entrance exam' },
      { name: 'PGCET - MBA', duration: '6 months', level: 'Advanced', description: 'Comprehensive MBA entrance coaching' },
      { name: 'Competitive Exams', duration: '4 months', level: 'Intermediate', description: 'General aptitude and reasoning preparation' },
      { name: 'Mock Tests', duration: 'Ongoing', level: 'All Levels', description: 'Regular practice tests with detailed analysis' },
    ],
    duration: '6-12 months',
    ageGroup: 'Graduates',
    image: entranceImg,
  },
  {
    icon: Calculator,
    title: 'Finance & Commerce',
    tagline: 'Build Business Acumen',
    description: 'Master the fundamentals of finance, accounting, and commerce to excel in the business world.',
    courses: [
      { name: 'Income Tax & GST', duration: '3 months', level: 'Intermediate', description: 'Practical knowledge of Indian taxation system' },
      { name: 'Accounts', duration: '4 months', level: 'Beginner', description: 'Fundamentals of accounting and bookkeeping' },
      { name: 'Business Studies', duration: '3 months', level: 'Beginner', description: 'Core business concepts and management' },
      { name: 'Economics', duration: '3 months', level: 'Intermediate', description: 'Micro and macroeconomics principles' },
      { name: 'Statistics', duration: '2 months', level: 'Intermediate', description: 'Statistical analysis and data interpretation' },
    ],
    duration: '3-6 months',
    ageGroup: 'PU & Degree',
    image: financeImg,
  },
  {
    icon: Languages,
    title: 'Language Courses',
    tagline: 'Communicate with Confidence',
    description: 'Learn regional and classical languages to enhance communication skills and cultural understanding.',
    courses: [
      { name: 'Kannada', duration: '3 months', level: 'All Levels', description: 'Learn Kannada for academics and daily communication' },
      { name: 'Sanskrit', duration: '4 months', level: 'Beginner', description: 'Classical Sanskrit language and literature' },
      { name: 'Hindi', duration: '3 months', level: 'All Levels', description: 'Hindi language proficiency for all levels' },
      { name: 'Grammar', duration: '2 months', level: 'All Levels', description: 'Master grammar rules and sentence structure' },
      { name: 'Literature', duration: '3 months', level: 'Intermediate', description: 'Explore classic and modern literature' },
    ],
    duration: '3-4 months',
    ageGroup: 'All Ages',
    image: languageImg,
  },
  {
    icon: Brain,
    title: 'Personal Development',
    tagline: 'Unlock Your Potential',
    description: 'Develop essential life skills, emotional intelligence, and mindfulness for holistic personal growth.',
    courses: [
      { name: 'Meditation', duration: '2 months', level: 'Beginner', description: 'Mindfulness and stress management techniques' },
      { name: 'Psychology', duration: '3 months', level: 'Intermediate', description: 'Understanding human behavior and emotions' },
      { name: 'Soft Skills', duration: '2 months', level: 'All Levels', description: 'Communication, teamwork, and leadership' },
      { name: 'Public Speaking', duration: '2 months', level: 'Beginner', description: 'Overcome fear and speak with confidence' },
    ],
    duration: '2-3 months',
    ageGroup: 'All Ages',
    image: personalImg,
  },
];

type CourseCategory = typeof courseCategories[0];

const CourseCard = ({ 
  category, 
  index, 
  onClick 
}: { 
  category: CourseCategory; 
  index: number; 
  onClick: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative rounded-2xl overflow-hidden bg-card border border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/30">
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

          {/* View Courses Badge */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="px-3 py-1.5 rounded-full bg-white/90 text-foreground text-xs font-medium">
              View Courses →
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
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
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
          
          {/* Course Count */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {category.courses.length} courses available
            </span>
            <div className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
              Explore
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CourseModal = ({ 
  category, 
  isOpen, 
  onClose 
}: { 
  category: CourseCategory | null; 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  if (!category) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        {/* Colorful Stripe */}
        <div className="flex h-1.5 w-full">
          <div className="flex-1 bg-red-500" />
          <div className="flex-1 bg-blue-500" />
          <div className="flex-1 bg-yellow-400" />
          <div className="flex-1 bg-green-500" />
        </div>
        
        {/* Header with Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <category.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white font-display">{category.title}</h2>
                <p className="text-white/80 text-sm">{category.tagline}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-muted-foreground mb-6">{category.description}</p>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{category.duration}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{category.ageGroup}</span>
            </div>
          </div>

          {/* Courses List */}
          <h3 className="text-lg font-semibold mb-4 font-display">Available Courses</h3>
          <div className="space-y-3">
            {category.courses.map((course, index) => (
              <motion.div
                key={course.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold">{course.name}</h4>
                    <span className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground">
                      {course.level}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <motion.a
              href="#contact"
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-primary-foreground font-semibold transition-all duration-300 hover:bg-primary/90"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Enroll Now
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-border font-semibold transition-all duration-300 hover:bg-muted"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Ask on WhatsApp
            </motion.a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Courses = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (category: CourseCategory) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

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
            Click on any category to explore courses and enroll
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courseCategories.map((category, index) => (
            <CourseCard 
              key={category.title} 
              category={category} 
              index={index}
              onClick={() => handleCardClick(category)}
            />
          ))}
        </div>
      </div>

      <CourseModal 
        category={selectedCategory}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Courses;
