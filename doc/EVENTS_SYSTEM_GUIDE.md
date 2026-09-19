# Events Management System - Quick Reference Guide

## Overview

The Events Management System allows administrators to create and manage events while students can discover, register for, and participate in various events organized by HimmatKaar.

---

## Event Types

1. **Workshop** - Hands-on learning sessions (50-100 capacity)
2. **Conference** - Large-scale gatherings (200-1000 capacity)
3. **Bootcamp** - Intensive training programs (30-50 capacity)
4. **Community Service** - Social impact activities (100-300 capacity)
5. **Career Fair** - Employment and networking events (500-2000 capacity)
6. **Webinar** - Online sessions (unlimited capacity)

---

## Admin Features

### Creating an Event

**Navigation:** Admin Dashboard → Event Management → Create New Event

**Required Fields:**
- Event Title
- Description
- Date
- Time
- Location
- Event Type
- Capacity
- Event Image URL

**Optional Fields:**
- Short Description
- Virtual Link (for online events)
- Registration Deadline
- Cancellation Deadline
- Tags

### Managing Events

**Actions Available:**
- **View Details** - See full event information
- **Edit Event** - Modify event details
- **View Participants** - See list of registered users
- **Export Data** - Download participant list
- **Delete Event** - Remove event (with confirmation)

### Event Statistics

**Metrics Displayed:**
- Total Events Created
- Total Registrations
- Average Attendance Rate
- Next Event Date

### Event Status

- **Draft** - Event created but not published
- **Published** - Event visible to students
- **Upcoming** - Event scheduled for future date
- **Completed** - Event has occurred
- **Cancelled** - Event cancelled
- **Full** - Registration capacity reached

---

## Student Features

### Discovering Events

**Navigation:** Student Dashboard → Events

**Browse Options:**
- All Events
- My Registrations
- Upcoming Events

**Filter By:**
- Event Type
- Date
- Location
- Registration Status

### Event Information Displayed

- Event Title and Description
- Date and Time
- Location
- Event Type Badge
- Spots Available (with progress bar)
- Registration Status

### Registering for Events

**Steps:**
1. Browse available events
2. Click on event card to view details
3. Click "Register Now" button
4. Receive confirmation message
5. Event appears in "My Registrations"

**Registration States:**
- **Available** - Green "Register Now" button
- **Registered** - Gray "Already Registered" button with checkmark
- **Full** - Disabled button with "Event Full" text

### My Registrations

**Information Shown:**
- All registered events
- Registration date
- Event status
- Check-in code (for upcoming events)
- Certificate download (for completed events)

---

## Event Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                     EVENT LIFECYCLE                          │
└─────────────────────────────────────────────────────────────┘

1. Admin Creates Event
   ├─ Upload Event Image (via /api/upload)
   └─ Fill Event Details
   ↓
2. Event Published (visible to students)
   ↓
3. Students Browse Events
   ↓
4. Student Registers
   ↓
5. Confirmation Sent (email + in-app)
   ↓
6. Event Reminder (24 hours before)
   ↓
7. Event Occurs
   ↓
8. Attendance Marked
   ↓
9. Certificate Issued (if applicable)
   ↓
