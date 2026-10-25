// ==========================================================================
// 📍 MASTER REGIONAL STATES DIRECTORY (Extensible State Architecture)
// To add a new state, simply add an entry here with your details!
// ==========================================================================
const STATES_DIRECTORY = [
    {
        id: "rajasthan",
        name: "Rajasthan",
        tagline: "The Sovereign Land of Kings",
        subtitle: "Desert Palaces & Fortresses",
        icon: "👑",
        regionGroup: "heritage",
        capital: "Jaipur",
        bestSeason: "October to March",
        famousFor: "Hill Forts, Desert Safaris & Royal Palaces",
        hero: "images/jaisalmer.jpg",
        badge: "Royal Heritage",
        desc: "A golden tapestry of Thar Desert sands, invincible hilltop fortresses, and opulent Maharaja palaces celebrating timeless chivalry and artistry."
    },
    {
        id: "kerala",
        name: "Kerala",
        tagline: "God's Own Emerald Coast",
        subtitle: "Serene Backwaters & Ayurveda",
        icon: "🌴",
        regionGroup: "coastal",
        capital: "Thiruvananthapuram",
        bestSeason: "September to March",
        famousFor: "Luxury Houseboats, Spice Hills & Ayurvedic Spas",
        hero: "images/kerala.jpg",
        badge: "Tropical Wellness",
        desc: "A tropical coastal haven of emerald palm-lined backwaters, misty Cardamom hills, and authentic Ayurvedic wellness sanctuaries."
    },
    {
        id: "goa",
        name: "Goa",
        tagline: "The Azure Portuguese Riviera",
        subtitle: "Golden Beaches & Heritage Villas",
        icon: "🏖️",
        regionGroup: "coastal",
        capital: "Panaji",
        bestSeason: "November to February",
        famousFor: "Arabian Sea Shores, Private Yachts & Portuguese Heritage",
        hero: "images/goa.jpg",
        badge: "Coastal Riviera",
        desc: "Endless golden beaches, private yacht charters, sun-kissed spice plantations, and historic Baroque churches along the Arabian Sea."
    },
    {
        id: "himachal pradesh",
        name: "Himachal Pradesh",
        tagline: "Abode of Snow & Cedar",
        subtitle: "Alpine Passes & Pine Valleys",
        icon: "🏔️",
        regionGroup: "himalayan",
        capital: "Shimla",
        bestSeason: "October to June",
        famousFor: "Spiti Valleys, High Passes & Ancient Monasteries",
        hero: "images/spiti.jpg",
        badge: "Alpine Sanctuary",
        desc: "Majestic alpine summits, high mountain passes, ancient wooden temples, and peaceful monasteries nestled in towering pine valleys."
    },
    {
        id: "madhya pradesh",
        name: "Madhya Pradesh",
        tagline: "Heart of Incredible India",
        subtitle: "Wild Tiger Safaris & UNESCO Temples",
        icon: "🐅",
        regionGroup: "nature",
        capital: "Bhopal",
        bestSeason: "October to April",
        famousFor: "Bengal Tigers in Kanha, Khajuraho Sculptures & Satpura Hills",
        hero: "images/kanha.jpg",
        badge: "Wildlife & Heritage",
        desc: "Dense teak jungles where Bengal tigers roam free, UNESCO Khajuraho temples, and serene hilltop sanctuaries steeped in tribal folklore."
    },
    {
        id: "uttar pradesh",
        name: "Uttar Pradesh",
        tagline: "The Cradle of Civilization",
        subtitle: "Taj Mahal & Sacred Ganga",
        icon: "🕌",
        regionGroup: "spiritual",
        capital: "Lucknow",
        bestSeason: "October to March",
        famousFor: "The Taj Mahal in Agra, Varanasi Dawn Ghats & Awadhi Splendor",
        hero: "images/tajmahal.jpg",
        badge: "Ancient Sanctum",
        desc: "The sacred soul of Bharat, home to the eternal dawn ghats of Varanasi and the immortal white marble wonder of the Taj Mahal in Agra."
    },
    {
        id: "uttarakhand",
        name: "Uttarakhand",
        tagline: "Devbhumi The Land of Gods",
        subtitle: "Holy Shrines & Yoga Capital",
        icon: "🕉️",
        regionGroup: "himalayan",
        capital: "Dehradun",
        bestSeason: "May to October (Pilgrimage) / All year",
        famousFor: "Kedarnath Temple, Rishikesh Yoga Capital & Char Dham",
        hero: "images/kedarnath.jpg",
        badge: "Spiritual Heights",
        desc: "Sacred Himalayan heights, roaring sacred rivers, holy Char Dham pilgrimage sanctums, and the world's premier yoga retreats in Rishikesh."
    },
    {
        id: "ladakh",
        name: "Ladakh",
        tagline: "The High-Altitude Moonland",
        subtitle: "Sapphire Lakes & Buddhist Gompas",
        icon: "❄️",
        regionGroup: "himalayan",
        capital: "Leh",
        bestSeason: "May to September",
        famousFor: "Pangong Lake, Khardung La Pass & High Gompas",
        hero: "images/ladakh.jpg",
        badge: "Celestial Frontier",
        desc: "Snow-crowned passes, sapphire-blue high alpine lakes, centuries-old Buddhist gompas, and untamed celestial starlight skies."
    },
    {
        id: "meghalaya",
        name: "Meghalaya",
        tagline: "The Abode of Clouds",
        subtitle: "Living Root Bridges & Crystal Waters",
        icon: "🌧️",
        regionGroup: "nature",
        capital: "Shillong",
        bestSeason: "October to April",
        famousFor: "Living Root Bridges, Umngot River Dawki & Cascades",
        hero: "images/meghalaya.jpg",
        badge: "Emerald Wilderness",
        desc: "Living root bridges woven over centuries, crystal-clear emerald rivers at Dawki, and dramatic mist-draped waterfalls plunging into deep gorges."
    },
    {
        id: "jammu & kashmir",
        name: "Jammu & Kashmir",
        tagline: "Paradise on Earth",
        subtitle: "Sacred Trikuta Peaks & Meadows",
        icon: "⛰️",
        regionGroup: "spiritual",
        capital: "Srinagar / Jammu",
        bestSeason: "March to October",
        famousFor: "Vaishno Devi Holy Shrine, Alpine Valleys & Snow Summits",
        hero: "images/vaishnodevi.jpg",
        badge: "Mountain Sanctum",
        desc: "The revered mountain sanctum of Vaishno Devi, alpine meadows, and timeless spiritual devotion amidst the sacred Trikuta peaks."
    },
    {
        id: "odisha",
        name: "Odisha",
        tagline: "Sacred Sands & Ocean Heritage",
        subtitle: "Jagannath Temple & Golden Coast",
        icon: "🌊",
        regionGroup: "spiritual",
        capital: "Bhubaneswar",
        bestSeason: "October to February",
        famousFor: "Puri Jagannath Shrine, Golden Sunrise Beaches & Sand Art",
        hero: "images/puri.jpg",
        badge: "Oceanic Devotion",
        desc: "Golden sunrise shores on the Bay of Bengal, the divine sanctum of Lord Jagannath, and world-renowned sand sculpture traditions."
    },
    {
        id: "chhattisgarh",
        name: "Chhattisgarh",
        tagline: "The Tribal Heartland",
        subtitle: "Untouched Nature & Gravity Wonders",
        icon: "🌿",
        regionGroup: "nature",
        capital: "Raipur",
        bestSeason: "July to February",
        famousFor: "Ulta Pani Magnetic Stream, Mainpat Hills & Dense Forests",
        hero: "images/ulta pani.jpg",
        badge: "Hidden Wonders",
        desc: "Ancient untouched forests, gravity-defying streams at Mainpat, cascading jungle waterfalls, and deep prehistoric rock art traditions."
    }
];

