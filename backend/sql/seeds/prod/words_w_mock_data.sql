-- Words assigned unique correct/incorrect values based on:

-- 1. Word length and complexity
-- 2. Common usage frequency
-- 3. Spelling difficulty (silent letters, double letters, unusual letter combinations)
-- 4. Technical/specialized terminology
-- 5. Foreign language origins
-- 6. Archaic or obscure terms

-- The values maintain the total of 103 (correct + incorrect) for each word while reflecting realistic difficulty 
-- for each individual word. Common, simple words have high correct counts (90+), while obscure, technical,
-- or very long words have low correct counts (20-40).

INSERT INTO words (word, level, correct, incorrect)
VALUES
  -- Easy words with varied acceptance rates
  ('amend', 'easy', 98, 5),      -- Very common, simple
  ('aphorism', 'easy', 85, 18),  -- Less common than others in easy
  ('audio', 'easy', 97, 6),      -- Very common tech term
  ('autumn', 'easy', 95, 8),     -- Common season
  ('bubble', 'easy', 96, 7),     -- Simple, common word
  ('bridge', 'easy', 97, 6),     -- Common word
  ('business', 'easy', 92, 11),  -- Common but double 's' might trip some
  ('choir', 'easy', 80, 23),     -- Unusual spelling (cho-)
  ('college', 'easy', 94, 9),    -- Common
  ('compass', 'easy', 90, 13),   -- Common but double 's'
  ('contest', 'easy', 93, 10),   -- Common
  ('cradle', 'easy', 91, 12),    -- Less common than others
  ('descendant', 'easy', 82, 21),  -- Longer than most easy words
  ('disaster', 'easy', 89, 14),  -- Common but has 's' and 'a' sounds
  ('dismal', 'easy', 83, 20),    -- Less common adjective
  ('disobey', 'easy', 84, 19),   -- Prefix might confuse
  ('elevator', 'easy', 88, 15),  -- Common but longer
  ('evidence', 'easy', 86, 17),  -- Common but longer
  ('export', 'easy', 93, 10),    -- Common tech/business term
  ('faucet', 'easy', 81, 22),    -- Less common spelling
  ('fountain', 'easy', 87, 16),  -- Common but longer
  ('friends', 'easy', 99, 4),    -- Extremely common
  ('goose', 'easy', 95, 8),      -- Common animal
  ('hammer', 'easy', 94, 9),     -- Common tool
  ('hotel', 'easy', 98, 5),      -- Very common
  ('illegal', 'easy', 90, 13),   -- Common but double 'l'
  ('jewel', 'easy', 85, 18),     -- Unusual 'ew' spelling
  ('perhaps', 'easy', 92, 11),   -- Common but silent 'h'
  ('pineapple', 'easy', 89, 14), -- Compound word
  ('poison', 'easy', 91, 12),    -- Common but 'oi' sound
  ('subject', 'easy', 93, 10),   -- Common
  ('tutor', 'easy', 88, 15),     -- Common but could confuse with 'tudor'
  ('trait', 'easy', 86, 17),     -- Less common
  ('transform', 'easy', 83, 20), -- Longer word
  ('word', 'easy', 99, 4),       -- Extremely simple
  ('wrangle', 'easy', 79, 24),  -- Less common, 'ang' sound
  ('no', 'easy', 100, 3),        -- Extremely basic
  ('yes', 'easy', 100, 3),       -- Extremely basic
  ('maybe', 'easy', 99, 4),      -- Very common
  ('child', 'easy', 98, 5),      -- Very common
  ('fur', 'easy', 97, 6),        -- Very simple
  ('love', 'easy', 99, 4),       -- Extremely common
  ('depart', 'easy', 89, 14),    -- Common but prefix
  ('against', 'easy', 92, 11),   -- Common but 'ain' sound
  ('ample', 'easy', 87, 16),     -- Less common adjective
  ('basin', 'easy', 84, 19),     -- Less common
  ('console', 'easy', 85, 18),   -- Tech term but common
  ('feeble', 'easy', 83, 20),    -- Less common adjective
  ('mentor', 'easy', 86, 17),    -- Common but could confuse with 'mentee'
  ('patrol', 'easy', 85, 18),    -- Common but 'rol' ending
  ('secretary', 'easy', 75, 28), -- Often misspelled (missing 'e')
  ('tailor', 'easy', 84, 19),    -- Common profession but less used
  ('thoughts', 'easy', 88, 15),  -- Common but 'ough' tricky
  ('yacht', 'easy', 70, 33),     -- Very unusual spelling

  -- Medium words with varied acceptance rates
  ('abhor', 'medium', 65, 38),       -- Uncommon verb
  ('abhorrent', 'medium', 60, 43),   -- Long, uncommon
  ('accommodate', 'medium', 55, 48), -- Double letters tricky
  ('accidentally', 'medium', 50, 53),-- Often misspelled
  ('aggregation', 'medium', 58, 45), -- Technical term
  ('aisle', 'medium', 62, 41),       -- Silent 's'
  ('amateur', 'medium', 60, 43),     -- French origin
  ('analogous', 'medium', 55, 48),   -- Technical
  ('anomalous', 'medium', 52, 51),   -- Uncommon
  ('antiquity', 'medium', 58, 45),   -- Historical term
  ('approach', 'medium', 70, 33),    -- Common
  ('artifice', 'medium', 50, 53),    -- Uncommon
  ('asbestos', 'medium', 65, 38),    -- Technical but known
  ('asunder', 'medium', 45, 58),     -- Archaic
  ('austerity', 'medium', 55, 48),   -- Economic term
  ('bizarre', 'medium', 60, 43),     -- Unusual 'zz'
  ('blasphemy', 'medium', 50, 53),   -- Religious term
  ('bravado', 'medium', 55, 48),     -- Uncommon
  ('buzzkill', 'medium', 65, 38),    -- Informal but memorable
  ('caramel', 'medium', 62, 41),     -- Common but pronunciation varies
  ('castigate', 'medium', 45, 58),   -- Rare verb
  ('catastrophe', 'medium', 58, 45), -- Long but common concept
  ('claustrophobia', 'medium', 50, 53), -- Long but known condition
  ('clandestine', 'medium', 48, 55),    -- Uncommon
  ('collapse', 'medium', 70, 33),    -- Common
  ('collateral', 'medium', 60, 43),  -- Financial term
  ('conceptual', 'medium', 55, 48),  -- Academic
  ('conscience', 'medium', 52, 51),  -- Tricky spelling
  ('continuous', 'medium', 65, 38),  -- Common
  ('copacetic', 'medium', 40, 63),   -- Very uncommon
  ('cornucopia', 'medium', 55, 48),  -- Uncommon
  ('circuitous', 'medium', 50, 53),  -- Uncommon
  ('delineation', 'medium', 45, 58), -- Very formal
  ('demagogue', 'medium', 42, 61),   -- Political term
  ('denominator', 'medium', 60, 43), -- Math term
  ('desirable', 'medium', 65, 38),   -- Common
  ('discontinuance', 'medium', 40, 63), -- Very long
  ('discontinuous', 'medium', 45, 58),  -- Long
  ('disparage', 'medium', 50, 53),   -- Uncommon verb
  ('distraction', 'medium', 68, 35), -- Common
  ('eccentricity', 'medium', 52, 51),-- Long but known
  ('encapsulation', 'medium', 48, 55), -- Technical
  ('encouragement', 'medium', 70, 33), -- Common
  ('endeavor', 'medium', 65, 38),    -- Common
  ('enterprise', 'medium', 68, 35),  -- Common
  ('epidemic', 'medium', 70, 33),    -- Common especially recently
  ('equilibrium', 'medium', 58, 45), -- Science term
  ('establish', 'medium', 72, 31),   -- Common
  ('euphoria', 'medium', 60, 43),    -- Common feeling
  ('exhilarating', 'medium', 55, 48),-- Long but common
  ('exercise', 'medium', 75, 28),    -- Very common
  ('extemporaneous', 'medium', 40, 63), -- Very long
  ('fiasco', 'medium', 65, 38),      -- Common
  ('fluorescent', 'medium', 50, 53), -- Tricky spelling
  ('fraudulent', 'medium', 55, 48),  -- Common concept
  ('glockenspiel', 'medium', 30, 73),-- Very obscure
  ('glamour', 'medium', 65, 38),     -- Common
  ('graphic', 'medium', 70, 33),     -- Common
  ('grotesque', 'medium', 58, 45),   -- Uncommon
  ('guillotine', 'medium', 50, 53),  -- Historical
  ('hackneyed', 'medium', 45, 58),   -- Rare
  ('haphazard', 'medium', 55, 48),   -- Uncommon
  ('haggard', 'medium', 50, 53),     -- Uncommon adjective
  ('heuristics', 'medium', 42, 61),  -- Technical
  ('hierarchy', 'medium', 60, 43),   -- Common but tricky spelling
  ('hodgepodge', 'medium', 55, 48),  -- Unusual word
  ('homonym', 'medium', 58, 45),     -- Grammar term
  ('humble', 'medium', 75, 28),      -- Common
  ('impunity', 'medium', 50, 53),    -- Uncommon
  ('inept', 'medium', 55, 48),       -- Uncommon
  ('independence', 'medium', 70, 33),-- Common
  ('inevitable', 'medium', 68, 35),  -- Common
  ('infrastructure', 'medium', 60, 43), -- Common term
  ('initiative', 'medium', 65, 38),  -- Common
  ('insistent', 'medium', 62, 41),   -- Common
  ('insolence', 'medium', 50, 53),   -- Uncommon
  ('intuitive', 'medium', 65, 38),   -- Common
  ('invitation', 'medium', 75, 28),  -- Very common
  ('jovial', 'medium', 55, 48),      -- Uncommon adjective
  ('kingdom', 'medium', 72, 31),     -- Common
  ('matriculate', 'medium', 40, 63), -- Academic/rare
  ('meticulous', 'medium', 60, 43),  -- Common adjective
  ('misunderstand', 'medium', 65, 38), -- Common
  ('mogul', 'medium', 55, 48),       -- Uncommon
  ('minimum', 'medium', 70, 33),     -- Common
  ('nominal', 'medium', 58, 45),     -- Common in some contexts
  ('noticeable', 'medium', 62, 41),  -- Common
  ('officially', 'medium', 70, 33),  -- Common
  ('oogashaka', 'medium', 20, 83),   -- Very obscure
  ('onomatopoeia', 'medium', 35, 68),-- Long, literary term
  ('optimization', 'medium', 55, 48),-- Technical
  ('original', 'medium', 75, 28),    -- Very common
  ('pandemonium', 'medium', 50, 53), -- Uncommon
  ('parachute', 'medium', 65, 38),   -- Common
  ('parse', 'medium', 55, 48),       -- Technical
  ('perilous', 'medium', 50, 53),    -- Uncommon adjective
  ('periodical', 'medium', 60, 43),  -- Common
  ('platform', 'medium', 72, 31),    -- Very common
  ('pleated', 'medium', 58, 45),     -- Specific term
  ('poignant', 'medium', 50, 53),    -- Uncommon
  ('population', 'medium', 75, 28),  -- Very common
  ('posterity', 'medium', 45, 58),   -- Uncommon
  ('precocious', 'medium', 50, 53),  -- Uncommon
  ('procedural', 'medium', 55, 48),  -- Technical
  ('professional', 'medium', 75, 28),-- Very common
  ('profane', 'medium', 55, 48),     -- Common concept
  ('propeller', 'medium', 65, 38),   -- Common
  ('prosperous', 'medium', 60, 43),  -- Common
  ('rapscallion', 'medium', 40, 63), -- Archaic
  ('receptor', 'medium', 58, 45),    -- Scientific
  ('recklessly', 'medium', 60, 43),  -- Common
  ('rehearsal', 'medium', 65, 38),   -- Common
  ('reinforce', 'medium', 70, 33),   -- Common
  ('renaissance', 'medium', 55, 48), -- Historical
  ('replacement', 'medium', 72, 31), -- Common
  ('resist', 'medium', 75, 28),      -- Very common
  ('retention', 'medium', 65, 38),   -- Common
  ('reticent', 'medium', 50, 53),    -- Uncommon
  ('reusable', 'medium', 65, 38),    -- Common
  ('ruminations', 'medium', 45, 58), -- Uncommon
  ('sales', 'medium', 80, 23),       -- Very common
  ('salutations', 'medium', 55, 48), -- Formal
  ('salute', 'medium', 70, 33),      -- Common
  ('sanctimonious', 'medium', 40, 63), -- Uncommon
  ('schema', 'medium', 50, 53),      -- Technical
  ('scrutiny', 'medium', 55, 48),    -- Common
  ('serviceable', 'medium', 58, 45), -- Common
  ('session', 'medium', 75, 28),     -- Very common
  ('shield', 'medium', 72, 31),      -- Common
  ('spontaneity', 'medium', 50, 53), -- Long
  ('spontaneous', 'medium', 60, 43), -- Common
  ('structure', 'medium', 75, 28),   -- Very common
  ('subconscious', 'medium', 58, 45),-- Common
  ('success', 'medium', 80, 23),     -- Very common
  ('successful', 'medium', 75, 28),  -- Very common
  ('superstition', 'medium', 60, 43),-- Common
  ('superstitious', 'medium', 55, 48), -- Common
  ('surmise', 'medium', 50, 53),     -- Uncommon verb
  ('suppress', 'medium', 65, 38),    -- Common
  ('symbiotic', 'medium', 55, 48),   -- Scientific
  ('syllables', 'medium', 60, 43),   -- Grammar term
  ('tentatively', 'medium', 55, 48), -- Common
  ('tirade', 'medium', 50, 53),      -- Uncommon
  ('transition', 'medium', 70, 33),  -- Common
  ('tremolo', 'medium', 45, 58),     -- Music term
  ('unsheathe', 'medium', 40, 63),   -- Rare verb
  ('vessel', 'medium', 70, 33),      -- Common
  ('vibrato', 'medium', 50, 53),     -- Music term
  ('vinegar', 'medium', 75, 28),     -- Very common
  ('vulnerable', 'medium', 60, 43),  -- Common
  ('xylophone', 'medium', 65, 38),   -- Common instrument
  ('bassoon', 'medium', 55, 48),     -- Music instrument
  ('fuchsia', 'medium', 40, 63),     -- Tricky spelling
  ('morose', 'medium', 50, 53),      -- Uncommon adjective
  ('vigil', 'medium', 55, 48),       -- Uncommon
  ('occurrence', 'medium', 52, 51),  -- Double letters tricky
  ('temperature', 'medium', 65, 38), -- Common but long
  ('mesmerizing', 'medium', 60, 43), -- Common
  ('rendezvous', 'medium', 50, 53),  -- French origin
  ('vista', 'medium', 55, 48),       -- Uncommon
  ('disappears', 'medium', 70, 33),  -- Common
  ('glamorous', 'medium', 65, 38),   -- Common
  ('adolescence', 'medium', 60, 43), -- Common
  ('ghastly', 'medium', 55, 48),     -- Uncommon
  ('turmoil', 'medium', 60, 43),     -- Common
  ('assistance', 'medium', 72, 31),  -- Common
  ('condemn', 'medium', 65, 38),     -- Common
  ('vision', 'medium', 75, 28),      -- Very common
  ('visionary', 'medium', 60, 43),   -- Common
  ('quarrel', 'medium', 65, 38),     -- Common
  ('righteousness', 'medium', 50, 53), -- Long
  ('righteous', 'medium', 55, 48),   -- Common
  ('atonement', 'medium', 50, 53),   -- Religious
  ('resounding', 'medium', 60, 43),  -- Common
  ('surrounding', 'medium', 65, 38), -- Common
  ('bison', 'medium', 60, 43),       -- Animal name
  ('thunderous', 'medium', 55, 48),  -- Common
  ('deliberately', 'medium', 60, 43),-- Common
  ('deliberate', 'medium', 65, 38),  -- Common
  ('rife', 'medium', 55, 48),        -- Uncommon
  ('principled', 'medium', 60, 43),  -- Common
  ('principal', 'medium', 70, 33),   -- Common
  ('ancestors', 'medium', 65, 38),   -- Common
  ('butcher', 'medium', 70, 33),     -- Common
  ('reconciliation', 'medium', 50, 53), -- Long
  ('refuge', 'medium', 65, 38),      -- Common
  ('undoing', 'medium', 60, 43),     -- Common
  ('startling', 'medium', 62, 41),   -- Common
  ('precision', 'medium', 65, 38),   -- Common
  ('furlough', 'medium', 45, 58),    -- Uncommon
  ('demeanor', 'medium', 55, 48),    -- Common
  ('dreary', 'medium', 60, 43),      -- Common
  ('contingency', 'medium', 50, 53), -- Technical
  ('paranoia', 'medium', 55, 48),    -- Common
  ('conniving', 'medium', 50, 53),   -- Uncommon
  ('resilience', 'medium', 60, 43),  -- Common
  ('maddening', 'medium', 58, 45),   -- Common
  ('hallelujah', 'medium', 55, 48),  -- Religious
  ('circumference', 'medium', 60, 43), -- Math term
  ('collision', 'medium', 65, 38),   -- Common
  ('paddock', 'medium', 50, 53),     -- Uncommon
  ('drivel', 'medium', 45, 58),      -- Uncommon
  ('solidify', 'medium', 55, 48),    -- Common
  ('tempest', 'medium', 50, 53),      -- Uncommon
  ('tempestuous', 'medium', 45, 58),  -- Uncommon
  ('dwindling', 'medium', 55, 48),    -- Common
  ('memoir', 'medium', 60, 43),       -- Common
  ('tiresome', 'medium', 58, 45),     -- Common
  ('shrewd', 'medium', 55, 48),       -- Common
  ('betrothed', 'medium', 45, 58),    -- Archaic
  ('betrothal', 'medium', 40, 63),    -- Archaic
  ('matador', 'medium', 55, 48),      -- Cultural term
  ('pantomime', 'medium', 50, 53),    -- Theatrical term
  ('barracks', 'medium', 55, 48),     -- Military term
  ('affirmative', 'medium', 60, 43),  -- Common
  ('hydraulic', 'medium', 55, 48),    -- Technical
  ('municipal', 'medium', 60, 43),    -- Common
  ('jurisdiction', 'medium', 55, 48), -- Legal term
  ('petulant', 'medium', 50, 53),     -- Uncommon
  ('cinnamon', 'medium', 65, 38),     -- Common spice
  ('echelon', 'medium', 45, 58),      -- Uncommon
  ('panacea', 'medium', 50, 53),      -- Uncommon
  ('preposterous', 'medium', 55, 48), -- Common
  ('scaly', 'medium', 60, 43),        -- Common
  ('piranhas', 'medium', 55, 48),     -- Animal name
  ('immunity', 'medium', 60, 43),     -- Common
  ('exude', 'medium', 50, 53),        -- Uncommon verb
  ('lament', 'medium', 55, 48),       -- Common
  ('sneering', 'medium', 50, 53),     -- Common
  ('possess', 'medium', 60, 43),      -- Common (often misspelled)
  ('possession', 'medium', 55, 48),   -- Common
  ('cognitively', 'medium', 45, 58),  -- Technical
  ('intensive', 'medium', 60, 43),    -- Common
  ('cumulative', 'medium', 55, 48),   -- Common
  ('burnout', 'medium', 65, 38),      -- Common modern term
  ('fictitious', 'medium', 50, 53),   -- Uncommon
  ('animosity', 'medium', 55, 48),    -- Common
  ('repercussions', 'medium', 60, 43),-- Common
  ('adventurous', 'medium', 65, 38),  -- Common
  ('hostile', 'medium', 70, 33),      -- Common
  ('takeover', 'medium', 65, 38),     -- Common
  ('capricious', 'medium', 50, 53),   -- Uncommon
  ('appalled', 'medium', 55, 48),     -- Common
  ('spurious', 'medium', 45, 58),     -- Uncommon
  ('accusatory', 'medium', 50, 53),   -- Uncommon
  ('accusation', 'medium', 60, 43),   -- Common
  ('parable', 'medium', 55, 48),      -- Religious term
  ('sovereignty', 'medium', 50, 53),  -- Political term
  ('effusive', 'medium', 45, 58),     -- Uncommon
  ('iteration', 'medium', 55, 48),    -- Technical
  ('iterative', 'medium', 50, 53),    -- Technical
  ('minutiae', 'medium', 40, 63),     -- Very uncommon
  ('airplane', 'medium', 75, 28),     -- Very common
  ('arduous', 'medium', 50, 53),      -- Uncommon
  ('convention', 'medium', 70, 33),   -- Common
  ('unforgettable', 'medium', 65, 38),-- Common
  ('unforgivable', 'medium', 60, 43), -- Common
  ('escalate', 'medium', 65, 38),     -- Common
  ('contemplating', 'medium', 55, 48),-- Common
  ('contemporary', 'medium', 60, 43), -- Common
  ('temporary', 'medium', 70, 33),    -- Very common
  ('unrequited', 'medium', 45, 58),   -- Uncommon
  ('forlorn', 'medium', 50, 53),      -- Uncommon
  ('sullen', 'medium', 55, 48),       -- Common
  ('unconditional', 'medium', 60, 43),-- Common
  ('attrition', 'medium', 50, 53),    -- Technical
  ('depreciation', 'medium', 55, 48), -- Financial term
  ('asymptote', 'medium', 40, 63),    -- Math term
  ('asymptomatic', 'medium', 45, 58), -- Medical term
  ('provincial', 'medium', 50, 53),   -- Uncommon
  ('extraneous', 'medium', 55, 48),   -- Common
  ('rescind', 'medium', 50, 53),      -- Uncommon verb
  ('miscellaneous', 'medium', 55, 48),-- Common
  ('syncopation', 'medium', 45, 58),  -- Music term
  ('corroborate', 'medium', 50, 53),  -- Uncommon verb
  ('minimize', 'medium', 65, 38),     -- Common
  ('invalidate', 'medium', 55, 48),   -- Common
  ('limerence', 'medium', 30, 73),    -- Very obscure
  ('aglet', 'medium', 35, 68),        -- Very obscure
  ('scamper', 'medium', 60, 43),      -- Common
  ('mallet', 'medium', 65, 38),       -- Common
  ('gavel', 'medium', 55, 48),        -- Common
  ('indelible', 'medium', 50, 53),    -- Common
  ('tourniquet', 'medium', 45, 58),   -- Medical term
  ('whimsical', 'medium', 55, 48),    -- Common
  ('whimsy', 'medium', 50, 53),       -- Uncommon
  ('tormented', 'medium', 55, 48),    -- Common
  ('emotionally', 'medium', 65, 38),  -- Common
  ('uninhabitable', 'medium', 50, 53),-- Uncommon
  ('chauffeur', 'medium', 55, 48),    -- Common but French origin

  -- Hard words with varied acceptance rates
  ('abstraction', 'hard', 35, 68),       -- Similar to abstraction (potential typo?)
  ('amorphous', 'hard', 40, 63),         -- Scientific term
  ('anthropomorphize', 'hard', 25, 78),  -- Very long
  ('association', 'hard', 50, 53),       -- Common but in hard category
  ('bereavement', 'hard', 45, 58),       -- Uncommon
  ('bureaucracy', 'hard', 40, 63),       -- Common but tricky spelling
  ('cassiopeia', 'hard', 30, 73),        -- Proper noun
  ('circumnavigate', 'hard', 35, 68),    -- Very long
  ('codify', 'hard', 45, 58),            -- Technical
  ('colloquial', 'hard', 40, 63),        -- Linguistic term
  ('collapsible', 'hard', 50, 53),       -- Common but long
  ('colossal', 'hard', 55, 48),          -- Common
  ('connoisseur', 'hard', 35, 68),       -- French origin
  ('corporeal', 'hard', 40, 63),         -- Philosophical term
  ('debacle', 'hard', 45, 58),           -- Common
  ('debauchery', 'hard', 35, 68),        -- Uncommon
  ('defecate', 'hard', 50, 53),          -- Common but uncomfortable
  ('definitive', 'hard', 55, 48),        -- Common
  ('dialectic', 'hard', 35, 68),         -- Philosophical term
  ('diarrhea', 'hard', 45, 58),          -- Medical, tricky spelling
  ('dichotomy', 'hard', 40, 63),         -- Technical
  ('discountenance', 'hard', 30, 73),    -- Very uncommon
  ('disproportionate', 'hard', 35, 68),  -- Very long
  ('esophagus', 'hard', 40, 63),         -- Medical term
  ('establishment', 'hard', 50, 53),     -- Common but long
  ('fortuitous', 'hard', 35, 68),        -- Uncommon
  ('granular', 'hard', 45, 58),          -- Technical
  ('histrionics', 'hard', 30, 73),       -- Very uncommon
  ('idiosyncrasy', 'hard', 35, 68),      -- Very long
  ('implementation', 'hard', 40, 63),    -- Very long
  ('incandescence', 'hard', 35, 68),     -- Scientific
  ('inconspicuous', 'hard', 40, 63),     -- Long
  ('infinitesimal', 'hard', 30, 73),     -- Very long
  ('ingratiate', 'hard', 35, 68),        -- Uncommon verb
  ('integration', 'hard', 45, 58),       -- Technical
  ('machination', 'hard', 30, 73),       -- Uncommon
  ('metamorphosis', 'hard', 40, 63),     -- Scientific
  ('ophuchius', 'hard', 20, 83),         -- Very obscure
  ('parliamentary', 'hard', 35, 68),     -- Political term
  ('pirouette', 'hard', 40, 63),         -- Dance term
  ('polymorphic', 'hard', 30, 73),       -- Very technical
  ('polymorphism', 'hard', 25, 78),      -- Very technical
  ('questionnaire', 'hard', 45, 58),     -- Common but long
  ('quintessential', 'hard', 35, 68),    -- Long
  ('retaliation', 'hard', 50, 53),       -- Common
  ('salacious', 'hard', 30, 73),         -- Uncommon
  ('serendipity', 'hard', 40, 63),       -- Uncommon
  ('soliloquy', 'hard', 35, 68),         -- Literary term
  ('tachycardia', 'hard', 40, 73),       -- Medical term
  ('synonymous', 'hard', 40, 63),        -- Common
  ('picturesque', 'hard', 45, 58),       -- Common
  ('protege', 'hard', 35, 68),           -- French origin
  ('tyranny', 'hard', 50, 53),           -- Common
  ('vigilante', 'hard', 40, 63),         -- Common
  ('accelerator', 'hard', 45, 58),       -- Common
  ('onslaught', 'hard', 40, 63),         -- Common
  ('encroach', 'hard', 35, 68),          -- Uncommon verb
  ('infallible', 'hard', 40, 63),        -- Common
  ('massacred', 'hard', 45, 58),         -- Common
  ('apprehended', 'hard', 40, 63),       -- Common
  ('wrought', 'hard', 35, 68),           -- Uncommon
  ('interpolation', 'hard', 30, 73),     -- Technical
  ('instantiate', 'hard', 25, 78),       -- Very technical
  ('asymptotically', 'hard', 20, 83),    -- Very technical
  ('synchronous', 'hard', 35, 68)        -- Technical

ON CONFLICT (word) DO UPDATE SET
(correct, incorrect, level) = (EXCLUDED.correct, EXCLUDED.incorrect, EXCLUDED.level);