// ==========================================================================
// TRAVELBHARAT ELITE - REGIONAL STATE CONTROLLER
// ==========================================================================

const params = new URLSearchParams(window.location.search);
const stateParam = params.get("state") ? params.get("state").trim() : null;
const displayParam = params.get("display") ? params.get("display").trim() : null;

const stateTitle = document.getElementById("stateTitle");
const stateDesc = document.getElementById("stateDesc");
const stateContainer = document.getElementById("stateContainer");
const regionalHero = document.getElementById("regionalHero");

const STATE_DETAILS = {
    "rajasthan": {
        title: "Rajasthan • The Sovereign Land of Kings",
        desc: "A golden tapestry of Thar Desert sands, invincible hilltop fortresses, and opulent Maharaja palaces celebrating timeless chivalry and artistry.",
        hero: "images/jaisalmer.jpg"
    },
    "kerala": {
        title: "Kerala • God's Own Emerald Coast",
        desc: "A tropical coastal haven of emerald palm-lined backwaters, misty Cardamom hills, and authentic Ayurvedic wellness sanctuaries.",
        hero: "images/kerala.jpg"
    },
    "goa": {
        title: "Goa • The Azure Portuguese Riviera",
        desc: "Endless golden beaches, private yacht charters, sun-kissed spice plantations, and historic Baroque churches along the Arabian Sea.",
        hero: "images/goa.jpg"
    },
    "himachal pradesh": {
        title: "Himachal Pradesh • Abode of Snow & Cedar",
        desc: "Majestic alpine summits, high mountain passes, ancient wooden temples, and peaceful monasteries nestled in towering pine valleys.",
        hero: "images/spiti.jpg"
    },
    "madhya pradesh": {
        title: "Madhya Pradesh • Heart of Incredible India",
        desc: "Dense teak jungles where Bengal tigers roam free, UNESCO Khajuraho temples, and serene hilltop sanctuaries steeped in tribal folklore.",
        hero: "images/kanha.jpg"
    },
    "uttar pradesh": {
        title: "Uttar Pradesh • The Cradle of Civilization",
        desc: "The sacred soul of Bharat, home to the eternal dawn ghats of Varanasi and the immortal white marble wonder of the Taj Mahal in Agra.",
        hero: "images/tajmahal.jpg"
    },
    "uttarakhand": {
        title: "Uttarakhand • Devbhumi The Land of Gods",
        desc: "Sacred Himalayan heights, roaring sacred rivers, holy Char Dham pilgrimage sanctums, and the world's premier yoga retreats in Rishikesh.",
        hero: "images/kedarnath.jpg"
    },
    "ladakh": {
        title: "Ladakh • The High-Altitude Moonland",
        desc: "Snow-crowned passes, sapphire-blue high alpine lakes, centuries-old Buddhist gompas, and untamed celestial starlight skies.",
        hero: "images/ladakh.jpg"
    },
    "meghalaya": {
        title: "Meghalaya • The Abode of Clouds",
        desc: "Living root bridges woven over centuries, crystal-clear emerald rivers at Dawki, and dramatic mist-draped waterfalls plunging into deep gorges.",
        hero: "images/meghalaya.jpg"
    },
    "jammu & kashmir": {
        title: "Jammu & Kashmir • Paradise on Earth",
        desc: "The revered mountain sanctum of Vaishno Devi, alpine meadows, and timeless spiritual devotion amidst the sacred Trikuta peaks.",
        hero: "images/vaishnodevi.jpg"
    },
    "odisha": {
        title: "Odisha • Sacred Sands & Architectural Grace",
        desc: "Golden sunrise shores on the Bay of Bengal, the divine sanctum of Lord Jagannath, and world-renowned sand sculpture traditions.",
        hero: "images/puri.jpg"
    },
    "chhattisgarh": {
        title: "Chhattisgarh • The Tribal Heartland",
        desc: "Ancient untouched forests, gravity-defying streams at Mainpat, cascading jungle waterfalls, and deep prehistoric rock art traditions.",
        hero: "images/ulta pani.jpg"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    if (typeof places !== "undefined" && Array.isArray(places)) {
        renderStatePage(places);
    }

    syncBackendData((updatedPlaces) => {
        renderStatePage(updatedPlaces);
    });
});

