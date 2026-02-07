import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { GraduationCap, Briefcase, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

// Course images
import stemImg from '@/assets/course-stem.jpg';
import technicalImg from '@/assets/course-technical.jpg';

const courseCategories = [
  {
    icon: GraduationCap,
    title: 'For School Students (Class 1–12)',
    tagline: 'Building Future Innovators',
    description: 'Comprehensive programs designed to spark curiosity and build strong foundations in STEM education.',
    courses: [
      { name: 'Robotics', duration: '3 months', level: 'All Levels', description: 'Hands-on robotics with Arduino and sensors' },
      { name: 'Coding (Scratch/Python)', duration: '4 months', level: 'Beginner', description: 'Visual and text-based programming for young minds' },
      { name: 'Science Clubs', duration: 'Ongoing', level: 'All Levels', description: 'Weekly science experiments and projects' },
      { name: 'PCMB Tuition (CBSE, ICSE, State Board)', duration: 'Academic Year', level: 'All Levels', description: 'Subject-wise coaching for all boards' },
      { name: 'Competitive Exam Coaching', duration: '6 months', level: 'Intermediate', description: 'Olympiad and NTSE preparation' },
      { name: 'After-School Programs & Workshops', duration: 'Ongoing', level: 'All Levels', description: 'Skill-building activities and workshops' },
      { name: 'Project Support', duration: 'As needed', level: 'All Levels', description: 'Help with school projects and assignments' },
      { name: 'Summer Camps', duration: '1-2 months', level: 'All Levels', description: 'Intensive learning during summer break' },
    ],
    duration: '3-12 months',
    ageGroup: 'Class 1-12',
    image: stemImg,
  },
  {
    icon: Briefcase,
    title: 'For College Students & Graduates',
    tagline: 'Job-Focused Training With Placement Assistance',
    description: 'Industry-ready courses designed to help you land your dream job with comprehensive placement support.',
    courses: [
      { name: 'Programming & Web Development', duration: '6 months', level: 'Beginner to Advanced', description: 'Full-stack development with modern technologies' },
      { name: 'Cybersecurity', duration: '4 months', level: 'Intermediate', description: 'Network security, ethical hacking, and threat analysis' },
      { name: 'Digital Marketing', duration: '3 months', level: 'Beginner', description: 'SEO, SEM, social media marketing, and analytics' },
      { name: 'Software Testing', duration: '3 months', level: 'Beginner', description: 'Manual and automation testing techniques' },
      { name: 'IT Fundamentals', duration: '2 months', level: 'Beginner', description: 'Core IT concepts and computer basics' },
      { name: 'Cloud Computing', duration: '4 months', level: 'Intermediate', description: 'AWS, Azure, and cloud infrastructure' },
      { name: 'Advanced Excel & Tally', duration: '2 months', level: 'Beginner', description: 'Business tools for accounting and data analysis' },
      { name: 'Basic Computer Courses', duration: '1 month', level: 'Beginner', description: 'MS Office, internet basics, and typing' },
    ],
    duration: '1-6 months',
    ageGroup: 'College & Graduates',
    image: technicalImg,
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
        <div className="relative h-56 overflow-hidden">
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
              Learn More
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
        <div className="flex h-4 w-full absolute top-0 left-0 right-0 z-10">
          <div className="flex-1 bg-[#e53935]" />
          <div className="flex-1 bg-[#1e88e5]" />
          <div className="flex-1 bg-[#fdd835]" />
          <div className="flex-1 bg-[#43a047]" />
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
          <h2 className="section-title mb-4">Our Featured Programs</h2>
          <p className="section-subtitle">
            Click on any category to explore courses and enroll
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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