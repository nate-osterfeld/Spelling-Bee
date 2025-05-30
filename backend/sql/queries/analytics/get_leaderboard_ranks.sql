-- Select the top 10 users on the leaderboard, ranked by weighted accuracy.
SELECT
    u.id AS user_id,                           -- The user's ID
    u.email,                                   -- The user's email

    COUNT(*) AS total_attempts,                -- Total number of words this user has attempted

    -- Count of correct 'easy' words for this user
    COUNT(CASE WHEN w.level = 'easy' AND wh.is_correct THEN 1 END) AS easy_correct_count,

    -- Count of correct 'medium' words for this user
    COUNT(CASE WHEN w.level = 'medium' AND wh.is_correct THEN 1 END) AS medium_correct_count,

    -- Count of correct 'hard' words for this user
    COUNT(CASE WHEN w.level = 'hard' AND wh.is_correct THEN 1 END) AS hard_correct_count,

    -- Weighted accuracy: sum of adjusted scores divided by total attempts, rounded to 4 decimal places
    ROUND((
        SUM(
            CASE 
                WHEN wh.is_correct THEN (1 - COALESCE(wa.public_acceptance, 0)) -- Add weighted score if correct
                ELSE 0                                                          -- Add zero if incorrect
            END
        ) / COUNT(*)                                                            -- Divide by total attempts
    )::numeric, 4) AS weighted_accuracy

FROM wordshistory wh                        -- Main table of user word attempts

-- Join a subquery that calculates public acceptance (how often the word is correct overall)
JOIN (
    SELECT
        id AS word_id,
        correct::float / NULLIF((correct + incorrect), 0) AS public_acceptance -- Avoid division by zero
    FROM words
) wa ON wh.word_id = wa.word_id             -- Join on word_id to attach acceptance stats

JOIN words w ON wh.word_id = w.id           -- Join to get word details (like difficulty level)
JOIN users u ON wh.user_id = u.id           -- Join to get user details

GROUP BY u.id, u.email                      -- Group stats per user

HAVING COUNT(*) >= 1                        -- Only include users who have at least 1 attempt

ORDER BY weighted_accuracy DESC             -- Rank users by weighted accuracy (highest first)
LIMIT $1 OFFSET $2;                         -- $1 -> pageSize; $2 -> (page - 1) * pageSize
