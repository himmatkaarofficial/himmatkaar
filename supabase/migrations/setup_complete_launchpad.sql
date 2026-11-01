-- =========================================================================
-- COMPLETE LAUNCHPAD SETUP & SEED SCRIPT
-- Copy this entire file, paste into Supabase SQL Editor, and click "Run"
-- =========================================================================

-- 1. Create table if not exists
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
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Add columns if table already existed previously
ALTER TABLE launchpad_sessions ADD COLUMN IF NOT EXISTS mentor_linkedin TEXT;
ALTER TABLE launchpad_sessions ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;

-- 3. Indexes
CREATE INDEX IF NOT EXISTS idx_launchpad_sessions_cohort ON launchpad_sessions(cohort);
CREATE INDEX IF NOT EXISTS idx_launchpad_sessions_number ON launchpad_sessions(session_number);

-- 4. Enable Row Level Security (RLS) & Policies
ALTER TABLE launchpad_sessions ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'launchpad_sessions' AND policyname = 'Allow public read access') THEN
        CREATE POLICY "Allow public read access" ON launchpad_sessions FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'launchpad_sessions' AND policyname = 'Allow authenticated insert') THEN
        CREATE POLICY "Allow authenticated insert" ON launchpad_sessions FOR INSERT TO authenticated WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'launchpad_sessions' AND policyname = 'Allow authenticated update') THEN
        CREATE POLICY "Allow authenticated update" ON launchpad_sessions FOR UPDATE TO authenticated USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'launchpad_sessions' AND policyname = 'Allow authenticated delete') THEN
        CREATE POLICY "Allow authenticated delete" ON launchpad_sessions FOR DELETE TO authenticated USING (true);
    END IF;
END $$;

