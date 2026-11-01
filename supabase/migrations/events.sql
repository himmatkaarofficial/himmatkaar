-- ============================================
-- EVENTS TABLE SCHEMA MIGRATION
-- Run this in Supabase SQL Editor to add registration link & status fields
-- ============================================

ALTER TABLE events ADD COLUMN IF NOT EXISTS registration_link TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS registration_closed BOOLEAN DEFAULT FALSE;
