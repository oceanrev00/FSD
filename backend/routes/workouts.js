const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// GET all workouts
router.get('/', async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
});

// POST a new workout
router.post('/', async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(201).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a workout
router.delete('/:id', async (req, res) => {
  const workout = await Workout.findByIdAndDelete(req.params.id);
  if (!workout) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(workout);
});

module.exports = router;