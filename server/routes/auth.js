import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

console.log('Available environment variables:', {
  hasAdminCode: !!process.env.ADMIN_SECRET_CODE,
  adminCodeLength: process.env.ADMIN_SECRET_CODE?.length,
});

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log('Login attempt for username:', username);

    const result = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);
    const user = result.rows[0];

    console.log('User found:', {
      exists: !!user,
      hasPasswordHash: !!user?.password_hash,
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    console.log('Password match:', passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, isAdmin: user.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, isAdmin: user.is_admin });
  } catch (error) {
    console.error('Login error details:', {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, password, adminCode } = req.body;

    console.log('Available environment variables:', {
      hasAdminCode: !!process.env.ADMIN_SECRET_CODE,
      adminCodeLength: process.env.ADMIN_SECRET_CODE?.length,
      adminCodeValue: process.env.ADMIN_SECRET_CODE,

      // String comparison
      stringComparison: {
        received: adminCode,
        expected: process.env.ADMIN_SECRET_CODE,
        areEqual: adminCode === process.env.ADMIN_SECRET_CODE,
        receivedLength: adminCode?.length,
        expectedLength: process.env.ADMIN_SECRET_CODE?.length,
      },
    });

    console.log('Received admin code:', adminCode);
    console.log('Expected admin code:', process.env.ADMIN_SECRET_CODE);

    if (adminCode !== process.env.ADMIN_SECRET_CODE) {
      return res.status(401).json({
        message: 'Invalid admin code. Please enter the correct code.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const isAdmin = true;

    const result = await pool.query(
      'INSERT INTO users (username, password_hash, is_admin) VALUES ($1, $2, $3) RETURNING id, username, is_admin',
      [username, hashedPassword, isAdmin]
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: result.rows[0],
    });
  } catch (error) {
    console.log('Registration error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
