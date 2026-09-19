-- ============================================
-- STORAGE POLICIES FOR SUPABASE
-- ============================================
-- Run this file with elevated permissions (service_role or postgres role)
-- These policies control access to storage buckets

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- ============================================
-- EVENT IMAGES BUCKET POLICIES
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read event images" ON storage.objects;
DROP POLICY IF EXISTS "Auth upload event images" ON storage.objects;
DROP POLICY IF EXISTS "Auth update event images" ON storage.objects;
DROP POLICY IF EXISTS "Auth delete event images" ON storage.objects;

-- Allow anyone to read event images
CREATE POLICY "Public read event images"
ON storage.objects FOR SELECT
USING (bucket_id = 'event-images');

-- Allow authenticated users to upload event images
CREATE POLICY "Auth upload event images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'event-images');

-- Allow authenticated users to update event images
CREATE POLICY "Auth update event images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'event-images');

-- Allow authenticated users to delete event images
CREATE POLICY "Auth delete event images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'event-images');

-- ============================================
-- TEAM IMAGES BUCKET POLICIES
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read team images" ON storage.objects;
DROP POLICY IF EXISTS "Auth upload team images" ON storage.objects;
DROP POLICY IF EXISTS "Auth update team images" ON storage.objects;
DROP POLICY IF EXISTS "Auth delete team images" ON storage.objects;

-- Allow anyone to read team images
CREATE POLICY "Public read team images"
ON storage.objects FOR SELECT
USING (bucket_id = 'team-images');

-- Allow authenticated users to upload team images
CREATE POLICY "Auth upload team images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'team-images');

-- Allow authenticated users to update team images
CREATE POLICY "Auth update team images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'team-images');

-- Allow authenticated users to delete team images
CREATE POLICY "Auth delete team images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'team-images');

-- ============================================
-- AMBASSADOR IMAGES BUCKET POLICIES
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read ambassador images" ON storage.objects;
DROP POLICY IF EXISTS "Auth upload ambassador images" ON storage.objects;
DROP POLICY IF EXISTS "Auth update ambassador images" ON storage.objects;
DROP POLICY IF EXISTS "Auth delete ambassador images" ON storage.objects;

-- Allow anyone to read ambassador images
CREATE POLICY "Public read ambassador images"
ON storage.objects FOR SELECT
USING (bucket_id = 'ambassador-images');

-- Allow authenticated users to upload ambassador images
CREATE POLICY "Auth upload ambassador images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'ambassador-images');

-- Allow authenticated users to update ambassador images
CREATE POLICY "Auth update ambassador images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'ambassador-images');

-- Allow authenticated users to delete ambassador images
CREATE POLICY "Auth delete ambassador images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'ambassador-images');

-- ============================================
-- VERIFICATION
-- ============================================

-- Verify buckets exist
SELECT 
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
FROM storage.buckets
ORDER BY name;

-- Note: To apply these policies, you need to:
-- 1. Go to Supabase Dashboard > SQL Editor
-- 2. Copy and paste this entire file
-- 3. Run the query with elevated permissions
-- 
-- Alternatively, use Supabase CLI:
-- supabase db reset (resets and applies all migrations)
