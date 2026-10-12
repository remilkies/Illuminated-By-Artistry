import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    appointmentType: { 
        type: String, 
        required: true, 
        enum: ['Tattoo', 'Laser Tattoo Removal', 'Piercing', 'Permanent Makeup'],
        default: 'Tattoo' 
    },
    
    // Cover-up / dynamic fields
    isCoverUp: { type: Boolean, default: false },
    coverUpType: { 
        type: String, 
        enum: ['Cover-Up', 'Rework', 'Enhancement', '', null], 
        default: null 
    },
    
    // Tattoo fields
    sizeCM: { type: String, trim: true },
    placement: { type: String, trim: true },
    idea: { type: String, trim: true },
    
    // Laser Removal fields
    removalImg: { type: String, default: null },
    
    // Piercing fields
    piercingCategory: { type: String, trim: true, default: null },
    piercingType: { type: String, trim: true, default: null },
    
    // PMU fields
    pmuType: { type: String, trim: true, default: null },
    
    // File paths / image references 
    referenceImg: { type: String, default: null },
    existingTattooImg: { type: String, default: null },
    
    // Admin fields 
    status: { type: String, enum: ['Pending', 'Confirmed', 'Declined'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Booking', bookingSchema);