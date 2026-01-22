# GroupMatch Prototype

A social discovery platform where small groups (2-4 people) match with other groups. This prototype focuses on the core "discovery-to-match" loop using a gesture-based interface.

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Frontend** | React 19 + TypeScript + Vite |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **State** | React Query (@tanstack/react-query) |
| **Backend** | Supabase (PostgreSQL + Auth + RLS) |
| **Gestures** | react-swipeable |

## Project Structure

```text
src/
├── components/          # UI components
│   ├── ui/              # shadcn/ui primitives (Button, Card, Select)
│   ├── GroupCard.tsx    # Swipeable group card with gestures
│   ├── MatchCard.tsx    # Match list item card
│   ├── SwipeButtons.tsx # Like/Pass action buttons
│   ├── MatchCelebration.tsx
│   └── Header.tsx       # App header with nav and group selector
├── pages/               # Route components
│   ├── DiscoverPage.tsx # Swipe interface
│   └── MatchesPage.tsx  # Match history
├── hooks/               # Custom React hooks
│   ├── useDiscovery.ts  # Discovery state + swipe mutations
│   └── useMatches.ts    # Match list queries
├── services/            # Business logic + Supabase calls
│   ├── groupService.ts  # Group CRUD operations
│   └── matchService.ts  # Swipe + match detection logic
├── lib/                 # Utilities
│   ├── supabase.ts      # Supabase client
│   ├── queryClient.ts   # React Query client
│   ├── avatar.ts        # Default avatar URL helper
│   └── utils.ts         # Tailwind class merge (cn)
├── data/                # Static/test data
│   └── testGroups.ts    # Seed group IDs for testing
└── types/               # TypeScript types
    └── database.types.ts # Auto-generated Supabase types
```

## Architecture

### Layer Responsibilities

| Layer | Responsibility | Location |
| --- | --- | --- |
| **View** | UI rendering, user gestures | `components/`, `pages/` |
| **Hooks** | UI state, query orchestration | `hooks/` |
| **Service** | Business logic, match detection | `services/` |
| **Data** | Supabase client, types | `lib/supabase.ts`, `types/` |

### Data Flow

```text
User Gesture → Hook (useMutation) → Service → Supabase
                    ↓
              Cache Invalidation → Re-render
```

## Database Schema

### Tables

**`groups`** - Group metadata

- `id` (UUID, PK)
- `name` (Text)
- `bio` (Text)
- `avatar_url` (Text, nullable)
- `member_count` (Integer)

**`swipes`** - Individual swipe actions

- `id` (UUID, PK)
- `swiper_id` (FK → groups.id)
- `receiver_id` (FK → groups.id)
- `is_like` (Boolean)
- `created_at` (Timestamp)

**`matches`** - Mutual likes

- `id` (UUID, PK)
- `group_one_id` (FK → groups.id)
- `group_two_id` (FK → groups.id)
- `created_at` (Timestamp)

## Match Detection Logic

Match detection is handled explicitly in the service layer (no database triggers):

1. **Swipe Event** - User swipes right on Group B
2. **Persist Swipe** - Insert into `swipes` table
3. **Reciprocity Check** - Query: Does Group B have a "Like" for Group A?
4. **Match Creation** - If yes, insert into `matches` table
5. **UI Update** - Return match data, trigger celebration modal

```typescript
// services/matchService.ts
async function recordSwipe(swiperId, receiverId, isLike) {
  await supabase.from('swipes').insert({ swiper_id, receiver_id, is_like });

  if (isLike) {
    const reciprocal = await checkReciprocalLike(receiverId, swiperId);
    if (reciprocal) {
      return await createMatch(swiperId, receiverId);
    }
  }
  return null;
}
```

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run db:types     # Generate Supabase types
npm run db:push      # Push schema to Supabase
npm run db:push:seed # Push schema + seed data
npm run db:reset     # Reset database (linked project)
```

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment**

   ```bash
   cp .env.example .env
   # Add your Supabase URL and anon key
   ```

3. **Link Supabase project**

   ```bash
   npx supabase link
   ```

4. **Push schema and seed data**

   ```bash
   npm run db:push:seed
   ```

5. **Generate types**

   ```bash
   npm run db:types
   ```

6. **Start development**

   ```bash
   npm run dev
   ```

## Features

- **Swipe Gestures** - Drag cards left/right with visual feedback
- **Button Actions** - Tap buttons as alternative to swiping
- **Match Celebration** - Modal animation on mutual like
- **Responsive Design** - Mobile-first layout
- **Group Selector** - Switch between test groups to verify match flow
