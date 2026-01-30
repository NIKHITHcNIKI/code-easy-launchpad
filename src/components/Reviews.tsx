import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Plus, Send, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface Review {
  name: string;
  role: string;
  content: string;
  rating: number;
}

const initialTestimonials: Review[] = [
  {
    name: 'Priya Sharma',
    role: 'PGCET MCA - Rank 24',
    content: 'Code Easy transformed my preparation journey. The mentors were incredibly supportive and the study materials were comprehensive. I cleared PGCET with a top rank!',
    rating: 5,
  },
  {
    name: 'Rahul Kumar',
    role: 'Parent of Grade 5 Student',
    content: 'My son has developed a genuine love for coding thanks to Code Easy. The interactive teaching methods keep him engaged and excited about learning.',
    rating: 5,
  },
  {
    name: 'Anjali Reddy',
    role: 'Python Course Graduate',
    content: 'The practical approach to teaching programming made all the difference. I now work as a software developer, and I owe my success to Code Easy.',
    rating: 5,
  },
  {
    name: 'Suresh Gowda',
    role: 'Commerce Student',
    content: 'The accounting and taxation courses are well-structured and easy to understand. The faculty explains complex concepts in simple terms.',
    rating: 5,
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
const ReviewForm = ({ onSubmit, onClose }: { onSubmit: (review: Review) => void; onClose: () => void }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [content, setContent] = useState('');
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

    onSubmit({ name, role, content, rating });
    
    // Reset form
    setName('');
    setRole('');
    setContent('');
    setRating(0);
    onClose();
    
    toast({
      title: "Thank you for your review! ⭐",
      description: "Your feedback helps us improve and inspire other students.",
    });
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          placeholder="Enter your name"
        />
      </div>

      {/* Role/Course */}
      <div>
        <label className="block text-sm font-medium mb-2">Course / Role</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          placeholder="e.g., Python Course Student, Parent"
        />
      </div>

      {/* Review Content */}
      <div>
        <label className="block text-sm font-medium mb-2">Your Review</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
          placeholder="Share your experience with Code Easy..."
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-primary-foreground font-semibold transition-all duration-300 hover:bg-primary/90"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Send className="w-5 h-5" />
        Submit Review
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

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleAddReview = (review: Review) => {
    setTestimonials([review, ...testimonials]);
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
              />
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.slice(0, 4).map((testimonial, index) => (
            <motion.div
              key={`${testimonial.name}-${index}`}
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
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
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
                  key={`${testimonial.name}-extra-${index}`}
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
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
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
              "{testimonials[currentIndex].content}"
            </p>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-lg">
                  {testimonials[currentIndex].name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold">{testimonials[currentIndex].name}</p>
                <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</p>
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
