-- Create testimonials table for Member Voices & Testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  company VARCHAR(255),
  avatar_url TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on testimonials"
  ON public.testimonials
  FOR SELECT
  TO public
  USING (true);

-- Allow service role / admin full access
CREATE POLICY "Allow service role full access on testimonials"
  ON public.testimonials
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Seed initial default member testimonials
INSERT INTO public.testimonials (name, role, company, rating, feedback, display_order)
VALUES 
  (
    'Ahmed Khan',
    'Software Engineer',
    'Tech Corp',
    5,
    'HimmatKaar transformed my career trajectory completely. The fellowship taught me not just technical skills, but how to think critically and communicate effectively. Within 2 months of completing the program, I landed my dream job at a leading tech company!',
    0
  ),
  (
    'Fatima Ali',
    'Marketing Manager',
    'Digital Solutions',
    5,
    'The confidence I gained through HimmatKaar is invaluable. The public speaking sessions and resume workshops prepared me for real-world challenges. I am now leading a team of 10 people and could not be more grateful for this opportunity!',
    1
  ),
  (
    'Hassan Raza',
    'Data Analyst',
    'Analytics Pro',
    5,
    'Coming from a small town, I never thought I could compete with city students. HimmatKaar showed me that with the right mindset and skills, anything is possible. The mentorship and networking opportunities opened doors I never knew existed!',
    2
  ),
  (
    'Ayesha Malik',
    'Product Designer',
    'Creative Studio',
    5,
    'The fellowship''s focus on lifelong learning changed my perspective entirely. I learned how to learn, which has been crucial in my fast-paced design career. The community support continues even after graduation. Highly recommend to everyone!',
    3
  )
ON CONFLICT DO NOTHING;
