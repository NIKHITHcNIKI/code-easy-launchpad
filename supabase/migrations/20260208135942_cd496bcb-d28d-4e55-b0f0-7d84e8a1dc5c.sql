-- Create rate_limits table for tracking API usage
CREATE TABLE public.rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL,
  action TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index for efficient lookups
CREATE INDEX idx_rate_limits_lookup ON public.rate_limits(identifier, action, created_at DESC);

-- Enable RLS
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Only service role can manage rate limits (edge functions use service role)
-- No direct client access needed

-- Add database constraints to reviews table for extra protection
ALTER TABLE public.reviews ADD CONSTRAINT check_student_name_length 
  CHECK (length(student_name) > 0 AND length(student_name) <= 100);
ALTER TABLE public.reviews ADD CONSTRAINT check_comment_length 
  CHECK (length(comment) > 0 AND length(comment) <= 1000);
ALTER TABLE public.reviews ADD CONSTRAINT check_rating_range 
  CHECK (rating >= 1 AND rating <= 5);

-- Drop the direct INSERT policy since we'll route through edge function
DROP POLICY IF EXISTS "Anyone can submit pending reviews" ON public.reviews;