function getStateConfig(stateKey) {
    if (!stateKey) return null;
    const cleanKey = stateKey.toLowerCase().replace(/[^a-z0-9]/g, '');
    return STATES_DIRECTORY.find(st => {
        const norm = st.id.toLowerCase().replace(/[^a-z0-9]/g, '');
        const normName = st.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        return norm === cleanKey || norm.includes(cleanKey) || cleanKey.includes(norm) ||
               normName === cleanKey || normName.includes(cleanKey);
    }) || null;
}

const INITIAL_PLACES = [
    {
        "_id": "6a030db0de75ed1c4f55b05a",
        "name": "tajmahal",
        "title": "Taj Mahal",
        "state": "uttar pradesh",
        "city": "Agra",
        "category": "heritage",
        "image": "images/tajmahal.jpg",
        "rating": 4.99,
        "reviews": 12840,
        "description": "The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in Agra. Built by Mughal Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal, it stands as the timeless symbol of eternal love and an apex of Mughal architecture.",
        "bestTime": "October to March",
        "featured": true
    },
    {
        "_id": "6a03025106ea54ce293f62a0",
        "name": "kedarnath",
        "title": "Kedarnath Temple",
        "state": "uttarakhand",
        "city": "Rudraprayag",
        "category": "spiritual",
        "image": "images/kedarnath.jpg",
        "rating": 4.99,
        "reviews": 8420,
        "description": "Kedarnath Temple is one of the most sacred Hindu pilgrimage sites in the Himalayan region of Uttarakhand. Dedicated to Lord Shiva, this pristine mountain sanctuary offers a deeply spiritual and breathtaking alpine ambiance surrounded by snow peaks.",
        "bestTime": "May to October",
        "featured": true
    },
    {
        "_id": "69fecc6b919776aa8f8193aa",
        "name": "ladakh",
        "title": "Ladakh Mountains",
        "state": "ladakh",
        "city": "Leh",
        "category": "adventure",
        "image": "images/ladakh.jpg",
        "rating": 4.98,
        "reviews": 9320,
        "description": "Ladakh is one of the most breathtaking destinations in India, known for its snow-covered mountains, crystal-clear turquoise lakes, ancient monasteries, and high-altitude passes like Khardung La and Pangong Tso.",
        "bestTime": "May to September",
        "featured": true
    },
    {
        "_id": "69f6ead584ffb1b371509040",
        "name": "kerala",
        "title": "Kerala Backwaters",
        "state": "kerala",
        "city": "Alleppey",
        "category": "nature",
        "image": "images/kerala.jpg",
        "rating": 4.96,
        "reviews": 11200,
        "description": "Kerala, God's Own Country, offers a serene labyrinth of tranquil lagoons, luxury houseboats, and emerald palm groves. Experience authentic Ayurvedic wellness and peaceful cruising through idyllic village waters.",
        "bestTime": "September to March",
        "featured": true
    },
    {
        "_id": "69fecd54919776aa8f8193ac",
        "name": "jaisalmer",
        "title": "Jaisalmer Fort",
        "state": "rajasthan",
        "city": "Jaisalmer",
        "category": "heritage",
        "image": "images/jaisalmer.jpg",
        "rating": 4.95,
        "reviews": 7540,
        "description": "The Golden City of India stands proudly in the heart of the Thar Desert. Explore the world's largest living golden sandstone fort, ride royal camels across sun-kissed dunes, and revel in authentic Rajasthani hospitality under starry desert skies.",
        "bestTime": "October to March",
        "featured": true
    },
    {
        "_id": "69f6ead584ffb1b371509041",
        "name": "varanasi",
        "title": "Varanasi Ghats",
        "state": "uttar pradesh",
        "city": "Varanasi",
        "category": "spiritual",
        "image": "images/varanasi.jpg",
        "rating": 4.97,
        "reviews": 14120,
        "description": "The spiritual heart of India dating back over 3,000 years. Witness the mesmerizing evening Ganga Aarti, glide along the sacred dawn river currents, and absorb timeless philosophies in the eternal city of lights.",
        "bestTime": "October to March",
        "featured": true
    },
    {
        "_id": "69fece29919776aa8f8193af",
        "name": "spiti",
        "title": "Spiti Valley",
        "state": "himachal pradesh",
        "city": "Kaza",
        "category": "adventure",
        "image": "images/spiti.jpg",
        "rating": 4.96,
        "reviews": 6120,
        "description": "A high-altitude desert nestled between Tibet and India. Famous for Key Monastery, Chandratal Lake, and dramatic stark canyons, Spiti is the ultimate realm for adventurers and photographers seeking untamed natural majesty.",
        "bestTime": "May to October",
        "featured": false
    },
    {
        "_id": "69f6ead584ffb1b37150903e",
        "name": "jaipur",
        "title": "Jaipur Royal City",
        "state": "rajasthan",
        "city": "Jaipur",
        "category": "heritage",
        "image": "images/jaipur.jpg",
        "rating": 4.94,
        "reviews": 13900,
        "description": "The Pink City of Rajasthan showcases royal grandeur through majestic hill fortresses like Amber Palace, the intricate facade of Hawa Mahal, and opulent royal courtyards celebrating Maharaja traditions.",
        "bestTime": "November to February",
        "featured": true
    },
    {
        "_id": "69f6ead584ffb1b37150903c",
        "name": "manali",
        "title": "Manali Peaks",
        "state": "himachal pradesh",
        "city": "Manali",
        "category": "adventure",
        "image": "images/manali.jpg",
        "rating": 4.92,
        "reviews": 10500,
        "description": "Nestled in the Beas River valley beneath towering pine forests and Himalayan summits. Perfect for heli-skiing, paragliding over Solang Valley, and accessing the breathtaking Atal Tunnel into Lahaul.",
        "bestTime": "October to June",
        "featured": false
    },
    {
        "_id": "69fecd14919776aa8f8193ab",
        "name": "kanha",
        "title": "Kanha National Park",
        "state": "madhya pradesh",
        "city": "Mandla",
        "category": "nature",
        "image": "images/kanha.jpg",
        "rating": 4.95,
        "reviews": 5430,
        "description": "The inspiration behind Rudyard Kipling's 'The Jungle Book'. Kanha is world-renowned for its dense sal forests, magnificent Bengal tigers, elusive leopards, and the rare hard-ground barasingha deer.",
        "bestTime": "October to June",
        "featured": true
    },
    {
        "_id": "69f6ead584ffb1b37150903f",
        "name": "goa",
        "title": "Goa Coastal Haven",
        "state": "goa",
        "city": "Panaji",
        "category": "nature",
        "image": "images/goa.jpg",
        "rating": 4.91,
        "reviews": 15600,
        "description": "India's celebrated coastal paradise blending sun-drenched Arabian Sea shores with historic Portuguese villas, world-class luxury beach clubs, private yacht expeditions, and fragrant spice plantations.",
        "bestTime": "November to February",
        "featured": false
    },
    {
        "_id": "69fece51919776aa8f8193b0",
        "name": "meghalaya",
        "title": "Meghalaya Living Bridges",
        "state": "meghalaya",
        "city": "Shillong",
        "category": "nature",
        "image": "images/meghalaya.jpg",
        "rating": 4.95,
        "reviews": 5100,
        "description": "The Abode of the Clouds. Experience the crystalline emerald waters of Umngot River at Dawki, the centuries-old living root bridges of Cherrapunji, and mist-shrouded waterfalls cascading into lush gorges.",
        "bestTime": "October to April",
        "featured": false
    },
    {
        "_id": "69fecdf3919776aa8f8193ae",
        "name": "rishikesh",
        "title": "Rishikesh Yoga Capital",
        "state": "uttarakhand",
        "city": "Rishikesh",
        "category": "spiritual",
        "image": "images/rishikesh.jpg",
        "rating": 4.96,
        "reviews": 8900,
        "description": "The World Capital of Yoga nestled where the holy Ganges emerges from the Himalayas. A harmonious haven uniting sacred evening aartis, premier meditation retreats, and world-class white-water rafting.",
        "bestTime": "September to April",
        "featured": false
    },
    {
        "_id": "6a0302c806ea54ce293f62a1",
        "name": "badrinath",
        "title": "Badrinath Temple",
        "state": "uttarakhand",
        "city": "Chamoli",
        "category": "spiritual",
        "image": "images/badrinath.jpg",
        "rating": 4.98,
        "reviews": 6800,
        "description": "One of the most sacred Char Dham pilgrimage shrines in India, dedicated to Lord Vishnu and flanked by the dramatic Nar and Narayana mountain ranges beside the roaring Alaknanda River.",
        "bestTime": "May to October",
        "featured": false
    },
    {
        "_id": "6a0304c26b597440d69d7d8f",
        "name": "vaishnodevi",
        "title": "Vaishno Devi Shrine",
        "state": "jammu & kashmir",
        "city": "Katra",
        "category": "spiritual",
        "image": "images/vaishnodevi.jpg",
        "rating": 4.97,
        "reviews": 16400,
        "description": "Perched amidst the revered Trikuta Hills of Jammu & Kashmir. Millions embark on this divine journey to seek blessings inside the holy cave sanctuary resonating with spiritual fervor and pure mountain air.",
        "bestTime": "March to October",
        "featured": false
    },
    {
        "_id": "69f6ead584ffb1b37150903d",
        "name": "khajuraho",
        "title": "Khajuraho Temple Group",
        "state": "madhya pradesh",
        "city": "Khajuraho",
        "category": "heritage",
        "image": "images/khajuraho.jpg",
        "rating": 4.93,
        "reviews": 6200,
        "description": "A UNESCO World Heritage marvel celebrating medieval Chandela dynasty artistry. Marvel at exquisite sandstone carvings depicting human emotions, spiritual transcendence, and architectural virtuosity.",
        "bestTime": "October to March",
        "featured": false
    },
    {
        "_id": "69f6ead584ffb1b371509042",
        "name": "pachmarhi",
        "title": "Pachmarhi Hill Sanctuary",
        "state": "madhya pradesh",
        "city": "Pachmarhi",
        "category": "nature",
        "image": "images/pachmarhi.JPG",
        "rating": 4.89,
        "reviews": 4300,
        "description": "Known as the Queen of Satpura, Pachmarhi is a serene hill retreat enveloped in ancient Sal forests, cave paintings of prehistoric hunters, and breathtaking viewpoints overlooking ravines and waterfalls.",
        "bestTime": "All year round",
        "featured": false
    },
    {
        "_id": "69fecdbd919776aa8f8193ad",
        "name": "puri",
        "title": "Puri Beach & Jagannath",
        "state": "odisha",
        "city": "Puri",
        "category": "nature",
        "image": "images/puri.jpg",
        "rating": 4.88,
        "reviews": 7900,
        "description": "A coastal jewel along the Bay of Bengal, home to the sacred Jagannath Temple, celebrated sand art exhibitions, and golden sunrise shores revered by travelers and pilgrims alike.",
        "bestTime": "October to February",
        "featured": false
    },
    {
        "_id": "69f6ead584ffb1b371509043",
        "name": "ultapani",
        "title": "Ulta Pani Magnetic Falls",
        "state": "chhattisgarh",
        "city": "Mainpat",
        "category": "adventure",
        "image": "images/ulta pani.jpg",
        "rating": 4.86,
        "reviews": 3400,
        "description": "Nestled in the lush Tibetan settlement hills of Mainpat, Chhattisgarh. Ulta Pani is an astonishing optical and gravitational anomaly where stream water appears to flow smoothly uphill.",
        "bestTime": "July to February",
        "featured": false
    },
    {
        "_id": "6addb357dc6f6650d0eb72a9",
        "name": "sirpur-heritage-complex",
        "title": "Sirpur Heritage Complex",
        "state": "chhattisgarh",
        "city": "Sirpur",
        "category": "heritage",
        "image": "images/sirpur-lakshman-temple.jpg",
        "rating": 4.93,
        "reviews": 3200,
        "description": "Sirpur, situated on the banks of the Mahanadi River in Chhattisgarh's Mahasamund district, is an important archaeological destination renowned for its ancient temples, Buddhist heritage and historic settlement remains with the iconic 7th-century brick Lakshman Temple.",
        "bestTime": "October to March",
        "featured": false
    },
    {
        "_id": "6addcacc0b7a7c19fa0212fb",
        "name": "mainpat-hill-station",
        "title": "Mainpat Hill Station",
        "state": "chhattisgarh",
        "city": "Mainpat",
        "category": "nature",
        "image": "images/mainpat-tiger-point-hills.jpg",
        "rating": 4.91,
        "reviews": 2900,
        "description": "Mainpat is a scenic highland destination in northern Chhattisgarh, popularly known as the Shimla of Surguja. Discover rolling green meadows, Tiger Point waterfalls, Buddhist monasteries, and the mysterious bouncing ground of Jaljali.",
        "bestTime": "October to March",
        "featured": false
    },
    {
        "_id": "6addccbe4c525766a3eaea14",
        "name": "barnawapara-wildlife-sanctuary",
        "title": "Barnawapara Wildlife Sanctuary",
        "state": "chhattisgarh",
        "city": "Barnawapara",
        "category": "nature",
        "image": "images/barnawapara-wildlife-sanctuary.jpg",
        "rating": 4.92,
        "reviews": 3400,
        "description": "Barnawapara Wildlife Sanctuary is a pristine teak forest sanctuary in Chhattisgarh teeming with wildlife, leopards, sambar deer, flying squirrels, and over 150 species of birds across lush canopy trails.",
        "bestTime": "November to April",
        "featured": false
    },
    {
        "_id": "6addcef64c525766a3eaea17",
        "name": "bhoramdeo-temple-kawardha",
        "title": "Bhoramdeo Temple",
        "state": "chhattisgarh",
        "city": "Kawardha",
        "category": "spiritual",
        "image": "images/bhoramdeo-temple-kawardha.jpg",
        "rating": 4.94,
        "reviews": 4100,
        "description": "Bhoramdeo Temple, celebrated as the Khajuraho of Chhattisgarh, is an 11th-century Nagara-style stone architectural marvel nestled amidst the tranquil Maikal mountain range in Kawardha.",
        "bestTime": "October to March",
        "featured": false
    },
    {
        "_id": "6addd13e4c525766a3eaea18",
        "name": "maa-bamleshwari-temple-dongargarh",
        "title": "Maa Bamleshwari Temple",
        "state": "chhattisgarh",
        "city": "Dongargarh",
        "category": "spiritual",
        "image": "images/maa-bamleshwari-temple-dongargarh.jpg",
        "rating": 4.96,
        "reviews": 5200,
        "description": "Perched atop a 1,600-foot majestic hill in Dongargarh, Chhattisgarh. Maa Bamleshwari Temple is a celebrated spiritual beacon offering 360-degree panoramic vista views, scenic ropeway ascents, and centuries of revered Shakti devotion.",
        "bestTime": "October to March",
        "featured": false
    }
];

