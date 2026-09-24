-- =========================================================================
-- PARTNERS TABLE SETUP & SEED SCRIPT
-- Run this in Supabase SQL Editor
-- =========================================================================

-- 1. Create table for Managing & Tech Partners
CREATE TABLE IF NOT EXISTS partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo_url TEXT NOT NULL,
  category VARCHAR(50) NOT NULL DEFAULT 'managing', -- 'managing' or 'tech'
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Indexes
CREATE INDEX IF NOT EXISTS idx_partners_category ON partners(category);
CREATE INDEX IF NOT EXISTS idx_partners_order ON partners(display_order);

-- 3. Row Level Security (RLS)
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'partners' AND policyname = 'Allow public read access on partners') THEN
        CREATE POLICY "Allow public read access on partners" ON partners FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'partners' AND policyname = 'Allow authenticated insert on partners') THEN
        CREATE POLICY "Allow authenticated insert on partners" ON partners FOR INSERT TO authenticated WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'partners' AND policyname = 'Allow authenticated update on partners') THEN
        CREATE POLICY "Allow authenticated update on partners" ON partners FOR UPDATE TO authenticated USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'partners' AND policyname = 'Allow authenticated delete on partners') THEN
        CREATE POLICY "Allow authenticated delete on partners" ON partners FOR DELETE TO authenticated USING (true);
    END IF;
END $$;

-- 4. Initial Seed for Managing & Tech Partners
DELETE FROM partners;

INSERT INTO partners (name, logo_url, category, display_order) VALUES
-- Managing Partners
('The Cabinet', '/partners/the-cabinet.png', 'managing', 1),
('OKM', '/partners/partner2.png', 'managing', 2),

-- Tech Partners
('Cybergen', '/partners/tech1.png', 'tech', 1),
('Tech Partner', '/partners/tech2.png', 'tech', 2);
