# Interactive Features & CRUD Operations Guide

## Overview

This document outlines all interactive features and CRUD (Create, Read, Update, Delete) operations implemented across the HimmatKaar platform dashboards.

---

## Admin Dashboard Features

### 1. User Management (`/dashboard/admin/users`)

**CRUD Operations:**

**CREATE:**
- Click "Add New User" button
- Fill in form fields (Name, Email, Role, Status)
- Click "Create" to add user
- User appears in table immediately
- Auto-generates user ID and join date

**READ:**
- View all users in table format
- Search by name or email (real-time filtering)
- Filter by role (Student, Coordinator, Admin)
- Filter by status (Active, Inactive, Pending)
- View user statistics (Total, Active, Inactive, Pending)

**UPDATE:**
- Click Edit icon on any user row
- Modal opens with pre-filled data
- Modify any field
- Click "Update" to save changes
- Changes reflect immediately in table

**DELETE:**
- Click Delete icon on any user row
- Confirmation dialog appears
- Confirm to remove user
- User removed from table immediately

**Interactive Features:**
- Real-time search filtering
- Multi-filter support (Role + Status)
- Export functionality
- Responsive table design
- Status badges with color coding
- Role badges with color coding
- Hover effects on rows
- Modal animations

---

### 2. Course Management (`/dashboard/admin/courses`)

**CRUD Operations:**

**CREATE:**
- Click "Create New Course" button
- Fill in course details
- Upload course thumbnail
- Set capacity and duration
- Click "Create" to publish

**READ:**
- Grid/List view toggle
- Filter by status (Published, Draft)
- Filter by category
- Search by title
- View enrollment statistics
- View course thumbnails

**UPDATE:**
- Click "Edit" on course card
- Modify course details
- Update thumbnail
- Change status (Publish/Unpublish)
- Save changes

**DELETE:**
- Click Delete icon
- Confirmation required
- Course removed from system

**Interactive Features:**
- Grid/List view switching
- Progress bars for enrollments
- Status badges
- Category badges
- Hover effects with scale
- Image zoom on hover
- Filter combinations

---

### 3. Event Management (`/dashboard/admin/events`)

**CRUD Operations:**

**CREATE:**
- Click "Create New Event"
- Fill event form:
  - Title, Description
  - Date, Time, Location
  - Event Type, Capacity
  - Image URL
- Click "Create Event"

**READ:**
- View all events in list
- Filter by status (Upcoming, Past, Cancelled)
- Search by title
- View registration statistics
- See participant counts
- View event images

**UPDATE:**
- Click "Edit Event"
- Modify event details
- Update capacity
- Change date/time
- Save changes

**DELETE:**
- Click Delete icon
- Confirm deletion
- Event removed

**Interactive Features:**
- Registration progress bars
- Capacity indicators
- Status badges (Upcoming, Full, Completed)
- Type badges
- Participant list view
- Export participant data
- Real-time registration counts

---

### 4. Settings (`/dashboard/admin/settings`)

**Tabbed Interface:**

**General Settings:**
- Site name input
- Site description textarea
- Timezone selector
- Language selector
- Logo upload
- Save changes button

**Email Settings:**
- SMTP configuration
- From email/name
- Test email functionality
- Save configuration

**Security Settings:**
- Password policy checkboxes
- Session timeout input
- 2FA toggle
- Security audit button

**Integrations:**
- API key management
- Google Analytics toggle
- AWS S3 toggle
- Service on/off switches

**Backup & Recovery:**
- Backup schedule selector
- Retention period input
- Manual backup button
- Backup history table
- Restore functionality

**Interactive Features:**
- Tab switching
- Form validation
- Success messages
- Toggle switches
- Real-time updates
- Test buttons

---

### 5. Analytics (`/dashboard/admin/analytics`)

**Interactive Features:**
- Date range selector
- Export report button
- Interactive charts:
  - User growth bar chart
  - Course enrollment progress bars
  - Completion rate metrics
- Trend indicators (up/down arrows)
- Sortable tables
- Filter by time period
- Hover tooltips on charts

---

## Coordinator Dashboard Features

### 1. Student Management (`/dashboard/coordinator/students`)

**CRUD Operations:**

**READ:**
- View all assigned students
- Search by name, email, location
- Filter by status (Active, Needs Help, Inactive)
- View student cards with:
  - Profile photo
  - Contact information
  - Enrollment statistics
  - Progress percentage
  - Trend indicators

