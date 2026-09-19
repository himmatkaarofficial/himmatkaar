# Database Requirements Document
## HimmatKaar Platform

### 1. Overview

This document outlines the complete database requirements for the HimmatKaar Youth Empowerment Platform, including schema design, relationships, indexes, and data management strategies.

### 2. Database Selection

**Primary Database:** PostgreSQL 15+

**Rationale:**
- ACID compliance for data integrity
- Advanced indexing capabilities
- JSON/JSONB support for flexible data
- Excellent performance for complex queries
- Strong community support
- Open-source and cost-effective

**Secondary Storage:**
- Redis 7+ for caching and session management
- AWS S3 for file storage (documents, images, videos)

### 3. Complete Schema Design

#### 3.1 User Management

**users**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role_id UUID REFERENCES roles(id) ON DELETE RESTRICT,
  avatar_url TEXT,
  phone VARCHAR(20),
  date_of_birth DATE,
  gender VARCHAR(20) CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100) DEFAULT 'Pakistan',
  postal_code VARCHAR(20),
  bio TEXT,
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  email_verified_at TIMESTAMP,
  last_login_at TIMESTAMP,
  login_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_role ON users(role_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_active ON users(is_active) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_created ON users(created_at DESC);
```

**roles**
```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  description TEXT,
  permissions JSONB DEFAULT '[]',
  is_system_role BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_roles_name ON roles(name);

-- Default roles
INSERT INTO roles (name, display_name, description, is_system_role, permissions) VALUES
  ('student', 'Student', 'Student user with access to courses and assignments', true, 
   '["view_courses", "enroll_courses", "submit_assignments", "view_certificates"]'),
  ('coordinator', 'Coordinator', 'Coordinator with student management capabilities', true,
   '["view_courses", "manage_students", "grade_assignments", "view_reports"]'),
  ('admin', 'Administrator', 'Administrator with full system access', true,
   '["*"]');
```

**user_sessions**
```sql
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) NOT NULL,
  refresh_token_hash VARCHAR(255),
  ip_address INET,
  user_agent TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sessions_user ON user_sessions(user_id);
CREATE INDEX idx_sessions_token ON user_sessions(token_hash);
CREATE INDEX idx_sessions_expires ON user_sessions(expires_at);
```

**password_resets**
```sql
CREATE TABLE password_resets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_password_resets_user ON password_resets(user_id);
CREATE INDEX idx_password_resets_token ON password_resets(token_hash);
```

#### 3.2 Course Management

**courses**
```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  thumbnail_url TEXT,
  cover_image_url TEXT,
  instructor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  category VARCHAR(100),
  tags TEXT[],
  difficulty_level VARCHAR(50) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  duration_hours INTEGER,
  language VARCHAR(50) DEFAULT 'English',
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  enrollment_limit INTEGER,
  enrollment_count INTEGER DEFAULT 0,
  prerequisites TEXT[],
  learning_outcomes TEXT[],
  price DECIMAL(10,2) DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'USD',
  rating_average DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_courses_instructor ON courses(instructor_id);
CREATE INDEX idx_courses_published ON courses(is_published) WHERE deleted_at IS NULL;
CREATE INDEX idx_courses_category ON courses(category) WHERE deleted_at IS NULL;
CREATE INDEX idx_courses_slug ON courses(slug) WHERE deleted_at IS NULL;
CREATE INDEX idx_courses_featured ON courses(is_featured) WHERE is_published = true AND deleted_at IS NULL;
```

**modules**
```sql
CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  duration_minutes INTEGER,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(course_id, order_index)
);

CREATE INDEX idx_modules_course ON modules(course_id, order_index);
```

**lessons**
```sql
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  content_type VARCHAR(50) CHECK (content_type IN ('text', 'video', 'quiz', 'document', 'interactive')),
  video_url TEXT,
  video_duration_seconds INTEGER,
  document_url TEXT,
  duration_minutes INTEGER,
  order_index INTEGER NOT NULL,
  is_preview BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(module_id, order_index)
);

CREATE INDEX idx_lessons_module ON lessons(module_id, order_index);
```

**enrollments**
```sql
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  progress_percentage DECIMAL(5,2) DEFAULT 0,
  last_accessed_at TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped', 'suspended')),
  completion_certificate_id UUID,
  UNIQUE(user_id, course_id)
);

CREATE INDEX idx_enrollments_user ON enrollments(user_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);
```

**lesson_progress**
```sql
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT false,
  time_spent_seconds INTEGER DEFAULT 0,
  last_position_seconds INTEGER DEFAULT 0,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, lesson_id)
);

