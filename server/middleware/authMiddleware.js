import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  console.log('Auth middleware checking token:', {
    path: req.path,
    token: req.headers.authorization,
  });

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
