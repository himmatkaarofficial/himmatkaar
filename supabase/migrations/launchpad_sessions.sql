-- ============================================
-- LAUNCHPAD SESSIONS TABLE ONLY
-- Run this in Supabase SQL Editor
-- ============================================

CREATE TABLE IF NOT EXISTS launchpad_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_number INTEGER NOT NULL DEFAULT 1,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) DEFAULT 'Career Development',
  date VARCHAR(100),
  time VARCHAR(100),
  cohort VARCHAR(100) DEFAULT 'Cohort 1',
  status VARCHAR(50) DEFAULT 'Completed',
  mentor_name VARCHAR(255),
  mentor_role VARCHAR(255),
  mentor_photo_url TEXT,
  mentor_bio TEXT,
  mentor_linkedin TEXT,
  summary TEXT,
  key_takeaways TEXT[] DEFAULT '{}',
  session_photos JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_launchpad_sessions_cohort ON launchpad_sessions(cohort);
CREATE INDEX IF NOT EXISTS idx_launchpad_sessions_number ON launchpad_sessions(session_number);

ALTER TABLE launchpad_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON launchpad_sessions
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON launchpad_sessions
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON launchpad_sessions
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated delete" ON launchpad_sessions
  FOR DELETE TO authenticated USING (true);

-- This function should already exist from setup.sql, but just in case:
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_launchpad_sessions_updated_at BEFORE UPDATE ON launchpad_sessions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- If table already exists, add missing columns:
ALTER TABLE launchpad_sessions ADD COLUMN IF NOT EXISTS mentor_linkedin TEXT;
ALTER TABLE launchpad_sessions ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;