CREATE INDEX idx_lesson_progress_user ON lesson_progress(user_id);
CREATE INDEX idx_lesson_progress_lesson ON lesson_progress(lesson_id);
CREATE INDEX idx_lesson_progress_enrollment ON lesson_progress(enrollment_id);
```

#### 3.3 Assignment System

**assignments**
```sql
CREATE TABLE assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  module_id UUID REFERENCES modules(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  instructions TEXT,
  due_date TIMESTAMP,
  max_points INTEGER DEFAULT 100,
  passing_points INTEGER DEFAULT 60,
  allow_late_submission BOOLEAN DEFAULT false,
  late_penalty_percentage DECIMAL(5,2) DEFAULT 0,
  max_attempts INTEGER DEFAULT 1,
  file_upload_required BOOLEAN DEFAULT false,
  allowed_file_types TEXT[],
  max_file_size_mb INTEGER DEFAULT 10,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_assignments_course ON assignments(course_id);
CREATE INDEX idx_assignments_module ON assignments(module_id);
CREATE INDEX idx_assignments_due_date ON assignments(due_date);
```

**submissions**
```sql
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  attempt_number INTEGER DEFAULT 1,
  file_url TEXT,
  file_name VARCHAR(255),
  file_size_bytes BIGINT,
  submission_text TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_late BOOLEAN DEFAULT false,
  status VARCHAR(50) DEFAULT 'submitted' CHECK (status IN ('draft', 'submitted', 'graded', 'returned')),
  UNIQUE(assignment_id, user_id, attempt_number)
);

CREATE INDEX idx_submissions_assignment ON submissions(assignment_id);
CREATE INDEX idx_submissions_user ON submissions(user_id);
CREATE INDEX idx_submissions_status ON submissions(status);
```

**grades**
```sql
CREATE TABLE grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
  graded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  points_earned DECIMAL(5,2) NOT NULL,
  percentage DECIMAL(5,2),
  letter_grade VARCHAR(2),
  feedback TEXT,
  rubric_scores JSONB,
  graded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_grades_submission ON grades(submission_id);
CREATE INDEX idx_grades_grader ON grades(graded_by);
```

#### 3.4 Certificates

**certificates**
```sql
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  certificate_number VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  pdf_url TEXT,
  verification_code VARCHAR(50) UNIQUE NOT NULL,
  metadata JSONB DEFAULT '{}',
  is_revoked BOOLEAN DEFAULT false,
  revoked_at TIMESTAMP,
  revoked_reason TEXT,
  UNIQUE(user_id, course_id)
);

CREATE INDEX idx_certificates_user ON certificates(user_id);
CREATE INDEX idx_certificates_course ON certificates(course_id);
CREATE INDEX idx_certificates_verification ON certificates(verification_code);
CREATE INDEX idx_certificates_number ON certificates(certificate_number);
```

#### 3.5 Communication

**messages**
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(255),
  body TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  parent_message_id UUID REFERENCES messages(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_recipient ON messages(recipient_id);
CREATE INDEX idx_messages_unread ON messages(recipient_id, is_read) WHERE is_read = false;
```

**notifications**
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  link_url TEXT,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = false;
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);
```

**announcements**
```sql
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  target_roles TEXT[],
  target_courses UUID[],
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_announcements_published ON announcements(is_published, published_at);
```

#### 3.6 Analytics & Tracking

**activities**
```sql
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  activity_type VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100),
  entity_id UUID,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activities_user ON activities(user_id, created_at DESC);
CREATE INDEX idx_activities_type ON activities(activity_type);
CREATE INDEX idx_activities_entity ON activities(entity_type, entity_id);
CREATE INDEX idx_activities_created ON activities(created_at DESC);
```

**course_reviews**
```sql
CREATE TABLE course_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(course_id, user_id)
);

CREATE INDEX idx_reviews_course ON course_reviews(course_id);
CREATE INDEX idx_reviews_user ON course_reviews(user_id);
CREATE INDEX idx_reviews_rating ON course_reviews(rating);
```

**achievements**
```sql
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  description TEXT,
  icon_url TEXT,
  badge_url TEXT,
  criteria JSONB NOT NULL,
  points INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_achievements_active ON achievements(is_active);
```

**user_achievements**
```sql
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metadata JSONB DEFAULT '{}',
  UNIQUE(user_id, achievement_id)
);

