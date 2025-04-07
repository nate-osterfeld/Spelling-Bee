WITH word_acceptance AS (
  SELECT
    id AS word_id,
    correct::float / NULLIF((correct + incorrect), 0) AS public_acceptance
  FROM words
),
user_scores AS (
  SELECT
    wh.user_id,
    SUM(
      CASE
        WHEN wh.is_correct THEN (1 - COALESCE(wa.public_acceptance, 0))
        ELSE 0
      END
    ) AS total_weighted_score,
    COUNT(*) AS total_attempts
  FROM wordshistory wh
  JOIN word_acceptance wa ON wh.word_id = wa.word_id
  GROUP BY wh.user_id
)
SELECT
  user_id,
  ROUND((total_weighted_score / total_attempts)::numeric, 4) AS weighted_accuracy
FROM user_scores;
