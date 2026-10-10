import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    appointmentType: { type: String, required: true, default: 'Tattoo' },
    
    // Cover-up / dynamic fields
    isCoverUp: { type: Boolean, default: false },
    coverUpType: { 
        type: String, 
        enum: ['Cover-Up', 'Rework', 'Enhancement', null], 
        default: null 
    },
    
    // tattoo fields
    sizeCM: { type: String, trim: true },
    placement: { type: String, trim: true },
    idea: { type: String, trim: true },
    
    // File paths / image references (storing URLs or file names for now o7)
    referenceImg: { type: String, default: null },
    existingTattooImg: { type: String, default: null },
    
    // Admin fields 
    status: { type: String, enum: ['Pending', 'Confirmed', 'Declined'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Booking', bookingSchema);