CREATE INDEX idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX idx_user_achievements_achievement ON user_achievements(achievement_id);
```

#### 3.7 Event Management

**events**
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location VARCHAR(255),
  type VARCHAR(100),
  capacity INTEGER,
  registered_count INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  image_url TEXT,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_events_date ON events(date) WHERE deleted_at IS NULL;
CREATE INDEX idx_events_status ON events(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_events_type ON events(type) WHERE deleted_at IS NULL;
CREATE INDEX idx_events_slug ON events(slug) WHERE deleted_at IS NULL;
```

**event_registrations**
```sql
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  registration_status VARCHAR(50) DEFAULT 'registered' CHECK (registration_status IN ('registered', 'attended', 'cancelled', 'no_show')),
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  attended_at TIMESTAMP,
  cancelled_at TIMESTAMP,
  notes TEXT,
  UNIQUE(event_id, user_id)
);

CREATE INDEX idx_event_registrations_event ON event_registrations(event_id);
CREATE INDEX idx_event_registrations_user ON event_registrations(user_id);
CREATE INDEX idx_event_registrations_status ON event_registrations(registration_status);
```

### 4. Data Relationships

```
users (1) ──── (N) enrollments (N) ──── (1) courses
  │                                          │
  │                                          │
  ├─── (N) submissions                       ├─── (N) modules
  │         │                                │         │
  │         └─── (1) grades                  │         └─── (N) lessons
  │                                          │
  ├─── (N) certificates                      ├─── (N) assignments
  │                                          │         │
  ├─── (N) activities                        │         └─── (N) submissions
  │                                          │
  ├─── (N) messages (sent)                   └─── (N) course_reviews
  │
  ├─── (N) messages (received)
  │
  ├─── (N) user_achievements
  │
  └─── (N) event_registrations (N) ──── (1) events
```

### 5. Data Integrity Rules

#### 5.1 Referential Integrity
- All foreign keys use appropriate ON DELETE actions
- Cascade deletes for dependent data
- SET NULL for optional references
- RESTRICT for critical references

#### 5.2 Check Constraints
- Gender values limited to predefined options
- Status fields use CHECK constraints
- Rating values between 1-5
- Percentage values between 0-100

#### 5.3 Unique Constraints
- Email addresses must be unique
- Certificate numbers must be unique
- Verification codes must be unique
- User-course enrollment combinations must be unique

### 6. Performance Optimization

#### 6.1 Indexing Strategy
- Primary keys (UUID) automatically indexed
- Foreign keys indexed for join performance
- Frequently queried columns indexed
- Composite indexes for common query patterns
- Partial indexes for filtered queries

#### 6.2 Query Optimization
- Use EXPLAIN ANALYZE for query planning
- Avoid N+1 queries with proper joins
- Use pagination for large result sets
- Implement query result caching

#### 6.3 Database Maintenance
- Regular VACUUM operations
- Index rebuilding schedule
- Statistics updates
- Connection pooling (max 20 connections)

### 7. Backup & Recovery

#### 7.1 Backup Strategy
- Full backup: Daily at 2:00 AM UTC
- Incremental backup: Every 6 hours
- Transaction log backup: Every hour
- Retention: 30 days

#### 7.2 Recovery Procedures
- Point-in-time recovery capability
- Automated backup verification
- Disaster recovery plan
- RTO: 4 hours, RPO: 1 hour

### 8. Data Migration

#### 8.1 Migration Tools
- Prisma Migrate for schema changes
- Custom migration scripts for data transformations
- Rollback procedures for each migration

#### 8.2 Migration Process
1. Create migration in development
2. Test in staging environment
3. Backup production database
4. Apply migration to production
5. Verify data integrity
6. Monitor performance

### 9. Security Measures

#### 9.1 Access Control
- Database user roles with minimal privileges
- Application-level access control
- Encrypted connections (SSL/TLS)
- IP whitelisting for database access

#### 9.2 Data Protection
- Password hashing (bcrypt)
- Sensitive data encryption at rest
- PII data handling compliance
- Audit logging for sensitive operations

### 10. Monitoring

#### 10.1 Metrics to Track
- Query performance
- Connection pool usage
- Database size growth
- Index usage statistics
- Slow query log

#### 10.2 Alerts
- High CPU usage (> 80%)
- Low disk space (< 20%)
- Connection pool exhaustion
- Slow queries (> 1 second)
- Failed backup jobs


### 11. Events Management Schema

#### 11.1 Events Tables

