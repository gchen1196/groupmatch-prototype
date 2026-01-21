-- GroupMatch Database Schema

-- Groups table
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  bio TEXT NOT NULL,
  avatar_url TEXT,
  member_count INTEGER DEFAULT 2 CHECK (member_count >= 2 AND member_count <= 4),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Swipes table
CREATE TABLE swipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  swiper_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  is_like BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(swiper_id, receiver_id)
);

-- Matches table
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_one_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  group_two_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_one_id, group_two_id)
);

-- Indexes for performance
CREATE INDEX idx_swipes_swiper ON swipes(swiper_id);
CREATE INDEX idx_swipes_receiver ON swipes(receiver_id);
CREATE INDEX idx_swipes_reciprocity ON swipes(receiver_id, swiper_id, is_like);
CREATE INDEX idx_matches_group_one ON matches(group_one_id);
CREATE INDEX idx_matches_group_two ON matches(group_two_id);

-- Row Level Security (RLS)
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE swipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- For prototype: Allow all operations (replace with proper auth in production)
CREATE POLICY "Allow all operations on groups" ON groups FOR ALL USING (true);
CREATE POLICY "Allow all operations on swipes" ON swipes FOR ALL USING (true);
CREATE POLICY "Allow all operations on matches" ON matches FOR ALL USING (true);