// ============================================================
// IMAGE MAP: Complete directory mapping place names & slugs
// to their unique local asset paths. Fixes Vercel/Linux case sensitivity
// and ensures NO two places display duplicate images.
// ============================================================
const PLACE_IMAGE_MAP = {
    // 1. Classical Destinations
    "tajmahal":                          "images/tajmahal.jpg",
    "tajmahalagra":                      "images/tajmahal.jpg",
    "kedarnath":                         "images/kedarnath.jpg",
    "kedarnathtemple":                   "images/kedarnath.jpg",
    "ladakh":                            "images/ladakh.jpg",
    "ladakhmountains":                   "images/ladakh.jpg",
    "kerala":                            "images/kerala.jpg",
    "keralabackwaters":                  "images/kerala.jpg",
    "jaisalmer":                         "images/jaisalmer.jpg",
    "jaisalmerfort":                     "images/jaisalmer.jpg",
    "varanasi":                          "images/varanasi.jpg",
    "varanasighats":                     "images/varanasi.jpg",
    "spiti":                             "images/spiti.jpg",
    "spitivalley":                       "images/spiti.jpg",
    "jaipur":                            "images/jaipur.jpg",
    "jaipurcity":                        "images/jaipur.jpg",
    "jaipurroyalcity":                   "images/jaipur.jpg",
    "manali":                            "images/manali.jpg",
    "manalipeaks":                       "images/manali.jpg",
    "kanha":                             "images/kanha.jpg",
    "kanhanationalpark":                 "images/kanha.jpg",
    "goa":                               "images/goa.jpg",
    "goabeaches":                        "images/goa.jpg",
    "goacoastalhaven":                   "images/goa.jpg",
    "meghalaya":                         "images/meghalaya.jpg",
    "meghalayahills":                    "images/meghalaya.jpg",
    "meghalayalivingbridges":            "images/meghalaya.jpg",
    "rishikesh":                         "images/rishikesh.jpg",
    "rishikeshgangaghats":               "images/rishikesh.jpg",
    "rishikeshyogacapital":              "images/rishikesh.jpg",
    "badrinath":                         "images/badrinath.jpg",
    "badrinathtemple":                   "images/badrinath.jpg",
    "vaishnodevi":                       "images/vaishnodevi.jpg",
    "vaishnodevitemple":                 "images/vaishnodevi.jpg",
    "vaishnodevishrine":                 "images/vaishnodevi.jpg",
    "khajuraho":                         "images/khajuraho.jpg",
    "khajurahotemple":                   "images/khajuraho.jpg",
    "khajurahotemplegroup":              "images/khajuraho.jpg",
    "pachmarhi":                         "images/pachmarhi.JPG",
    "pachmarhihillstation":              "images/pachmarhi.JPG",
    "pachmarhihillsanctuary":            "images/pachmarhi.JPG",
    "puri":                              "images/puri.jpg",
    "puribeach":                         "images/puri.jpg",
    "puribeachjagannath":                "images/puri.jpg",
    
    // 2. Chhattisgarh Destinations
    "ultapani":                          "images/ulta pani.jpg",
    "ultapanimagneticfalls":             "images/ulta pani.jpg",
    "sirpurheritagecomplex":             "images/sirpur-lakshman-temple.jpg",
    "sirpurlakshmantemple":              "images/sirpur-lakshman-temple.jpg",
    "sirpur":                            "images/sirpur-lakshman-temple.jpg",
    "lakshmantemple":                    "images/sirpur-lakshman-temple.jpg",
    "mainpathillstation":                "images/mainpat-tiger-point-hills.jpg",
    "mainpattigerpointhills":            "images/mainpat-tiger-point-hills.jpg",
    "mainpat":                           "images/mainpat-tiger-point-hills.jpg",
    "tigerpoint":                        "images/mainpat-tiger-point-hills.jpg",
    "barnawaparawildlifesanctuary":      "images/barnawapara-wildlife-sanctuary.jpg",
    "barnawapara":                       "images/barnawapara-wildlife-sanctuary.jpg",
    "bhoramdeotemplekawardha":           "images/bhoramdeo-temple-kawardha.jpg",
    "bhoramdeotemple":                   "images/bhoramdeo-temple-kawardha.jpg",
    "bhoramdeo":                         "images/bhoramdeo-temple-kawardha.jpg",
    "kawardha":                          "images/bhoramdeo-temple-kawardha.jpg",
    "maabamleshwaritempledongargarh":    "images/maa-bamleshwari-temple-dongargarh.jpg",
    "maabamleshwaritemple":              "images/maa-bamleshwari-temple-dongargarh.jpg",
    "maabamleshwari":                    "images/maa-bamleshwari-temple-dongargarh.jpg",
    "bamleshwari":                       "images/maa-bamleshwari-temple-dongargarh.jpg",
    "dongargarh":                        "images/maa-bamleshwari-temple-dongargarh.jpg",

    // 3. Other Regional Heritage Gems
    "auli":                              "images/auli.jpg",
    "bhedaghat":                         "images/bhedaghat.jpg",
    "nikobar":                           "images/nikobar.jpg",
    "qutubminar":                        "images/qutubminar.jpg",
    "sanjayvan":                         "images/sanjayvan.jpg"
};

