/**
 * FestPulse 2026 - College Fest Companion & Multi-Level Navigator
 * 100% PURE FRONTEND (Vanilla JavaScript, HTML5, CSS3)
 * NO BACKEND, NO DATABASES - Runs completely in any web browser.
 * 
 * Specially tailored to the College Architectural Layout:
 * - 5 Floors with 5 Classrooms each (Rooms 101-105, 201-205, 301-305, 401-405, 501-505)
 * - Ground Floor: Auditorium, Pre-Auditorium, Triangle Garden, Pre-Canteen Hall, Canteen
 * - Level -1: Hall above basement (Lower Ground Event Hall)
 * - Level -2: Basement -2 (RoboWars Combat & Tech Arena)
 */

// ============================================================================
// 1. DATA REPOSITORY: CAMPUS LOCATIONS & ROOMS BY FLOOR
// ============================================================================

const CAMPUS_DATA = {
  // GROUND FLOOR
  "ground": {
    name: "Ground Floor (Central Hub)",
    meta: "Auditorium • Pre-Auditorium • Triangle Garden • Canteen • Pre-Canteen Hall",
    areas: {
      "auditorium": {
        id: "auditorium",
        name: "Main Auditorium",
        type: "event",
        floor: "Ground Floor",
        landmark: "West Wing, through Pre-Auditorium foyer",
        capacity: "850 Tiered Seats (Air-conditioned)",
        directions: "Enter main college porch, walk through the Pre-Auditorium doors. The main double acoustic entrance leads straight to the grand stage.",
        status: "Active Fest Venue • Sound System On",
        events: ["Star Night Concert (Day 3)", "ChoreoNight Dance Battle (Day 2)", "Inaugural Ceremony (Day 1)"]
      },
      "pre-auditorium": {
        id: "pre-auditorium",
        name: "Pre-Auditorium Grand Foyer",
        type: "help",
        floor: "Ground Floor",
        landmark: "Immediately preceding the Auditorium entrance",
        capacity: "350 Pax Standing / Reception Area",
        directions: "Right inside the Main College Portico. Houses the Central Registration Desk, Sponsor Booths, and the Lost & Found Counter #1.",
        status: "Registration & Helpdesk Open",
        events: ["Fest Welcome & Badge Collection", "Sponsor Showcase & Photobooth"]
      },
      "triangle-garden": {
        id: "triangle-garden",
        name: "Triangle Garden (Central Green)",
        type: "garden",
        floor: "Ground Floor (Outdoor)",
        landmark: "Center courtyard enclosed by Academic Wing & Canteen Walkway",
        capacity: "450 Students on Grass & Stone Benches",
        directions: "Step out of the Pre-Auditorium glass corridor into the triangular lawn. Look for the central shade trees and open wooden stage.",
        status: "Open Air Street Play & Chill Hub",
        events: ["Nukkad Natak Street Theatre (Day 2)", "Acoustic Unplugged Jam (Day 1)"]
      },
      "pre-canteen": {
        id: "pre-canteen",
        name: "Pre-Canteen Hall",
        type: "food",
        floor: "Ground Floor",
        landmark: "Indoor hall connecting Triangle Garden to Canteen",
        capacity: "180 Standing / Quick Snack Counters",
        directions: "Follow the covered corridor past the Triangle Garden. You will enter this spacious hall before stepping into the main canteen.",
        status: "Snack Stalls & Art Gallery Open",
        events: ["Fest Art & Photography Gallery", "Quick Snack & Beverage Counters"]
      },
      "canteen": {
        id: "canteen",
        name: "Main College Canteen",
        type: "food",
        floor: "Ground Floor",
        landmark: "East Wing, accessed directly through Pre-Canteen Hall",
        capacity: "350 Seated Diners & 6 Food Counters",
        directions: "Pass through the Pre-Canteen Hall into the brightly lit dining area. Food counters are lined up along the south wall.",
        status: "All Food Stalls Open (UPI / Cash)",
        events: ["Fest Food Carnival", "Chef Special Lunch & Dinners"]
      },
      "med-ground": {
        id: "med-ground",
        name: "Ground Floor Medical Room",
        type: "medical",
        floor: "Ground Floor",
        landmark: "Room G-02, next to Triangle Garden entrance",
        capacity: "4 Rest Beds & 2 Doctors On Duty",
        directions: "Located in the quiet corridor between Pre-Auditorium and the garden walkway. Marked with prominent red cross sign.",
        status: "24x7 Doctor On Duty",
        events: ["First Aid & Hydration Station", "Emergency Medical Response"]
      }
    }
  },

  // LEVEL -1 (HALL ABOVE BASEMENT)
  "-1": {
    name: "Level -1 (Hall Above Basement)",
    meta: "Lower Ground Multi-Purpose Hall • Esports LAN Arena • Indoor Dance Space",
    areas: {
      "hall-b1": {
        id: "hall-b1",
        name: "Level -1 Multi-Purpose Hall",
        type: "event",
        floor: "Level -1 (Above Basement)",
        landmark: "Accessible via Central Elevator or Stairwell B",
        capacity: "400 Pax with Stage & Gaming Stations",
        directions: "Take the central stairs down one flight from the Pre-Auditorium foyer, or take Elevator 1 to Level -1. Walk through double fire doors.",
        status: "LAN Esports & Lighting Active",
        events: ["Valorant & FIFA Esports Championship (Day 2)", "Street Rap & Beatboxing Cypher (Day 1)"]
      },
      "med-b1": {
        id: "med-b1",
        name: "Level -1 First Aid Post",
        type: "medical",
        floor: "Level -1",
        landmark: "Next to Staircase B exit",
        capacity: "2 Emergency Stretchers",
        directions: "Directly opposite the entrance of the Level -1 Hall.",
        status: "First Aid Kit & Volunteers Ready",
        events: ["Gaming Crowd Health Support"]
      }
    }
  },

  // BASEMENT -2 (UNDERGROUND ARENA)
  "-2": {
    name: "Basement -2 (Underground Tech Arena)",
    meta: "RoboWars Combat Pit • Heavy Hardware Demos • Technical Project Showcases",
    areas: {
      "basement-b2": {
        id: "basement-b2",
        name: "Basement -2 Combat Arena",
        type: "event",
        floor: "Basement -2",
        landmark: "Lowest level accessible via South Freight Elevator & Staircase A",
        capacity: "300 Spectators around Reinforced Enclosure",
        directions: "Head down two flights of stairs from the Ground foyer or take Elevator 2 to Basement -2. Look for yellow safety boundary markings.",
        status: "Reinforced Polycarbonate Combat Pit Active",
        events: ["RoboWars: Heavyweight Bot Battles (Day 1)", "Drone Obstacle Course (Day 2)"]
      }
    }
  },

  // FLOORS 1 TO 5 (5 CLASSROOMS ON EACH FLOOR)
  "1": {
    name: "1st Floor (Academic Block)",
    meta: "Rooms 101, 102, 103, 104, 105 • Student Council HQ & Literary Arts",
    rooms: [101, 102, 103, 104, 105],
    defaultEvent: "Literary Arts & Debating Societies"
  },
  "2": {
    name: "2nd Floor (Academic Block)",
    meta: "Rooms 201, 202, 203, 204, 205 • Model UN & Creative Competitions",
    rooms: [201, 202, 203, 204, 205],
    defaultEvent: "Model United Nations & Case Studies"
  },
  "3": {
    name: "3rd Floor (Academic Block)",
    meta: "Rooms 301, 302, 303, 304, 305 • 24-Hr Hackathon Coding Labs",
    rooms: [301, 302, 303, 304, 305],
    defaultEvent: "HackSphere AI & Web3 Labs"
  },
  "4": {
    name: "4th Floor (Academic Block)",
    meta: "Rooms 401, 402, 403, 404, 405 • Algorithmic Speed Coding & UI/UX Sprint",
    rooms: [401, 402, 403, 404, 405],
    defaultEvent: "Speed Debugging & Product Design Hub"
  },
  "5": {
    name: "5th Floor (Top Floor)",
    meta: "Rooms 501, 502, 503, 504, 505 • Masterclasses, AI Seminars & Trivia Quizzes",
    rooms: [501, 502, 503, 504, 505],
    defaultEvent: "Tech Masterclasses & Pop Culture Quizzes"
  }
};

// ============================================================================
// 2. EVENTS DATABASE (MAPPED DIRECTLY TO FLOORS AND ROOMS)
// ============================================================================

