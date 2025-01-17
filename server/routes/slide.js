import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

router.get('/slide', async (_req, res) => {
    try {
        const slide = await pool.query('SELECT * FROM slide ORDER BY id');
        res.json(slide.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch slides' });
    }
})

export default router;
