# PRD: GroupMatch Prototype

## 1. Overview

**GroupMatch** is a social discovery platform where small groups (2-4 people) match with other groups for social activities. This prototype validates the core "discovery-to-match" experience.

### Goals

- Validate the group-to-group matching concept
- Test swipe-based discovery UX
- Establish core matching mechanics

### Success Metrics

- Users can discover and swipe through groups
- Mutual likes result in a match
- Users can view their match history

---

## 2. User Stories

### Discovery

| ID | Story | Acceptance Criteria |
| --- | --- | --- |
| US-1 | As a group rep, I want to see potential groups to match with | Display group card with name, bio, avatar, member count |
| US-2 | As a user, I want to swipe right to like a group | Swipe gesture or tap button triggers "like" action |
| US-3 | As a user, I want to swipe left to pass on a group | Swipe gesture or tap button triggers "pass" action |
| US-4 | As a user, I want visual feedback while swiping | Card rotates, buttons highlight based on swipe direction |

### Matching

| ID | Story | Acceptance Criteria |
| --- | --- | --- |
| US-5 | As a user, I want to know immediately when we match | Match celebration modal appears on mutual like |
| US-6 | As a user, I want to see all our matches | Match history page shows list of matched groups |

### Navigation

| ID | Story | Acceptance Criteria |
| --- | --- | --- |
| US-7 | As a user, I want to switch between discovery and matches | Tab navigation between Discover and Matches pages |
| US-8 | As a tester, I want to switch groups to test matching | Group selector dropdown in header |

---

## 3. Functional Requirements

### FR-1: Group Discovery

- Display one group card at a time
- Show group: name, bio, avatar image, member count
- Exclude current group from discovery
- Exclude already-swiped groups

### FR-2: Swipe Actions

- **Like (swipe right):** Record positive interest
- **Pass (swipe left):** Record negative interest, skip group
- Support both gesture (drag) and button tap
- Minimum swipe threshold before action triggers

### FR-3: Match Detection

- Match occurs when both groups have liked each other
- Match detection happens immediately after a like
- No database triggers - explicit service-level logic

### FR-4: Match Celebration

- Modal overlay on match
- Dismissible by tap/click
- Returns to discovery after dismiss

### FR-5: Match History

- List all matched groups
- Show matched group: name, bio, avatar, member count
- Most recent matches first

---

## 4. Non-Functional Requirements

### NFR-1: Performance

- Card swipe animations at 60fps
- Page load under 2 seconds

### NFR-2: Responsive Design

- Mobile-first design (320px minimum)
- Tablet and desktop support
- Touch and mouse input support

### NFR-3: Accessibility

- Button aria-labels for screen readers
- Keyboard navigation support (buttons)

---

## 5. Data Model

### Group

- ID (unique identifier)
- Name
- Bio (description)
- Avatar URL (optional)
- Member count

### Swipe

- Swiper group ID
- Receiver group ID
- Is like (boolean)
- Timestamp

### Match

- Group one ID
- Group two ID
- Timestamp

### Business Rules

- A group cannot swipe on itself
- A group can only swipe once on another group
- A match requires mutual likes (A likes B AND B likes A)
- Match is created by the second liker

---

## 6. Out of Scope

The following are explicitly excluded from this prototype:

| Feature | Reason |
| --- | --- |
| User authentication | Use mocked group session for testing |
| Group chat/messaging | Post-match communication deferred |
| Group creation/editing | Pre-seeded test data only |
| Geolocation filtering | Global discovery for prototype |
| Push notifications | Browser-only experience |
| Undo/rewind swipes | Simplify initial UX |

---

## 7. UI Requirements

### Screens

1. **Discover Page**
   - Group card (centered)
   - Like/Pass buttons below card
   - Empty state when no groups left

2. **Matches Page**
   - Page title
   - List of matched groups
   - Empty state when no matches

3. **Header (Global)**
   - App logo/name
   - Navigation tabs (Discover, Matches)
   - Group selector (testing)

### Visual Design

- Clean, modern aesthetic
- Card-based UI for groups
- Swipe feedback (rotation, button highlighting)
- Celebration animation for matches

---

## 8. Future Considerations

Features to consider for post-prototype:

- Real user authentication
- Group creation and management
- In-app messaging after match
- Location-based discovery
- Group member profiles
- Activity/interest tags
- Push notifications
- Swipe undo functionality