const INITIAL_EVENTS = [
  // Ground Floor & Special Areas
  {
    id: "evt-aud-01",
    title: "Star Night: Live Rock & Bollywood Band Concert",
    fest: "cultural",
    festName: "Vibrance '26",
    category: "Ground Floor Hub",
    subCat: "Cultural & Music",
    date: "Day 3 • Oct 26, 2026",
    time: "06:30 PM – 10:00 PM",
    venue: "Main Auditorium (Ground Floor)",
    floor: "ground",
    areaId: "auditorium",
    capacity: 850,
    registeredCount: 810,
    description: "The grand finale concert featuring award-winning collegiate rock and fusion artists inside the main auditorium.",
    tags: ["Entry with QR Pass", "850 Capacity", "Acoustic Hall"]
  },
  {
    id: "evt-aud-02",
    title: "ChoreoNight: Western & Classical Dance Battle",
    fest: "cultural",
    festName: "Vibrance '26",
    category: "Ground Floor Hub",
    subCat: "Cultural & Music",
    date: "Day 2 • Oct 25, 2026",
    time: "04:30 PM – 08:00 PM",
    venue: "Main Auditorium (Ground Floor)",
    floor: "ground",
    areaId: "auditorium",
    capacity: 850,
    registeredCount: 790,
    description: "Crews from 14 colleges battle across hip-hop, contemporary, and fusion styles on the grand auditorium stage.",
    tags: ["Stage Lighting", "Audience Voting", "Fast Filling"]
  },
  {
    id: "evt-preaud-01",
    title: "Welcome Showcase, Photo Booth & Tech Expo",
    fest: "tech",
    festName: "TechSprint '26",
    category: "Ground Floor Hub",
    subCat: "Ground Floor Hub",
    date: "Day 1 to 3 • Full Day",
    time: "09:00 AM – 06:00 PM",
    venue: "Pre-Auditorium Grand Foyer",
    floor: "ground",
    areaId: "pre-auditorium",
    capacity: 350,
    registeredCount: 220,
    description: "Interactive VR booths, 360 photo booth, corporate sponsor swags, and student robotics welcome display.",
    tags: ["Open Walk-in", "Free Swags", "Sponsor Desks"]
  },
  {
    id: "evt-garden-01",
    title: "Nukkad Natak: Street Theatre Competition",
    fest: "cultural",
    festName: "Vibrance '26",
    category: "Ground Floor Hub",
    subCat: "Cultural & Music",
    date: "Day 2 • Oct 25, 2026",
    time: "10:30 AM – 01:30 PM",
    venue: "Triangle Garden (Central Lawn)",
    floor: "ground",
    areaId: "triangle-garden",
    capacity: 450,
    registeredCount: 320,
    description: "Powerful dramatic performances with dholak, gulal, and social themes in the open-air triangular lawn.",
    tags: ["Open Air Lawn", "Live Drums", "No Seat Restrictions"]
  },
  {
    id: "evt-garden-02",
    title: "Acoustic Sunset Jam & Open Mic",
    fest: "cultural",
    festName: "Vibrance '26",
    category: "Ground Floor Hub",
    subCat: "Cultural & Music",
    date: "Day 1 • Oct 24, 2026",
    time: "05:00 PM – 07:00 PM",
    venue: "Triangle Garden Pergola Stage",
    floor: "ground",
    areaId: "triangle-garden",
    capacity: 350,
    registeredCount: 280,
    description: "Unplugged guitars, beatboxing, ukulele performances, and poetry under the evening fairy lights in the garden.",
    tags: ["Acoustic", "Garden Seating", "Sunset Session"]
  },
  {
    id: "evt-precanteen-01",
    title: "Campus Art & Photography Gallery Showcase",
    fest: "cultural",
    festName: "Vibrance '26",
    category: "Ground Floor Hub",
    subCat: "Ground Floor Hub",
    date: "Day 1 to 3 • Continuous",
    time: "10:00 AM – 07:00 PM",
    venue: "Pre-Canteen Hall",
    floor: "ground",
    areaId: "pre-canteen",
    capacity: 180,
    registeredCount: 110,
    description: "Curated fine art, canvas paintings, digital art prints, and fest photography competition entries.",
    tags: ["Walk-through", "Vote for Best Artwork", "Snacks Adjacent"]
  },

  // Level -1 & Basement -2
  {
    id: "evt-b1-01",
    title: "Campus Esports LAN: Valorant & FC26 Championship",
    fest: "sports",
    festName: "Spardha '26",
    category: "Basements (-1 & -2)",
    subCat: "Gaming & Robo",
    date: "Day 2 • Oct 25, 2026",
    time: "10:00 AM – 06:00 PM",
    venue: "Level -1 Hall (Above Basement)",
    floor: "-1",
    areaId: "hall-b1",
    capacity: 250,
    registeredCount: 250, // Sold out
    description: "5v5 competitive LAN tactical shooter tournament on 240Hz monitors with live commentary on big screens.",
    tags: ["Sold Out", "Spectator Screen Available", "LAN Setup"]
  },
  {
    id: "evt-b2-01",
    title: "RoboWars: Heavyweight Bot Combat Showdown",
    fest: "tech",
    festName: "TechSprint '26",
    category: "Basements (-1 & -2)",
    subCat: "Gaming & Robo",
    date: "Day 1 • Oct 24, 2026",
    time: "01:30 PM – 06:00 PM",
    venue: "Basement -2 Combat Arena",
    floor: "-2",
    areaId: "basement-b2",
    capacity: 300,
    registeredCount: 275,
    description: "High-octane metal clashes! Custom bots with pneumatic flippers and spinning steel weapons in an armored enclosure.",
    tags: ["Armored Pit", "Safety Glasses Provided", "High Energy"]
  },

  // Classroom Floors (Floors 1 to 5)
  {
    id: "evt-room-301",
    title: "HackSphere: 24-Hour AI & Web3 Hackathon",
    fest: "tech",
    festName: "TechSprint '26",
    category: "Classroom Labs (1-5)",
    subCat: "Hackathon & Coding",
    date: "Day 1 • Oct 24, 2026",
    time: "10:00 AM – Next Day 10:00 AM",
    venue: "3rd Floor • Room 301 & 302",
    floor: "3",
    areaId: "room-301",
    capacity: 70,
    registeredCount: 65,
    description: "Build groundbreaking software projects overnight. Mentors, high-speed Wi-Fi, and pizza provided.",
    tags: ["Floor 3", "Room 301", "Fast Filling"]
  },
  {
    id: "evt-room-304",
    title: "CodeSprint: Algorithmic Duel & Speed Debugging",
    fest: "tech",
    festName: "TechSprint '26",
    category: "Classroom Labs (1-5)",
    subCat: "Hackathon & Coding",
    date: "Day 2 • Oct 25, 2026",
    time: "11:00 AM – 02:00 PM",
    venue: "3rd Floor • Room 304",
    floor: "3",
    areaId: "room-304",
    capacity: 55,
    registeredCount: 42,
    description: "1v1 knockout speed-debugging and dynamic programming algorithmic challenges on HackerRank.",
    tags: ["Floor 3", "Room 304", "Individual Participation"]
  },
  {
    id: "evt-room-402",
    title: "PixelCraft: UI/UX & Product Design Sprint",
    fest: "tech",
    festName: "TechSprint '26",
    category: "Classroom Labs (1-5)",
    subCat: "Hackathon & Coding",
    date: "Day 2 • Oct 25, 2026",
    time: "02:30 PM – 05:30 PM",
    venue: "4th Floor • Room 402",
    floor: "4",
    areaId: "room-402",
    capacity: 50,
    registeredCount: 38,
    description: "4-hour rapid Figma prototyping challenge solving realistic campus and urban transport problems.",
    tags: ["Floor 4", "Room 402", "Bring Laptop"]
  },
  {
    id: "evt-room-501",
    title: "Masterclass: Building Autonomous AI Agents in 2026",
    fest: "tech",
    festName: "TechSprint '26",
    category: "Classroom Labs (1-5)",
    subCat: "Hackathon & Coding",
    date: "Day 2 • Oct 25, 2026",
    time: "10:30 AM – 12:30 PM",
    venue: "5th Floor • Room 501",
    floor: "5",
    areaId: "room-501",
    capacity: 65,
    registeredCount: 60,
    description: "Hands-on session with industry software architects dissecting multi-agent architectures and local LLM workflows.",
    tags: ["Floor 5", "Room 501", "Certificates Provided"]
  },
  {
    id: "evt-room-504",
    title: "QuizWhiz: Pop Culture, Anime & Tech Mega Trivia",
    fest: "cultural",
    festName: "Vibrance '26",
    category: "Classroom Labs (1-5)",
    subCat: "Cultural & Music",
    date: "Day 3 • Oct 26, 2026",
    time: "01:30 PM – 04:00 PM",
    venue: "5th Floor • Room 504",
    floor: "5",
    areaId: "room-504",
    capacity: 60,
    registeredCount: 48,
    description: "Buzzer rounds, anime sound clips, Marvel universe Easter eggs, and vintage retro tech trivia.",
    tags: ["Floor 5", "Room 504", "Team of 2"]
  },
  {
    id: "evt-room-202",
    title: "Parliamentary Debate & Model United Nations",
    fest: "cultural",
    festName: "Vibrance '26",
    category: "Classroom Labs (1-5)",
    subCat: "Cultural & Music",
    date: "Day 1 • Oct 24, 2026",
    time: "11:00 AM – 04:30 PM",
    venue: "2nd Floor • Room 202 & 203",
    floor: "2",
    areaId: "room-202",
    capacity: 60,
    registeredCount: 52,
    description: "High-level debate discussing geopolitical crisis management and international AI governance treaties.",
    tags: ["Floor 2", "Room 202", "Formal Dress Code"]
  },
  {
    id: "evt-room-103",
    title: "VoiceOut: Slam Poetry & Creative Writing",
    fest: "cultural",
    festName: "Vibrance '26",
    category: "Classroom Labs (1-5)",
    subCat: "Cultural & Music",
    date: "Day 2 • Oct 25, 2026",
    time: "02:00 PM – 05:00 PM",
    venue: "1st Floor • Room 103",
    floor: "1",
    areaId: "room-103",
    capacity: 55,
    registeredCount: 35,
    description: "Original bilingual spoken word poetry, flash fiction storytelling, and acoustic background accompaniment.",
    tags: ["Floor 1", "Room 103", "Mic Setup"]
  }
];