**events**
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  event_type VARCHAR(100) CHECK (event_type IN ('workshop', 'conference', 'bootcamp', 'community', 'career_fair', 'webinar')),
  image_url TEXT,
  cover_image_url TEXT,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME,
  timezone VARCHAR(50) DEFAULT 'Asia/Karachi',
  location VARCHAR(255),
  location_type VARCHAR(50) CHECK (location_type IN ('physical', 'virtual', 'hybrid')),
  virtual_link TEXT,
  capacity INTEGER NOT NULL,
  registration_limit_per_user INTEGER DEFAULT 1,
  allow_waitlist BOOLEAN DEFAULT true,
  registration_deadline TIMESTAMP,
  cancellation_deadline TIMESTAMP,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'cancelled', 'completed')),
  is_featured BOOLEAN DEFAULT false,
  tags TEXT[],
  organizer_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_events_date ON events(date) WHERE deleted_at IS NULL;
CREATE INDEX idx_events_status ON events(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_events_type ON events(event_type) WHERE deleted_at IS NULL;
CREATE INDEX idx_events_slug ON events(slug) WHERE deleted_at IS NULL;
CREATE INDEX idx_events_featured ON events(is_featured) WHERE status = 'published' AND deleted_at IS NULL;
```

**event_registrations**
```sql
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  registration_status VARCHAR(50) DEFAULT 'registered' CHECK (registration_status IN ('registered', 'waitlisted', 'cancelled', 'attended', 'no_show')),
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cancellation_date TIMESTAMP,
  cancellation_reason TEXT,
  attendance_marked BOOLEAN DEFAULT false,
  attended_at TIMESTAMP,
  check_in_code VARCHAR(100) UNIQUE,
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  UNIQUE(event_id, user_id)
);

CREATE INDEX idx_event_registrations_event ON event_registrations(event_id);
CREATE INDEX idx_event_registrations_user ON event_registrations(user_id);
CREATE INDEX idx_event_registrations_status ON event_registrations(registration_status);
CREATE INDEX idx_event_registrations_check_in ON event_registrations(check_in_code);
```

**event_certificates**
```sql
CREATE TABLE event_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  certificate_number VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  pdf_url TEXT,
  verification_code VARCHAR(50) UNIQUE NOT NULL,
  hours_attended DECIMAL(5,2),
  metadata JSONB DEFAULT '{}',
  UNIQUE(event_id, user_id)
);

CREATE INDEX idx_event_certificates_event ON event_certificates(event_id);
CREATE INDEX idx_event_certificates_user ON event_certificates(user_id);
CREATE INDEX idx_event_certificates_verification ON event_certificates(verification_code);
```

**event_feedback**
```sql
CREATE TABLE event_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback_text TEXT,
  would_recommend BOOLEAN,
  suggestions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(event_id, user_id)
);

CREATE INDEX idx_event_feedback_event ON event_feedback(event_id);
CREATE INDEX idx_event_feedback_user ON event_feedback(user_id);
CREATE INDEX idx_event_feedback_rating ON event_feedback(rating);
```

**event_notifications**
```sql
CREATE TABLE event_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  notification_type VARCHAR(100) CHECK (notification_type IN ('registration_confirmation', 'event_reminder', 'event_update', 'event_cancellation', 'feedback_request', 'certificate_ready')),
  recipient_type VARCHAR(50) CHECK (recipient_type IN ('all_registered', 'specific_users', 'waitlisted')),
  subject VARCHAR(255),
  message TEXT,
  scheduled_at TIMESTAMP,
  sent_at TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_event_notifications_event ON event_notifications(event_id);
CREATE INDEX idx_event_notifications_status ON event_notifications(status);
CREATE INDEX idx_event_notifications_scheduled ON event_notifications(scheduled_at);
```

#### 11.2 Event Relationships

```
events (1) ──── (N) event_registrations (N) ──── (1) users
  │
  ├─── (N) event_certificates
  │
  ├─── (N) event_feedback
  │
  └─── (N) event_notifications
```

#### 11.3 Event Queries

**Get upcoming events with registration count:**
```sql
SELECT 
  e.*,
  COUNT(er.id) as registration_count,
  (e.capacity - COUNT(er.id)) as spots_available
FROM events e
LEFT JOIN event_registrations er ON e.id = er.event_id 
  AND er.registration_status = 'registered'
WHERE e.status = 'published'
  AND e.date >= CURRENT_DATE
  AND e.deleted_at IS NULL
GROUP BY e.id
ORDER BY e.date ASC;
```

**Get user's registered events:**
```sql
SELECT 
  e.*,
  er.registration_status,
  er.registration_date,
  er.attendance_marked
FROM events e
INNER JOIN event_registrations er ON e.id = er.event_id
WHERE er.user_id = $1
  AND er.registration_status IN ('registered', 'attended')
ORDER BY e.date ASC;
```
