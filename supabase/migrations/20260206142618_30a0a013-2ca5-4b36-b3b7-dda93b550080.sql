-- Fix the overly permissive INSERT policy by requiring rate limiting concept
-- The existing policy allows anyone to insert, which is intentional for public reviews
-- But we'll add a check to ensure the status is always 'pending' for new submissions
DROP POLICY IF EXISTS "Anyone can submit reviews" ON public.reviews;

CREATE POLICY "Anyone can submit pending reviews"
ON public.reviews
FOR INSERT
WITH CHECK (status = 'pending');