// ============================================================================
// 3. FOOD STALLS IN CANTEEN, PRE-CANTEEN HALL & GARDEN
// ============================================================================

const FOOD_STALLS = [
  {
    id: "food-01",
    name: "Campus Grill & Kathi Rolls",
    locationZone: "Main Canteen (Counter #1)",
    category: "canteen-main",
    priceRange: "₹50 – ₹130",
    timing: "10:00 AM – 09:30 PM",
    status: "🟢 Open (5 min wait)",
    isVeg: false,
    popularItems: ["Paneer Tikka Roll (₹80)", "Chicken Shawarma (₹110)", "Egg Double Roll (₹70)"]
  },
  {
    id: "food-02",
    name: "South Indian Dosa & Idli Express",
    locationZone: "Main Canteen (Counter #2)",
    category: "canteen-main",
    priceRange: "₹40 – ₹90",
    timing: "08:30 AM – 09:00 PM",
    status: "🟢 Open (Instant Token)",
    isVeg: true,
    popularItems: ["Ghee Podi Roast Dosa (₹80)", "Steamed Idli Sambar (₹40)", "Medu Vada (₹50)"]
  },
  {
    id: "food-03",
    name: "Biryani Bowl & Rice Combos",
    locationZone: "Main Canteen (Counter #4)",
    category: "canteen-main",
    priceRange: "₹120 – ₹220",
    timing: "12:00 PM – 09:30 PM",
    status: "🟢 Fresh Handi Ready",
    isVeg: false,
    popularItems: ["Dum Biryani (₹180)", "Paneer Pulao Meal (₹140)", "Raita & Salan Combo"]
  },
  {
    id: "food-04",
    name: "Pre-Canteen Chaat & Samosa Hub",
    locationZone: "Pre-Canteen Hall (Stall A)",
    category: "pre-canteen",
    priceRange: "₹30 – ₹70",
    timing: "11:00 AM – 08:30 PM",
    status: "🟢 Hot & Crispy",
    isVeg: true,
    popularItems: ["Dahi Papdi Chaat (₹50)", "Aloo Samosa (₹30 for 2)", "Pani Puri Shot Box (₹60)"]
  },
  {
    id: "food-05",
    name: "Artisan Coffee & Waffle Co.",
    locationZone: "Pre-Canteen Hall (Stall B)",
    category: "pre-canteen",
    priceRange: "₹60 – ₹150",
    timing: "10:00 AM – 10:00 PM",
    status: "🟢 Open (Quick Bar)",
    isVeg: true,
    popularItems: ["Belgian Choco Waffle (₹120)", "Iced Caramel Macchiato (₹80)", "Cold Frappe (₹90)"]
  },
  {
    id: "food-06",
    name: "Triangle Garden Iced Drinks & Lemonade",
    locationZone: "Triangle Garden (Pergola Kiosk)",
    category: "garden-kiosk",
    priceRange: "₹30 – ₹80",
    timing: "09:30 AM – 07:30 PM",
    status: "🟢 Chilled & Refreshing",
    isVeg: true,
    popularItems: ["Fresh Mint Mojito (₹50)", "Masala Shikanji (₹35)", "Mango Boba Cooler (₹80)"]
  }
];

// ============================================================================
// 4. LOST AND FOUND HELP DATABASE
// ============================================================================

const INITIAL_LOST_FOUND = [
  {
    id: "laf-01",
    type: "found",
    category: "Electronics & Gadgets",
    itemName: "Boat Airdopes 141 Case (Black)",
    location: "Main Auditorium, Row F Seat 12",
    description: "Matte black charging case with small Naruto sticker on lid.",
    reporterName: "Student Volunteer - Rohit",
    contact: "Pre-Auditorium Desk #1",
    dropStatus: "Deposited at Pre-Auditorium Desk #1",
    reportedAt: "Today, 11:15 AM"
  },
  {
    id: "laf-02",
    type: "lost",
    category: "ID Card & Wallet",
    itemName: "College ID Card (Roll: 2023CSB1042)",
    location: "Pre-Canteen Hall near Chaat Stall",
    description: "ID card in transparent blue lanyard. Belongs to Devansh Mehra.",
    reporterName: "Devansh Mehra",
    contact: "+91 98765 43231",
    dropStatus: "Lost (Awaiting recovery)",
    reportedAt: "Today, 01:20 PM"
  },
  {
    id: "laf-03",
    type: "found",
    category: "Water Bottles & Apparel",
    itemName: "Milton Olive Green Thermosteel 750ml",
    location: "3rd Floor • Room 302 Desk 4",
    description: "Olive green metallic water bottle found after HackSphere check-in.",
    reporterName: "Room Proctor - Amit",
    contact: "Pre-Auditorium Desk #1",
    dropStatus: "Deposited at Pre-Auditorium Desk #1",
    reportedAt: "Today, 02:45 PM"
  },
  {
    id: "laf-04",
    type: "found",
    category: "Keys & Accessories",
    itemName: "Honda Bike Key with Red Silicone Tag",
    location: "Triangle Garden stone bench near big tree",
    description: "Single key with black rubber cover and red tag.",
    reporterName: "Garden Maintenance Staff",
    contact: "Desk #1",
    dropStatus: "Deposited at Pre-Auditorium Desk #1",
    reportedAt: "Yesterday, 05:40 PM"
  },
  {
    id: "laf-05",
    type: "lost",
    category: "Bags & Notebooks",
    itemName: "Grey Wildcraft Lab Folder with Notes",
    location: "5th Floor • Room 501",
    description: "Contains handwritten Computer Networks notes and college assignment sheets.",
    reporterName: "Sneha Roy",
    contact: "+91 98765 43239",
    dropStatus: "Lost (Awaiting recovery)",
    reportedAt: "Today, 10:30 AM"
  },
  {
    id: "laf-06",
    type: "found",
    category: "Electronics & Gadgets",
    itemName: "Scientific Calculator Casio fx-991CW",
    location: "4th Floor • Room 402",
    description: "White body with initials 'K.S.' written in silver permanent marker.",
    reporterName: "Student Council Member",
    contact: "Desk #1",
    dropStatus: "Deposited at Pre-Auditorium Desk #1",
    reportedAt: "Today, 03:00 PM"
  }
];

// ============================================================================
// 5. LOCAL STATE & STORAGE (100% PURE FRONTEND)
// ============================================================================

let currentFloor = "ground"; // "ground", "1", "2", "3", "4", "5", "-1", "-2"
let currentEvents = [];
let userPasses = [];
let lostAndFoundList = [];

let activeFestFilter = "tech";
let activeEventCategory = "all";
let activeFoodCategory = "all";
let activeLafTab = "all";
let activeSearchQuery = "";

function initState() {
  // Load Events from LocalStorage or seed defaults
  const savedEvents = localStorage.getItem("festpulse_college_events");
  if (savedEvents) {
    try {
      currentEvents = JSON.parse(savedEvents);
    } catch (e) {
      currentEvents = [...INITIAL_EVENTS];
    }
  } else {
    currentEvents = [...INITIAL_EVENTS];
  }

  // Load User passes
  const savedPasses = localStorage.getItem("festpulse_college_passes");
  if (savedPasses) {
    try {
      userPasses = JSON.parse(savedPasses);
    } catch (e) {
      userPasses = [];
    }
  } else {
    userPasses = [];
  }

  // Load Lost & Found
  const savedLaf = localStorage.getItem("festpulse_college_laf");
  if (savedLaf) {
    try {
      lostAndFoundList = JSON.parse(savedLaf);
    } catch (e) {
      lostAndFoundList = [...INITIAL_LOST_FOUND];
    }
  } else {
    lostAndFoundList = [...INITIAL_LOST_FOUND];
  }

  updatePassCountBadge();
}

function persistEvents() {
  localStorage.setItem("festpulse_college_events", JSON.stringify(currentEvents));
}

function persistPasses() {
  localStorage.setItem("festpulse_college_passes", JSON.stringify(userPasses));
  updatePassCountBadge();
}

function persistLaf() {
  localStorage.setItem("festpulse_college_laf", JSON.stringify(lostAndFoundList));
}

function updatePassCountBadge() {
  const badge = document.getElementById("passCountBadge");
  if (badge) {
    badge.textContent = userPasses.length;
  }
}

// ============================================================================
// 6. DYNAMIC SVG FLOOR PLAN RENDERER (ACCORDING TO COLLEGE LAYOUT)
// ============================================================================

