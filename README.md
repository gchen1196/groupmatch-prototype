# PRD: GroupMatch Prototype

## 1. Project Overview

**GroupMatch** is a social discovery platform where small groups (2-4 people) match with other groups. This prototype focuses on the core "discovery-to-match" loop using a gesture-based interface and a clean, decoupled architecture.

## 2. Product Requirements

### Core User Stories

* **Group Discovery:** As a group representative, I want to see a stack of potential group matches with their name, bio, and member count.
* **The Swipe:** As a user, I want to swipe right to "Like" or left to "Pass" on a group.
* **Match Confirmation:** As a user, I want an immediate visual celebration when a mutual "Like" occurs.
* **Match History:** As a user, I want to view a list of all groups we have successfully matched with.

### Out of Scope (Intentional)

* **Group Chat:** Communication is deferred to a post-prototype phase.
* **User Onboarding:** The prototype will use a "Mocked" current user group session.
* **Geolocation:** Discovery will be based on a global list rather than proximity for the prototype.

---

## 3. Technical Architecture

This project follows the **MVVM (Model-View-ViewModel)** pattern to ensure a clean separation between the Supabase data layer and the React UI.

### Layer Responsibilities

| Layer | Responsibility | Technology |
| --- | --- | --- |
| **View** | Renders the UI and handles user input gestures. | React (Next.js/Expo) |
| **ViewModel** | Manages UI state (loading, alerts) and orchestrates service calls. | Custom React Hooks |
| **Service** | Contains business logic (Match Validation). | TypeScript Services |
| **Model** | Direct communication with the data store. | Supabase Client / SQL |

---

## 4. Data Schema (PostgreSQL)

The database avoids hidden side effects (triggers) in favor of explicit service-level logic.

### Tables

1. **`groups`**: Stores group metadata.
* `id` (UUID, PK)
* `name` (Text)
* `bio` (Text)
* `avatar_url` (Text)


2. **`swipes`**: Records individual group actions.
* `id` (UUID, PK)
* `swiper_id` (FK -> groups.id)
* `receiver_id` (FK -> groups.id)
* `is_like` (Boolean)


3. **`matches`**: Records successful mutual interests.
* `id` (UUID, PK)
* `group_one_id` (FK -> groups.id)
* `group_two_id` (FK -> groups.id)
* `created_at` (Timestamp)



---

## 5. Implementation Logic: The "Manual Match"

To maintain best practices for a React/NestJS developer, the match detection is handled explicitly in the **Service Layer**.

### Logic Flow

1. **Swipe Event:** User swipes right on Group B.
2. **Persistence:** The `swipes` table is updated with the "Like."
3. **Reciprocity Check:** The Service queries: *Does Group B have a "Like" record for Group A?*
4. **Match Creation:** If yes, the Service explicitly creates a record in the `matches` table.
5. **State Update:** The ViewModel triggers the "Match Celebration" in the UI.

---

## 6. Security & RLS

Row Level Security (RLS) ensures that groups can only see their own matches.

```sql
-- Example RLS for Matches
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Groups can only see their own matches" 
ON matches FOR SELECT 
USING (
  group_one_id = auth.uid_group() OR 
  group_two_id = auth.uid_group()
);

```
