# ✨ Illuminated by Artistry

> *Energy. Expression. Artistry.*  

**Illuminated by Artistry** is a passion-project portfolio and booking site built for a tattoo and piercing studio, designed and developed as a surprise gift for the artist behind it. The site showcases her work through a curated gallery, gives visitors an easy way to learn about her services (tattoos, piercings and pricing), and makes booking or reaching out feel as seamless as the art itself.

Built with a heavy front-end focus, the design leans into a soft, elegant aesthetic that reflects the artist's own brand identity - pairing custom typography, subtle gradient animations, and a warm colour palette to create something that feels less like a template and more like an extension of her studio.

**📜 The Backstory:** I've been a client of this artist for years and her studio doesn't feel like a studio, it feels like *her* space, and she makes you feel completely at home in it. This site started as a "hey what if..." during a holiday and a glass of red wine, and turned into a real front-to-back build. She knows it's happening and is fully on board :D
This isn't a commissioned project, just something I wanted to make for someone whose work means a lot to me. If she loves it and wants it live, even better <3

## 🌿 Planned Features
 
* **Curated Gallery:** A visual showcase of the artist's tattoo and piercing work.
* **Services & Pricing:** Clear, easy-to-find information for anyone browsing before they book.
* **Self-Updating Instagram Feed:** An embedded live feed pulling directly from the Artist's  Instagram, so the site reflects new work automatically without either of us having to manually maintain it.
* **Contact Form:** A simple way for visitors to reach out, sitting alongside existing WhatsApp and Instagram DM contact methods -exact delivery method (WhatsApp forwarding vs. email) still being worked out.


## 🛠️ Tech Stack
 
* **Vite** — for a fast, scratch-built dev environment
* **React** — component structure for the gallery, nav, and future booking flow
* **Tailwind CSS** — *(new territory!)* I'm a lifelong custom-stylesheet purist so prepare for alooot of comments along my latest quest for knowledge >:D
* **JavaScript (ES6+)**

## 🖼️ Application Flow

```text
Visitor Lands on Site → React Frontend (Home / Piercing / Tattoos / Beauty)
                                                 ↓
                                    Gallery & Services Render
                                                 ↓
                            Instagram Feed Component → Instagram API/Embed
                                                 ↓
                              Feed Auto-Refreshes with Latest Posts
                                                 ↓
                         Visitor Submits Contact Form → Forwarded to Artist
                                              (WhatsApp / Email — TBD)
```

 
## 🚧 Current Status
 
This is very much a work in progress, built during a holiday for love of the craft (and the artist) rather than on any deadline:
 
* [x] Figma wireframes (drafted late at night, subject to change once real brand assets come in —  *right now this is more the wine's design than mine* 🍷)
* [x] Project scaffolded with Vite + React + Tailwind
* [x] Navbar built
* [ ] Final logo, colour palette, and brand assets from the artist
* [ ] Gallery, services, and Instagram feed components
* [ ] Contact form + delivery method


## Illuminating on your machine

1. **Clone the repository:**
```bash
   git clone https://github.com/remilkies/illuminated-by-artistry.git
   cd illuminated-by-artistry

```
 
2. **Install dependencies:**
```bash
   npm install
```
 
3. **Run the dev server:**
```bash
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