function renderFloorPlan(floorKey) {
  const svg = document.getElementById("campusSvg");
  if (!svg) return;

  const badge = document.getElementById("currentFloorBadge");
  const meta = document.getElementById("currentFloorMeta");

  // Update Floor Headers
  if (floorKey === "ground") {
    badge.textContent = "GROUND FLOOR";
    meta.textContent = "Auditorium • Pre-Auditorium • Triangle Garden • Canteen • Pre-Canteen Hall";
  } else if (floorKey === "-1") {
    badge.textContent = "LEVEL -1 (LOWER HALL)";
    meta.textContent = "Hall Above Basement • Esports Arena • Technical Expo";
  } else if (floorKey === "-2") {
    badge.textContent = "BASEMENT -2";
    meta.textContent = "Underground RoboWars Arena & Hardware Demos";
  } else {
    badge.textContent = `FLOOR ${floorKey} (ACADEMIC)`;
    meta.textContent = `Rooms ${floorKey}01, ${floorKey}02, ${floorKey}03, ${floorKey}04, ${floorKey}05 • Elevators & Stairwells`;
  }

  // 1. GROUND FLOOR BLUEPRINT
  if (floorKey === "ground") {
    svg.innerHTML = `
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0a101f"/>
          <stop offset="100%" stop-color="#070c18"/>
        </linearGradient>
        <linearGradient id="audGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e1b4b"/>
          <stop offset="100%" stop-color="#312e81"/>
        </linearGradient>
        <linearGradient id="gardenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#064e3b"/>
          <stop offset="100%" stop-color="#022c22"/>
        </linearGradient>
        <linearGradient id="canteenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#451a03"/>
          <stop offset="100%" stop-color="#7c2d12"/>
        </linearGradient>
      </defs>

      <!-- Floor Background -->
      <rect width="1000" height="600" fill="url(#bgGrad)" rx="14"/>

      <!-- Wide Main Connecting Corridors -->
      <path d="M 50 300 L 950 300" stroke="#1e293b" stroke-width="46" stroke-linecap="round"/>
      <path d="M 450 100 L 450 500" stroke="#1e293b" stroke-width="36" stroke-linecap="round"/>

      <!-- Corridor Labels -->
      <text x="500" y="306" fill="#64748b" font-size="12" font-weight="700" letter-spacing="2" text-anchor="middle">CENTRAL GROUND CORRIDOR</text>

      <!-- 1. AUDITORIUM (West Wing) -->
      <g class="campus-zone-group" id="zone-auditorium" onclick="selectArea('auditorium')">
        <rect x="50" y="80" width="260" height="200" rx="12" fill="url(#audGrad)" stroke="#6366f1" stroke-width="2.5" class="zone-rect"/>
        <rect x="65" y="95" width="230" height="30" rx="6" fill="#4338ca"/>
        <text x="180" y="115" fill="#ffffff" font-size="14" font-weight="800" text-anchor="middle">MAIN AUDITORIUM</text>
        <text x="180" y="150" fill="#cbd5e1" font-size="11" text-anchor="middle">🎭 Star Events & Concerts</text>
        <text x="180" y="175" fill="#a5b4fc" font-size="12" font-weight="700" text-anchor="middle">Capacity: 850 Seats</text>
        <rect x="135" y="240" width="90" height="26" rx="4" fill="#312e81" stroke="#818cf8" stroke-width="1"/>
        <text x="180" y="257" fill="#e0e7ff" font-size="11" font-weight="600" text-anchor="middle">Stage View</text>
      </g>

      <!-- 2. PRE-AUDITORIUM (Large Foyer between entrance and Auditorium) -->
      <g class="campus-zone-group" id="zone-pre-auditorium" onclick="selectArea('pre-auditorium')">
        <rect x="50" y="340" width="260" height="190" rx="12" fill="#131e3a" stroke="#38bdf8" stroke-width="2" class="zone-rect"/>
        <rect x="65" y="355" width="230" height="28" rx="6" fill="#0369a1"/>
        <text x="180" y="374" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle">PRE-AUDITORIUM FOYER</text>
        <text x="180" y="415" fill="#94a3b8" font-size="11" text-anchor="middle">🏛️ Registration & Reception Area</text>
        <text x="180" y="440" fill="#38bdf8" font-size="11" font-weight="700" text-anchor="middle">🔍 Lost & Found Desk #1</text>
        <text x="180" y="470" fill="#94a3b8" font-size="10.5" text-anchor="middle">Direct Entrance to Auditorium</text>
        <rect x="100" y="495" width="160" height="22" rx="4" fill="#0c4a6e"/>
        <text x="180" y="510" fill="#bae6fd" font-size="10" font-weight="600" text-anchor="middle">College Main Porch Access</text>
      </g>

      <!-- 3. TRIANGLE GARDEN (Enclosed Central Outdoor Lawn) -->
      <g class="campus-zone-group" id="zone-triangle-garden" onclick="selectArea('triangle-garden')">
        <!-- SVG Polygon for Triangular Garden -->
        <polygon points="350,100 620,100 485,270" fill="url(#gardenGrad)" stroke="#10b981" stroke-width="3" class="zone-rect"/>
        <circle cx="485" cy="165" r="32" fill="#064e3b" stroke="#34d399" stroke-width="1.5"/>
        <text x="485" y="160" fill="#ffffff" font-size="12" font-weight="800" text-anchor="middle">TRIANGLE</text>
        <text x="485" y="176" fill="#a7f3d0" font-size="12" font-weight="800" text-anchor="middle">GARDEN</text>
        <text x="485" y="125" fill="#6ee7b7" font-size="10.5" font-weight="600" text-anchor="middle">🌿 Outdoor Lawn & Acoustic Stage</text>
        <text x="485" y="235" fill="#cbd5e1" font-size="10.5" text-anchor="middle">Nukkad Natak Street Plays</text>
      </g>

      <!-- 4. PRE-CANTEEN HALL (Hall before Canteen) -->
      <g class="campus-zone-group" id="zone-pre-canteen" onclick="selectArea('pre-canteen')">
        <rect x="670" y="90" width="280" height="190" rx="12" fill="#241b12" stroke="#f59e0b" stroke-width="2" class="zone-rect"/>
        <rect x="685" y="105" width="250" height="28" rx="6" fill="#78350f"/>
        <text x="810" y="124" fill="#fef3c7" font-size="13" font-weight="800" text-anchor="middle">PRE-CANTEEN HALL</text>
        <text x="810" y="165" fill="#fcd34d" font-size="11" font-weight="600" text-anchor="middle">Indoor Hall before Canteen</text>
        <text x="810" y="195" fill="#cbd5e1" font-size="10.5" text-anchor="middle">🎨 Art Gallery & Photography Display</text>
        <text x="810" y="225" fill="#fdba74" font-size="10.5" text-anchor="middle">🍟 Chaat & Quick Snack Stalls</text>
      </g>

      <!-- 5. CANTEEN (Main Dining Hall) -->
      <g class="campus-zone-group" id="zone-canteen" onclick="selectArea('canteen')">
        <rect x="670" y="340" width="280" height="200" rx="12" fill="url(#canteenGrad)" stroke="#f97316" stroke-width="2.5" class="zone-rect"/>
        <rect x="685" y="355" width="250" height="30" rx="6" fill="#9a3412"/>
        <text x="810" y="376" fill="#ffffff" font-size="14" font-weight="800" text-anchor="middle">MAIN COLLEGE CANTEEN</text>
        <text x="810" y="420" fill="#fdba74" font-size="11.5" font-weight="700" text-anchor="middle">🍔 Food Stalls (Counters 1 to 6)</text>
        <text x="810" y="445" fill="#cbd5e1" font-size="11" text-anchor="middle">Seating for 350 Students</text>
        <text x="810" y="475" fill="#fed7aa" font-size="10" text-anchor="middle">South Indian • Meals • Rolls • Drinks</text>
      </g>

      <!-- MEDICAL ROOM (Near Triangle Garden & Corridor) -->
      <g class="campus-zone-group" id="zone-med-ground" onclick="selectArea('med-ground')">
        <rect x="350" y="340" width="140" height="90" rx="8" fill="#2d1215" stroke="#ef4444" stroke-width="2" class="zone-rect"/>
        <text x="420" y="375" fill="#fca5a5" font-size="12" font-weight="700" text-anchor="middle">🏥 MEDICAL ROOM</text>
        <text x="420" y="395" fill="#f87171" font-size="10" text-anchor="middle">Room G-02 (24x7 Doctor)</text>
      </g>

      <!-- ELEVATORS & STAIRS -->
      <g>
        <rect x="510" y="340" width="130" height="90" rx="8" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
        <text x="575" y="375" fill="#e2e8f0" font-size="11.5" font-weight="700" text-anchor="middle">🛗 ELEVATORS (1 & 2)</text>
        <text x="575" y="395" fill="#94a3b8" font-size="10" text-anchor="middle">To Floors 1-5 & Basements</text>
        <text x="575" y="415" fill="#38bdf8" font-size="9" text-anchor="middle">🪜 Stairs A & B Adjacent</text>
      </g>
    `;
    return;
  }

  // 2. LEVEL -1 (HALL ABOVE BASEMENT)
  if (floorKey === "-1") {
    svg.innerHTML = `
      <defs>
        <linearGradient id="b1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#18181b"/>
          <stop offset="100%" stop-color="#27272a"/>
        </linearGradient>
      </defs>
      <rect width="1000" height="600" fill="#0b0f19" rx="14"/>

      <!-- Hall Above Basement -->
      <g class="campus-zone-group" id="zone-hall-b1" onclick="selectArea('hall-b1')">
        <rect x="100" y="80" width="800" height="420" rx="16" fill="url(#b1Grad)" stroke="#a855f7" stroke-width="3" class="zone-rect"/>
        <rect x="120" y="100" width="760" height="40" rx="8" fill="#581c87"/>
        <text x="500" y="127" fill="#ffffff" font-size="16" font-weight="800" text-anchor="middle">LEVEL -1 MULTI-PURPOSE EVENT HALL (ABOVE BASEMENT)</text>
        
        <circle cx="500" cy="300" r="100" fill="#3b0764" opacity="0.4" stroke="#c084fc" stroke-dasharray="6,6"/>
        <text x="500" y="275" fill="#f3e8ff" font-size="18" font-weight="800" text-anchor="middle">🎮 CAMPUS ESPORTS LAN ARENA</text>
        <text x="500" y="305" fill="#d8b4fe" font-size="13" text-anchor="middle">Valorant 5v5 & FC26 Championship</text>
        <text x="500" y="335" fill="#e9d5ff" font-size="12" text-anchor="middle">Capacity: 400 Standing & Gaming Workstations</text>

        <rect x="140" y="400" width="220" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.5"/>
        <text x="250" y="435" fill="#c7d2fe" font-size="12" font-weight="700" text-anchor="middle">Stage & Commentary Desk</text>
        <text x="250" y="455" fill="#94a3b8" font-size="10" text-anchor="middle">Live Broadcast Rig</text>

        <rect x="640" y="400" width="220" height="70" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
        <text x="750" y="435" fill="#a7f3d0" font-size="12" font-weight="700" text-anchor="middle">Spectator Seating Arena</text>
        <text x="750" y="455" fill="#94a3b8" font-size="10" text-anchor="middle">Big Screen Projection</text>
      </g>

      <rect x="420" y="520" width="160" height="45" rx="6" fill="#1e293b" stroke="#64748b"/>
      <text x="500" y="547" fill="#e2e8f0" font-size="11" font-weight="600" text-anchor="middle">🛗 Central Elevator Access</text>
    `;
    return;
  }

  // 3. BASEMENT -2 (UNDERGROUND ROBOWARS ARENA)
  if (floorKey === "-2") {
    svg.innerHTML = `
      <defs>
        <linearGradient id="b2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1c1917"/>
          <stop offset="100%" stop-color="#0c0a09"/>
        </linearGradient>
      </defs>
      <rect width="1000" height="600" fill="#0a0a0a" rx="14"/>

      <!-- Basement -2 Arena -->
      <g class="campus-zone-group" id="zone-basement-b2" onclick="selectArea('basement-b2')">
        <rect x="80" y="60" width="840" height="460" rx="16" fill="url(#b2Grad)" stroke="#ef4444" stroke-width="3" class="zone-rect"/>
        <rect x="100" y="80" width="800" height="40" rx="8" fill="#7f1d1d"/>
        <text x="500" y="107" fill="#ffffff" font-size="16" font-weight="800" text-anchor="middle">BASEMENT -2 UNDERGROUND ARENA</text>
        
        <!-- Reinforced Combat Box -->
        <rect x="250" y="180" width="500" height="240" rx="10" fill="#18181b" stroke="#f59e0b" stroke-width="3" stroke-dasharray="10,5"/>
        <text x="500" y="275" fill="#fef08a" font-size="20" font-weight="800" text-anchor="middle">🤖 ROBOWARS COMBAT PIT</text>
        <text x="500" y="305" fill="#fed7aa" font-size="13" text-anchor="middle">Heavyweight Battle Arena (Reinforced Polycarbonate)</text>
        <text x="500" y="335" fill="#f87171" font-size="12" font-weight="700" text-anchor="middle">Capacity: 300 Spectators with Safety Railings</text>

        <!-- Pits / Team prep zones -->
        <rect x="100" y="180" width="120" height="240" rx="8" fill="#27272a" stroke="#71717a"/>
        <text x="160" y="295" fill="#d4d4d8" font-size="12" font-weight="700" text-anchor="middle">Pits Team A</text>
        <text x="160" y="315" fill="#a1a1aa" font-size="10" text-anchor="middle">Soldering & Tools</text>

        <rect x="780" y="180" width="120" height="240" rx="8" fill="#27272a" stroke="#71717a"/>
        <text x="840" y="295" fill="#d4d4d8" font-size="12" font-weight="700" text-anchor="middle">Pits Team B</text>
        <text x="840" y="315" fill="#a1a1aa" font-size="10" text-anchor="middle">Battery Charging</text>
      </g>

      <rect x="420" y="535" width="160" height="40" rx="6" fill="#1e293b" stroke="#64748b"/>
      <text x="500" y="560" fill="#cbd5e1" font-size="11" font-weight="600" text-anchor="middle">🪜 Staircase A & Freight Lift</text>
    `;
    return;
  }

  // 4. FLOORS 1 TO 5 (5 CLASSROOMS ON EACH FLOOR)
  const floorNum = parseInt(floorKey, 10);
  const rooms = [floorNum * 100 + 1, floorNum * 100 + 2, floorNum * 100 + 3, floorNum * 100 + 4, floorNum * 100 + 5];

  svg.innerHTML = `
    <defs>
      <linearGradient id="roomGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
    </defs>
    <rect width="1000" height="600" fill="#080e1a" rx="14"/>

    <!-- Academic Floor Hallway -->
    <rect x="50" y="260" width="900" height="90" fill="#162035" stroke="#334155" rx="8"/>
    <text x="500" y="312" fill="#64748b" font-size="13" font-weight="800" letter-spacing="3" text-anchor="middle">FLOOR ${floorNum} MAIN CENTRAL CORRIDOR</text>

    <!-- Stairs & Elevators -->
    <rect x="50" y="260" width="60" height="90" fill="#1e1b4b" stroke="#6366f1"/>
    <text x="80" y="310" fill="#a5b4fc" font-size="10" font-weight="700" text-anchor="middle">🪜 Stairs W</text>

    <rect x="890" y="260" width="60" height="90" fill="#1e1b4b" stroke="#6366f1"/>
    <text x="920" y="310" fill="#a5b4fc" font-size="10" font-weight="700" text-anchor="middle">🪜 Stairs E</text>

    <rect x="430" y="270" width="140" height="70" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="500" y="305" fill="#38bdf8" font-size="11" font-weight="700" text-anchor="middle">🛗 ELEVATORS</text>
    <text x="500" y="325" fill="#94a3b8" font-size="9.5" text-anchor="middle">Central Shaft</text>

    <!-- 5 CLASSROOMS -->
    <!-- Room 1 (Top Left) -->
    <g class="campus-zone-group" id="zone-room-${rooms[0]}" onclick="selectClassroom(${rooms[0]}, ${floorNum})">
      <rect x="130" y="70" width="220" height="160" rx="10" fill="url(#roomGrad)" stroke="#38bdf8" stroke-width="2" class="zone-rect"/>
      <rect x="145" y="85" width="190" height="26" rx="4" fill="#0284c7"/>
      <text x="240" y="103" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle">CLASSROOM ${rooms[0]}</text>
      <text x="240" y="145" fill="#cbd5e1" font-size="11" text-anchor="middle">Capacity: 60 Seats</text>
      <text x="240" y="170" fill="#38bdf8" font-size="10.5" font-weight="600" text-anchor="middle">Smart Board & AC</text>
      <rect x="175" y="195" width="130" height="22" rx="4" fill="#0c4a6e"/>
      <text x="240" y="210" fill="#bae6fd" font-size="10" font-weight="600" text-anchor="middle">Tap to View Event</text>
    </g>

    <!-- Room 2 (Top Right) -->
    <g class="campus-zone-group" id="zone-room-${rooms[1]}" onclick="selectClassroom(${rooms[1]}, ${floorNum})">
      <rect x="650" y="70" width="220" height="160" rx="10" fill="url(#roomGrad)" stroke="#38bdf8" stroke-width="2" class="zone-rect"/>
      <rect x="665" y="85" width="190" height="26" rx="4" fill="#0284c7"/>
      <text x="760" y="103" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle">CLASSROOM ${rooms[1]}</text>
      <text x="760" y="145" fill="#cbd5e1" font-size="11" text-anchor="middle">Capacity: 60 Seats</text>
      <text x="760" y="170" fill="#38bdf8" font-size="10.5" font-weight="600" text-anchor="middle">Event / Lab Room</text>
      <rect x="695" y="195" width="130" height="22" rx="4" fill="#0c4a6e"/>
      <text x="760" y="210" fill="#bae6fd" font-size="10" font-weight="600" text-anchor="middle">Tap to View Event</text>
    </g>

    <!-- Room 3 (Bottom Left) -->
    <g class="campus-zone-group" id="zone-room-${rooms[2]}" onclick="selectClassroom(${rooms[2]}, ${floorNum})">
      <rect x="100" y="380" width="220" height="160" rx="10" fill="url(#roomGrad)" stroke="#818cf8" stroke-width="2" class="zone-rect"/>
      <rect x="115" y="395" width="190" height="26" rx="4" fill="#4338ca"/>
      <text x="210" y="413" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle">CLASSROOM ${rooms[2]}</text>
      <text x="210" y="455" fill="#cbd5e1" font-size="11" text-anchor="middle">Capacity: 65 Workstations</text>
      <text x="210" y="480" fill="#c7d2fe" font-size="10.5" font-weight="600" text-anchor="middle">Projector Ready</text>
      <rect x="145" y="505" width="130" height="22" rx="4" fill="#312e81"/>
      <text x="210" y="520" fill="#e0e7ff" font-size="10" font-weight="600" text-anchor="middle">Tap to View Event</text>
    </g>

    <!-- Room 4 (Bottom Center) -->
    <g class="campus-zone-group" id="zone-room-${rooms[3]}" onclick="selectClassroom(${rooms[3]}, ${floorNum})">
      <rect x="390" y="380" width="220" height="160" rx="10" fill="url(#roomGrad)" stroke="#818cf8" stroke-width="2" class="zone-rect"/>
      <rect x="405" y="395" width="190" height="26" rx="4" fill="#4338ca"/>
      <text x="500" y="413" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle">CLASSROOM ${rooms[3]}</text>
      <text x="500" y="455" fill="#cbd5e1" font-size="11" text-anchor="middle">Capacity: 55 Seats</text>
      <text x="500" y="480" fill="#c7d2fe" font-size="10.5" font-weight="600" text-anchor="middle">Coding & Competition</text>
      <rect x="435" y="505" width="130" height="22" rx="4" fill="#312e81"/>
      <text x="500" y="520" fill="#e0e7ff" font-size="10" font-weight="600" text-anchor="middle">Tap to View Event</text>
    </g>

    <!-- Room 5 (Bottom Right) -->
    <g class="campus-zone-group" id="zone-room-${rooms[4]}" onclick="selectClassroom(${rooms[4]}, ${floorNum})">
      <rect x="680" y="380" width="220" height="160" rx="10" fill="url(#roomGrad)" stroke="#818cf8" stroke-width="2" class="zone-rect"/>
      <rect x="695" y="395" width="190" height="26" rx="4" fill="#4338ca"/>
      <text x="790" y="413" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle">CLASSROOM ${rooms[4]}</text>
      <text x="790" y="455" fill="#cbd5e1" font-size="11" text-anchor="middle">Capacity: 60 Seats</text>
      <text x="790" y="480" fill="#c7d2fe" font-size="10.5" font-weight="600" text-anchor="middle">Workshop / Seminar</text>
      <rect x="725" y="505" width="130" height="22" rx="4" fill="#312e81"/>
      <text x="790" y="520" fill="#e0e7ff" font-size="10" font-weight="600" text-anchor="middle">Tap to View Event</text>
    </g>
  `;
}

