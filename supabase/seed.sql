-- Seed data for testing
INSERT INTO groups (id, name, bio, avatar_url, member_count) VALUES
  ('11111111-1111-1111-1111-111111111111', 'The Adventurers', 'We love hiking, camping, and outdoor activities!', 'https://api.dicebear.com/7.x/avataaars/svg?seed=adventurers', 3),
  ('22222222-2222-2222-2222-222222222222', 'Foodies United', 'Exploring the best restaurants in town together.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=foodies', 4),
  ('33333333-3333-3333-3333-333333333333', 'Game Night Crew', 'Board games, video games, you name it!', 'https://api.dicebear.com/7.x/avataaars/svg?seed=gamers', 2),
  ('44444444-4444-4444-4444-444444444444', 'Book Club', 'Avid readers looking for literary discussions.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=bookclub', 3),
  ('55555555-5555-5555-5555-555555555555', 'Fitness Friends', 'Gym buddies and workout enthusiasts.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=fitness', 4)
ON CONFLICT (id) DO NOTHING;
