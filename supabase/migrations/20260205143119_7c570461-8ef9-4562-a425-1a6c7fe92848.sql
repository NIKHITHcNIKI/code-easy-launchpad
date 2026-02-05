-- Create reviews table for storing student feedback
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read reviews (public testimonials)
CREATE POLICY "Anyone can view reviews"
ON public.reviews
FOR SELECT
USING (true);

-- Allow anyone to insert reviews (no auth required for submitting feedback)
CREATE POLICY "Anyone can submit reviews"
ON public.reviews
FOR INSERT
WITH CHECK (true);