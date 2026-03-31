const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')));

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is healthy' });
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

module.exports = app;