// ============================================================================
// 7. FLOOR NAVIGATION & AREA SELECTION HANDLERS
// ============================================================================

function switchFloor(floorKey) {
  currentFloor = floorKey;

  // Update Floor buttons UI
  document.querySelectorAll(".floor-level-picker .floor-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.floor === floorKey);
  });

  renderFloorPlan(floorKey);
}

function selectArea(areaId) {
  // Find area metadata across ground, -1, -2
  let targetArea = null;
  let floorKey = "ground";

  if (CAMPUS_DATA["ground"].areas[areaId]) {
    targetArea = CAMPUS_DATA["ground"].areas[areaId];
    floorKey = "ground";
  } else if (CAMPUS_DATA["-1"].areas[areaId]) {
    targetArea = CAMPUS_DATA["-1"].areas[areaId];
    floorKey = "-1";
  } else if (CAMPUS_DATA["-2"].areas[areaId]) {
    targetArea = CAMPUS_DATA["-2"].areas[areaId];
    floorKey = "-2";
  }

  if (currentFloor !== floorKey) {
    switchFloor(floorKey);
  }

  // Scroll smoothly to blueprint
  document.getElementById("floor-navigator")?.scrollIntoView({ behavior: "smooth" });

  // Highlight SVG element
  setTimeout(() => {
    document.querySelectorAll(".campus-zone-group").forEach(el => {
      el.classList.toggle("active-zone", el.id === `zone-${areaId}`);
    });
  }, 50);

  if (!targetArea) return;

  // Populate Details Sidebar
  document.getElementById("sidebarEmptyState").style.display = "none";
  document.getElementById("activeLocationCard").style.display = "flex";

  document.getElementById("locTitle").textContent = targetArea.name;
  document.getElementById("locLandmark").textContent = `📍 ${targetArea.landmark}`;
  document.getElementById("locCapacity").textContent = targetArea.capacity;
  document.getElementById("locStatus").textContent = targetArea.status;
  document.getElementById("locDirections").textContent = targetArea.directions;

  // Find linked events
  const matchingEvents = currentEvents.filter(e => e.areaId === areaId);
  const eventsContent = document.getElementById("locEventsContent");

  if (matchingEvents.length > 0) {
    eventsContent.innerHTML = matchingEvents.map(e => `
      <div class="venue-event-mini-card">
        <div class="venue-event-mini-title">${e.title}</div>
        <div class="venue-event-mini-time">⏰ ${e.date} • ${e.time}</div>
      </div>
    `).join("");

    const regBtn = document.getElementById("locPrimaryBtn");
    regBtn.style.display = "block";
    regBtn.textContent = `🎟️ Register for ${matchingEvents[0].title.slice(0, 22)}...`;
    regBtn.onclick = () => openRegistrationModal(matchingEvents[0].id);
  } else {
    eventsContent.innerHTML = `
      <div style="font-size: 0.84rem; color: #94a3b8; font-style: italic;">
        ${targetArea.events ? targetArea.events.join(" • ") : "Open space for student gathering, dining, and assistance."}
      </div>
    `;
    document.getElementById("locPrimaryBtn").style.display = "none";
  }
}

