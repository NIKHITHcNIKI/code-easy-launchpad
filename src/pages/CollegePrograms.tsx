import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Code, 
  Shield, 
  TrendingUp, 
  Cloud,
  ArrowLeft, 
  ArrowRight,
  Clock,
  Users
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const collegeCategories = [
  {
    icon: Code,
    title: 'Programming & Web Dev',
    tagline: 'Full Stack Development',
    description: 'Master front-end, back-end, and full-stack development with modern technologies and frameworks.',
    courses: ['HTML/CSS/JS', 'React', 'Node.js', 'Python', 'Database'],
    duration: '6 months',
    audience: 'Graduates',
    link: null,
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    tagline: 'Secure the Digital World',
    description: 'Learn network security, ethical hacking, threat analysis, and security operations.',
    courses: ['Ethical Hacking', 'Network Security', 'Threat Analysis', 'SOC Operations'],
    duration: '4 months',
    audience: 'IT Students',
    link: null,
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    tagline: 'Drive Business Growth',
    description: 'Master SEO, SEM, social media marketing, content strategy, and analytics.',
    courses: ['SEO', 'Google Ads', 'Social Media', 'Content Marketing', 'Analytics'],
    duration: '3 months',
    audience: 'All Graduates',
    link: null,
  },
  {
    icon: Cloud,
    title: 'Cloud & IT',
    tagline: 'Enterprise Technology',
    description: 'Cloud computing, software testing, and essential IT skills for modern workplaces.',
    courses: ['AWS', 'Azure', 'Software Testing', 'IT Fundamentals', 'Excel/Tally'],
    duration: '2-4 months',
    audience: 'All Graduates',
    link: null,
  },
];

const CategoryCard = ({ 
  category, 
  index 
}: { 
  category: typeof collegeCategories[0]; 
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
      window.location.href = '/#contact';
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
              <span>{category.audience}</span>
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
            Enquire Now
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CollegePrograms = () => {
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
              <Briefcase className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-display">
                College & Graduate Programs
              </h1>
              <p className="text-muted-foreground">Job-Focused Training With Placement Assistance</p>
            </div>
          </motion.div>
          
          <p className="text-lg text-muted-foreground max-w-2xl">
            Industry-ready courses designed to help you land your dream job with 
            comprehensive placement support and hands-on training.
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
              Choose Your Career Path
            </h2>
            <p className="text-muted-foreground">
              Explore our specialized programs with placement assistance
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {collegeCategories.map((category, index) => (
              <CategoryCard 
                key={category.title} 
                category={category} 
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Placement Assistance</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Hiring Partners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-muted-foreground">Students Placed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold font-display mb-4">
            Ready to Start Your Career?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Contact us to learn more about our programs and start your journey towards a successful career.
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

export default CollegePrograms;
