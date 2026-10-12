import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import Booking from './models/Booking.js'; // run node, and if the thing complains the dd ./
// import FlashDesign from './models/FlashDesign.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// make the uploads folder publicly accessible so we can actually see the pictures later
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// mount the routes
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5050;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('🌿 MongoDB Connected Successfully!');
    app.listen(PORT, () => console.log(`Illuminating on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));


// ------------------------------------------------------------------
// BOOKING ENDPOINTS
// ------------------------------------------------------------------

// check if a date is already booked up for your custom calendar UI
app.get('/api/bookings/check-date/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const bookings = await Booking.find({ requestedDate: date, status: { $ne: 'cancelled' } });
    const bookedSlots = bookings.map(b => b.timeSlot);
    
    res.json({ date, bookedSlots });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check slot availability' });
  }
});

// ------------------------------------------------------------------
// FLASH & PORTFOLIO ENDPOINTS (Saved for later)
// ------------------------------------------------------------------

// app.get('/api/flash', async (req, res) => {
//   try {
//     const flash = await FlashDesign.find({ isAvailable: true });
//     res.json(flash);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch flash designs' });
//   }
// });