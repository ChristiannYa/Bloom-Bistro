import express from 'express';
import cors from 'cors';

import menuRoutes from './routes/menuRoutes.js';
import adminRoutes from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(menuRoutes);
app.use(adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
