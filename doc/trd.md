# Technical Requirements Document (TRD)
## HimmatKaar Youth Empowerment Platform

### 1. Document Information

**Project:** HimmatKaar Platform  
**Version:** 1.0  
**Date:** March 11, 2026  
**Author:** Technical Team

### 2. System Architecture

#### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Client Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Browser    │  │    Mobile    │  │    Tablet    │  │
│  │   (React)    │  │   (Future)   │  │   (Future)   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  Presentation Layer                      │
│              Next.js 16 App Router                       │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Server Components  │  Client Components         │  │
│  │  - SSR Pages        │  - Interactive UI          │  │
│  │  - API Routes       │  - Form Handling           │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   Business Logic Layer                   │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Authentication  │  Authorization  │  Validation  │  │
│  │  Course Logic    │  User Management│  Analytics   │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                     Data Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Supabase    │  │    Redis     │  │   AWS S3     │  │
│  │  (Primary)   │  │   (Cache)    │  │   (Files)    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

#### 2.2 Technology Stack

**Frontend:**
- Next.js 16+
- React 18+
- TypeScript 5+
- Tailwind CSS 3+
- Framer Motion 11+
- Lucide React (Icons)
- Next.js Image Optimization (configured for Unsplash)

**Backend (API):**
- Next.js API Routes
- Node.js 20+
- Supabase Client (Authentication & Database)

**Database:**
- PostgreSQL 15+ via Supabase (Primary database)
- Redis 7+ (Caching & sessions)

**File Storage:**
- Supabase Storage

**Email:**
- Resend

**Deployment:**
- Vercel (Frontend & API)
- Supabase
- Upstash (Redis)

**MCP Integrations:**
- Firecrawl MCP (Web scraping and content extraction)
  - Used for AI-powered content recommendations
  - Automated web research capabilities
  - Dynamic content aggregation
- Supabase MCP (Direct database operations)
  - Direct database queries and operations via MCP
  - Schema inspection and management
  - Real-time database interaction
  - Migration management

### 3. Database Design

#### 3.1 Entity Relationship Diagram

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│    Users    │────────▶│   Roles     │◀────────│ Permissions │
└─────────────┘         └─────────────┘         └─────────────┘
      │                                                  
      │                                                  
      ▼                                                  
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│ Enrollments │────────▶│   Courses   │────────▶│   Modules   │
└─────────────┘         └─────────────┘         └─────────────┘
      │                       │                        │
      │                       │                        │
      ▼                       ▼                        ▼
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│Submissions  │────────▶│Assignments  │────────▶│   Lessons   │
└─────────────┘         └─────────────┘         └─────────────┘
      │                                                  
      │                                                  
      ▼                                                  
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Grades    │         │Certificates │         │ Activities  │
└─────────────┘         └─────────────┘         └─────────────┘
```

#### 3.2 Core Tables

**users**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role_id UUID REFERENCES roles(id),
  avatar_url TEXT,
  phone VARCHAR(20),
  date_of_birth DATE,
  gender VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role_id);
```

**roles**
```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (name, description) VALUES
  ('student', 'Student user with access to courses and assignments'),
  ('coordinator', 'Coordinator with student management capabilities'),
  ('admin', 'Administrator with full system access');
```

**courses**
```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  instructor_id UUID REFERENCES users(id),
  category VARCHAR(100),
  difficulty_level VARCHAR(50),
  duration_hours INTEGER,
  is_published BOOLEAN DEFAULT false,
  enrollment_limit INTEGER,
  prerequisites TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_courses_instructor ON courses(instructor_id);
CREATE INDEX idx_courses_published ON courses(is_published);
```

**enrollments**
```sql
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  progress_percentage DECIMAL(5,2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active',
  UNIQUE(user_id, course_id)
);

CREATE INDEX idx_enrollments_user ON enrollments(user_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
```

**modules**
```sql
CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_modules_course ON modules(course_id);
```

**lessons**
```sql
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  video_url TEXT,
  duration_minutes INTEGER,
  order_index INTEGER NOT NULL,
  is_preview BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_lessons_module ON lessons(module_id);
```