// Fallback images per State so missing images never collapse into the same photo
const STATE_DEFAULT_IMAGES = {
    "chhattisgarh":   "images/mainpat-tiger-point-hills.jpg",
    "rajasthan":      "images/jaisalmer.jpg",
    "kerala":         "images/kerala.jpg",
    "goa":            "images/goa.jpg",
    "himachalpradesh":"images/spiti.jpg",
    "madhyapradesh":  "images/kanha.jpg",
    "uttarpradesh":   "images/varanasi.jpg",
    "uttarakhand":    "images/kedarnath.jpg",
    "ladakh":         "images/ladakh.jpg",
    "meghalaya":      "images/meghalaya.jpg",
    "odisha":         "images/puri.jpg",
    "jammukashmir":   "images/vaishnodevi.jpg"
};

function getPlaceImage(item, fallback) {
    if (!item && !fallback) return "images/jaisalmer.jpg";

    const clean = (str) => (str || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const cleanName = clean(item?.name);
    const cleanTitle = clean(item?.title);

    // 1. Direct exact match in PLACE_IMAGE_MAP
    if (cleanName && PLACE_IMAGE_MAP[cleanName]) return PLACE_IMAGE_MAP[cleanName];
    if (cleanTitle && PLACE_IMAGE_MAP[cleanTitle]) return PLACE_IMAGE_MAP[cleanTitle];

    // 2. Keyword/substring match in PLACE_IMAGE_MAP (e.g. "mainpat", "barnawapara", "sirpur")
    for (const [key, imgPath] of Object.entries(PLACE_IMAGE_MAP)) {
        if (key.length >= 5) {
            if (cleanName && (cleanName.includes(key) || key.includes(cleanName))) {
                return imgPath;
            }
            if (cleanTitle && (cleanTitle.includes(key) || key.includes(cleanTitle))) {
                return imgPath;
            }
        }
    }

    // 3. Normalize item.image if valid (strictly enforce lowercase "images/" for Linux/Vercel)
    let rawImg = (item?.image || "").trim();
    if (rawImg) {
        // Fix case of "Images/..." or "/images/..." -> "images/..."
        if (rawImg.toLowerCase().startsWith("images/")) {
            rawImg = "images/" + rawImg.slice(7);
        } else if (rawImg.toLowerCase().startsWith("/images/")) {
            rawImg = "images/" + rawImg.slice(8);
        }

        // Handle pachmarhi uppercase extension on Linux
        if (rawImg.toLowerCase() === "images/pachmarhi.jpg") {
            rawImg = "images/pachmarhi.JPG";
        }

        // If it starts with images/ and is a full file name
        if (rawImg.startsWith("images/") && rawImg.length > 9) {
            return rawImg;
        }

        // External URLs (e.g. Cloudinary, Unsplash, AWS S3)
        if (rawImg.startsWith("http://") || rawImg.startsWith("https://")) {
            return rawImg;
        }
    }

    // 4. Check fallback from INITIAL_PLACES
    if (fallback && fallback.image) {
        let fb = fallback.image.trim();
        if (fb.toLowerCase().startsWith("images/")) {
            fb = "images/" + fb.slice(7);
        }
        return fb;
    }

    // 5. State-based default image (Each state gets its own dedicated photo)
    const stateClean = clean(item?.state || fallback?.state);
    if (stateClean && STATE_DEFAULT_IMAGES[stateClean]) {
        return STATE_DEFAULT_IMAGES[stateClean];
    }

    // 6. Category-based fallback
    const catClean = clean(item?.category || fallback?.category);
    if (catClean.includes("nature")) return "images/kerala.jpg";
    if (catClean.includes("adventure")) return "images/spiti.jpg";
    if (catClean.includes("spirit") || catClean.includes("relig")) return "images/kedarnath.jpg";

    return "images/tajmahal.jpg";
}

// In-memory data store initialized with all 24 places
let places = [...INITIAL_PLACES];

// Retrieve cached places from localStorage if exists
try {
    const cached = localStorage.getItem('travelbharat_cached_places');
    if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
            // Re-apply image map to cached data to fix any stale bad images
            places = parsed.map(item => {
                const fallback = INITIAL_PLACES.find(p => p.name === item.name || p.title === item.title) || {};
                return { ...item, image: getPlaceImage(item, fallback) };
            });
        }
    }
} catch (e) {
    console.warn("Storage access notice:", e);
}

