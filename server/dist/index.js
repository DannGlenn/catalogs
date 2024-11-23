"use strict";
// import express, { Request, Response } from 'express';
// import sqlite3 from 'sqlite3';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// const db = new sqlite3.Database(':memory:');
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello, world!');
// });
// db.serialize(() => {
//   db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)");
// });
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
const express_1 = __importDefault(require("express"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)());
const db = new sqlite3_1.default.Database(`${__dirname}/database.db`, sqlite3_1.default.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    }
    else {
        console.log('Database connected');
    }
});
db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)");
});
app.get('/', (req, res) => {
    res.send(__dirname);
});
// Example API route to get data from the database
app.get('/api/data', (req, res) => {
    db.all('SELECT * FROM your_table', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching data from database' });
            return;
        }
        res.json(rows);
    });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