**assignments**
```sql
CREATE TABLE assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date TIMESTAMP,
  max_points INTEGER DEFAULT 100,
  allow_late_submission BOOLEAN DEFAULT false,
  late_penalty_percentage DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_assignments_course ON assignments(course_id);
```

**submissions**
```sql
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  file_url TEXT,
  submission_text TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_late BOOLEAN DEFAULT false,
  status VARCHAR(50) DEFAULT 'submitted',
  UNIQUE(assignment_id, user_id)
);

CREATE INDEX idx_submissions_assignment ON submissions(assignment_id);
CREATE INDEX idx_submissions_user ON submissions(user_id);
```

**grades**
```sql
CREATE TABLE grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
  graded_by UUID REFERENCES users(id),
  points_earned DECIMAL(5,2),
  feedback TEXT,
  graded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_grades_submission ON grades(submission_id);
```

**certificates**
```sql
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  certificate_number VARCHAR(100) UNIQUE NOT NULL,
  issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  pdf_url TEXT,
  verification_code VARCHAR(50) UNIQUE,
  UNIQUE(user_id, course_id)
);

CREATE INDEX idx_certificates_user ON certificates(user_id);
CREATE INDEX idx_certificates_verification ON certificates(verification_code);
```

**activities**
```sql
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  activity_type VARCHAR(100) NOT NULL,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activities_user ON activities(user_id);
CREATE INDEX idx_activities_type ON activities(activity_type);
CREATE INDEX idx_activities_created ON activities(created_at DESC);
```

**events**
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location VARCHAR(255),
  type VARCHAR(100),
  capacity INTEGER,
  registered_count INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'upcoming',
  image_url TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_status ON events(status);
```

**event_registrations**
```sql
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  registration_status VARCHAR(50) DEFAULT 'registered',
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(event_id, user_id)
);

CREATE INDEX idx_event_registrations_event ON event_registrations(event_id);
CREATE INDEX idx_event_registrations_user ON event_registrations(user_id);
```

**system_settings**
```sql
CREATE TABLE system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(50) NOT NULL,
  key VARCHAR(100) NOT NULL,
  value JSONB NOT NULL,
  updated_by UUID REFERENCES users(id),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(category, key)
);

CREATE INDEX idx_system_settings_category ON system_settings(category);
CREATE INDEX idx_system_settings_key ON system_settings(key);
```

**backup_history**
```sql
CREATE TABLE backup_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  backup_date TIMESTAMP NOT NULL,
  size_bytes BIGINT NOT NULL,
  status VARCHAR(50) NOT NULL,
  file_path TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_backup_history_date ON backup_history(backup_date DESC);
CREATE INDEX idx_backup_history_status ON backup_history(status);
```

### 4. API Specifications

#### 4.1 Authentication Endpoints

**POST /api/auth/register**
```typescript
Request: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: 'student' | 'coordinator' | 'admin';
}

Response: {
  success: boolean;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  token: string;
}
```

**POST /api/auth/login**
```typescript
Request: {
  email: string;
  password: string;
}

Response: {
  success: boolean;
  user: UserObject;
  token: string;
}
```

**POST /api/auth/logout**
```typescript
Response: {
  success: boolean;
  message: string;
}
```

#### 4.2 User Management Endpoints

**GET /api/users**
```typescript
Query: {
  page?: number;
  limit?: number;
  role?: string;
  status?: string;
  search?: string;
}

Response: {
  users: UserObject[];
  total: number;
  page: number;
  totalPages: number;
}
```

**GET /api/users/:id**
```typescript
Response: {
  user: UserObject;
}
```

**POST /api/users**
```typescript
Request: {
  name: string;
  email: string;
  role: 'Student' | 'Coordinator' | 'Admin';
  status: 'Active' | 'Inactive' | 'Pending';
}

Response: {
  success: boolean;
  user: UserObject;
  message: string;
}
```

**PUT /api/users/:id**
```typescript
Request: {
  name?: string;
  email?: string;
  role?: 'Student' | 'Coordinator' | 'Admin';
  status?: 'Active' | 'Inactive' | 'Pending';
}

