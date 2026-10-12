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

//  -------------------------------------------
// INSTAGRAM EFEED PROXY ENDPOINT
// -------------------------------------------

app.get('/api/instagram', async (req, res) => {
  try {
      const token = process.env.INSTAGRAM_ACCESS_TOKEN;
      
      // Return empty array gracefully if token isn't set yet during local testing
      if (!token) {
          console.warn("INSTAGRAM_ACCESS_TOKEN missing in .env file.");
          return res.json([]);
      }

      const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=6&access_token=${token}`
      );
      
      const data = await response.json();
      
      if (!response.ok) {
          throw new Error(data.error?.message || 'Failed to fetch Instagram feed');
      }

      // Map posts and resolve video thumbnails so raw images load nicely into your frame component
      const formattedPosts = data.data.map(post => ({
          id: post.id,
          imageUrl: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
          caption: post.caption || 'Illuminated By Artistry',
          permalink: post.permalink
      }));

      res.json(formattedPosts);
  } catch (err) {
      console.error("Instagram Feed Error:", err.message);
      res.status(500).json({ error: err.message });
  }
});

// ------------------------------------------------------------------
// BOOKING ENDPOINTS
// ------------------------------------------------------------------

// check if a date is already booked up for calendar UI
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


const PORT = process.env.PORT || 5050;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('🌿 MongoDB Connected Successfully!');
    app.listen(PORT, () => console.log(`Illuminating on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));


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