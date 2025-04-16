import mongoose from 'mongoose';

const RideGiverSchema = new mongoose.Schema({
  name: String,                   // Name of the ride giver
  contact: String,                // Contact information of the giver
  rideCount: Number,              // Number of rides the giver can offer
  houseAssigned: { type: String }, // House name assigned to the giver
  ridesGiven: Number,             // Total rides this giver has offered
  date: String                    // Date when the ride giver offered rides
});

export default mongoose.model('RideGiver', RideGiverSchema);