Response: {
  success: boolean;
  user: UserObject;
  message: string;
}
```

**DELETE /api/users/:id**
```typescript
Response: {
  success: boolean;
  message: string;
}
```

**GET /api/users/export**
```typescript
Query: {
  role?: string;
  status?: string;
  format?: 'csv' | 'xlsx' | 'json';
}

Response: {
  success: boolean;
  downloadUrl: string;
  filename: string;
}
```

#### 4.3 Course Endpoints

**GET /api/courses**
```typescript
Query: {
  page?: number;
  limit?: number;
  category?: string;
  difficulty?: string;
  published?: boolean;
}

Response: {
  courses: CourseObject[];
  total: number;
  page: number;
  totalPages: number;
}
```

**POST /api/courses**
```typescript
Request: {
  title: string;
  description: string;
  category: string;
  difficultyLevel: string;
  durationHours: number;
}

Response: {
  success: boolean;
  course: CourseObject;
}
```

**POST /api/courses/:id/enroll**
```typescript
Response: {
  success: boolean;
  enrollment: EnrollmentObject;
}
```

#### 4.4 Assignment Endpoints

**GET /api/assignments**
```typescript
Query: {
  courseId?: string;
  userId?: string;
  status?: string;
}

Response: {
  assignments: AssignmentObject[];
}
```

**POST /api/assignments/:id/submit**
```typescript
Request: {
  fileUrl?: string;
  submissionText?: string;
}

Response: {
  success: boolean;
  submission: SubmissionObject;
}
```

**POST /api/submissions/:id/grade**
```typescript
Request: {
  pointsEarned: number;
  feedback: string;
}

Response: {
  success: boolean;
  grade: GradeObject;
}
```

#### 4.5 Event Endpoints

**GET /api/events**
```typescript
Query: {
  page?: number;
  limit?: number;
  type?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

Response: {
  events: EventObject[];
  total: number;
  page: number;
  totalPages: number;
}
```

**POST /api/events**
```typescript
Request: {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  capacity: number;
}

Response: {
  success: boolean;
  event: EventObject;
}
```

**POST /api/events/:id/register**
```typescript
Response: {
  success: boolean;
  registration: EventRegistrationObject;
}
```

**GET /api/events/:id/participants**
```typescript
Query: {
  page?: number;
  limit?: number;
  status?: string;
}

Response: {
  participants: UserObject[];
  total: number;
  page: number;
  totalPages: number;
}
```

#### 4.7 File Upload Endpoints

**POST /api/upload**

Upload event images to Supabase Storage.

```typescript
Request: FormData {
  file: File; // Image file (JPEG, JPG, PNG, WebP)
}

Response: {
  url: string;      // Public URL of uploaded image
  path: string;     // Storage path (events/filename.ext)
}

Error Responses: {
  400: {
    error: 'No file provided' | 
           'Invalid file type. Only JPEG, PNG, and WebP are allowed.' |
           'File size exceeds 5MB limit'
  };
  500: {
    error: string;  // Upload error message
  };
}
```

**Validation Rules:**
- Allowed file types: `image/jpeg`, `image/jpg`, `image/png`, `image/webp`
- Maximum file size: 5MB (5 * 1024 * 1024 bytes)
- Unique filename generation: `{timestamp}-{random}.{extension}`
- Storage bucket: `event-images`
- Storage path: `events/{filename}`

**Security:**
- File type validation on server-side
- File size validation before upload
- Unique filename prevents overwrites
- Public URL generation for display
- Stored in Supabase Storage with proper permissions

**Usage Example:**
```typescript
// Client-side upload
const formData = new FormData();
formData.append('file', imageFile);

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});

const { url, path } = await response.json();

