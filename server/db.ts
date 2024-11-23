import sqlite3 from 'sqlite3';
import * as queryUtils from "./src/utils/queryUtils"

const db = new sqlite3.Database(`${__dirname}/database.db`, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Database connected');
  }
});

export const queryDB = (query: string) => {
  const sanitizedQuery = queryUtils.sanitizeSQL(query)
  return new Promise<any[]>((resolve, reject) => {
    db.all(sanitizedQuery, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
