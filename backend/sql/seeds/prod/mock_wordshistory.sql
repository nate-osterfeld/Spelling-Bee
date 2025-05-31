-- Takes user_id's 1-50 and assigns ~50 words to their history with 15-30% acceptance rate
INSERT INTO wordshistory (user_id, word_id, is_correct, created_at)
WITH 
user_groups AS (
    SELECT generate_series(1, 38) AS user_id, 'poor' AS performance
    UNION ALL
    SELECT generate_series(39, 50) AS user_id, 'below_avg' AS performance
),
user_attempts AS (
    SELECT 
        user_id,
        performance,
        n AS attempt_num,
        (NOW() - (random() * 30 || ' days')::INTERVAL + 
        (random() * (n-1) * 60 || ' minutes')::INTERVAL) AS attempt_time
    FROM user_groups
    CROSS JOIN generate_series(1, (10 + floor(random() * 40))::INT) AS n
)
SELECT 
    ua.user_id,
    get_random_word_id() AS word_id,
    CASE 
        WHEN ua.performance = 'poor' AND random() < 0.15 THEN true
        WHEN ua.performance = 'below_avg' AND random() < 0.275 THEN true
        ELSE false
    END AS is_correct,
    ua.attempt_time AS created_at
FROM user_attempts ua;