// Use URL in event creation
await fetch('/api/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Workshop',
    image_url: url,
    // ... other fields
  })
});
```

#### 4.6 Settings Endpoints

**GET /api/settings**
```typescript
Response: {
  success: boolean;
  settings: {
    general: {
      siteName: string;
      siteDescription: string;
      timezone: string;
      language: string;
      logoUrl: string;
    };
    email: {
      smtpHost: string;
      smtpPort: number;
      fromEmail: string;
      fromName: string;
    };
    security: {
      passwordPolicy: {
        minLength: number;
        requireUppercase: boolean;
        requireNumbers: boolean;
        requireSpecialChars: boolean;
      };
      sessionTimeout: number;
      twoFactorEnabled: boolean;
    };
    integrations: {
      googleAnalytics: {
        enabled: boolean;
        trackingId?: string;
      };
      awsS3: {
        enabled: boolean;
        bucket?: string;
        region?: string;
      };
    };
    backup: {
      schedule: string;
      retentionDays: number;
      lastBackup?: {
        date: string;
        size: string;
        status: string;
      };
    };
  };
}
```

**PUT /api/settings**
```typescript
Request: {
  category: 'general' | 'email' | 'security' | 'integrations' | 'backup';
  settings: Record<string, any>;
}

Response: {
  success: boolean;
  message: string;
}
```

**POST /api/settings/email/test**
```typescript
Request: {
  toEmail: string;
}

Response: {
  success: boolean;
  message: string;
}
```

**POST /api/settings/security/audit**
```typescript
Response: {
  success: boolean;
  audit: {
    date: string;
    issues: Array<{
      severity: 'low' | 'medium' | 'high' | 'critical';
      description: string;
      recommendation: string;
    }>;
  };
}
```

**POST /api/settings/backup/create**
```typescript
Response: {
  success: boolean;
  backup: {
    id: string;
    date: string;
    size: string;
    status: string;
  };
}
```

**GET /api/settings/backup/history**
```typescript
Query: {
  page?: number;
  limit?: number;
}

Response: {
  backups: Array<{
    id: string;
    date: string;
    size: string;
    status: 'success' | 'failed';
  }>;
  total: number;
  page: number;
  totalPages: number;
}
```

**POST /api/settings/backup/:id/restore**
```typescript
Response: {
  success: boolean;
  message: string;
}
```

### 5. Security Requirements

#### 5.1 Authentication
- JWT tokens with 24-hour expiration
- Refresh tokens with 30-day expiration
- Secure password hashing (bcrypt, 12 rounds)
- Email verification required

#### 5.2 Authorization
- Role-based access control (RBAC)
- Resource-level permissions
- API endpoint protection
- Frontend route guards

#### 5.3 Data Protection
- HTTPS only (TLS 1.3)
- Input sanitization
- SQL injection prevention
- XSS protection
- CSRF tokens
- Rate limiting (100 requests/minute per IP)

#### 5.4 File Upload Security
- File type validation
- File size limits (10MB per file)
- Virus scanning
- Secure file storage (S3 with signed URLs)

### 6. Performance Requirements

#### 6.1 Response Times
- API endpoints: < 200ms (p95)
- Page load: < 2 seconds
- Time to interactive: < 3 seconds

#### 6.2 Caching Strategy
- Redis for session storage
- CDN for static assets
- Browser caching headers
- API response caching (5 minutes)

#### 6.3 Database Optimization
- Proper indexing
- Query optimization
- Connection pooling
- Read replicas for scaling

### 7. Monitoring & Logging

#### 7.1 Application Monitoring
- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics)
- Uptime monitoring (UptimeRobot)

#### 7.2 Logging
- Application logs (Winston)
- Access logs
- Error logs
- Audit logs for sensitive operations

### 8. Deployment Strategy

#### 8.1 Environments
- Development (local)
- Staging (staging.himmatkaar.org)
- Production (himmatkaar.org)

#### 8.2 CI/CD Pipeline
- GitHub Actions for automation
- Automated testing
- Code quality checks (ESLint, Prettier)
- Automated deployment to Vercel

#### 8.3 Rollback Strategy
- Vercel instant rollback
- Database migration rollback scripts
- Feature flags for gradual rollout

### 9. Testing Requirements

#### 9.1 Unit Testing
- Jest for unit tests
- 80% code coverage minimum
- Test all business logic

#### 9.2 Integration Testing
- API endpoint testing
- Database integration tests
- Third-party service mocks

#### 9.3 E2E Testing
- Playwright for E2E tests
- Critical user flows
- Cross-browser testing

### 10. Documentation

- API documentation (Swagger/OpenAPI)
- Code documentation (JSDoc)
- Architecture diagrams
- Deployment guides
- User manuals

### 11. Next.js Configuration

#### 11.1 Image Optimization

**Remote Image Patterns:**
The application is configured to optimize images from external sources using Next.js Image component.

**Configuration Location:** `next.config.ts`

**Allowed Remote Patterns:**
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
      port: '',
      pathname: '/**',
    },
  ],
}
```