-- 5. Auto-create 'launchpad-images' storage bucket if missing
INSERT INTO storage.buckets (id, name, public)
VALUES ('launchpad-images', 'launchpad-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage policies for launchpad-images bucket
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Public Access launchpad-images') THEN
        CREATE POLICY "Public Access launchpad-images" ON storage.objects FOR SELECT USING (bucket_id = 'launchpad-images');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Authenticated insert launchpad-images') THEN
        CREATE POLICY "Authenticated insert launchpad-images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'launchpad-images');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Authenticated update launchpad-images') THEN
        CREATE POLICY "Authenticated update launchpad-images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'launchpad-images');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Authenticated delete launchpad-images') THEN
        CREATE POLICY "Authenticated delete launchpad-images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'launchpad-images');
    END IF;
END $$;

-- 6. Clean existing Cohort 1 sessions to avoid duplicates before seeding
DELETE FROM launchpad_sessions WHERE cohort = 'Cohort 1';

-- 7. Insert all 8 Complete Cohort 1 Sessions with Mentors & Photos
INSERT INTO launchpad_sessions (
  session_number, title, category, date, time, cohort, status,
  mentor_name, mentor_role, mentor_photo_url, mentor_bio, mentor_linkedin,
  summary, key_takeaways, session_photos, is_featured
) VALUES

-- Session 1 (Marked as Featured 1-on-1 Mentorship)
(
  1,
  'Career Purpose & Personal Growth Path',
  'Career Development',
  'October 12, 2024',
  '10:00 AM - 1:00 PM',
  'Cohort 1',
  'Completed',
  'Sipehre Shamsi',
  'Lead Facilitator',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  'Lead Facilitator with over 10 years of experience guiding young professionals to discover their core purpose, set achievable career milestones, and navigate transition periods with confidence.',
  'https://linkedin.com',
  'An inspiring foundational session focused on aligning personal values with career goals, overcoming imposter syndrome, and crafting a strategic 3-year growth roadmap.',
  ARRAY[
    'Identifying personal core values and non-negotiable career principles',
    'Building a structured 3-year career progression blueprint',
    'Strategies to overcome imposter syndrome during early career stages',
    'Setting actionable weekly goals for continuous personal development'
  ],
  '[
    {"url": "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80", "caption": "Interactive breakout group activity on career goal mapping"},
    {"url": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", "caption": "Mentors guiding cohort participants during personal purpose workshops"},
    {"url": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80", "caption": "Participant presentations of individual 3-year growth statements"}
  ]'::jsonb,
  true
),

-- Session 2
(
  2,
  'Public Speaking & Soft Skills Masterclass',
  'Communication',
  'October 16, 2024',
  '2:00 PM - 5:00 PM',
  'Cohort 1',
  'Completed',
  'Aimen Shahid',
  'Program Facilitator',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  'Communications expert specializing in interpersonal dynamics, executive presentation skills, and active listening strategies for modern team environments.',
  'https://linkedin.com',
  'Hands-on session designed to boost public speaking confidence, master non-verbal cues, and communicate complex ideas clearly in high-stakes settings.',
  ARRAY[
    'Structuring compelling oral presentations using story arcs',
    'Mastering vocal tone, body language, and eye contact',
    'Overcoming speech anxiety through practical breath control exercises',
    'Active listening techniques for collaborative team discussions'
  ],
  '[
    {"url": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80", "caption": "Live stage practice session with peer feedback"},
    {"url": "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80", "caption": "Aimen Shahid demonstrating body language techniques"},
    {"url": "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80", "caption": "Group communication exercise in progress"}
  ]'::jsonb,
  false
),

-- Session 3
(
  3,
  'Corporate Dynamics & Workplace Etiquette',
  'Corporate Readiness',
  'October 20, 2024',
  '11:00 AM - 2:00 PM',
  'Cohort 1',
  'Completed',
  'Frasat Tanveer',
  'Industry Mentor',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
  'Corporate strategist and industry veteran helping students bridge the gap between academic theory and practical corporate expectations.',
  'https://linkedin.com',
  'Comprehensive guide to corporate culture, office etiquette, cross-functional collaboration, and maintaining high performance under tight deadlines.',
  ARRAY[
    'Understanding corporate hierarchy, reporting channels, and ethics',
    'Professional email writing and async communication standards',
    'Time management and task prioritization in corporate settings',
    'Managing up: How to communicate effectively with managers and stakeholders'
  ],
  '[
    {"url": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80", "caption": "Frasat leading a corporate scenario roleplay session"},
    {"url": "https://images.unsplash.com/photo-1542744847-c1c002951910?auto=format&fit=crop&w=800&q=80", "caption": "Participants reviewing corporate case studies in teams"}
  ]'::jsonb,
  false
),

-- Session 4
(
  4,
  'Research & Problem-Solving Strategies',
  'Academic & Research',
  'October 24, 2024',
  '3:00 PM - 6:00 PM',
  'Cohort 1',
  'Completed',
  'Dr. Ahmad',
  'Academic Advisor',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
  'Renowned academic advisor dedicated to training young minds in data-backed decision making, analytical problem solving, and research methodologies.',
  'https://linkedin.com',
  'Deep-dive workshop on structured problem solving, data synthesis, evidence-backed arguments, and academic rigor applied to real-world challenges.',
  ARRAY[
    'First-principles thinking for complex problem decomposition',
    'Evaluating data sources and avoiding cognitive biases',
    'Structuring research reports for corporate and academic readers',
    'Formulating hypothesis-driven solutions to business bottlenecks'
  ],
  '[
    {"url": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80", "caption": "Dr. Ahmad explaining first-principles problem solving"},
    {"url": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80", "caption": "Collaborative research framework mapping on whiteboards"}
  ]'::jsonb,
  false
),

-- Session 5
(
  5,
  'Resume Building & Interview Mastery',
  'Career Coaching',
  'October 28, 2024',
  '10:00 AM - 1:00 PM',
  'Cohort 1',
  'Completed',
  'Ubaid Afzal',
  'Career Coach',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  'Experienced talent acquisition specialist and career coach who has conducted 500+ interviews across top tech and enterprise organizations.',
  'https://linkedin.com',
  'Actionable boot-camp on crafting ATS-optimized resumes, tackling behavioral interview questions with the STAR framework, and salary negotiation skills.',
  ARRAY[
    'Formatting resumes to clear Applicant Tracking Systems (ATS)',
    'Answering behavioral questions using the STAR technique (Situation, Task, Action, Result)',
    'Conducting live mock interviews with constructive mentor feedback',
    'Navigating job offers and salary negotiation basics'
  ],
  '[
    {"url": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80", "caption": "Live 1-on-1 mock interview demonstration"},
    {"url": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80", "caption": "Ubaid reviewing participant CVs line by line"}
  ]'::jsonb,
  false
),

-- Session 6
(
  6,
  'AI & Digital Tools for Workplace Productivity',
  'Technology',
  'November 02, 2024',
  '2:00 PM - 5:00 PM',
  'Cohort 1',
  'Completed',
  'Dr. Hammad Armaghan',
  'Technical Mentor',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  'Tech innovator and researcher specializing in practical AI applications, digital transformation tools, and workflow automation for modern workplaces.',
  'https://linkedin.com',
  'Hands-on session uncovering modern AI assistants, prompt engineering techniques, and workflow automation to supercharge daily productivity.',
  ARRAY[
    'Effective prompt engineering patterns for ChatGPT, Claude, and Copilot',
    'Automating repetitive office tasks using No-Code & AI integrations',
    'Leveraging AI for research, summary generation, and data formatting',
    'Ethical AI usage guidelines and data security awareness'
  ],
  '[
    {"url": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80", "caption": "Hands-on AI prompt engineering lab with Dr. Hammad"},
    {"url": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80", "caption": "Participants building automated workflows during the lab"}
  ]'::jsonb,
  false
),

-- Session 7
(
  7,
  'Personal Branding & LinkedIn Studio',
  'Personal Branding',
  'November 06, 2024',
  '11:00 AM - 2:00 PM',
  'Cohort 1',
  'Completed',
  'Rameen Anwar',
  'Branding Specialist',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
  'Digital strategist helping ambitious individuals craft authentic personal brands, optimize online profiles, and position themselves as industry leaders.',
  'https://linkedin.com',
  'Interactive workshop focused on defining your unique value proposition, writing engaging content, and optimizing LinkedIn profiles for recruiter reach.',
  ARRAY[
    'Defining your personal brand pillar and core narrative',
    'Step-by-step LinkedIn profile overhaul (Headline, About, Featured)',
    'Content creation strategy: Writing impactful posts and articles',
    'Engaging with industry leaders and building online authority'
  ],
  '[
    {"url": "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=800&q=80", "caption": "Rameen analyzing live LinkedIn profile makeovers"},
    {"url": "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=800&q=80", "caption": "Cohort members drafting personal headline statements"}
  ]'::jsonb,
  false
),

-- Session 8
(
  8,
  'Strategic Professional Networking',
  'Networking',
  'November 10, 2024',
  '3:00 PM - 6:00 PM',
  'Cohort 1',
  'Completed',
  'Awais Khan',
  'Networking Coach',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
  'Connection strategist specializing in genuine network building, cold outreach mastery, and informational interview techniques for career growth.',
  'https://linkedin.com',
  'Practical session on building authentic professional relationships, cold emailing industry leaders, and turning casual contacts into career mentors.',
  ARRAY[
    'Crafting high-response cold emails & LinkedIn messages',
    'Conducting effective informational interviews with senior leaders',
    'Nurturing long-term professional relationships beyond transactional asks',
    'Event networking strategies: How to work a room with confidence'
  ],
  '[
    {"url": "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80", "caption": "Speed networking activity during Awais Khan''s session"},
    {"url": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80", "caption": "Participants practicing cold outreach templates"}
  ]'::jsonb,
  false
);
