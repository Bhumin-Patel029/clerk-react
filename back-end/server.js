import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import rideRoutes from './routes/rideRequest.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/ridetaker', rideRoutes);

// Replace with your actual MongoDB connection string
mongoose.connect('mongodb://127.0.0.1:27017/ride-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
