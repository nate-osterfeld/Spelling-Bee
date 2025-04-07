-- init_schema.sql
-- Initial database setup for SpeeBee
-- Includes: tables, constraints, triggers, and seed data
-- Run once on first deployment

-- Create the users table
CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    google_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    acc_type VARCHAR NOT NULL,
    name VARCHAR(100),
    password VARCHAR(256),
    salt VARCHAR(100),
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_google_id_key UNIQUE (google_id)
);

-- Create the words table
CREATE TABLE public.words (
    id SERIAL PRIMARY KEY,
    word VARCHAR(100) NOT NULL,
    level VARCHAR(10) NOT NULL,
    correct BIGINT DEFAULT 0 NOT NULL,
    incorrect BIGINT DEFAULT 0 NOT NULL,
    CONSTRAINT words_word_key UNIQUE (word)
);

-- Add values to words table
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
	('hierarchy', 'hard');

-- Create the wordshistory table
CREATE TABLE public.wordshistory (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP,
    user_id INTEGER REFERENCES public.users(id),
    word_id INTEGER REFERENCES public.words(id),
    is_correct BOOLEAN,
    CONSTRAINT wordshistory_user_id_word_id_key UNIQUE (user_id, word_id)
);

-- Create the trigger function to set the default name before insert
CREATE OR REPLACE FUNCTION set_default_name() 
RETURNS TRIGGER AS $$
BEGIN
    -- If name is NULL, set it to the part of the email before '@'
    IF NEW.name IS NULL THEN
        NEW.name := substring(NEW.email FROM 1 FOR position('@' IN NEW.email) - 1);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger to fire the function before an insert
CREATE TRIGGER before_insert_users
    BEFORE INSERT ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION set_default_name();

