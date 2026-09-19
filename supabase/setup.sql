-- ============================================
-- USER PROFILES TABLE
-- ============================================

-- Mirror auth users in an app-level profiles table.
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'coordinator', 'admin')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read/update only their own profile.
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Keep profiles table in sync when a new auth user is created.
CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email,
      updated_at = TIMEZONE('utc'::text, NOW());

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created_profile ON auth.users;
CREATE TRIGGER on_auth_user_created_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_profile();

-- Helper to promote a known user to admin by email.
CREATE OR REPLACE FUNCTION public.set_user_role_by_email(target_email TEXT, target_role TEXT)
RETURNS VOID AS $$
BEGIN
  IF target_role NOT IN ('student', 'coordinator', 'admin') THEN
    RAISE EXCEPTION 'Invalid role: %', target_role;
  END IF;

  UPDATE public.profiles
  SET role = target_role,
      updated_at = TIMEZONE('utc'::text, NOW())
  WHERE LOWER(email) = LOWER(target_email);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Example (run in Supabase SQL editor after the user exists):
-- SELECT public.set_user_role_by_email('admin@himmatkaar.org', 'admin');

-- Create events table in Supabase
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time VARCHAR(50),
  location VARCHAR(255),
  type VARCHAR(100),
  capacity INTEGER DEFAULT 0,
  registered INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'past', 'cancelled')),
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on date for faster queries
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON events
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated insert" ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON events
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete" ON events
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert sample events
INSERT INTO events (title, description, date, time, location, type, capacity, registered, status, image) VALUES
('Youth Leadership Summit', 'Annual leadership conference bringing together youth leaders from across Faisalabad', '2026-03-25', '09:00 AM', 'Faisalabad Convention Center', 'Summit', 500, 0, 'upcoming', '/event-leadership.jpg'),
('Innovation Workshop', 'Hands-on workshop covering essential digital literacy and innovation skills', '2026-04-10', '02:00 PM', 'NIC Faisalabad', 'Workshop', 100, 0, 'upcoming', '/event-workshop.jpg'),
('Community Open House', 'Join us for a day of networking and exploring opportunities at Himmatkaar', '2026-04-20', '10:00 AM', 'Himmatkaar Office', 'Open House', 200, 0, 'upcoming', '/event-openhouse.jpg');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to call the function
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create trigger to keep profiles.updated_at fresh
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ============================================
-- TEAM MEMBERS TABLE
-- ============================================

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  bio TEXT,
  image TEXT,
  linkedin_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on display_order for faster queries
CREATE INDEX IF NOT EXISTS idx_team_members_display_order ON team_members(display_order);

-- Enable Row Level Security (RLS)
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON team_members
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated insert" ON team_members
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON team_members
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete" ON team_members
  FOR DELETE
  TO authenticated
  USING (true);

-- Create trigger to call the update function
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample team members
INSERT INTO team_members (name, role, bio, image, linkedin_url, display_order) VALUES
('Ahmed Khan', 'Founder & CEO', 'Visionary leader with 15+ years of experience in youth empowerment and community development', '/team/founder.jpeg', 'https://linkedin.com/in/ahmed-khan', 0),
('Fatima Ali', 'Co-Founder', 'Expert in program development and community engagement with a passion for youth leadership', '/team/cofounder.png', 'https://linkedin.com/in/fatima-ali', 1),
('Hassan Malik', 'Creative & Graphics Lead', 'Creative designer bringing visual excellence to our brand and communications', '/team/creative-and graphics-lead.png', 'https://linkedin.com/in/hassan-malik', 2)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- AMBASSADORS TABLE
-- ============================================

-- Create ambassadors table
CREATE TABLE IF NOT EXISTS ambassadors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) DEFAULT 'Campus Ambassador',
  university VARCHAR(255) NOT NULL,
  city VARCHAR(255),
  bio TEXT,
  image TEXT,
  linkedin_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on display_order and city for faster queries
CREATE INDEX IF NOT EXISTS idx_ambassadors_display_order ON ambassadors(display_order);
CREATE INDEX IF NOT EXISTS idx_ambassadors_city ON ambassadors(city);

-- Enable Row Level Security (RLS)
ALTER TABLE ambassadors ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON ambassadors
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated insert" ON ambassadors
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON ambassadors
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete" ON ambassadors
  FOR DELETE
  TO authenticated
  USING (true);

-- Create trigger to call the update function
CREATE TRIGGER update_ambassadors_updated_at BEFORE UPDATE ON ambassadors
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample ambassadors
INSERT INTO ambassadors (name, role, university, city, bio, image, linkedin_url, display_order) VALUES
('Zainab Tariq', 'Campus Ambassador', 'University of Karachi', 'Karachi', 'Leading Himmatkaar initiatives at universities across Karachi', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400', 'https://linkedin.com/in/zainab-tariq', 0),
('Ali Raza', 'Campus Ambassador', 'LUMS', 'Lahore', 'Connecting students with opportunities in Lahore region', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400', 'https://linkedin.com/in/ali-raza', 1),
('Maryam Sheikh', 'Campus Ambassador', 'NUST', 'Islamabad', 'Driving youth engagement in the capital region', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400', 'https://linkedin.com/in/maryam-sheikh', 2),
('Usman Khalid', 'Campus Ambassador', 'University of Agriculture', 'Faisalabad', 'Expanding Himmatkaar''s reach in Punjab''s industrial hub', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400', 'https://linkedin.com/in/usman-khalid', 3)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Note: Storage buckets and policies should be created via Supabase Dashboard or CLI
-- Buckets needed:
-- 1. event-images (already exists)
-- 2. team-images (for team member photos)
-- 3. ambassador-images (for ambassador photos)
--
-- Each bucket should have:
-- - Public read access
-- - Authenticated write/update/delete access
-- - 5MB file size limit
-- - Allowed MIME types: image/jpeg, image/jpg, image/png, image/webp