**UPDATE:**
- View student profile
- Send messages
- Update notes

**Interactive Features:**
- Real-time search
- Status filtering
- Export student list
- Progress bars
- Trend indicators (up/down)
- Contact buttons (Email, Phone)
- View profile action

---

### 2. Assignment Grading (`/dashboard/coordinator/assignments`)

**CRUD Operations:**

**READ:**
- View all assignments
- See submission counts
- Filter by status
- View pending reviews

**UPDATE (Grading):**
- Select assignment from list
- View student submissions
- Enter grade (0-100)
- Select letter grade
- Write feedback
- Submit grade
- Status changes to "Graded"

**Interactive Features:**
- Assignment selection
- Submission list
- File preview/download
- Grade input fields
- Feedback textarea
- Submit grade button
- Status badges
- Progress tracking
- Filter by course

---

### 3. Reports (`/dashboard/coordinator/reports`)

**Features:**
- Generate student progress reports
- Course completion reports
- Assignment submission reports
- Date range selection
- Export options (PDF, CSV, Excel)
- Charts and visualizations
- Print functionality

---

### 4. Messages (`/dashboard/coordinator/messages`)

**CRUD Operations:**

**CREATE:**
- Compose new message
- Select recipient
- Write message
- Send

**READ:**
- View inbox
- Read messages
- Search messages
- Filter by sender

**UPDATE:**
- Reply to messages
- Mark as read/unread

**DELETE:**
- Delete messages
- Archive messages

**Interactive Features:**
- Unread indicators
- Search functionality
- Filter options
- Reply interface
- Attachment support

---

## Student Dashboard Features

### 1. Events (`/dashboard/student/events`)

**Interactive Operations:**

**READ:**
- Browse all events
- Search by keyword
- Filter by type
- View event details
- See registration status

**CREATE (Registration):**
- Click "Register Now"
- Confirmation message
- Status changes to "Registered"
- Event added to "My Registrations"

**DELETE (Cancel Registration):**
- Click on registered event
- Cancel registration option
- Confirmation required
- Status reverts to available

**Interactive Features:**
- Filter tabs (All, My Registrations, Upcoming)
- Search functionality
- Registration buttons
- Status badges
- Progress bars (spots available)
- Event cards with hover effects
- Registration confirmation

---

### 2. Profile (`/dashboard/student/profile`)

**UPDATE Operations:**
- Edit personal information
- Update contact details
- Change address
- Modify bio
- Change password
- Upload profile photo

**Interactive Features:**
- Form validation
- Real-time updates
- Success/error messages
- Photo upload preview
- Save button
- Cancel button

---

### 3. Certificates (`/dashboard/student/certificates`)

**READ Operations:**
- View all certificates
- See certificate details
- Preview certificates

**Actions:**
- Download PDF
- Share certificate
- Verify certificate

**Interactive Features:**
- Certificate grid
- Preview cards
- Download buttons
- Share buttons
- Verification codes
- Empty state message

---

## Common Interactive Features Across All Dashboards

### 0. EventsSection Component (Public Website)

**Dynamic Event Loading:**

**Features:**
- Fetches events from `/api/events` endpoint
- Query parameters: `limit=3&status=upcoming`
- Displays 3 most recent upcoming events
- Automatic fallback to static events if API fails
- Loading skeleton screens during fetch
- Error handling with user-friendly messages

**READ Operations:**
- Fetch events on component mount
- Display event cards with:
  - Event image
  - Event title
  - Formatted date
  - Status badge
  - Event details link
- View all events link

**Interactive Features:**
- Loading states (skeleton screens)
- Error states with fallback content
- Hover effects on event cards
- Image zoom on hover
- Smooth animations (Framer Motion)
- Responsive grid layout (1 col mobile, 3 cols desktop)
- "View All Events" CTA button

**Data Flow:**
```
Component Mount → useEffect → fetch('/api/events?limit=3&status=upcoming') 
→ Success: setEvents(data.events) 
→ Error: setError(message) + Use fallback events
→ Finally: setLoading(false)
→ Render: displayEvents (API data or fallback)
```

**Fallback Events:**
- Youth Leadership Summit (March 25, 2026)
- Innovation Workshop (April 10, 2026)
- Community Open House (April 20, 2026)

**TypeScript Interface:**
```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  image: string;
  status: string;
}
```

**Date Formatting:**
- Converts ISO date strings to readable format
- Example: "2026-03-25" → "March 25, 2026"
- Uses `toLocaleDateString('en-US')` with options