function selectClassroom(roomNum, floorNum) {
  // If not on this floor, switch
  if (currentFloor !== String(floorNum)) {
    switchFloor(String(floorNum));
  }

  setTimeout(() => {
    document.querySelectorAll(".campus-zone-group").forEach(el => {
      el.classList.toggle("active-zone", el.id === `zone-room-${roomNum}`);
    });
  }, 50);

  document.getElementById("sidebarEmptyState").style.display = "none";
  document.getElementById("activeLocationCard").style.display = "flex";

  document.getElementById("locTitle").textContent = `Classroom ${roomNum}`;
  document.getElementById("locLandmark").textContent = `📍 ${floorNum}th Floor Academic Corridor`;
  document.getElementById("locCapacity").textContent = "55 – 65 Student Desks";
  document.getElementById("locStatus").textContent = "Smart Classroom • Air Conditioned";
  document.getElementById("locDirections").textContent = `Take the Central Elevators or Stairs to Floor ${floorNum}. Room ${roomNum} is located directly along the main hallway.`;

  // Search if an event is in this room
  const roomEvent = currentEvents.find(e => e.venue.includes(String(roomNum)));
  const eventsContent = document.getElementById("locEventsContent");

  if (roomEvent) {
    eventsContent.innerHTML = `
      <div class="venue-event-mini-card">
        <div class="venue-event-mini-title">${roomEvent.title}</div>
        <div class="venue-event-mini-time">⏰ ${roomEvent.date} • ${roomEvent.time}</div>
      </div>
    `;
    const regBtn = document.getElementById("locPrimaryBtn");
    regBtn.style.display = "block";
    regBtn.textContent = `🎟️ Book Seat in Room ${roomNum}`;
    regBtn.onclick = () => openRegistrationModal(roomEvent.id);
  } else {
    eventsContent.innerHTML = `
      <div style="font-size: 0.84rem; color: #94a3b8;">
        Classroom open for student presentations, hackathon teams, and study sessions.
      </div>
    `;
    document.getElementById("locPrimaryBtn").style.display = "none";
  }
}

// ============================================================================
// 8. EVENTS RENDERING WITH LIVE CAPACITY AND PASS GENERATION
// ============================================================================

