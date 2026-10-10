
<img src="/src/assets/readmeBanner.png" width="100%">


> *Energy. Expression. Artistry.*  

**Illuminated by Artistry** is a full-stack MERN booking platform and portfolio crafted for a boutique tattoo and piercing studio. Designed and engineered as a surprise gift for the artist behind the needle, the application streamlines client intake through a multi-step booking wizard, dynamic image references, automated calendar checking, and immediate WhatsApp payload routing.

Built with a high-efficiency front-end and a modular Express/MongoDB backend, the design balances dark goth aesthetics with art-deco flourishes—creating a digital space that feels like a natural extension of her studio.

**📜 The Backstory:** I've been a client of this artist for years. Her studio doesn't feel like a corporate shop—it feels like *her* space, and she makes you feel completely at home in it. This site started as a "hey what if..." during a holiday over a glass of red wine, and turned into a full-scale architectural build. She knows it's happening and is fully on board :D

---

## 🌿 Planned Features
 
* **3-Step Smart Booking Wizard:** Multi-stage client intake form supporting dynamic UI branching for standard tattoos vs. cover-ups/reworks.
* **Multipart Media Uploads:** Integrated `multer` binary pipeline allowing clients to upload reference pictures and existing tattoo photos directly into server storage.
* **Automated WhatsApp Payload Integration:** Form submissions automatically format client responses and trigger a direct WhatsApp deep-link message to the artist for immediate confirmation.
* **Live Slot Availability Engine:** Custom `/api/bookings/check-date/:date` endpoint querying MongoDB to block out booked time slots dynamically.
* **Auto-Updating Instagram Showcase:** Custom grid container designed for live portfolio updates via embed widgets or cached Graph API posts.
* **Art-Deco UI Architecture:** Handcrafted custom styles, keyframe animations, and dark-mode frames built for high-scannability and aesthetic flair.


## ✨ Tech Stack
 
### **Frontend**
- **React (Vite)** — Modular component structure, custom state hooks, and fast HMR development.
- **Bootstrap 5 & Custom CSS** — High-contrast layout engine paired with custom keyframes and art-deco accents.
- **JavaScript (ES6+)** — Dynamic `FormData` packaging and native fetch API.

### **Backend**
- **Node.js & Express** — Native ES Module backend architecture handling RESTful routing.
- **MongoDB & Mongoose** — Document-based persistent storage for client bookings, slots, and flash design status.
- **Multer** — Middleware for multi-part file handling and server-side static media disk storage.

## ✨ Application Flow

```text
Client Opens Site → React Wizard Component (Step 1: Contact & Service Type)
                                       ↓
                [Tattoo Selected] → Step 2: Cover-Up Check
                   /                       \
        (Yes: Cover-Up)                  (No: Custom Idea)
               ↓                                ↓
Upload Existing Photo + Rework Type    Enter Size (cm), Placement & Ref Photo
                   \                       /
                    ↓                     ↓
         Step 3: Studio Rules & Final Confirmation
                               ↓
         [Submit] → Multipart FormData POST to /api/bookings
                               ↓
     ┌─────────────────────────┴─────────────────────────┐
     ↓                                                   ↓
Saved to MongoDB + Disk Storage             Redirects to WhatsApp with
(/uploads/unique-file.png)                 Pre-formatted Client Payload
```

## Illuminating on your machine

1. **Clone the repository:**
```bash
   git clone https://github.com/remilkies/illuminated-by-artistry.git
   cd illuminated-by-artistry

```
 
2. **Setup Backend (/server)**
```bash
   cd server
npm install
# Create a .env file and add your MONGO_URI
npm start
```
 
3. **Setup Frontend (/client)**
```bash
   cd client
npm install
npm run dev
```

<p align="left">
<!-- <img src="/asabovesobelow/icons/rembyte.png" height="60px"> -->
<p>
 
Created by **REMByte** <3 <br>
 
*Home of Aesthetic Functionality*
</p>
</p>

> *Built with love, loyalty, and an unreasonable number of tattoo appointments.*

