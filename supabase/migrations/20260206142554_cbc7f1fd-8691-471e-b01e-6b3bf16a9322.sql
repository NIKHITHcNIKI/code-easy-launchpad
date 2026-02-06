-- Add status column to reviews table for moderation
ALTER TABLE public.reviews 
ADD COLUMN status text NOT NULL DEFAULT 'pending' 
CHECK (status IN ('pending', 'approved', 'rejected'));

-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Policy: Users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Update reviews policies
-- Drop old policies first
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;

-- New policy: Anyone can view APPROVED reviews only
CREATE POLICY "Anyone can view approved reviews"
ON public.reviews
FOR SELECT
USING (status = 'approved');

-- Admins can view ALL reviews
CREATE POLICY "Admins can view all reviews"
ON public.reviews
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update reviews (for approval)
CREATE POLICY "Admins can update reviews"
ON public.reviews
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete reviews
CREATE POLICY "Admins can delete reviews"
ON public.reviews
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));