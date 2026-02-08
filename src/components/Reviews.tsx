import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Plus, Send, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Review {
  id?: string;
  student_name: string;
  rating: number;
  comment: string;
  status?: string;
  created_at?: string;
}

const initialTestimonials: Review[] = [
  {
    student_name: 'Priya Sharma',
    rating: 5,
    comment: 'Code Easy transformed my preparation journey. The mentors were incredibly supportive and the study materials were comprehensive. I cleared PGCET with a top rank!',
  },
  {
    student_name: 'Rahul Kumar',
    rating: 5,
    comment: 'My son has developed a genuine love for coding thanks to Code Easy. The interactive teaching methods keep him engaged and excited about learning.',
  },
  {
    student_name: 'Anjali Reddy',
    rating: 5,
    comment: 'The practical approach to teaching programming made all the difference. I now work as a software developer, and I owe my success to Code Easy.',
  },
  {
    student_name: 'Suresh Gowda',
    rating: 5,
    comment: 'The accounting and taxation courses are well-structured and easy to understand. The faculty explains complex concepts in simple terms.',
  },
];

// Interactive Star Rating Component
const StarRating = ({ 
  rating, 
  onRatingChange, 
  interactive = false,
  size = 'sm'
}: { 
  rating: number; 
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
  size?: 'sm' | 'lg';
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const starSize = size === 'lg' ? 'w-8 h-8' : 'w-4 h-4';

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRatingChange?.(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
        >
          <Star
            className={`${starSize} transition-colors ${
              star <= (hoverRating || rating)
                ? 'fill-primary text-primary'
                : 'fill-muted text-muted-foreground/30'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

// Review Form Component
const ReviewForm = ({ onSubmit, onClose, isSubmitting }: { onSubmit: (review: Review) => void; onClose: () => void; isSubmitting: boolean }) => {
  const [student_name, setStudentName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        description: "Click on the stars to rate your experience",
        variant: "destructive",
      });
      return;
    }

    onSubmit({ student_name, comment, rating });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Star Rating */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-3">How would you rate your experience?</p>
        <div className="flex justify-center">
          <StarRating rating={rating} onRatingChange={setRating} interactive size="lg" />
        </div>
        {rating > 0 && (
          <p className="text-sm text-primary mt-2 font-medium">
            {rating === 5 ? 'Excellent!' : rating === 4 ? 'Great!' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Poor'}
          </p>
        )}
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-2">Your Name</label>
        <input
          type="text"
          value={student_name}
          onChange={(e) => setStudentName(e.target.value)}
          required
          maxLength={100}
          className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          placeholder="Enter your name"
        />
      </div>

      {/* Review Content */}
      <div>
        <label className="block text-sm font-medium mb-2">Your Review</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          maxLength={1000}
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
          placeholder="Share your experience with Code Easy..."
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-primary-foreground font-semibold transition-all duration-300 hover:bg-primary/90 disabled:opacity-50"
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
      >
        {isSubmitting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </motion.button>
    </form>
  );
};

const Reviews = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Review[]>(initialTestimonials);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch approved reviews from database
  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
        return;
      }

      if (data && data.length > 0) {
        setTestimonials([...data, ...initialTestimonials]);
      }
    };

    fetchReviews();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleAddReview = async (review: Review) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-review`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({
            student_name: review.student_name.trim(),
            rating: review.rating,
            comment: review.comment.trim(),
          }),
        }
      );

      const data = await response.json();
      setIsSubmitting(false);

      if (!response.ok) {
        toast({
          title: "Error submitting review",
          description: data.error || "Please try again later.",
          variant: "destructive",
        });
        return;
      }
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Error submitting review",
        description: "Please try again later.",
        variant: "destructive",
      });
      return;
    }

    setIsDialogOpen(false);
    toast({
      title: "Thank you for your review! ⭐",
      description: "Your review has been submitted and is pending approval.",
    });
  };

  return (
    <section id="reviews" className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">What Our Students Say</h2>
          <p className="section-subtitle mb-8">
            Real stories from our students and parents who experienced the Code Easy difference
          </p>

          {/* Write Review Button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all duration-300 hover:bg-primary/90"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5" />
                Write a Review
              </motion.button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-display flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Share Your Experience
                </DialogTitle>
              </DialogHeader>
              <ReviewForm 
                onSubmit={handleAddReview} 
                onClose={() => setIsDialogOpen(false)}
                isSubmitting={isSubmitting}
              />
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.slice(0, 4).map((testimonial, index) => (
            <motion.div
              key={`${testimonial.student_name}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="testimonial-card relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              
              {/* Stars */}
              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>
              
              {/* Content */}
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                "{testimonial.comment}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {testimonial.student_name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.student_name}</p>
                  <p className="text-xs text-muted-foreground">Student</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show more reviews if available */}
        {testimonials.length > 4 && (
          <div className="hidden md:block mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.slice(4, 8).map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.student_name}-extra-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: (index + 4) * 0.1 }}
                  className="testimonial-card relative"
                >
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
                  
                  <div className="mb-4">
                    <StarRating rating={testimonial.rating} />
                  </div>
                  
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold">
                        {testimonial.student_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.student_name}</p>
                      <p className="text-xs text-muted-foreground">Student</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="testimonial-card"
          >
            <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
            
            <div className="mb-4">
              <StarRating rating={testimonials[currentIndex].rating} />
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              "{testimonials[currentIndex].comment}"
            </p>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-lg">
                  {testimonials[currentIndex].student_name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold">{testimonials[currentIndex].student_name}</p>
                <p className="text-sm text-muted-foreground">Student</p>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary' : 'bg-border'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-primary font-display">{testimonials.length}+</p>
            <p className="text-sm text-muted-foreground">Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary font-display">4.9</p>
            <p className="text-sm text-muted-foreground">Avg Rating</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary font-display">98%</p>
            <p className="text-sm text-muted-foreground">Recommend Us</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