**Purpose:**
- Automatic image optimization for external images
- Lazy loading support
- Responsive image sizing
- WebP format conversion when supported
- Improved page load performance

**Usage in Components:**
```typescript
import Image from 'next/image';

<Image 
  src="https://images.unsplash.com/photo-example" 
  alt="Description"
  width={800}
  height={600}
  className="w-full h-auto"
/>
```

**Benefits:**
- Reduced bandwidth usage
- Faster page loads
- Better Core Web Vitals scores
- Automatic format optimization
- Built-in lazy loading

**Security:**
- Only whitelisted domains can be used
- Prevents unauthorized image sources
- Protects against image-based attacks

### 12. Supabase Client Configuration

#### 12.1 Client Setup

**Location:** `lib/supabase.ts`

**Purpose:** Centralized Supabase client for authentication, database operations, and storage.

**Configuration:**
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Environment Variables:**
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**TypeScript Interfaces:**

The client includes TypeScript interfaces for type-safe database operations:

```typescript
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  capacity: number;
  registered: number;
  status: 'upcoming' | 'past' | 'cancelled';
  image: string;
  created_at: string;
  updated_at: string;
}
```

**Usage Examples:**

**Authentication:**
```typescript
import { supabase } from '@/lib/supabase';

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});

// Sign out
await supabase.auth.signOut();
```

**Database Operations:**
```typescript
import { supabase } from '@/lib/supabase';
import type { Event } from '@/lib/supabase';

// Fetch events
const { data: events, error } = await supabase
  .from('events')
  .select('*')
  .eq('status', 'upcoming')
  .order('date', { ascending: true });

// Insert event
const { data, error } = await supabase
  .from('events')
  .insert({
    title: 'Workshop',
    description: 'Description',
    date: '2026-04-01',
    time: '10:00',
    location: 'Venue',
    type: 'workshop',
    capacity: 50,
    registered: 0,
    status: 'upcoming'
  });

// Update event
const { data, error } = await supabase
  .from('events')
  .update({ registered: 25 })
  .eq('id', eventId);

// Delete event
const { data, error } = await supabase
  .from('events')
  .delete()
  .eq('id', eventId);
```

**Real-time Subscriptions:**
```typescript
// Subscribe to event changes
const subscription = supabase
  .channel('events')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'events' },
    (payload) => {
      console.log('Change received!', payload);
    }
  )
  .subscribe();

// Unsubscribe
subscription.unsubscribe();
```

**Security:**
- Use Row Level Security (RLS) policies in Supabase
- Never expose service role key in client code
- Use anon key for client-side operations
- Implement proper authentication checks
- Validate user permissions server-side

**Best Practices:**
- Define TypeScript interfaces for all tables
- Use type-safe queries with interfaces
- Handle errors appropriately
- Implement loading states
- Use optimistic updates for better UX
- Cache frequently accessed data

### 13. MCP (Model Context Protocol) Integration

#### 13.1 Firecrawl MCP Server

**Purpose:** Web scraping and content extraction capabilities for AI-powered features.

**Configuration:**
```json
{
  "mcpServers": {
    "firecrawl-mcp": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "your-api-key"
      }
    }
  }
}
```

**Location:** `.kiro/settings/mcp.json`

**Use Cases:**
- Automated content aggregation for course materials
- Web research for educational resources
- Dynamic content extraction from external sources
- AI-powered content recommendations
- Automated news and updates gathering

