import express from 'express';
import cors from 'cors';

import menuRoutes from './routes/menuRoutes.js';
import adminRoutes from './routes/admin.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log('Incoming request:', {
    method: req.method,
    path: req.path,
    body: req.body,
  });
  next();
});

app.use(authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/', menuRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
