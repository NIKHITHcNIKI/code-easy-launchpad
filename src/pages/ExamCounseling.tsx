import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowLeft, ArrowRight, Clock, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import courseExamImg from '@/assets/course-exam-counseling.jpg';
import coursePgcetImg from '@/assets/course-pgcet.jpg';
import coursePgcetMbaImg from '@/assets/course-pgcet-mba.jpg';

const examCourses = [
  {
    title: 'PGCET M.Tech Entrance',
    description: 'Structured preparation for PGCET M.Tech entrance exam with expert coaching, mock tests, and proven strategies to crack the exam.',
    image: coursePgcetImg,
    duration: '3 months',
    audience: 'Engineering Graduates',
  },
  {
    title: 'PGCET MBA Entrance',
    description: 'Comprehensive MBA entrance preparation covering quantitative aptitude, verbal ability, logical reasoning, and GD/PI training.',
    image: coursePgcetMbaImg,
    duration: '3 months',
    audience: 'All Graduates',
  },
];

const CourseCard = ({ course, index }: { course: typeof examCourses[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={() => window.location.href = '/#contact'}
    >
      <div className="relative rounded-2xl overflow-hidden bg-card border border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/30 h-full">
        <div className="h-56 overflow-hidden">
          <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold font-display mb-2">{course.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{course.description}</p>
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-4 h-4 text-primary" />
              <span>{course.audience}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
            Enquire Now
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ExamCounseling = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 bg-muted overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={courseExamImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <button
            onClick={() => navigate('/courses/college')}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to College Programs
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
              <h1 className="text-3xl md:text-4xl font-bold font-display">Executive Exam Counseling</h1>
              <p className="text-muted-foreground">Crack Competitive Entrance Exams</p>
            </div>
          </motion.div>

          <p className="text-lg text-muted-foreground max-w-2xl">
            Expert guidance and structured preparation for PGCET and MBA entrance exams with proven strategies.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-background" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">Entrance Exam Programs</h2>
            <p className="text-muted-foreground">Choose your entrance exam preparation path</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {examCourses.map((course, index) => (
              <CourseCard key={course.title} course={course} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold font-display mb-4">Ready to Crack the Exam?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Contact us to learn more about our entrance exam coaching programs.
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

export default ExamCounseling;
