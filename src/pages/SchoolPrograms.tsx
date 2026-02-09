import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Code, 
  Microscope, 
  Languages, 
  ArrowLeft, 
  ArrowRight,
  Clock,
  Users
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import stemImg from '@/assets/course-stem.jpg';

const schoolCategories = [
  {
    icon: GraduationCap,
    title: 'Classes 1–10',
    tagline: 'Foundation Learning',
    description: 'Strong academic foundation with PCMB tuition, competitive exam coaching, and project support for CBSE, ICSE, and State Board students.',
    courses: ['PCMB Tuition', 'Olympiad Prep', 'NTSE Coaching', 'Project Support', 'After-School Programs'],
    duration: 'Academic Year',
    ageGroup: 'Class 1-10',
    link: null,
  },
  {
    icon: Code,
    title: 'Coding for Kids',
    tagline: 'Build the Future',
    description: 'Learn programming through fun, interactive courses designed for young minds. From visual coding to web development.',
    courses: ['Scratch Programming', 'Block Coding', 'Web Development', 'Robotics'],
    duration: '3-6 months',
    ageGroup: 'Class 3-12',
    link: null,
  },
  {
    icon: Microscope,
    title: 'STEM Learning',
    tagline: 'Science, Technology, Engineering & Arts',
    description: 'Hands-on learning experiences in science, technology, engineering, and creative arts through experiments and projects.',
    courses: ['Science Clubs', 'Art & Craft', 'Summer Camps', 'Workshops'],
    duration: 'Ongoing',
    ageGroup: 'All Ages',
    link: null,
  },
  {
    icon: Languages,
    title: 'Language Courses',
    tagline: 'Master Multiple Languages',
    description: 'Comprehensive language courses to help students excel in regional and national languages with expert instructors.',
    courses: ['Kannada', 'Sanskrit', 'Hindi'],
    duration: '3-6 months',
    ageGroup: 'Class 1-12',
    link: '/courses/languages',
  },
];

const CategoryCard = ({ 
  category, 
  index 
}: { 
  category: typeof schoolCategories[0]; 
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const navigate = useNavigate();

  const handleClick = () => {
    if (category.link) {
      navigate(category.link);
    } else {
      // Scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative rounded-2xl overflow-hidden bg-card border border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/30 h-full">
        {/* Icon Badge */}
        <div className="p-6">
          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center shadow-lg mb-4">
            <category.icon className="w-7 h-7 text-primary-foreground" />
          </div>

          <h3 className="text-xl font-bold font-display mb-1">{category.title}</h3>
          <p className="text-primary text-sm font-medium mb-3">{category.tagline}</p>
          
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
          <div className="flex flex-wrap gap-2 mb-4">
            {category.courses.map((course) => (
              <span 
                key={course} 
                className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
              >
                {course}
              </span>
            ))}
          </div>
          
          {/* CTA */}
          <div className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
            {category.link ? 'View Courses' : 'Enquire Now'}
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SchoolPrograms = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 bg-muted">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-display">
                School Programs
              </h1>
              <p className="text-muted-foreground">For Students Class 1–12</p>
            </div>
          </motion.div>
          
          <p className="text-lg text-muted-foreground max-w-2xl">
            Comprehensive programs designed to spark curiosity and build strong foundations 
            in academics, coding, STEM, and languages.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-background" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-muted-foreground">
              Explore our specialized programs tailored for school students
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {schoolCategories.map((category, index) => (
              <CategoryCard 
                key={category.title} 
                category={category} 
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold font-display mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Contact us to learn more about our programs and find the perfect fit for your child.
          </p>
          <motion.a
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold transition-all duration-300 hover:bg-primary/90"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SchoolPrograms;