**Setup:**
1. Install Firecrawl MCP: `npx -y firecrawl-mcp`
2. Obtain API key from Firecrawl
3. Configure in `.kiro/settings/mcp.json`
4. Restart development environment

**Security:**
- API keys stored in environment variables
- Never commit API keys to version control
- Use `.env.local` for local development
- Use secure environment variables in production

#### 13.2 Supabase MCP Server

**Purpose:** Direct database operations and management through Model Context Protocol.

**Configuration:**
```json
{
  "mcpServers": {
    "supabase-primary": {
      "url": "https://mcp.supabase.com/mcp?project_ref=your-project-ref"
    }
  }
}
```

**Location:** `.kiro/settings/mcp.json`

**Capabilities:**
- Direct database queries and operations
- Schema inspection and management
- Table listing with column details
- Migration management (apply and list)
- SQL execution for complex operations
- Real-time database interaction
- TypeScript type generation
- Edge Functions management
- Project logs and advisors

**Available Operations:**

**Database Schema:**
```typescript
// List all tables in schema(s)
list_tables({ schemas: ['public'], verbose: true })

// List extensions
list_extensions()

// List migrations
list_migrations()
```

**Data Operations:**
```typescript
// Execute SQL queries
execute_sql({ query: 'SELECT * FROM events WHERE status = $1', params: ['upcoming'] })

// Apply migrations
apply_migration({ 
  name: 'add_events_table',
  query: 'CREATE TABLE events (...)'
})
```

**Project Management:**
```typescript
// Get project URL
get_project_url()

// Get publishable keys
get_publishable_keys()

// Generate TypeScript types
generate_typescript_types()
```

**Edge Functions:**
```typescript
// List Edge Functions
list_edge_functions()

// Get Edge Function code
get_edge_function({ function_slug: 'my-function' })

// Deploy Edge Function
deploy_edge_function({
  name: 'my-function',
  entrypoint_path: 'index.ts',
  files: [{ name: 'index.ts', content: '...' }]
})
```

**Monitoring:**
```typescript
// Get logs
get_logs({ service: 'api' | 'postgres' | 'auth' | 'storage' })

// Get advisors (security/performance)
get_advisors({ type: 'security' | 'performance' })
```

**Branching (Development Branches):**
```typescript
// Create branch
create_branch({ name: 'develop' })

// List branches
list_branches()

// Merge branch
merge_branch({ branch_id: 'branch-id' })

// Reset branch
reset_branch({ branch_id: 'branch-id' })
```

**Use Cases:**
- Database schema exploration and management
- Direct data queries for debugging
- Migration management and tracking
- Edge Function deployment and management
- Security and performance monitoring
- Development branch workflows
- TypeScript type generation for type-safe queries

**Setup:**
1. Ensure Supabase project is created
2. Get project reference from Supabase dashboard
3. Configure MCP URL with project reference
4. MCP server handles authentication automatically

**Security:**
- MCP server uses secure authentication
- Project reference is safe to include in configuration
- All operations respect Row Level Security (RLS) policies
- Audit logs track all database operations
- Use advisors to check for security vulnerabilities

**Best Practices:**
- Use `list_tables` with `verbose: false` for quick schema overview
- Enable `verbose: true` when you need detailed column information
- Always use `apply_migration` for DDL operations (schema changes)
- Use `execute_sql` for DML operations (data queries)
- Check advisors regularly for security and performance issues
- Use development branches for testing schema changes
- Generate TypeScript types after schema changes
- Monitor logs for debugging and troubleshooting

**Integration with Application:**
The Supabase MCP server complements the Supabase client (`lib/supabase.ts`) by providing:
- Direct database access for development and debugging
- Schema management capabilities
- Migration tracking and management
- Advanced monitoring and diagnostics
- Edge Function deployment automation

**Example Workflow:**
1. Use MCP to explore schema: `list_tables({ schemas: ['public'], verbose: true })`
2. Create migration: `apply_migration({ name: 'add_feature', query: '...' })`
3. Generate types: `generate_typescript_types()`
4. Update application code with new types
5. Check for issues: `get_advisors({ type: 'security' })`
6. Monitor logs: `get_logs({ service: 'postgres' })`
