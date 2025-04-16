import mongoose from 'mongoose';

const AcceptanceSchema = new mongoose.Schema({
  giverName: String,
  ridesGiven: Number,
  phone: String,
  timestamp: { type: Date, default: Date.now }
});

const RideRequestSchema = new mongoose.Schema({
  name: String,
  house: String,
  date: String,
  totalRides: Number,
  ridesTaken: { type: Number, default: 0 },
  status: { type: String, default: 'waiting' }, // accepted when fully matched
  acceptedBy: [AcceptanceSchema]
});

export default mongoose.model('RideRequest', RideRequestSchema);
