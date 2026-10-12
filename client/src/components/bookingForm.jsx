import React, { useState } from "react";
import "./bookingForm.css"

const PIERCING_OPTIONS = {
    "Facial Piercings": [
        "Nose (Surgical Steel) - R300",
        "Septum (Surgical Steel) - R350",
        "Medusa (Surgical Steel) - R350",
        "Lip (Surgical Steel) - R350",
        "Eyebrow (Surgical Steel) - R300",
        "Bridge (Surgical Steel) - R350",
        "Ashley (Surgical Steel) - R350",
        "Monroe (Surgical Steel) - R350",
        "Labret (Surgical Steel) - R350"
    ],
    "Ear Piercings": [
        "Earlobe (Pair) (Surgical Steel) - R500",
        "Upper Lobe (Surgical Steel) - R300",
        "Helix (Surgical Steel) - R300",
        "Tragus (Surgical Steel) - R300",
        "Anti-Tragus (Surgical Steel) - R350",
        "Industrial (Surgical Steel) - R400",
        "Conch (Surgical Steel) - R300",
        "Forward Helix (Surgical Steel) - R300",
        "Daith (Surgical Steel) - R350",
        "Rook (Surgical Steel) - R350",
        "Snug (Surgical Steel) - R350",
        "Flat (Surgical Steel) - R300"
    ],
    "Oral Piercings": [
        "Smiley (Surgical Steel) - R350",
        "Tongue (Surgical Steel) - R350"
    ],
    "Body Piercings": [
        "Belly (Surgical Steel) - R350",
        "Nipples (Pair) (Surgical Steel) - R600",
        "Dermals (Titanium) - R800 ea."
    ],
    "Other Services": [
        "Jewellery Change (Excludes Jewellery) - R250"
    ]
};

