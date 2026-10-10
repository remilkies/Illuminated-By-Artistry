import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Booking from '../models/Booking.js';

const router = express.Router();

// make sure the uploads folder actually exists so multer doesn't throw a tantrum
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

// where do we throw the files? right here into /uploads with a unique name so they don't overwrite each other
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// 🦇 INCOMING BOOKING: catch form data + images and yeet them straight into MongoDB
router.post('/', upload.fields([
    { name: 'referenceImg', maxCount: 1 },
    { name: 'existingTattooImg', maxCount: 1 }
]), async (req, res) => {
    try {
        const bookingData = { ...req.body };

        // grab actual file paths if they actually attached something
        if (req.files) {
            if (req.files['referenceImg']) {
                bookingData.referenceImg = req.files['referenceImg'][0].path;
            }
            if (req.files['existingTattooImg']) {
                bookingData.existingTattooImg = req.files['existingTattooImg'][0].path;
            }
        }

        // formData turns booleans into strings like a clown, fix that real quick
        if (bookingData.isCoverUp === 'true') bookingData.isCoverUp = true;
        if (bookingData.isCoverUp === 'false') bookingData.isCoverUp = false;

        const newBooking = new Booking(bookingData);
        const savedBooking = await newBooking.save();
        
        console.log("New booking saved with images:", savedBooking._id);
        res.status(201).json({ 
            success: true, 
            message: "Booking request received successfully!",
            data: savedBooking 
        });
    } catch (error) {
        console.error("Error saving booking:", error.message);
        res.status(400).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// 🌙 FETCH ALL BOOKINGS (for when the artist is stalking her own dashboard later)
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: bookings.length, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;