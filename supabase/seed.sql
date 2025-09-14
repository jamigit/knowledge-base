-- FeedFlow Database Seed Data
-- This file contains sample data for development and testing

-- Sample categories
INSERT INTO categories (id, user_id, name, color) VALUES
  ('11111111-1111-1111-1111-111111111111', (SELECT id FROM auth.users LIMIT 1), 'Technology', '#3b82f6'),
  ('22222222-2222-2222-2222-222222222222', (SELECT id FROM auth.users LIMIT 1), 'News', '#ef4444'),
  ('33333333-3333-3333-3333-333333333333', (SELECT id FROM auth.users LIMIT 1), 'Design', '#8b5cf6'),
  ('44444444-4444-4444-4444-444444444444', (SELECT id FROM auth.users LIMIT 1), 'Science', '#10b981');

-- Sample sources
INSERT INTO sources (id, user_id, name, url, type, status, last_updated) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', (SELECT id FROM auth.users LIMIT 1), 'TechCrunch', 'https://techcrunch.com/feed/', 'rss', 'active', NOW()),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', (SELECT id FROM auth.users LIMIT 1), 'Hacker News', 'https://hnrss.org/frontpage', 'rss', 'active', NOW()),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', (SELECT id FROM auth.users LIMIT 1), 'The Verge', 'https://www.theverge.com/rss/index.xml', 'rss', 'active', NOW()),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', (SELECT id FROM auth.users LIMIT 1), 'CSS-Tricks', 'https://css-tricks.com/feed/', 'rss', 'active', NOW());

-- Associate sources with categories
INSERT INTO source_categories (source_id, category_id) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111'), -- TechCrunch -> Technology
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222'), -- TechCrunch -> News
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111'), -- Hacker News -> Technology
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111'), -- The Verge -> Technology
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222'), -- The Verge -> News
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '33333333-3333-3333-3333-333333333333'); -- CSS-Tricks -> Design

-- Sample articles
INSERT INTO articles (id, source_id, title, excerpt, url, author, published_at, is_read, is_favorite, content_hash) VALUES
  ('11111111-aaaa-aaaa-aaaa-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
   'The Future of AI in Web Development',
   'Exploring how artificial intelligence is revolutionizing the way we build and design websites.',
   'https://example.com/ai-web-development',
   'John Doe',
   NOW() - INTERVAL '2 hours',
   false, false, 'hash1'),

  ('22222222-aaaa-aaaa-aaaa-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
   'New JavaScript Framework Released',
   'A lightweight alternative to React that promises better performance.',
   'https://example.com/new-js-framework',
   'Jane Smith',
   NOW() - INTERVAL '4 hours',
   true, false, 'hash2'),

  ('33333333-aaaa-aaaa-aaaa-333333333333', 'cccccccc-cccc-cccc-cccc-cccccccccccc',
   'Mobile Design Trends 2024',
   'The latest trends in mobile UI/UX design that are shaping user experiences.',
   'https://example.com/mobile-design-trends',
   'Design Team',
   NOW() - INTERVAL '1 day',
   false, true, 'hash3'),

  ('44444444-aaaa-aaaa-aaaa-444444444444', 'dddddddd-dddd-dddd-dddd-dddddddddddd',
   'CSS Grid vs Flexbox: When to Use What',
   'A comprehensive guide to choosing between CSS Grid and Flexbox for your layouts.',
   'https://example.com/css-grid-flexbox',
   'CSS Expert',
   NOW() - INTERVAL '2 days',
   true, true, 'hash4');

-- Sample article notes
INSERT INTO article_notes (article_id, user_id, content, tags) VALUES
  ('33333333-aaaa-aaaa-aaaa-333333333333', (SELECT id FROM auth.users LIMIT 1),
   '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Great insights on mobile design. Need to implement these patterns in our next project."}]}]}'::jsonb,
   ARRAY['design', 'mobile', 'ui/ux']),

  ('44444444-aaaa-aaaa-aaaa-444444444444', (SELECT id FROM auth.users LIMIT 1),
   '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Excellent comparison. Grid for 2D layouts, Flexbox for 1D. Bookmarked for reference."}]}]}'::jsonb,
   ARRAY['css', 'layout', 'reference']);

-- Sample reading sessions
INSERT INTO reading_sessions (user_id, article_id, started_at, ended_at, reading_time_seconds, progress_start, progress_end) VALUES
  ((SELECT id FROM auth.users LIMIT 1), '22222222-aaaa-aaaa-aaaa-222222222222',
   NOW() - INTERVAL '3 hours', NOW() - INTERVAL '3 hours' + INTERVAL '5 minutes',
   300, 0, 100),

  ((SELECT id FROM auth.users LIMIT 1), '44444444-aaaa-aaaa-aaaa-444444444444',
   NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day' + INTERVAL '8 minutes',
   480, 0, 100);