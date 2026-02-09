import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Briefcase, Clock, Users, ArrowRight } from 'lucide-react';

// Course images
import stemImg from '@/assets/course-stem.jpg';
import technicalImg from '@/assets/course-technical.jpg';

const courseCategories = [
  {
    icon: GraduationCap,
    title: 'For School Students (Class 1–12)',
    tagline: 'Building Future Innovators',
    description: 'Comprehensive programs in coding, STEM, languages, and academics designed to spark curiosity and build strong foundations.',
    highlights: ['Coding for Kids', 'STEM Learning', 'Language Courses', 'Academic Tuition'],
    duration: '3-12 months',
    ageGroup: 'Class 1-12',
    image: stemImg,
    link: '/courses/school',
  },
  {
    icon: Briefcase,
    title: 'For College Students & Graduates',
    tagline: 'Job-Focused Training With Placement Assistance',
    description: 'Industry-ready courses in programming, cybersecurity, digital marketing, and cloud computing with placement support.',
    highlights: ['Web Development', 'Cybersecurity', 'Digital Marketing', 'Cloud Computing'],
    duration: '1-6 months',
    ageGroup: 'College & Graduates',
    image: technicalImg,
    link: '/courses/college',
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
          
          {/* Highlights */}
          <div className="flex flex-wrap gap-2 mb-4">
            {category.highlights.map((highlight) => (
              <span 
                key={highlight} 
                className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
              >
                {highlight}
              </span>
            ))}
          </div>
          
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
          
          {/* CTA */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Explore all courses
            </span>
            <div className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
              View Programs
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Courses = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();

  const handleCardClick = (category: CourseCategory) => {
    navigate(category.link);
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
    </section>
  );
};

export default Courses;