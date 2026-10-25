// ==========================================================================
// TRAVELBHARAT ELITE - MASTER CLIENT CONTROLLER & INTERACTIONS
// ==========================================================================

const container = document.getElementById("placeContainer");
const searchInput = document.getElementById("searchInput");
const themeSelect = document.getElementById("themeSelect");
const seasonSelect = document.getElementById("seasonSelect");
const destinationCount = document.getElementById("destinationCount");
const stateContainer = document.getElementById("homeStateContainer");

let currentCategory = "all";
let wishlistedPlaces = new Set();

// Load Wishlist from Storage
try {
    const saved = localStorage.getItem("travelbharat_wishlist");
    if (saved) wishlistedPlaces = new Set(JSON.parse(saved));
} catch (e) {}

// State Representative Visual Directory
const STATE_THUMBNAILS = {
    "uttar pradesh": "images/tajmahal.jpg",
    "uttarakhand": "images/kedarnath.jpg",
    "rajasthan": "images/jaisalmer.jpg",
    "kerala": "images/kerala.jpg",
    "himachal pradesh": "images/spiti.jpg",
    "ladakh": "images/ladakh.jpg",
    "madhya pradesh": "images/kanha.jpg",
    "goa": "images/goa.jpg",
    "meghalaya": "images/meghalaya.jpg",
    "jammu & kashmir": "images/vaishnodevi.jpg",
    "odisha": "images/puri.jpg",
    "chhattisgarh": "images/ulta pani.jpg"
};

// 🔹 INITIALIZATION (0ms Load Time)
document.addEventListener("DOMContentLoaded", () => {
    // 1. Instant Render from In-Memory Portfolio
    if (typeof places !== "undefined" && Array.isArray(places)) {
        renderPlaces(places);
        renderStates(places);
    }

    // 2. Background Sync with Live Backend
    syncBackendData((updatedPlaces) => {
        renderPlaces(filterCurrentSelection(updatedPlaces));
        renderStates(updatedPlaces);
    });

    // 3. Search & Input Listeners
    if (searchInput) {
        searchInput.addEventListener("input", debounce(handleDockSearch, 200));
        searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") handleDockSearch();
        });
    }

    if (themeSelect) {
        themeSelect.addEventListener("change", handleDockSearch);
    }
    if (seasonSelect) {
        seasonSelect.addEventListener("change", handleDockSearch);
    }

    // 4. Mobile Menu Toggle
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
            });
        });
    }

    // 5. Scroll Reveals
    initReveal();

    // 6. Planner Initial Calculation
    calculatePlanner();
});

