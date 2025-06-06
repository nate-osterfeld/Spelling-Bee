-- use words.json + insertWordsDEV.js instead (includes metadata)
INSERT INTO words (word, level)
VALUES
  ('friends', 'easy'),
  ('tutor', 'easy'),
  ('hammer', 'easy'),
  ('encouragement', 'medium'),
  ('catastrophe', 'medium'),
  ('ambiguous', 'medium'),
  ('coalesce', 'hard'),
  ('amateur', 'hard'),
  ('hierarchy', 'hard')
  ('synonymous', 'hard')
ON CONFLICT (word) DO NOTHING;