function renderStatePage(allData) {
    if (!stateContainer) return;

    let targetKey = "";
    let displayName = "All Sovereign Regions";

    if (displayParam) {
        displayName = displayParam;
        targetKey = displayParam.toLowerCase().trim();
    } else if (stateParam) {
        displayName = stateParam;
        targetKey = stateParam.toLowerCase().trim();
    }

    // Match with dictionary
    let matchedDetail = null;
    for (let key in STATE_DETAILS) {
        if (targetKey.includes(key) || key.includes(targetKey)) {
            matchedDetail = STATE_DETAILS[key];
            break;
        }
    }

    if (matchedDetail) {
        if (stateTitle) stateTitle.innerText = matchedDetail.title;
        if (stateDesc) stateDesc.innerText = matchedDetail.desc;
        if (regionalHero && matchedDetail.hero) {
            regionalHero.style.backgroundImage = `url('${matchedDetail.hero}')`;
        }
    } else if (targetKey) {
        const capitalized = displayName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        if (stateTitle) stateTitle.innerText = `${capitalized} • Sovereign Territory`;
        if (stateDesc) stateDesc.innerText = `Explore handpicked luxury estates and private itineraries throughout ${capitalized}.`;
    } else {
        if (stateTitle) stateTitle.innerText = "All Sovereign Regions";
        if (stateDesc) stateDesc.innerText = "Discover the diverse luxury and timeless heritage across every state of Incredible India.";
    }

    // Filter places
    const filtered = !targetKey ? allData : allData.filter(p => {
        const pState = (p.state || "").toLowerCase().replace(/[^a-z0-9]/g, '');
        const cleanTarget = targetKey.replace(/[^a-z0-9]/g, '');
        return pState === cleanTarget || pState.includes(cleanTarget) || cleanTarget.includes(pState);
    });

    stateContainer.innerHTML = "";

    if (filtered.length === 0) {
        stateContainer.innerHTML = `
            <div style="text-align: center; padding: 80px 20px; grid-column: 1 / -1; background: rgba(16, 25, 46, 0.4); border-radius: var(--radius-xl); border: 1px dashed var(--gold-border);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">✨</div>
                <h3 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--text-pure); margin-bottom: 8px;">Private Curations In Progress</h3>
                <p style="color: var(--text-muted); max-width: 500px; margin: 0 auto 1.5rem;">Our historians are actively curating new sovereign estates in this region. Check back soon or contact your concierge.</p>
                <a href="index.html#states" class="btn-gold">Explore Other Regions →</a>
            </div>
        `;
        return;
    }

    filtered.forEach((place, index) => {
        const title = (place.title || place.name || "").split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        const stateStr = (place.state || "India").toUpperCase();
        const cityStr = place.city ? `${place.city}, ` : "";
        const category = (place.category || "Luxury").toUpperCase();
        const rating = place.rating || 4.96;
        const rawTime = place.bestTime || "";
        const bestTime = (rawTime.length > 0 && rawTime.length < 32) ? rawTime : "October to March";

        const card = document.createElement("div");
        card.className = "lux-card reveal active";
        card.style.animationDelay = `${(index % 6) * 0.08}s`;

        card.innerHTML = `
            <div class="card-img-wrapper">
                <span class="card-badge">${category}</span>
                <img src="${place.image || 'images/default.jpg'}" 
                     alt="${title}"
                     onerror="this.onerror=null; this.src='images/tajmahal.jpg';">
                <div class="card-season-pill">
                    <span>🗓️</span> ${bestTime}
                </div>
            </div>
            <div class="card-content">
                <div class="card-location">
                    <span>📍</span> ${cityStr}${stateStr}
                </div>
                <h3 class="card-title">${title}</h3>
                <p class="card-description">${place.description || 'Step into royal serenity, where centuries of architectural mastery and pristine natural beauty converge.'}</p>
                <div class="card-footer">
                    <div class="card-rating">
                        <span>★</span> ${rating.toFixed(2)}
                    </div>
                    <div class="card-btn-group">
                        <a href="place.html?name=${encodeURIComponent(place.name || '')}" class="card-link-btn">Explore Guide →</a>
                    </div>
                </div>
            </div>
        `;

        stateContainer.appendChild(card);
    });
}