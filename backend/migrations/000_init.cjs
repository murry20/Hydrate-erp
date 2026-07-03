const fs = require('fs');
const path = require('path');

exports.up = (pgm) => {
  const sqlPath = path.resolve(__dirname, '../../database/schema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');
  pgm.sql(sql);
};

exports.down = (pgm) => {
  // fallback: drop created tables if necessary
  // implement granular down migrations as needed
};
