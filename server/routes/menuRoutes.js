import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

router.get('/api/categories', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categories ORDER BY id');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/api/menu-items', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                id, 
                title,
                description,
                price::float as price,
                image_url,
                category_id,
                slug
            FROM menu_items
            ORDER BY id
        `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/api/menu-items/:slug', async (req, res) => {
  try {
      const result = await pool.query(`
          SELECT 
              m.*,
              d.ingredients,
              d.notes,
              d.nutrition_labels
          FROM menu_items m
          LEFT JOIN item_details d ON m.id = d.menu_item_id
          WHERE m.slug = $1
      `, [req.params.slug]);
      
      res.json(result.rows[0]);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

export default router;
