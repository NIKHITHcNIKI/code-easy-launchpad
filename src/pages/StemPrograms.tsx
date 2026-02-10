import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Microscope, 
  Palette, 
  Languages, 
  ArrowLeft, 
  ArrowRight,
  Clock,
  Users
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import artImg from '@/assets/course-art.jpg';
import languageImg from '@/assets/course-language.jpg';

const stemCategories = [
  {
    icon: Palette,
    title: 'Art & Craft',
    tagline: 'Unleash Creativity',
    description: 'Explore painting, drawing, sculpture, and mixed media through hands-on creative workshops that nurture artistic expression and imagination.',
    courses: ['Painting', 'Drawing', 'Sculpture', 'Mixed Media', 'Craft Projects'],
    duration: 'Ongoing',
    ageGroup: 'All Ages',
    image: artImg,
    link: null,
  },
  {
    icon: Languages,
    title: 'Language Course',
    tagline: 'Master Multiple Languages',
    description: 'Comprehensive language courses to help students excel in Kannada, English, and Hindi with expert instructors and proven methods.',
    courses: ['Kannada', 'English', 'Hindi'],
    duration: '3-6 months',
    ageGroup: 'Class 1-12',
    image: languageImg,
    link: '/courses/languages',
  },
];

const CategoryCard = ({ 
  category, 
  index 
}: { 
  category: typeof stemCategories[0]; 
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const navigate = useNavigate();

  const handleClick = () => {
    if (category.link) {
      navigate(category.link);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/#contact');
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative rounded-2xl overflow-hidden bg-card border border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/30 h-full">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={category.image} 
            alt={category.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <category.icon className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold font-display mb-1">{category.title}</h3>
          <p className="text-primary text-sm font-medium mb-3">{category.tagline}</p>
          
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            {category.description}
          </p>
          
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
          
          <div className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
            {category.link ? 'View Courses' : 'Enquire Now'}
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const StemPrograms = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="relative pt-24 pb-12 bg-muted overflow-hidden">
        {/* Signature color stripe */}
        <div className="absolute top-0 left-0 right-0 flex h-1">
          <div className="flex-1 bg-red-500" />
          <div className="flex-1 bg-blue-500" />
          <div className="flex-1 bg-yellow-400" />
          <div className="flex-1 bg-green-500" />
        </div>
        <div className="container mx-auto px-4">
          <button 
            onClick={() => navigate('/courses/school')}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to School Programs
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center">
              <Microscope className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-display">
                STEM Learning
              </h1>
              <p className="text-muted-foreground">Science, Technology, Engineering & Arts</p>
            </div>
          </motion.div>
          
          <p className="text-lg text-muted-foreground max-w-2xl">
            Hands-on learning experiences in creative arts and languages through 
            expert-led workshops and comprehensive courses.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
              Explore Our Programs
            </h2>
            <p className="text-muted-foreground">
              Choose from creative arts or language mastery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {stemCategories.map((category, index) => (
              <CategoryCard 
                key={category.title} 
                category={category} 
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold font-display mb-4">
            Ready to Explore?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Contact us to learn more about our STEM programs and find the perfect fit.
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

export default StemPrograms;