10. Feedback Collected
```

---

## Database Tables

### events
Stores event information including title, description, date, time, location, capacity, and status.

### event_registrations
Tracks user registrations for events with status (registered, waitlisted, cancelled, attended, no_show).

### event_certificates
Stores certificates issued to event attendees.

### event_feedback
Collects feedback and ratings from event participants.

### event_notifications
Manages automated notifications for events (reminders, updates, cancellations).

---

## API Endpoints

### Admin Endpoints

```
GET    /api/events                    # List all events
POST   /api/events                    # Create new event
GET    /api/events/:id                # Get event details
PUT    /api/events/:id                # Update event
DELETE /api/events/:id                # Delete event
GET    /api/events/:id/participants   # Get participant list
POST   /api/events/:id/publish        # Publish event
POST   /api/events/:id/cancel         # Cancel event
POST   /api/upload                    # Upload event image
```

### Image Upload Endpoint

**POST /api/upload**

Upload event images to Supabase Storage.

**Request:**
- Content-Type: `multipart/form-data`
- Body: Form data with `file` field

**Validation:**
- Allowed types: JPEG, JPG, PNG, WebP
- Max file size: 5MB
- Unique filename generation

**Response:**
```json
{
  "url": "https://supabase-storage-url/events/filename.jpg",
  "path": "events/filename.jpg"
}
```

**Error Responses:**
- 400: No file provided / Invalid file type / File too large
- 500: Upload failed

### Student Endpoints

```
GET    /api/events                    # List published events
GET    /api/events/:id                # Get event details
POST   /api/events/:id/register       # Register for event
DELETE /api/events/:id/register       # Cancel registration
GET    /api/events/my-registrations   # Get user's registrations
POST   /api/events/:id/feedback       # Submit event feedback
```

---

## Notifications

### Automatic Notifications

1. **Registration Confirmation**
   - Sent immediately after registration
   - Includes event details and check-in code
   - Email + In-app notification

2. **Event Reminder**
   - Sent 24 hours before event
   - Includes event details and location
   - Email + In-app notification

3. **Event Update**
   - Sent when event details change
   - Includes updated information
   - Email + In-app notification

4. **Event Cancellation**
   - Sent if event is cancelled
   - Includes cancellation reason
   - Email + In-app notification

5. **Certificate Ready**
   - Sent after event completion
   - Includes download link
   - Email + In-app notification

6. **Feedback Request**
   - Sent 24 hours after event
   - Includes feedback form link
   - Email + In-app notification

---

## Capacity Management

### Registration Limits

- **Capacity** - Maximum number of participants
- **Registered** - Current number of registrations
- **Available** - Remaining spots (Capacity - Registered)

### Waitlist Feature

When event reaches capacity:
- New registrations go to waitlist
- Waitlisted users notified if spot opens
- Automatic promotion from waitlist

### Registration Restrictions

- One registration per user per event
- Registration deadline enforcement
- Cancellation deadline enforcement

---

## Event Certificates

### Automatic Generation

Certificates are automatically generated for:
- Events marked as completed
- Users with attendance marked
- Minimum attendance requirement met (if applicable)

### Certificate Details

- Certificate Number (unique)
- Event Title
- Participant Name
- Date of Attendance
- Hours Attended
- Verification Code
- QR Code (future)

### Certificate Actions

- Download PDF
- Share on social media
- Verify authenticity
- Add to profile

---

## Event Analytics

### Admin Analytics

**Event-Level Metrics:**
- Total registrations
- Attendance rate
- Feedback ratings
- Popular event types
- Geographic distribution

**Platform-Level Metrics:**
- Total events created
- Total participants
- Average attendance
- Event trends over time

### Student Analytics

**Personal Metrics:**
- Events attended
- Hours of participation
- Certificates earned
- Event types attended

---

## Best Practices

### For Admins

1. **Create Events Early** - Give students time to register
2. **Set Realistic Capacity** - Based on venue/resources
3. **Add Detailed Descriptions** - Help students make informed decisions
4. **Use Quality Images** - Attract more registrations
5. **Send Reminders** - Reduce no-shows
6. **Collect Feedback** - Improve future events
7. **Issue Certificates Promptly** - Maintain engagement

### For Students

1. **Register Early** - Popular events fill up quickly
2. **Check Event Details** - Ensure you can attend
3. **Add to Calendar** - Don't miss the event
4. **Arrive on Time** - Respect organizers and other participants
5. **Provide Feedback** - Help improve future events
6. **Download Certificates** - Add to your portfolio

---

## Troubleshooting

### Common Issues

**Issue:** Can't register for event  
**Solution:** Check if event is full, registration deadline passed, or already registered

**Issue:** Didn't receive confirmation email  
**Solution:** Check spam folder, verify email address in profile

**Issue:** Can't find my registration  
**Solution:** Go to "My Registrations" tab in Events page

**Issue:** Want to cancel registration  
**Solution:** Click on registered event and select "Cancel Registration"

**Issue:** Certificate not available  
**Solution:** Certificates issued 24-48 hours after event completion

---

## Future Enhancements

### Phase 2
- Virtual event support with video conferencing
- Recurring events
- Event series and tracks
- Ticketing and payment integration
- Event check-in with QR codes
- Mobile app for event management

### Phase 3
- AI-powered event recommendations
- Social sharing and invitations
- Event networking features
- Live event streaming
- Post-event content library
- Event gamification

---

## Support

For event-related support:
- **Email:** events@himmatkaar.org
- **Phone:** +92 XXX XXXXXXX
- **Help Center:** https://himmatkaar.org/help/events

---

## Quick Links

- [Admin Event Management](/dashboard/admin/events)
- [Student Events Page](/dashboard/student/events)
- [Event Guidelines](https://himmatkaar.org/event-guidelines)
- [Event FAQ](https://himmatkaar.org/faq#events)

---

*Last Updated: March 11, 2026*  
*Version: 1.0*
