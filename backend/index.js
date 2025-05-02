import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import incidentsRoute from './routes/incidents.js'; // Make sure this file also uses `export default`

dotenv.config();

const { Pool } = pg;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/incidents', incidentsRoute);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.post('/api/events', async (req, res) => {
  const { message } = req.body;
  await pool.query('INSERT INTO events (message) VALUES ($1)', [message]);
  res.status(201).json({ success: true });
});

app.get('/api/events', async (req, res) => {
  const result = await pool.query('SELECT * FROM events ORDER BY id DESC');
  res.json(result.rows);
});

app.listen(5000, () => {
  console.log('🚀 Backend running on port 5000');
});