-- Schema Improvements
-- Adds constraints and indexes for data integrity and performance

-- Prevent self-swipes (a group cannot swipe on itself)
ALTER TABLE swipes
ADD CONSTRAINT no_self_swipe CHECK (swiper_id != receiver_id);

-- Prevent self-matches (should never happen, but enforce at DB level)
ALTER TABLE matches
ADD CONSTRAINT no_self_match CHECK (group_one_id != group_two_id);

-- Composite index for finding all matches for a given group
-- Useful for the matches page query
CREATE INDEX idx_matches_both_groups ON matches(group_one_id, group_two_id);

-- Index for ordering matches by recency
CREATE INDEX idx_matches_created_at ON matches(created_at DESC);

-- Index for ordering swipes by recency (useful for analytics/debugging)
CREATE INDEX idx_swipes_created_at ON swipes(created_at DESC);
