# Migration to Supabase - Setup Instructions

Your site has been migrated from Firebase to Supabase. Follow these steps to complete the setup:

## 1. Get Your Supabase API Keys

1. Go to [https://app.supabase.com/project/mdmrdtzjwygevqxdzsmf/settings/api](https://app.supabase.com/project/mdmrdtzjwygevqxdzsmf/settings/api)
2. Copy your **anon public** key
3. Update your `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://mdmrdtzjwygevqxdzsmf.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
   ```

## 2. Create Database Tables

1. Go to [https://app.supabase.com/project/mdmrdtzjwygevqxdzsmf/sql](https://app.supabase.com/project/mdmrdtzjwygevqxdzsmf/sql)
2. Copy and paste the contents of `supabase-migration.sql` into the SQL editor
3. Click "Run" to create all tables, policies, and the storage bucket

## 3. Set Up Storage Bucket

The migration script creates an "uploads" bucket automatically, but you need to verify:

1. Go to [https://app.supabase.com/project/mdmrdtzjwygevqxdzsmf/storage/buckets](https://app.supabase.com/project/mdmrdtzjwygevqxdzsmf/storage/buckets)
2. Verify that the "uploads" bucket exists and is public
3. If it doesn't exist, create it manually:
   - Click "New bucket"
   - Name: `uploads`
   - Public: Yes
   - File size limit: 50MB
   - Allowed MIME types: `image/*`

## 4. Set Up Authentication (Optional)

If you plan to use the dashboard features:

1. Go to [https://app.supabase.com/project/mdmrdtzjwygevqxdzsmf/auth/users](https://app.supabase.com/project/mdmrdtzjwygevqxdzsmf/auth/users)
2. Create your first admin user:
   - Click "Add user"
   - Enter email and password
   - The user will automatically be assigned admin role

## 5. Update Your Code

All your components have been updated to use Supabase instead of Firebase:

### New Files Created:
- `lib/supabase.ts` - Supabase client configuration
- `lib/supabase-service.ts` - Data service layer (replaces firebase-service.ts)
- `lib/supabase-storage.ts` - File upload service (replaces storage.ts)
- `lib/supabase-auth.ts` - Authentication service (replaces auth-service.ts)
- `lib/types/supabase.ts` - Database type definitions

### Updated Files:
- All dashboard pages now import from `@/lib/supabase-service`
- All file upload components now import from `@/lib/supabase-storage`
- `hooks/use-data.ts` updated to use Supabase services
- `.env.local` includes Supabase configuration

## 6. Database Schema

Your Supabase database includes these tables:

### `users` table
- User profiles extending Supabase auth
- Roles: admin, editor
- Links to auth.users table

### `projects` table
- Construction projects with images, descriptions, features
- Supports single or multiple images per project

### `services` table
- Company services with descriptions and feature lists

### `staff` table
- Team member profiles with photos and contact info

### `vacancies` table  
- Job postings with requirements and deadlines
- Active/inactive status

## 7. Key Differences from Firebase

### Data Format
- Snake_case in database, camelCase in frontend
- Automatic conversion handled by service layer
- UUID primary keys instead of auto-generated strings

### File Storage
- Files stored in Supabase Storage instead of Firebase Storage
- Public URLs automatically generated
- Organized in folders: `projects/`, `services/`, `staff/`

### Authentication
- Built on Supabase Auth instead of Firebase Auth
- Row Level Security (RLS) policies protect data
- User profiles stored in `users` table

## 8. Test Your Migration

1. Start your development server: `npm run dev`
2. Visit your dashboard pages to verify data loading works
3. Test file uploads on any form with image upload
4. Test authentication if you're using it

## 9. Clean Up (Optional)

Once you've verified everything works:

- You can remove the old Firebase files:
  - `lib/firebase.ts`
  - `lib/firebase-service.ts` 
  - `lib/storage.ts`
  - `lib/auth-service.ts` (if using Supabase auth)
- Remove Firebase from package.json: `npm uninstall firebase`
- Remove Firebase environment variables from `.env.local`

## 10. Production Deployment

- Make sure to add your production domain to Supabase Auth settings
- Update your environment variables on your hosting platform
- The site will work with static export (`npm run build`) since it uses client-side data fetching

## Support

If you encounter any issues:

1. Check the browser console for error messages
2. Verify your environment variables are set correctly
3. Check that the database migration ran successfully
4. Ensure the storage bucket is created and public

Your site should now be fully migrated to Supabase! 🎉