function renderEvents() {
  const container = document.getElementById("eventsGridContainer");
  if (!container) return;

  const filtered = currentEvents.filter(evt => {
    // Fest filter
    const matchesFest = (activeFestFilter === "all") || (evt.fest === activeFestFilter);
    // Category filter
    const matchesCat = (activeEventCategory === "all") || 
      (evt.category === activeEventCategory) || 
      (evt.subCat === activeEventCategory);
    // Search query
    const q = activeSearchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      evt.title.toLowerCase().includes(q) || 
      evt.venue.toLowerCase().includes(q) || 
      evt.description.toLowerCase().includes(q);

    return matchesFest && matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 48px 20px; background: #131b2e; border-radius: 16px; border: 1px dashed rgba(255,255,255,0.1);">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">🔍</div>
        <h3 style="color: #fff; margin-bottom: 6px;">No events matched your search</h3>
        <p style="color: #94a3b8; font-size: 0.88rem;">Try clearing your room keywords or category filter.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(evt => {
    const isRegistered = userPasses.some(p => p.eventId === evt.id);
    const capacityRatio = evt.registeredCount / evt.capacity;
    const capacityPercent = Math.min(100, Math.round(capacityRatio * 100));
    const seatsRemaining = Math.max(0, evt.capacity - evt.registeredCount);
    const isFull = evt.registeredCount >= evt.capacity;

    let progressClass = "";
    let countClass = "";
    let capStatusMsg = `${seatsRemaining} seats left`;

    if (isFull) {
      progressClass = "full";
      countClass = "full";
      capStatusMsg = "SOLD OUT / FULL";
    } else if (capacityRatio >= 0.8) {
      progressClass = "warning";
      countClass = "warning";
      capStatusMsg = `⚡ Fast filling (${seatsRemaining} left)`;
    }

    return `
      <div class="event-card" id="card-${evt.id}">
        <div>
          <div class="event-header">
            <span class="event-category-tag">${evt.subCat || evt.category}</span>
            <span class="event-fest-badge">${evt.festName}</span>
          </div>

          <h3 class="event-title">${evt.title}</h3>

          <ul class="event-meta-list">
            <li class="event-meta-item">
              <span class="event-meta-icon">📅</span>
              <span>${evt.date}</span>
            </li>
            <li class="event-meta-item">
              <span class="event-meta-icon">⏰</span>
              <span>${evt.time}</span>
            </li>
            <li class="event-meta-item">
              <span class="event-meta-icon">📍</span>
              <span>
                <strong>${evt.venue}</strong>
                <button class="locate-link-inline" onclick="jumpToLocation('${evt.floor}', '${evt.areaId || ''}')" title="Locate on Blueprint">🗺️ Show on Map</button>
              </span>
            </li>
          </ul>

          <div class="capacity-container">
            <div class="capacity-stats">
              <span class="capacity-label">Room / Hall Occupancy:</span>
              <span class="capacity-count ${countClass}">
                ${evt.registeredCount} / ${evt.capacity} (${capacityPercent}%)
              </span>
            </div>
            <div class="progress-track" title="${capacityPercent}% occupied">
              <div class="progress-fill ${progressClass}" style="width: ${capacityPercent}%;"></div>
            </div>
            <div style="font-size: 0.72rem; color: #94a3b8; margin-top: 5px; display: flex; justify-content: space-between;">
              <span>${capStatusMsg}</span>
              <span>Max: ${evt.capacity}</span>
            </div>
          </div>
        </div>

        <div class="card-footer">
          ${isRegistered ? `
            <button class="secondary-btn w-100" onclick="viewMyTicket('${evt.id}')" style="border-color: #10b981; color: #34d399;">
              ✓ Entry Pass Active (View Pass)
            </button>
          ` : isFull ? `
            <button class="primary-action-btn w-100 btn-disabled" disabled>
              🚫 Hall Full (Capacity Reached)
            </button>
          ` : `
            <button class="primary-action-btn w-100" onclick="openRegistrationModal('${evt.id}')">
              🎟️ Register Now (Instant Pass)
            </button>
          `}
        </div>
      </div>
    `;
  }).join("");
}

function jumpToLocation(floorKey, areaId) {
  switchFloor(floorKey);
  if (areaId) {
    selectArea(areaId);
  } else {
    document.getElementById("floor-navigator")?.scrollIntoView({ behavior: "smooth" });
  }
}

// ============================================================================
// 9. FOOD STALLS IN CANTEEN & PRE-CANTEEN HALL
// ============================================================================

function renderFoodStalls() {
  const container = document.getElementById("foodStallsContainer");
  if (!container) return;

  const filtered = FOOD_STALLS.filter(s => {
    if (activeFoodCategory === "all") return true;
    if (activeFoodCategory === "veg") return s.isVeg;
    return s.category === activeFoodCategory;
  });

  container.innerHTML = filtered.map(stall => `
    <div class="food-card">
      <div class="food-card-top">
        <div class="food-badges-row">
          <span class="stall-number-tag">📍 ${stall.locationZone}</span>
          <span class="food-veg-pill ${stall.isVeg ? 'veg' : 'nonveg'}">
            ${stall.isVeg ? '🌱 Pure Veg' : '🍗 Non-Veg'}
          </span>
        </div>

        <h3 class="food-title">${stall.name}</h3>

        <div class="food-highlights">
          <strong style="color:#e2e8f0; font-size:0.78rem; display:block; margin-bottom:4px;">Popular Menu Items:</strong>
          ${stall.popularItems.join(" • ")}
        </div>
      </div>

      <div>
        <div class="food-meta-info">
          <span>💰 ${stall.priceRange}</span>
          <span>⏰ ${stall.timing}</span>
        </div>

        <div style="font-size: 0.8rem; color: #34d399; margin-bottom: 12px; font-weight: 600;">
          ${stall.status}
        </div>

        <button class="outline-action-btn w-100" onclick="selectArea('canteen')">
          📍 View Canteen on Ground Floor
        </button>
      </div>
    </div>
  `).join("");
}

// ============================================================================
// 10. LOST AND FOUND HELP
// ============================================================================

function renderLostAndFound() {
  const container = document.getElementById("lafContainer");
  const searchInput = document.getElementById("lafSearchInput");
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

  document.getElementById("lafTotalCount").textContent = lostAndFoundList.length;
  document.getElementById("lafFoundCount").textContent = lostAndFoundList.filter(i => i.type === "found").length;
  document.getElementById("lafLostCount").textContent = lostAndFoundList.filter(i => i.type === "lost").length;

  const filtered = lostAndFoundList.filter(item => {
    const matchesTab = (activeLafTab === "all") || (item.type === activeLafTab);
    const matchesQuery = !query || 
      item.itemName.toLowerCase().includes(query) || 
      item.location.toLowerCase().includes(query) || 
      item.category.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);
    return matchesTab && matchesQuery;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; background: #131b2e; border-radius: 12px;">
        <p style="color: #94a3b8;">No matching records found.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="laf-card">
      <div>
        <div class="laf-card-header">
          <span class="laf-type-tag ${item.type}">
            ${item.type === 'found' ? '🟢 Found Item' : '🔴 Lost Item'}
          </span>
          <span class="laf-time">${item.reportedAt}</span>
        </div>

        <h3 class="laf-title">${item.itemName}</h3>
        <p class="laf-desc">${item.description}</p>

        <ul class="laf-meta-list">
          <li><strong>📍 Location:</strong> ${item.location}</li>
          <li><strong>📁 Category:</strong> ${item.category}</li>
          <li><strong>👤 Reported By:</strong> ${item.reporterName} (${item.contact})</li>
        </ul>
      </div>

      <div>
        <div class="laf-status-deposit">
          🏢 ${item.dropStatus}
        </div>
      </div>
    </div>
  `).join("");
}

// ============================================================================
// 11. REGISTRATION & DIGITAL PASS SYSTEM (LOCALSTORAGE)
// ============================================================================

let activeRegisteringEvent = null;

function openRegistrationModal(eventId) {
  const evt = currentEvents.find(e => e.id === eventId);
  if (!evt) return;

  if (evt.registeredCount >= evt.capacity) {
    showToast("This room or hall is at full capacity.", "error");
    return;
  }

  activeRegisteringEvent = evt;

  document.getElementById("regEventId").value = evt.id;
  document.getElementById("regModalFestName").textContent = `${evt.festName} • ${evt.venue}`;
  document.getElementById("regModalEventTitle").textContent = evt.title;
  document.getElementById("regModalEventMeta").textContent = `📅 ${evt.date} • ⏰ ${evt.time} • 📍 ${evt.venue}`;

  const remaining = evt.capacity - evt.registeredCount;
  const pct = Math.min(100, Math.round((evt.registeredCount / evt.capacity) * 100));

  document.getElementById("regModalCapText").textContent = `${evt.registeredCount} / ${evt.capacity} filled (${pct}%)`;
  document.getElementById("regModalCapFill").style.width = `${pct}%`;
  document.getElementById("regModalCapNote").textContent = remaining < 15 ? `⚡ Hurry! Only ${remaining} seats left in this hall.` : "✅ Seats available";

  const modal = document.getElementById("registrationModal");
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
}

function closeRegistrationModal() {
  const modal = document.getElementById("registrationModal");
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  activeRegisteringEvent = null;
}

document.getElementById("eventRegistrationForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  if (!activeRegisteringEvent) return;

  const eventId = activeRegisteringEvent.id;
  const name = document.getElementById("regStudentName").value.trim();
  const roll = document.getElementById("regStudentId").value.trim();
  const college = document.getElementById("regCollege").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const phone = document.getElementById("regPhone").value.trim();

  // Check duplicate
  const alreadyRegistered = userPasses.some(p => p.eventId === eventId && (p.roll.toLowerCase() === roll.toLowerCase() || p.email.toLowerCase() === email.toLowerCase()));
  if (alreadyRegistered) {
    showToast("You already hold a pass for this room!", "error");
    closeRegistrationModal();
    viewMyTicket(eventId);
    return;
  }

  // Capacity safety check
  if (activeRegisteringEvent.registeredCount >= activeRegisteringEvent.capacity) {
    showToast("Sorry, this venue was just filled to capacity!", "error");
    closeRegistrationModal();
    renderEvents();
    return;
  }

  activeRegisteringEvent.registeredCount += 1;
  persistEvents();

  const ticketId = `FP-${Math.floor(10000 + Math.random() * 90000)}`;
  const newPass = {
    ticketId,
    eventId: activeRegisteringEvent.id,
    eventName: activeRegisteringEvent.title,
    festName: activeRegisteringEvent.festName,
    dateTime: `${activeRegisteringEvent.date} • ${activeRegisteringEvent.time}`,
    venue: activeRegisteringEvent.venue,
    floor: activeRegisteringEvent.floor,
    areaId: activeRegisteringEvent.areaId,
    attendee: name,
    roll: roll,
    college: college,
    email: email,
    phone: phone,
    generatedAt: new Date().toLocaleTimeString()
  };

  userPasses.push(newPass);
  persistPasses();

  closeRegistrationModal();
  renderEvents();

  showToast("🎉 Pass Generated Successfully!", "success");
  displayTicketModal(newPass);
});

function displayTicketModal(pass) {
  document.getElementById("tktPassId").textContent = `#${pass.ticketId}`;
  document.getElementById("tktFest").textContent = pass.festName;
  document.getElementById("tktEventName").textContent = pass.eventName;
  document.getElementById("tktAttendee").textContent = pass.attendee;
  document.getElementById("tktRoll").textContent = pass.roll;
  document.getElementById("tktDateTime").textContent = pass.dateTime;
  document.getElementById("tktVenue").textContent = pass.venue;

  const locateBtn = document.getElementById("locateFromTicketBtn");
  if (locateBtn) {
    locateBtn.onclick = () => {
      closeTicketModal();
      jumpToLocation(pass.floor, pass.areaId);
    };
  }

  const modal = document.getElementById("ticketModal");
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
}

function viewMyTicket(eventId) {
  const pass = userPasses.find(p => p.eventId === eventId);
  if (pass) displayTicketModal(pass);
}

function closeTicketModal() {
  const modal = document.getElementById("ticketModal");
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
}

function openMyPassesDrawer() {
  const container = document.getElementById("myPassesList");
  if (!container) return;

  if (userPasses.length === 0) {
    container.innerHTML = `
      <div class="empty-passes-state">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">🎟️</div>
        <h3>No Registered Passes</h3>
        <p>Browse classroom and auditorium schedules to get instant digital entry passes.</p>
      </div>
    `;
  } else {
    container.innerHTML = userPasses.map(pass => `
      <div class="registered-pass-card">
        <div class="pass-card-info">
          <span style="font-size: 0.72rem; color: #38bdf8; font-weight: 700;">#${pass.ticketId} • ${pass.festName}</span>
          <h4>${pass.eventName}</h4>
          <p>📍 ${pass.venue}</p>
          <p style="font-size: 0.76rem; color: #94a3b8;">📅 ${pass.dateTime}</p>
        </div>
        <div class="pass-card-actions">
          <button class="primary-action-btn" onclick="displayTicketModal(${JSON.stringify(pass).replace(/"/g, '&quot;')})">
            QR Pass
          </button>
          <button class="secondary-btn" onclick="cancelRegistration('${pass.ticketId}')" style="color: #ef4444; border-color: rgba(239, 68, 68, 0.3);">
            Cancel
          </button>
        </div>
      </div>
    `).join("");
  }

  const modal = document.getElementById("myPassesModal");
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
}

function closeMyPassesDrawer() {
  const modal = document.getElementById("myPassesModal");
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
}

function cancelRegistration(ticketId) {
  if (!confirm("Cancel this pass? Your seat will be made available for other students.")) return;

  const idx = userPasses.findIndex(p => p.ticketId === ticketId);
  if (idx !== -1) {
    const pass = userPasses[idx];
    const evt = currentEvents.find(e => e.id === pass.eventId);
    if (evt && evt.registeredCount > 0) {
      evt.registeredCount -= 1;
      persistEvents();
    }
    userPasses.splice(idx, 1);
    persistPasses();
    openMyPassesDrawer();
    renderEvents();
    showToast("Pass cancelled and seat released.", "info");
  }
}

// ============================================================================
// 12. REPORT LOST / FOUND ITEM FORM
// ============================================================================

function openReportModal() {
  const modal = document.getElementById("reportItemModal");
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
}

function closeReportModal() {
  const modal = document.getElementById("reportItemModal");
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
}

document.getElementById("reportItemForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const type = document.getElementById("lafType").value;
  const category = document.getElementById("lafCategory").value;
  const itemName = document.getElementById("lafItemName").value.trim();
  const location = document.getElementById("lafLocation").value.trim();
  const description = document.getElementById("lafDescription").value.trim();
  const reporterName = document.getElementById("lafReporterName").value.trim();
  const contact = document.getElementById("lafContact").value.trim();
  const dropStatus = document.getElementById("lafDropStatus").value;

  const newItem = {
    id: `laf-${Date.now()}`,
    type,
    category,
    itemName,
    location,
    description,
    reporterName,
    contact,
    dropStatus,
    reportedAt: "Just now"
  };

  lostAndFoundList.unshift(newItem);
  persistLaf();

  this.reset();
  closeReportModal();
  renderLostAndFound();
  showToast("✅ Item reported to Pre-Auditorium Helpdesk #1!", "success");
});

// ============================================================================
// 13. TOAST MESSAGES & EVENT LISTENERS
// ============================================================================

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✅' : type === 'error' ? '⚠️' : 'ℹ️'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function setupEventListeners() {
  // Mobile Nav Toggle
  document.getElementById("mobileMenuBtn")?.addEventListener("click", () => {
    document.getElementById("mainNav")?.classList.toggle("show");
  });

  // Floor Picker Buttons
  document.querySelectorAll(".floor-level-picker .floor-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      switchFloor(btn.dataset.floor);
    });
  });

  // Fest Switcher
  document.getElementById("festSelector")?.addEventListener("change", (e) => {
    activeFestFilter = e.target.value;
    renderEvents();
    showToast(`Switched view to: ${e.target.options[e.target.selectedIndex].text}`, "info");
  });

  // Event Categories
  document.querySelectorAll(".events-filter-bar .filter-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".events-filter-bar .filter-pill").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeEventCategory = btn.dataset.category;
      renderEvents();
    });
  });

  // Food Categories
  document.querySelectorAll(".food-filter-pills .filter-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".food-filter-pills .filter-pill").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFoodCategory = btn.dataset.foodCat;
      renderFoodStalls();
    });
  });

  // Lost & Found Tabs
  document.querySelectorAll(".laf-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".laf-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeLafTab = btn.dataset.lafTab;
      renderLostAndFound();
    });
  });

  // Lost & Found Search
  document.getElementById("lafSearchInput")?.addEventListener("input", renderLostAndFound);

  // Global Search Input (Searches rooms, events, halls)
  const globalSearch = document.getElementById("globalSearchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  if (globalSearch) {
    globalSearch.addEventListener("input", (e) => {
      activeSearchQuery = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.style.display = activeSearchQuery.length > 0 ? "flex" : "none";
      }

      // Check if user is searching for a room number specifically (e.g. 302, 501, garden, canteen, basement)
      const q = activeSearchQuery.toLowerCase().trim();
      if (/^[1-5]0[1-5]$/.test(q)) {
        const floor = q[0];
        switchFloor(floor);
        selectClassroom(parseInt(q, 10), parseInt(floor, 10));
      } else if (q.includes("garden") || q.includes("triangle")) {
        switchFloor("ground");
        selectArea("triangle-garden");
      } else if (q.includes("canteen")) {
        switchFloor("ground");
        selectArea("canteen");
      } else if (q.includes("pre-auditorium") || q.includes("pre auditorium")) {
        switchFloor("ground");
        selectArea("pre-auditorium");
      } else if (q.includes("auditorium")) {
        switchFloor("ground");
        selectArea("auditorium");
      } else if (q.includes("-1") || q.includes("lower hall") || q.includes("esport")) {
        switchFloor("-1");
        selectArea("hall-b1");
      } else if (q.includes("-2") || q.includes("basement") || q.includes("robowar")) {
        switchFloor("-2");
        selectArea("basement-b2");
      }

      renderEvents();
    });
  }

  clearSearchBtn?.addEventListener("click", () => {
    if (globalSearch) globalSearch.value = "";
    activeSearchQuery = "";
    clearSearchBtn.style.display = "none";
    renderEvents();
  });

  // Modal Closures
  document.getElementById("closeRegModalBtn")?.addEventListener("click", closeRegistrationModal);
  document.getElementById("closeTicketModalBtn")?.addEventListener("click", closeTicketModal);
  document.getElementById("closeMyPassesBtn")?.addEventListener("click", closeMyPassesDrawer);
  document.getElementById("closeReportModalBtn")?.addEventListener("click", closeReportModal);
  document.getElementById("closeSidebarBtn")?.addEventListener("click", () => {
    document.getElementById("activeLocationCard").style.display = "none";
    document.getElementById("sidebarEmptyState").style.display = "block";
    document.querySelectorAll(".campus-zone-group").forEach(el => el.classList.remove("active-zone"));
  });

  // Open Modals
  document.getElementById("openMyPassesBtn")?.addEventListener("click", openMyPassesDrawer);
  document.getElementById("openReportItemModalBtn")?.addEventListener("click", openReportModal);

  // Click outside to close modals
  document.querySelectorAll(".modal-overlay").forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
      }
    });
  });
}

// ============================================================================
// 14. BOOTSTRAP INITIALIZATION
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  initState();
  setupEventListeners();
  renderFloorPlan("ground");
  renderEvents();
  renderFoodStalls();
  renderLostAndFound();
});