**Integration Points:**
- Used in: `app/page.tsx` (Home page)
- API endpoint: `/api/events/route.ts`
- Replaces static events section with dynamic content
- Maintains same UI/UX as original design

---

### 1. Navigation
- Active page highlighting
- Hover effects on menu items
- Smooth transitions
- Responsive sidebar
- Mobile menu toggle

### 2. Search & Filter
- Real-time search
- Multiple filter combinations
- Clear filters option
- Search suggestions
- Filter badges

### 3. Modals & Dialogs
- Create/Edit modals
- Confirmation dialogs
- Success messages
- Error messages
- Loading states

### 4. Forms
- Input validation
- Required field indicators
- Error messages
- Success feedback
- Auto-save (where applicable)
- Cancel/Reset options

### 5. Tables
- Sortable columns
- Pagination
- Row selection
- Bulk actions
- Export functionality
- Responsive design

### 6. Cards
- Hover effects
- Click actions
- Status badges
- Progress indicators
- Action buttons
- Image previews

### 7. Notifications
- Toast messages
- Success alerts
- Error alerts
- Warning messages
- Info messages
- Auto-dismiss

### 8. Loading States
- Skeleton screens
- Spinners
- Progress bars
- Loading overlays
- Shimmer effects

---

## Logo Branding Implementation

### All Dashboard Pages Include:

**Sidebar Logo:**
```tsx
<Image 
  src="/himmatkaar-logo.jpg" 
  alt="HimmatKaar Logo" 
  width={40} 
  height={40} 
  className="rounded-lg"
/>
```

**Placement:**
- Top of sidebar
- Next to platform name
- Consistent across all roles
- Responsive sizing

**Branding Elements:**
- Logo image
- Platform name (HimmatKaar)
- Role subtitle (Admin Portal, Student Dashboard, etc.)
- Consistent typography
- Role-specific colors

---

## State Management

### React Hooks Used:

**useState:**
- Form data
- Modal visibility
- Selected items
- Filter states
- Search terms
- Tab selection

**useEffect:**
- Data fetching (future)
- Auto-save
- Real-time updates
- Notifications

**Custom Hooks (Future):**
- useAuth
- useUser
- useCourses
- useEvents

---

## Data Flow

### CRUD Operation Flow:

```
User Action → State Update → UI Update → (Future: API Call) → Success/Error Message
```

**Example: Create User**
```
1. Click "Add New User"
2. Modal opens (setShowModal(true))
3. Fill form (setFormData)
4. Click "Create"
5. handleCreate() function
6. Add to users array (setUsers)
7. Close modal
8. Show success message
9. Table updates automatically
```

---

## Future Enhancements

### Phase 1 (Backend Integration):
- Connect to real API
- Database persistence
- Authentication
- File uploads
- Email notifications

### Phase 2 (Advanced Features):
- Real-time updates (WebSockets)
- Drag-and-drop
- Advanced filtering
- Bulk operations
- Import/Export
- Print functionality

### Phase 3 (Optimization):
- Infinite scroll
- Virtual scrolling
- Optimistic updates
- Offline support
- PWA features

---

## Testing Checklist

### For Each CRUD Operation:

**Create:**
- [ ] Form validation works
- [ ] Required fields enforced
- [ ] Success message appears
- [ ] Item appears in list
- [ ] Modal closes
- [ ] Form resets

**Read:**
- [ ] Data displays correctly
- [ ] Search works
- [ ] Filters work
- [ ] Pagination works
- [ ] Empty states show

**Update:**
- [ ] Edit modal opens
- [ ] Data pre-fills
- [ ] Changes save
- [ ] UI updates
- [ ] Success message

**Delete:**
- [ ] Confirmation required
- [ ] Item removes
- [ ] UI updates
- [ ] Success message
- [ ] No errors

---

## Accessibility Features

### Implemented:
- Keyboard navigation
- Focus indicators
- ARIA labels
- Alt text for images
- Color contrast
- Screen reader support

### Form Accessibility:
- Label associations
- Error announcements
- Required field indicators
- Help text
- Validation messages

---

## Performance Optimizations

### Current:
- Component memoization
- Efficient re-renders
- Optimized images
- Lazy loading (future)

### Future:
- Code splitting
- Bundle optimization
- Image optimization
- Caching strategies
- CDN integration

---

*Last Updated: March 11, 2026*  
*Version: 1.0*