// Background sync with live backend
function syncBackendData(callback) {
    if (typeof CONFIG === "undefined" || !CONFIG.BASE_URL) return;

    fetch(`${CONFIG.BASE_URL}/places?t=${Date.now()}`)
        .then(res => {
            if (!res.ok) throw new Error("Sync returned status: " + res.status);
            return res.json();
        })
        .then(liveData => {
            if (Array.isArray(liveData) && liveData.length > 0) {
                // Merge with default ratings/reviews if missing
                const enriched = liveData.map(item => {
                    const fallback = INITIAL_PLACES.find(p => 
                        p.name === item.name || 
                        (p._id && item._id && p._id === item._id) ||
                        (p.title && item.title && p.title.toLowerCase() === item.title.toLowerCase())
                    ) || {};

                    const isLongTime = (item.bestTime || "").length > 32;
                    return {
                        ...fallback,
                        ...item,
                        // Always resolve image via map — fixes Vercel same-image bug
                        image: getPlaceImage(item, fallback),
                        description: (item.description && item.description.length > 20) ? item.description : (isLongTime ? item.bestTime : fallback.description),
                        bestTime: !isLongTime && item.bestTime ? item.bestTime : (fallback.bestTime || "October to March"),
                        rating: item.rating || fallback.rating || 4.95,
                        reviews: item.reviews || fallback.reviews || 3200
                    };
                });
                places = enriched;
                try {
                    localStorage.setItem('travelbharat_cached_places', JSON.stringify(places));
                } catch (e) {}

                if (typeof callback === "function") {
                    callback(places);
                }
            }
        })
        .catch(err => {
            console.log("Using cached elite portfolio (offline resilient mode):", err.message);
        });
}