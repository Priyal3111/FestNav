# 🎪 FestPulse - College Campus & Multi-Floor Fest Companion

A 100% **pure frontend** web application built with **HTML5, CSS3, and Vanilla JavaScript**.
**No databases, no servers, no Python, and no Node.js required.** Simply open `index.html` directly in your browser.

---

## 🏛️ Custom-Tailored to Your College Architecture

The application is modeled specifically around your college layout:

| Level / Zone | Areas & Rooms Included | Fest Activities & Services |
| :--- | :--- | :--- |
| **5th Floor** | Rooms **501, 502, 503, 504, 505** | Tech Masterclasses, AI Seminars, Pop Culture Mega Quiz |
| **4th Floor** | Rooms **401, 402, 403, 404, 405** | Algorithmic Speed Coding, UI/UX Design Sprint, Media Labs |
| **3rd Floor** | Rooms **301, 302, 303, 304, 305** | HackSphere: 24-Hour AI & Web3 Hackathon Labs |
| **2nd Floor** | Rooms **201, 202, 203, 204, 205** | Model United Nations, Parliamentary Debate, Case Studies |
| **1st Floor** | Rooms **101, 102, 103, 104, 105** | Slam Poetry, Creative Writing, Drama Club, Volunteer HQ |
| **Ground Floor** | **Main Auditorium (850 Seats)** | Star Night Concerts, ChoreoNight Dance Showdowns, Keynotes |
| **Ground Floor** | **Pre-Auditorium (Grand Foyer)** | Central Registration, Sponsor Booths, **Lost & Found Desk #1** |
| **Ground Floor** | **Triangle Garden (Central Lawn)** | Nukkad Natak (Street Plays), Acoustic Sunset Jams, Hydration Booth |
| **Ground Floor** | **Pre-Canteen Hall** | Campus Art & Photo Gallery, Chaat & Quick Snack Stalls |
| **Ground Floor** | **Main College Canteen** | Food Stalls (Counters 1 to 6: Dosa, Biryani, Kathi Rolls) |
| **Ground Floor** | **Medical Room (Room G-02)** | 24x7 Doctor-on-Duty, Rest beds, Emergency IV fluids |
| **Level -1** | **Hall Above Basement** | Campus LAN Esports Arena (Valorant & FC26), Dance Cyphers |
| **Basement -2** | **Underground Arena (-2)** | RoboWars Combat Pit, Drone Obstacle Course, Hardware Pits |

---

## 🌟 Key Capabilities

### 1. 🏢 Interactive Floor-by-Floor Blueprint Navigator
- Quick floor selector tabs: **5th Floor, 4th Floor, 3rd Floor, 2nd Floor, 1st Floor, Ground Floor, Level -1 Hall, Basement -2**.
- Clicking any floor renders its blueprint instantly:
  - **Ground Floor Blueprint:** Displays the **Auditorium**, **Pre-Auditorium**, **Triangle Garden** (green polygon lawn), **Pre-Canteen Hall**, and **Canteen**, plus the Medical Room and elevators/stairs.
  - **Academic Floors (1 to 5):** Displays all 5 classrooms (e.g. `301, 302, 303, 304, 305`) along the central hallway with elevator/stairwell access.
  - **Level -1:** Displays the spacious Multi-Purpose Hall & LAN Arena.
  - **Basement -2:** Displays the reinforced RoboWars combat arena and team pits.
- Clicking any room or area shows:
  - Exact walking directions from the nearest entrance/elevator
  - Current seating capacity
  - Scheduled fest events
  - 1-click button to register for the event in that room

### 2. 📅 Event Schedules with Real-Time Capacity Tracking
- Filter by fest: **TechSprint '26 (Tech)**, **Vibrance '26 (Cultural)**, or **Spardha '26 (Sports/Esports)**.
- Filter by campus zone: *Ground Floor Hub*, *Classroom Labs (1-5)*, or *Basements (-1 & -2)*.
- Live occupancy meter showing `% filled` (turns amber when >80% full, turns red with "Capacity Reached" when full).

### 3. 🎟️ On-Site 1-Click Registration & Digital QR Pass
- Students can register directly on the website with Name, Roll Number, Department, and Phone.
- Generates an instant **Digital Campus Entry Pass**:
  - Unique Ticket ID (e.g. `#FP-50241`)
  - Verified QR code badge
  - Attendee details, Room number, and Date/Time
  - **Print / Save as PDF** button (`window.print()`)
  - **"View Room on Blueprint"** button to immediately locate the room.
- Pass is saved in browser `localStorage`.
- "My Passes" wallet allows viewing all tickets and canceling seats if plans change.

### 4. 🍔 Food Stalls at Canteen, Pre-Canteen Hall & Triangle Garden
- Directory of all dining points:
  - **Main Canteen Counters:** Dosa, Kathi Rolls, Biryani Bowls.
  - **Pre-Canteen Hall:** Chaat, Samosas, Waffles, and Artisan Cold Coffees.
  - **Triangle Garden Kiosk:** Fresh mint mojitos, shikanji, and chilled refreshments.
- Price ranges, timings, and pure veg tags.

### 5. 🚑 Medical First Aid & 24x7 Emergency Help
- **Ground Floor Medical Clinic (Room G-02, next to Triangle Garden):** 24 hours open, resident doctors, 4 rest beds.
- **Level -1 First Aid Kit:** Burn bandages, pain sprays, and ice packs for the RoboWars and Esports arenas.
- **Triangle Garden Hydration Booth:** Free electrolytes, ORS sachets, and glucose drinks.
- One-tap phone links (`tel:+919876543210`) for mobile calling.

### 6. 🔍 Lost & Found Helpdesk
- Physical Desk: **Pre-Auditorium Grand Foyer, Counter #1**.
- Live feed of found items and lost reports.
- Student submission form to report misplaced or found belongings.

---

## 🚀 How to Run

1. Open File Explorer to:
   ```
   c:\Users\priya\Desktop\Project\
   ```
2. Double-click **`index.html`** in any web browser (Chrome, Edge, Firefox, Brave, Safari).
3. The site is 100% self-contained and ready to use offline!
"# Project" 
"# FestNav" 
