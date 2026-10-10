import React, { useState } from "react";

export default function BookingForm() {

    // Track which step/screen we are on (1, 2, or 3)
    const [step, setStep] = useState(1);

    // Unified Form State
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        appointmentType: "Tattoo",
        isCoverUp: false, 
        coverUpType: "Cover-Up", 
        existingTattooImg: null, 
        sizeCM: "",
        placement: "",
        idea: "",
        referenceImg: null, 
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFileChange = (e, fieldName) => {
        setFormData((prev) => ({ ...prev, [fieldName]: e.target.files[0] }));
    };

    const handleNext = (e) => {
        e.preventDefault();
        setStep((prev) => Math.min(prev + 1, 3));
    };

    const handleFinalBooking = (e) => {
        e.preventDefault();
        console.log("Submitting final booking to DB & WhatsApp:", formData);
        // TODO: Trigger WhatsApp redirect link here!
    };

    return(
        <> 
        <div className="booking-container container-fluid d-flex justify-content-center align-items-center min-vh-100">
            <div className="booking-card">
                
                <h2 className="text-center mb-4">BOOK YOUR APPOINTMENT NOW</h2>
                
                {/* first screen */}
                {step === 1 && (
                    <form onSubmit={handleNext} className="booking-form">
                        
                        <div className="booking-field">
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Client Name" 
                                required
                            />
                        </div>

                        <div className="booking-field">
                            <label htmlFor="phone">Phone</label>
                            <input 
                                type="number" 
                                id="phone" 
                                name="phone" 
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number" 
                                required
                            />
                        </div>

                        <div className="booking-field">
                            <label htmlFor="appointmentType">Appointment Type</label>
                            <select 
                                id="appointmentType" 
                                name="appointmentType"
                                value={formData.appointmentType}
                                onChange={handleChange} 
                                required
                            >
                                {/* might lowkey need to ask her the specific names of the services she provides */}
                                <option value="Tattoo">Tattoo</option>
                                <option value="Piercing">Piercing</option>
                                <option value="Permanent Makeup">Permanent Makeup</option>
                            </select>
                        </div>

                        {/* checkbox appears if tattoo is selected "this is a cover-up/rework/enhancement" */}
                        {formData.appointmentType === "Tattoo" && (
                            <div className="booking-field checkbox-field d-flex align-items-center">
                                <input 
                                    type="checkbox" 
                                    id="isCoverUp" 
                                    name="isCoverUp"
                                    checked={formData.isCoverUp}
                                    onChange={handleChange}
                                />
                                <label htmlFor="isCoverUp" className="ms-2">
                                    THIS IS A COVER-UP/REWORK/ENHANCEMENT
                                </label>
                            </div>
                        )}

                        <button type="submit" className="next-btn-arrow mt-4">
                            &gt;
                        </button>
                    </form>
                )}

                {/* second screen */}
                {step === 2 && (
                    <form onSubmit={handleNext} className="booking-form">
                        
                        {/* second screen for cover up tattoos */}
                        {formData.isCoverUp ? (
                            <>
                                <div className="booking-field">
                                    {/* only show this screen if checkbox is selected */}
                                    <label htmlFor="coverUpType">Please indicate if this is a: </label>
                                    <div className="radio-group d-flex flex-column gap-2 mt-2">
                                        {/* radio selection menu */}
                                        <label>
                                            <input 
                                                type="radio" 
                                                name="coverUpType" 
                                                value="Cover-Up"
                                                checked={formData.coverUpType === "Cover-Up"}
                                                onChange={handleChange}
                                            /> Cover-Up
                                        </label>
                                        <label>
                                            <input 
                                                type="radio" 
                                                name="coverUpType" 
                                                value="Rework"
                                                checked={formData.coverUpType === "Rework"}
                                                onChange={handleChange}
                                            /> Rework
                                        </label>
                                        <label>
                                            <input 
                                                type="radio" 
                                                name="coverUpType" 
                                                value="Enhancement"
                                                checked={formData.coverUpType === "Enhancement"}
                                                onChange={handleChange}
                                            /> Enhancement
                                        </label>
                                    </div>
                                </div>

                                <div className="booking-filed mt-3">
                                    <label htmlFor="fileUpload">Please include a photo of your existing tattoo.</label>
                                    {/* required when a tattoo type is selected */}
                                    <input 
                                        type="file" 
                                        id="fileUpload" 
                                        name="fileUpload" 
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, "existingTattooImg")}
                                        required 
                                    />
                                </div>
                            </>
                        ) : (
                            /* second screen for non coverup tattoos */
                            <>
                                <div className="booking-field">
                                    <label htmlFor="sizeCM">Size (cm)</label>
                                    <input 
                                        type="text" 
                                        id="sizeCM" 
                                        name="sizeCM" 
                                        value={formData.sizeCM}
                                        onChange={handleChange}
                                        placeholder="Size in cm" 
                                        required 
                                    />
                                </div>

                                <div className="booking-filed">
                                    <label htmlFor="placement">Placement</label>
                                    <input 
                                        type="text" 
                                        id="placement" 
                                        name="placement" 
                                        value={formData.placement}
                                        onChange={handleChange}
                                        placeholder="Placement" 
                                        required 
                                    />
                                </div>

                                <div className="booking-filed">
                                    <label htmlFor="referenceIdea">Reference pic or a quick idea of what you’re wanting.</label>
                                    <input 
                                        type="text" 
                                        id="referenceIdea" 
                                        name="referenceIdea" 
                                        value={formData.referenceIdea}
                                        onChange={handleChange}
                                        placeholder="Reference Idea" 
                                        required 
                                    />
                                    <input 
                                        type="file" 
                                        id="referencePic" 
                                        name="referencePic" 
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, "referenceImg")} 
                                    />
                                </div>
                            </>
                        )}

                        <button type="submit" className="next-btn-arrow mt-4">
                            &gt;
                        </button>
                    </form>
                )}

                {/* third screen / disclaimer */}
                {step === 3 && (
                    <form onSubmit={handleFinalBooking} className="disclaimer-form text-center">
                        <div className="disclaimer-text mb-4">
                            <p className="fw-bold">PLEASE NOTE:</p>
                            <p>WE PREFER YOU COME ALONE, BUT IF NEEDED, YOU MAY BRING ONE GUEST.</p>
                            <p>NO KIDS, NO ENTOURAGE, NO ALCOHOL, AND NO WEED.</p>
                            <p>IF YOU'RE FEELING SICK (FLU, SINUS, ETC.), PLEASE BE KIND AND RESCHEDULE — WE APPRECIATE IT!</p>
                            <p>CAN'T WAIT TO CREATE SOMETHING BEAUTIFUL WITH YOU</p>
                            <p className="mt-3">MUCH LOVE,<br />ILLUMINATED BY ARTISTRY</p>
                        </div>

                        <button type="submit" className="book-btn">
                            BOOK
                        </button>
                    </form>
                )}

                {/* PAGINATION DOTS */}
                <div className="pagination-dots d-flex justify-content-center mt-4">
                    <span className={`dot ${step === 1 ? 'active' : ''}`} onClick={() => setStep(1)}></span>
                    <span className={`dot ${step === 2 ? 'active' : ''}`} onClick={() => setStep(2)}></span>
                    <span className={`dot ${step === 3 ? 'active' : ''}`} onClick={() => setStep(3)}></span>
                </div>

            </div>
        </div>
        </>
    )
}