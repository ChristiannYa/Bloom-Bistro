import express from 'express';
import pool from '../config/db.js';
import cloudinary from '../config/cloudinary.js';
import upload from '../middleware/uploadMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

// Generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

router.post('/menu-items', async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category_id,
      image_url,
      ingredients,
      nutrition_labels,
      notes,
    } = req.body;

    const menuItemResult = await pool.query(
      `
            INSERT INTO menu_items (title, description, price, category_id, image_url, slug)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `,
      [title, description, price, category_id, image_url, generateSlug(title)]
    );

    const menuItemId = menuItemResult.rows[0].id;
    await pool.query(
      `
            INSERT INTO item_details (menu_item_id, ingredients, nutrition_labels, notes)
            VALUES ($1, $2, $3, $4)
        `,
      [menuItemId, ingredients, nutrition_labels, notes]
    );

    res.status(201).json({ message: 'Menu item added successfully' });
  } catch (error) {
    console.error('Error adding menu item:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    console.log('File received:', req.file);
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    console.log('Base64 created');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    console.log('DataURI created');

    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto',
    });
    console.log('Cloudinary result:', result);

    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/menu-items', async (req, res) => {
  try {
    const result = await pool.query(`
            SELECT m.*, d.ingredients, d.nutrition_labels, d.notes 
            FROM menu_items m 
            LEFT JOIN item_details d ON m.id = d.menu_item_id 
            ORDER BY m.id DESC 
        `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/menu-items/:id', async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT m.*, d.ingredients, d.nutrition_labels, d.notes 
      FROM menu_items m 
      LEFT JOIN item_details d ON m.id = d.menu_item_id 
      WHERE m.id = $1
    `,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/menu-items/:id/nutrition', async (req, res) => {
  try {
    const { id } = req.params;
    const { nutrition_labels } = req.body;

    const result = await pool.query(
      `UPDATE item_details 
       SET nutrition_labels = $1 
       WHERE menu_item_id = $2 
       RETURNING *`,
      [nutrition_labels, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/menu-items/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM item_details WHERE menu_item_id = $1', [
      req.params.id,
    ]);

    const result = await pool.query(
      'DELETE FROM menu_items WHERE id = $1 RETURNING *',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
