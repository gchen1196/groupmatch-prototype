-- GroupMatch Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Groups table
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  bio TEXT NOT NULL,
  avatar_url TEXT,
  member_count INTEGER DEFAULT 2 CHECK (member_count >= 2 AND member_count <= 4),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Swipes table
CREATE TABLE swipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  swiper_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  is_like BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(swiper_id, receiver_id)
);

-- Matches table
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- Seed data for testing
INSERT INTO groups (id, name, bio, avatar_url, member_count) VALUES
  ('11111111-1111-1111-1111-111111111111', 'The Adventurers', 'We love hiking, camping, and outdoor activities!', 'https://api.dicebear.com/7.x/avataaars/svg?seed=adventurers', 3),
  ('22222222-2222-2222-2222-222222222222', 'Foodies United', 'Exploring the best restaurants in town together.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=foodies', 4),
  ('33333333-3333-3333-3333-333333333333', 'Game Night Crew', 'Board games, video games, you name it!', 'https://api.dicebear.com/7.x/avataaars/svg?seed=gamers', 2),
  ('44444444-4444-4444-4444-444444444444', 'Book Club', 'Avid readers looking for literary discussions.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=bookclub', 3),
  ('55555555-5555-5555-5555-555555555555', 'Fitness Friends', 'Gym buddies and workout enthusiasts.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=fitness', 4);
