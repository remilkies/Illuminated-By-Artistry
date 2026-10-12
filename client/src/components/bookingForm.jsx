import React, { useState } from "react";
import "./bookingForm.css"

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

    // 🦇 Yeet data to MongoDB and trigger WhatsApp redirect
    const handleFinalBooking = async (e) => {
        e.preventDefault();
        console.log("Submitting final booking to DB & WhatsApp...", formData);

        // package text fields + actual files into FormData for multer
        const data = new FormData();
        data.append("name", formData.name);
        data.append("phone", formData.phone);
        data.append("appointmentType", formData.appointmentType);
        data.append("isCoverUp", formData.isCoverUp);
        data.append("coverUpType", formData.coverUpType || "");
        data.append("sizeCM", formData.sizeCM || "");
        data.append("placement", formData.placement || "");
        data.append("idea", formData.idea || "");

        // attach files if they were actually selected
        if (formData.referenceImg) {
            data.append("referenceImg", formData.referenceImg);
        }
        if (formData.existingTattooImg) {
            data.append("existingTattooImg", formData.existingTattooImg);
        }

        try {
            const response = await fetch('http://localhost:5050/api/bookings', {
                method: 'POST',
                // NOTE: Leave Content-Type header out! The browser handles multipart boundaries automatically.
                body: data
            });

            const result = await response.json();

            if (response.ok) {
                console.log("Successfully saved to DB:", result);

                // open whatsapp with a pre-filled client summary
                const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

                const activeImageLink = result.referenceImgUrl || result.existingTattooImgUrl;
                const imageLinkText = activeImageLink
                    ? `\n✦ *Reference Image:* ${activeImageLink}`
                    : `\n✦ *Reference Image:* None attached`;

                const waMessage = encodeURIComponent(
                    `Hello! 🙏🧿✨ A new story has reached Illuminated By Artistry:\n\n` +
                    `✦ *Name:* ${formData.name}\n` +
                    `✦ *Contact:* ${formData.phone}\n` +
                    `✦ *Appointmnet Type:* ${formData.appointmentType}\n` +
                    `${formData.isCoverUp
                        ? `✦ *Transformation Focus:* ${formData.coverUpType}\n`
                        : `✦ *Dimensions:* ${formData.sizeCM}\n✦ *Placement:* ${formData.placement}\n✦ *The Vision & Story:*${formData.idea}\n`}` +
                    imageLinkText +
                    `\n\nLooking forward to connecting and bringing this piece to life. ❤️`
                );

                window.open(`https://wa.me/${waNumber}?text=${waMessage}`, '_blank');
                alert("Booking submitted successfully! 🦇✨");
            } else {
                alert(`Error saving booking: ${result.error}`);
            }
        } catch (err) {
            console.error("Network error:", err);
            alert("Failed to connect to the backend server. Is port 5050 running?");
        }
    };

    return (
        <>

            <div className="booking-form-wrapper">
                <div className="booking-container container-fluid d-flex justify-content-center align-items-center min-vh-100">
                    <div className="booking-card">

                        <h2 className="booking-header">Book your spot <br></br>we'll bring the art</h2>

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
                                        <option value="Tattoo">Tattoo</option>
                                        <option value="Piercing">Piercing</option>
                                        <option value="Permanent Makeup">Permanent Makeup</option>
                                    </select>
                                </div>

                                {/* checkbox appears if tattoo is selected */}
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
                                            <label htmlFor="coverUpType">Please indicate if this is a: </label>
                                            <div className="radio-group d-flex flex-column gap-2 mt-2">
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

                                        <div className="booking-field mt-3">
                                            <label htmlFor="fileUpload">Please include a photo of your existing tattoo.</label>
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

                                        <div className="booking-field">
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

                                        <div className="booking-field">
                                            <label htmlFor="idea">Reference pic or a quick idea of what you’re wanting.</label>
                                            <input
                                                type="text"
                                                id="idea"
                                                name="idea"
                                                value={formData.idea}
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
            </div>
        </>
    )
}