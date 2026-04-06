require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const workoutRoutes = require('./routes/workouts');

const app = express();

// ✅ Middleware
app.use(cors()); // allows frontend to connect
app.use(express.json());

// ✅ Test route (optional but useful for debugging)
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

// ✅ Routes
app.use('/api/workouts', workoutRoutes);

// ✅ Environment variables fallback (VERY IMPORTANT)
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Validate env variables
if (!MONGO_URI) {
  console.error('❌ MONGO_URI not found in .env');
  process.exit(1);
}

// ✅ Connect to MongoDB → then start server
mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📦 MongoDB connected successfully`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });