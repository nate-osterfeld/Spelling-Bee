// -------------------------------------------------------------------
// ------ MAKE SURE TO ONLY USE PRODUCTION DATABASE_URL HERE!!! ------
// -------------------------------------------------------------------
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') }); // MUST BE PROD DB_URL!!!
const pool = require('../../../db.js')

async function insertWords() {
  const filePath = path.join(__dirname, 'words.json');
  const wordData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  for (const word of wordData) {
    try {
      await pool.query(
        `INSERT INTO words (word, level, data)
         VALUES ($1, $2, $3)
         ON CONFLICT (word)
         DO UPDATE SET level = EXCLUDED.level, data = EXCLUDED.data`, // change level and data fields
        [word.word, word.level, word.data]
      );
      console.log(`Inserted or updated: ${word.word}`);
    } catch (err) {
      console.error(`Error inserting ${word.word}:`, err.message);
    }
  }

  await pool.end();
}

insertWords();