export default function BookingForm() {

    // Track which step/screen we are on (1, 2, or 3)
    const [step, setStep] = useState(1);

    // Unified Form State
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        appointmentType: "Tattoo",
        // Tattoo specific
        isCoverUp: false,
        coverUpType: "Cover-Up",
        existingTattooImg: null,
        sizeCM: "",
        placement: "",
        idea: "",
        referenceImg: null,
        // Laser Removal specific
        removalImg: null,
        removalSizeCM: "",
        // Piercing specific
        piercingCategory: "Facial Piercings",
        piercingType: "Nose (Surgical Steel)",
        // PMU specific
        pmuType: "Eyebrow Tattoo",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "piercingCategory") {
            const firstOption = PIERCING_OPTIONS[value]?.[0] || "";
            setFormData((prev) => ({
                ...prev,
                piercingCategory: value,
                piercingType: firstOption
            }));
            return;
        }

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

        const data = new FormData();
        data.append("name", formData.name);
        data.append("phone", formData.phone);
        data.append("appointmentType", formData.appointmentType);


        if (formData.appointmentType === "Tattoo") {
            data.append("isCoverUp", formData.isCoverUp);
            if (formData.isCoverUp) {
                data.append("coverUpType", formData.coverUpType || "");
                if (formData.existingTattooImg) data.append("existingTattooImg", formData.existingTattooImg);
            } else {
                data.append("sizeCM", formData.sizeCM || "");
                data.append("placement", formData.placement || "");
                data.append("idea", formData.idea || "");
                if (formData.referenceImg) data.append("referenceImg", formData.referenceImg);
            }
        } else if (formData.appointmentType === "Laser Tattoo Removal") {
            data.append("sizeCM", formData.removalSizeCM || "");
            if (formData.removalImg) data.append("removalImg", formData.removalImg);
        } else if (formData.appointmentType === "Piercing") {
            data.append("piercingCategory", formData.piercingCategory);
            data.append("piercingType", formData.piercingType);
        } else if (formData.appointmentType === "Permanent Makeup") {
            data.append("pmuType", formData.pmuType);
        }

        try {
            const response = await fetch('http://localhost:5050/api/bookings', {
                method: 'POST',
                body: data
            });

            const result = await response.json();

            if (response.ok) {
                const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER;


                const activeImageLink = result.referenceImgUrl || result.existingTattooImgUrl || result.removalImgUrl;
                const imageLinkText = activeImageLink
                    ? `\n✦ *Reference/Current Image:* ${activeImageLink}`
                    : ``;


                let serviceDetails = "";
                if (formData.appointmentType === "Tattoo") {
                    serviceDetails = formData.isCoverUp
                        ? `✦ *Transformation Focus:* ${formData.coverUpType}\n`
                        : `✦ *Dimensions:* ${formData.sizeCM}\n✦ *Placement:* ${formData.placement}\n✦ *The Vision:* ${formData.idea}\n`;
                } else if (formData.appointmentType === "Laser Tattoo Removal") {
                    serviceDetails = `✦ *Tattoo Size:* ${formData.removalSizeCM}\n✦ *Service:* Laser Tattoo Removal\n`;
                } else if (formData.appointmentType === "Piercing") {
                    serviceDetails = `✦ *Category:* ${formData.piercingCategory}\n✦ *Selected Piercing:* ${formData.piercingType}\n`;
                } else if (formData.appointmentType === "Permanent Makeup") {
                    serviceDetails = `✦ *PMU Treatment:* ${formData.pmuType}\n`;
                }

                const waMessage = encodeURIComponent(
                    `Hello! 🙏🧿✨ A new story has reached Illuminated By Artistry:\n\n` +
                    `✦ *Name:* ${formData.name}\n` +
                    `✦ *Contact:* ${formData.phone}\n` +
                    `✦ *Service:* ${formData.appointmentType}\n` +
                    serviceDetails +
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

                        {/* SCREEN 1: CLIENT INFO & SERVICE SELECTION */}
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
                                        <option value="Laser Tattoo Removal">Laser Tattoo Removal</option>
                                        <option value="Piercing">Piercing</option>
                                        <option value="Permanent Makeup">Permanent Makeup</option>
                                    </select>
                                </div>

                                {/* Cover-up checkbox only applies to Tattoos */}
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

                        {/* SCREEN 2: DYNAMIC SERVICE DETAILS */}
                        {step === 2 && (
                            <form onSubmit={handleNext} className="booking-form">

                                {/* 1. TATTOO PATHWAY */}
                                {formData.appointmentType === "Tattoo" && (
                                    formData.isCoverUp ? (
                                        <>
                                            <div className="booking-field">
                                                <label>Please indicate if this is a:</label>
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
                                                <label htmlFor="existingTattooImg">Please include a photo of your existing tattoo.</label>
                                                <input
                                                    type="file"
                                                    id="existingTattooImg"
                                                    name="existingTattooImg"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(e, "existingTattooImg")}
                                                    required
                                                />
                                            </div>
                                        </>
                                    ) : (
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
                                                    id="referenceImg"
                                                    name="referenceImg"
                                                    accept="image/*"
                                                    className="mt-2"
                                                    onChange={(e) => handleFileChange(e, "referenceImg")}
                                                />
                                            </div>
                                        </>
                                    )
                                )}

                                {/* 2. LASER TATTOO REMOVAL PATHWAY */}
                                {formData.appointmentType === "Laser Tattoo Removal" && (
                                    <>
                                        <div className="booking-field">
                                            <label htmlFor="removalSizeCM">Approximate Size of Tattoo (cm)</label>
                                            <input
                                                type="text"
                                                id="removalSizeCM"
                                                name="removalSizeCM"
                                                value={formData.removalSizeCM}
                                                onChange={handleChange}
                                                placeholder="e.g. 10x10 cm"
                                                required
                                            />
                                        </div>

                                        <div className="booking-field mt-3">
                                            <label htmlFor="removalImg">Upload a photo of the tattoo to be removed.</label>
                                            <input
                                                type="file"
                                                id="removalImg"
                                                name="removalImg"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e, "removalImg")}
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                {/* 3. PIERCING PATHWAY (Nested Cascading Dropdowns) */}
                                {formData.appointmentType === "Piercing" && (
                                    <>
                                        <div className="booking-field">
                                            <label htmlFor="piercingCategory">Piercing Category</label>
                                            <select
                                                id="piercingCategory"
                                                name="piercingCategory"
                                                value={formData.piercingCategory}
                                                onChange={handleChange}
                                                required
                                            >
                                                {Object.keys(PIERCING_OPTIONS).map((cat) => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="booking-field mt-3">
                                            <label htmlFor="piercingType">Select Specific Piercing</label>
                                            <select
                                                id="piercingType"
                                                name="piercingType"
                                                value={formData.piercingType}
                                                onChange={handleChange}
                                                required
                                            >
                                                {PIERCING_OPTIONS[formData.piercingCategory]?.map((item) => (
                                                    <option key={item} value={item}>{item}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </>
                                )}

                                {/* 4. PERMANENT MAKEUP PATHWAY */}
                                {formData.appointmentType === "Permanent Makeup" && (
                                    <div className="booking-field">
                                        <label htmlFor="pmuType">Select Permanent Makeup Service</label>
                                        <select
                                            id="pmuType"
                                            name="pmuType"
                                            value={formData.pmuType}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="Eyebrow Tattoo">Eyebrow Tattoo</option>
                                            <option value="Lash Lift">Lash Lift</option>
                                        </select>
                                    </div>
                                )}

                                <button type="submit" className="next-btn-arrow mt-4">
                                    &gt;
                                </button>
                            </form>
                        )}

                        {/* SCREEN 3: DISCLAIMER */}
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