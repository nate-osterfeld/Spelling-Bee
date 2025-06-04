SELECT wh.word_id, w.word, w.level, wh.is_correct, w.correct, w.incorrect, wh.created_at,
    CASE 
        WHEN EXISTS (
            SELECT 1 
            FROM wordssaved ws
            WHERE ws.user_id = wh.user_id 
            AND ws.word_id = wh.word_id
        ) THEN true
        ELSE false
    END AS is_saved
FROM wordshistory wh
JOIN words w ON wh.word_id = w.id
WHERE wh.user_id = $1