// 🔹 RENDER DESTINATIONS (Ultra-Luxury Cards)
function renderPlaces(data) {
    if (!container) return;
    container.innerHTML = "";

    if (destinationCount) {
        destinationCount.innerText = data.length;
    }

    if (!data || data.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 80px 20px; grid-column: 1 / -1; background: rgba(16, 25, 46, 0.4); border-radius: var(--radius-xl); border: 1px dashed var(--gold-border);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
                <h3 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--text-pure); margin-bottom: 8px;">No Signature Escapes Match Your Criteria</h3>
                <p style="color: var(--text-muted); max-width: 500px; margin: 0 auto 1.5rem;">Try refining your search keyword or switching experience filters to explore other regions of India.</p>
                <button onclick="resetFilters()" class="btn-gold">View All Portfolios</button>
            </div>
        `;
        return;
    }

    data.forEach((place, index) => {
        const title = (place.title || place.name || "").trim();
        const state = (place.state || "India").toUpperCase();
        const city = place.city ? `${place.city}, ` : "";
        const category = (place.category || "Discovery").toUpperCase();
        const rating = place.rating || 4.95;
        const reviews = place.reviews || 2400;
        const rawTime = place.bestTime || "";
        const bestTime = (rawTime.length > 0 && rawTime.length < 32) ? rawTime : "October to March";
        const isWishlisted = wishlistedPlaces.has(place.name);

        const card = document.createElement("div");
        card.className = "lux-card reveal";
        card.style.animationDelay = `${(index % 6) * 0.08}s`;

        card.innerHTML = `
            <div class="card-img-wrapper">
                <span class="card-badge">${category}</span>
                <button class="card-action-btn ${isWishlisted ? 'active' : ''}" 
                        onclick="toggleWishlist(event, '${place.name}')" 
                        title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}"
                        aria-label="Wishlist">
                    ${isWishlisted ? '♥' : '♡'}
                </button>
                <img src="${place.image || 'images/default.jpg'}" 
                     alt="${title}"
                     loading="lazy"
                     onerror="this.onerror=null; this.src='images/tajmahal.jpg';">
                <div class="card-season-pill">
                    <span>🗓️</span> ${bestTime}
                </div>
            </div>
            <div class="card-content">
                <div class="card-location">
                    <span>📍</span> ${city}${state}
                </div>
                <h3 class="card-title">${title}</h3>
                <p class="card-description">${place.description || 'Step into royal serenity, where five millennia of architectural mastery and timeless natural beauty converge.'}</p>
                <div class="card-footer">
                    <div class="card-rating">
                        <span>★</span> ${rating.toFixed(2)}
                        <span style="color: var(--text-muted); font-size: 0.75rem; font-weight: 500;">(${reviews.toLocaleString()})</span>
                    </div>
                    <div class="card-btn-group">
                        <button class="card-quick-btn" onclick="openQuickModal('${place.name}')">Quick View</button>
                        <a href="place.html?name=${encodeURIComponent(place.name || '')}" class="card-link-btn">Explore</a>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(card);
    });

    initReveal();
}

let currentStateRegion = "all";

// 🔹 RENDER REGIONAL STATES (Photographic Luxury Cards)
function renderStates(data) {
    if (!stateContainer) return;

    // Use centralized STATES_DIRECTORY if available
    const baseList = (typeof STATES_DIRECTORY !== "undefined" && Array.isArray(STATES_DIRECTORY))
        ? STATES_DIRECTORY
        : [];

    // Calculate place counts from current data
    const countsMap = {};
    (data || []).forEach(p => {
        const raw = (p.state || "").trim().toLowerCase();
        const norm = raw.replace(/[^a-z0-9]/g, "");
        if (norm) {
            countsMap[norm] = (countsMap[norm] || 0) + 1;
        }
    });

    // Prepare list of state cards
    let displayList = [];
    if (baseList.length > 0) {
        displayList = baseList.map(st => {
            const norm = st.id.toLowerCase().replace(/[^a-z0-9]/g, "");
            return {
                id: st.id,
                name: st.name,
                tagline: st.tagline,
                subtitle: st.subtitle || st.famousFor || "Curated Sovereign Escapes",
                icon: st.icon || "📍",
                badge: st.badge || "Sovereign Region",
                regionGroup: st.regionGroup || "heritage",
                image: st.hero || "images/tajmahal.jpg",
                count: countsMap[norm] || 1
            };
        });
    } else {
        // Fallback from raw data
        const statesMap = {};
        (data || []).forEach(p => {
            const raw = (p.state || "").trim();
            const norm = raw.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
            if (!norm) return;
            if (!statesMap[norm]) {
                statesMap[norm] = {
                    id: norm,
                    name: raw.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                    subtitle: "Heritage & Culture",
                    badge: "Sovereign Region",
                    regionGroup: "heritage",
                    image: (typeof STATE_THUMBNAILS !== "undefined" && STATE_THUMBNAILS[raw.toLowerCase()]) || p.image || "images/tajmahal.jpg",
                    count: 0
                };
            }
            statesMap[norm].count++;
        });
        displayList = Object.values(statesMap);
    }

    // Filter by Region Group
    if (currentStateRegion !== "all") {
        displayList = displayList.filter(st => st.regionGroup === currentStateRegion);
    }

    stateContainer.innerHTML = "";

    if (displayList.length === 0) {
        stateContainer.innerHTML = `
            <div style="padding: 40px; text-align: center; color: var(--text-muted); width: 100%;">
                No states found in this category.
            </div>
        `;
        return;
    }

    displayList.forEach(st => {
        const card = document.createElement("a");
        card.href = `state.html?state=${encodeURIComponent(st.id)}`;
        card.className = "state-card";

        card.innerHTML = `
            <div class="state-card-bg" style="background-image: url('${st.image}')"></div>
            <div class="state-card-overlay"></div>
            
            <div class="state-card-top">
                <span class="state-badge-pill">${st.badge}</span>
                <span class="state-count-pill">${st.count} ${st.count === 1 ? 'Estate' : 'Estates'}</span>
            </div>

            <div class="state-card-content">
                <h3 class="state-name">${st.name}</h3>
                <p class="state-subtitle">${st.subtitle}</p>
                <div class="state-arrow">Explore Region →</div>
            </div>
        `;

        stateContainer.appendChild(card);
    });
}

