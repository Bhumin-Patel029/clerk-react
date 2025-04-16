import express from 'express';
import RideRequest from '../models/RideRequest.js'; // ✅ Correct filename


const router = express.Router();

// POST: Ride Taker submits ride request
router.post('/', async (req, res) => {
  const { name, house, date, totalRides } = req.body;
  const newRequest = new RideRequest({ name, house, date, totalRides });
  await newRequest.save();
  res.status(201).json(newRequest);
});

// GET: All pending requests for Ride Giver
router.get('/waiting', async (req, res) => {
  const waiting = await RideRequest.find({ status: 'waiting' });
  res.json(waiting);
});

// POST: Ride Giver accepts a portion of the ride
router.post('/accept/:id', async (req, res) => {
  const { giverName, ridesGiven, phone } = req.body;
  const request = await RideRequest.findById(req.params.id);

  if (!request) return res.status(404).json({ message: 'Request not found' });

  const remaining = request.totalRides - request.ridesTaken;
  if (ridesGiven > remaining) return res.status(400).json({ message: 'Too many rides accepted' });

  request.ridesTaken += ridesGiven;
  request.acceptedBy.push({ giverName, ridesGiven, phone });

  if (request.ridesTaken === request.totalRides) request.status = 'accepted';

  await request.save();
  res.json(request);
});

// GET: Get all requests for Ride Taker Dashboard
router.get('/requests', async (req, res) => {
  const requests = await RideRequest.find().sort({ date: -1 });
  res.json(requests);
});

export default router;
