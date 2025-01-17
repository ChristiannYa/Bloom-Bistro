import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

router.get('/nav-links', async (_req, res) => {
    try {
        const nav = await pool.query('SELECT * FROM nav_links ORDER BY id');
        res.json(nav.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch slides' });
    }
});

export default router;