// 🔹 FILTER STATES BY REGION
function filterStateRegion(region, tabElem) {
    currentStateRegion = region;

    // Update active tab styling
    const tabs = document.querySelectorAll(".state-tab");
    tabs.forEach(t => t.classList.remove("active"));
    if (tabElem) tabElem.classList.add("active");

    renderStates(places);
}

// 🔹 SCROLL STATE STRIP HORIZONTALLY
function scrollStateStrip(direction) {
    if (!stateContainer) return;
    const scrollAmount = 340;
    if (direction === "left") {
        stateContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
        stateContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
}

// 🔹 DOCK SEARCH & FILTER ENGINE
function handleDockSearch() {
    const query = (searchInput ? searchInput.value : "").trim().toLowerCase();
    const theme = themeSelect ? themeSelect.value : "all";
    const season = seasonSelect ? seasonSelect.value : "all";

    let results = places.filter(place => {
        const name = (place.name || "").toLowerCase();
        const title = (place.title || "").toLowerCase();
        const state = (place.state || "").toLowerCase();
        const city = (place.city || "").toLowerCase();
        const cat = (place.category || "").toLowerCase();
        const desc = (place.description || "").toLowerCase();
        const best = (place.bestTime || "").toLowerCase();

        // 1. Text Search Match
        const matchesQuery = !query || 
            name.includes(query) || 
            title.includes(query) || 
            state.includes(query) || 
            city.includes(query) || 
            cat.includes(query) || 
            desc.includes(query);

        // 2. Theme Match
        let matchesTheme = true;
        if (theme !== "all") {
            if (theme === "spiritual") {
                matchesTheme = cat.includes("spiritual") || cat.includes("religious");
            } else {
                matchesTheme = cat.includes(theme);
            }
        }

        // 3. Season Match
        let matchesSeason = true;
        if (season === "winter") {
            matchesSeason = best.includes("october") || best.includes("november") || best.includes("december") || best.includes("january") || best.includes("february") || best.includes("march") || best.includes("all year");
        } else if (season === "summer") {
            matchesSeason = best.includes("may") || best.includes("june") || best.includes("april") || best.includes("all year");
        } else if (season === "monsoon") {
            matchesSeason = best.includes("july") || best.includes("august") || best.includes("september") || best.includes("all year");
        }

        return matchesQuery && matchesTheme && matchesSeason;
    });

    renderPlaces(results);
}

// 🔹 FILTER CURRENT SELECTION (HELPER)
function filterCurrentSelection(list) {
    if (currentCategory === "all") return list;
    return list.filter(p => {
        const cat = (p.category || "").toLowerCase();
        if (currentCategory === "spiritual") {
            return cat.includes("spiritual") || cat.includes("religious");
        }
        return cat.includes(currentCategory);
    });
}

// 🔹 CATEGORY TAB FILTER
function filterCategory(cat) {
    currentCategory = cat.toLowerCase();

    // Update active tab buttons
    document.querySelectorAll(".filter-tab").forEach(tab => {
        tab.classList.remove("active");
        const txt = tab.innerText.toLowerCase();
        if ((cat === "all" && txt.includes("all")) ||
            (cat === "heritage" && txt.includes("heritage")) ||
            (cat === "nature" && txt.includes("nature")) ||
            (cat === "adventure" && txt.includes("adventure")) ||
            (cat === "spiritual" && txt.includes("spiritual"))) {
            tab.classList.add("active");
        }
    });

    if (themeSelect) {
        themeSelect.value = cat;
    }

    const filtered = filterCurrentSelection(places);
    renderPlaces(filtered);
}

// 🔹 QUICK TRENDING FILTER
function quickFilter(key) {
    if (searchInput) searchInput.value = key;
    handleDockSearch();
    const dest = document.getElementById("destinations");
    if (dest) dest.scrollIntoView({ behavior: "smooth" });
}

function resetFilters() {
    if (searchInput) searchInput.value = "";
    if (themeSelect) themeSelect.value = "all";
    if (seasonSelect) seasonSelect.value = "all";
    currentCategory = "all";
    filterCategory("all");
}

// 🔹 WISHLIST TOGGLE (Local Persistence)
function toggleWishlist(e, placeName) {
    e.stopPropagation();
    e.preventDefault();

    if (wishlistedPlaces.has(placeName)) {
        wishlistedPlaces.delete(placeName);
    } else {
        wishlistedPlaces.add(placeName);
    }

    try {
        localStorage.setItem("travelbharat_wishlist", JSON.stringify([...wishlistedPlaces]));
    } catch (err) {}

    handleDockSearch();
}

// 🔹 QUICK-VIEW MODAL CONTROLLER
function openQuickModal(placeName) {
    const place = places.find(p => (p.name || "").toLowerCase() === placeName.toLowerCase());
    if (!place) return;

    const modal = document.getElementById("quickModal");
    const img = document.getElementById("modalImg");
    const title = document.getElementById("modalTitle");
    const loc = document.getElementById("modalLocation");
    const cat = document.getElementById("modalCategory");
    const desc = document.getElementById("modalDesc");
    const season = document.getElementById("modalSeason");
    const rating = document.getElementById("modalRating");
    const deepLink = document.getElementById("modalDeepLink");
    const waLink = document.getElementById("modalWaLink");

    const capitalizedTitle = (place.title || place.name || "").split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const stateStr = (place.state || "India").toUpperCase();
    const cityStr = place.city ? `${place.city}, ` : "";

    img.src = place.image || "images/tajmahal.jpg";
    title.innerText = capitalizedTitle;
    loc.innerText = `📍 ${cityStr}${stateStr}`;
    cat.innerText = (place.category || "Luxury Heritage").toUpperCase();
    desc.innerText = place.description || "Discover the quintessential majesty of Bharat through private concierge arrangements.";
    season.innerText = place.bestTime || "October to March";
    rating.innerText = `★ ${(place.rating || 4.95).toFixed(2)}`;

    deepLink.href = `place.html?name=${encodeURIComponent(place.name || '')}`;
    waLink.href = `https://wa.me/917489771078?text=Hello TravelBharat! I wish to inquire about a luxury voyage to ${encodeURIComponent(capitalizedTitle)} (${stateStr}).`;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeQuickModal(e) {
    if (e && e.target && e.target.id === "modalContainer") return;
    const modal = document.getElementById("quickModal");
    if (modal) modal.classList.remove("active");
    document.body.style.overflow = "";
}

// 🔹 $500K SIGNATURE FEATURE: BESPOKE PLANNER CALCULATOR
let plannerState = {
    mood: "royal",
    duration: 7,
    tier: "signature"
};

const PLANNER_PRESETS = {
    royal: {
        title: "The Sovereign Rajputana & Mughal Circuit",
        badge: "Rajasthan & Agra • Royal Forts & Palaces",
        highlights: [
            "Private sunrise tour of the Taj Mahal with senior historian",
            "Exclusive access to Jaipur City Palace private chambers",
            "Sunset camel safari in Jaisalmer with candle-lit desert banquet",
            "Chauffeured luxury SUV with dedicated concierge butler"
        ],
        basePriceDay: 20000
    },
    himalayas: {
        title: "Celestial Himalayan Peaks & High Passes",
        badge: "Ladakh & Spiti • High-Altitude Sanctuary",
        highlights: [
            "Private luxury heated geodesic dome camping at Pangong Tso",
            "Exclusive sunrise meditation at Key Monastery with lama",
            "Helicopter sightseeing over Rohtang and Khardung La Pass",
            "Dedicated high-altitude medical concierge and oxygen lounge"
        ],
        basePriceDay: 25000
    },
    spiritual: {
        title: "Sacred Ghats & Himalayan Shrines",
        badge: "Varanasi, Rishikesh & Kedarnath • Char Dham",
        highlights: [
            "Private VIP dawn boat on holy Ganga with classical flute maestro",
            "Guaranteed VIP priority Darshan at Kedarnath and Badrinath",
            "Private ashram yoga masterclass overlooking Rishikesh rapids",
            "Helicopter charter transfers between holy mountain shrines"
        ],
        basePriceDay: 22000
    },
    coastal: {
        title: "Emerald Backwaters & Arabian Azure",
        badge: "Kerala & Goa • Coastal Serenity",
        highlights: [
            "Private presidential houseboat cruise along secluded Alleppey lagoons",
            "Tailored 7-step Ayurvedic rejuvenation therapy by master vaidyas",
            "Private sunset catamaran charter along South Goa coastline",
            "Curated seafood banquet prepared by Michelin-starred chef"
        ],
        basePriceDay: 19000
    }
};

const TIER_MULTIPLIERS = {
    signature: 1.0,
    palace: 1.6,
    jet: 2.8
};

function selectPlannerOption(btn, type, value) {
    // Update button active state
    btn.parentElement.querySelectorAll(".planner-choice-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");

    plannerState[type] = type === "duration" ? parseInt(value) : value;
    calculatePlanner();
}

function calculatePlanner() {
    const preset = PLANNER_PRESETS[plannerState.mood];
    const multiplier = TIER_MULTIPLIERS[plannerState.tier];
    const totalINR = Math.round(preset.basePriceDay * plannerState.duration * multiplier);

    const badgeEl = document.getElementById("previewBadge");
    const titleEl = document.getElementById("previewTitle");
    const listEl = document.getElementById("previewList");
    const priceEl = document.getElementById("previewPrice");
    const btnEl = document.getElementById("plannerInquireBtn");

    if (!titleEl) return;

    badgeEl.innerText = `${preset.badge} • ${plannerState.duration} Days`;
    titleEl.innerText = preset.title;

    listEl.innerHTML = preset.highlights.map(h => `<li>${h}</li>`).join("");
    priceEl.innerText = `₹${totalINR.toLocaleString('en-IN')}`;

    const waText = encodeURIComponent(
        `Hello TravelBharat Elite! I have curated a bespoke journey:\n\n` +
        `• Expedition: ${preset.title}\n` +
        `• Duration: ${plannerState.duration} Days\n` +
        `• Hospitality Tier: ${plannerState.tier.toUpperCase()}\n` +
        `• Estimated Budget: ₹${totalINR.toLocaleString('en-IN')} per guest\n\n` +
        `Please arrange a private VIP consultation with a senior concierge.`
    );

    btnEl.href = `https://wa.me/917489771078?text=${waText}`;
}

// 🔹 NEWSLETTER FORM HANDLER
function handleNewsletter(e) {
    e.preventDefault();
    const email = document.getElementById("newsEmail").value;
    alert(`✨ Welcome to The Sovereign Gazette! A private dispatch has been routed to ${email}.`);
    e.target.reset();
}

// 🔹 GLOBAL SCROLL EFFECTS
window.addEventListener("scroll", () => {
    const nav = document.getElementById("navbar");
    const btt = document.getElementById("backToTop");

    if (window.scrollY > 40) {
        if (nav) nav.classList.add("scrolled");
        if (btt) btt.classList.add("visible");
    } else {
        if (nav) nav.classList.remove("scrolled");
        if (btt) btt.classList.remove("visible");
    }
});

// 🔹 INTERSECTION OBSERVER FOR REVEALS
function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll(".reveal:not(.active)").forEach(el => observer.observe(el));
}

// 🔹 UTILITIES
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
