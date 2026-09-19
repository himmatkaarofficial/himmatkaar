# Supabase Storage Setup Guide

## Storage Buckets

The following storage buckets have been created for the Himmatkaar platform:

### 1. event-images
- **Purpose**: Store event images uploaded by admins
- **Public**: Yes (anyone can read)
- **Size Limit**: 5MB per file
- **Allowed Types**: JPEG, JPG, PNG, WebP

### 2. team-images
- **Purpose**: Store team member profile photos
- **Public**: Yes (anyone can read)
- **Size Limit**: 5MB per file
- **Allowed Types**: JPEG, JPG, PNG, WebP

### 3. ambassador-images
- **Purpose**: Store campus ambassador profile photos
- **Public**: Yes (anyone can read)
- **Size Limit**: 5MB per file
- **Allowed Types**: JPEG, JPG, PNG, WebP

## Current Status

✅ All buckets are created and configured as public
✅ File size limits set to 5MB
✅ MIME types restricted to images only

## Setting Up Storage Policies (Required)

Since storage policies require elevated permissions, you need to set them up through the Supabase Dashboard:

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **Storage** > **Policies**
3. For each bucket (event-images, team-images, ambassador-images), create the following policies:

#### Policy 1: Public Read Access
- **Policy Name**: `Public read access`
- **Allowed Operation**: SELECT
- **Target Roles**: public
- **Policy Definition**: `bucket_id = 'BUCKET_NAME'`

#### Policy 2: Authenticated Upload
- **Policy Name**: `Authenticated users can upload`
- **Allowed Operation**: INSERT
- **Target Roles**: authenticated
- **Policy Definition**: `bucket_id = 'BUCKET_NAME'`

#### Policy 3: Authenticated Update
- **Policy Name**: `Authenticated users can update`
- **Allowed Operation**: UPDATE
- **Target Roles**: authenticated
- **Policy Definition**: `bucket_id = 'BUCKET_NAME'`

#### Policy 4: Authenticated Delete
- **Policy Name**: `Authenticated users can delete`
- **Allowed Operation**: DELETE
- **Target Roles**: authenticated
- **Policy Definition**: `bucket_id = 'BUCKET_NAME'`

Replace `BUCKET_NAME` with the actual bucket name for each policy.

### Option 2: Using SQL Editor

1. Go to **SQL Editor** in Supabase Dashboard
2. Copy the contents of `supabase/storage-policies.sql`
3. Run the query

### Option 3: Using Supabase CLI

```bash
# Apply all migrations including storage policies
supabase db reset

# Or push specific migration
supabase db push
```

## Verification

After setting up policies, verify they work by:

1. **Testing Upload**: Try uploading an image through the admin panel
2. **Testing Read**: Check if images are publicly accessible via their URLs
3. **Testing Delete**: Try deleting an image through the admin panel

## API Integration

The upload API (`/api/upload`) automatically handles:
- File validation (type and size)
- Unique filename generation
- Upload to appropriate bucket based on type parameter
- Public URL generation

### Usage Example

```typescript
const formData = new FormData();
formData.append('file', file);
formData.append('type', 'team'); // 'event', 'team', or 'ambassador'

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});

const { url } = await response.json();
```

## Troubleshooting

### Images not uploading
- Check if storage policies are properly set up
- Verify authentication is working
- Check browser console for errors

### Images not displaying
- Verify bucket is set to public
- Check if the URL is correct
- Ensure RLS policies allow SELECT for public role

### Permission denied errors
- Ensure authenticated users have INSERT/UPDATE/DELETE policies
- Check if the user is properly authenticated
- Verify the bucket_id in policies matches exactly

## Security Notes

- All buckets are public for READ operations (necessary for displaying images on public pages)
- Only authenticated users can upload, update, or delete images
- File size is limited to 5MB to prevent abuse
- Only image MIME types are allowed
- Each file gets a unique name to prevent conflicts

## Next Steps

1. ✅ Buckets created
2. ⚠️ **Set up storage policies** (follow instructions above)
3. ✅ API routes configured
4. ✅ Admin components integrated
5. Test the complete upload/display flow
