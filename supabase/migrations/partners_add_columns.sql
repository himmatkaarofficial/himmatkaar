-- Migration: Add description and website_url to partners table
ALTER TABLE partners ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS website_url TEXT;
