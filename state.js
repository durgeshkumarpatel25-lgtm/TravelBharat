// ==========================================================================
// TRAVELBHARAT ELITE - REGIONAL STATE CONTROLLER & INTERACTIVE SUITE
// Clean, modular, and easy to extend with new states and features!
// ==========================================================================

// Global state tracking
let activeStateId = "rajasthan"; // Default fallback
let currentDataStore = (typeof places !== "undefined" && Array.isArray(places)) ? places : [];

// DOM Element References
const stateTitle = document.getElementById("stateTitle");
const stateDesc = document.getElementById("stateDesc");
const stateBadge = document.getElementById("stateBadge");
const stateContainer = document.getElementById("stateContainer");
const regionalHero = document.getElementById("regionalHero");
const breadcrumbState = document.getElementById("breadcrumbState");
const statePillsList = document.getElementById("statePillsList");
const stateOverview = document.getElementById("stateOverview");

// Fact Cards
const factCapital = document.getElementById("factCapital");
const factSeason = document.getElementById("factSeason");
const factHighlights = document.getElementById("factHighlights");
const factDestinations = document.getElementById("factDestinations");

// Section titles
const statePortfolioTitle = document.getElementById("statePortfolioTitle");
const statePortfolioSubtitle = document.getElementById("statePortfolioSubtitle");
const stateSectionTag = document.getElementById("stateSectionTag");

// Concierge Banner
const conciergeBannerTitle = document.getElementById("conciergeBannerTitle");
const conciergeBannerDesc = document.getElementById("conciergeBannerDesc");
const conciergeWhatsappBtn = document.getElementById("conciergeWhatsappBtn");
const navVipBtn = document.getElementById("navVipBtn");

// 🔹 INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    // 1. Determine Initial State from URL
    const params = new URLSearchParams(window.location.search);
    const rawParam = params.get("state") || params.get("display") || "";
    
    if (rawParam) {
        const found = getStateConfig(rawParam);
        if (found) {
            activeStateId = found.id;
        } else {
            activeStateId = rawParam.toLowerCase().trim();
        }
    } else {
        // If no parameter provided, default to Rajasthan or "all"
        activeStateId = "rajasthan";
    }

    // 2. Render State Switcher Pills
    renderStatePills();

    // 3. Initial Render
    if (typeof places !== "undefined" && Array.isArray(places) && places.length > 0) {
        currentDataStore = places;
        selectState(activeStateId, false);
    }

    // 4. Background Sync with Live Backend (if configured)
    if (typeof syncBackendData === "function") {
        syncBackendData((updatedPlaces) => {
            currentDataStore = updatedPlaces;
            selectState(activeStateId, false);
        });
    }

    // 5. Browser History Support (Back/Forward)
    window.addEventListener("popstate", (e) => {
        const urlParams = new URLSearchParams(window.location.search);
        const stateKey = urlParams.get("state") || "rajasthan";
        selectState(stateKey, false);
    });
});

// 🔹 RENDER INTERACTIVE STATE PILLS
function renderStatePills() {
    if (!statePillsList || typeof STATES_DIRECTORY === "undefined") return;

    statePillsList.innerHTML = "";

    // "All Regions" Pill
    const allPill = document.createElement("button");
    allPill.className = `state-pill-btn ${activeStateId === "all" ? "active" : ""}`;
    allPill.dataset.state = "all";
    allPill.innerHTML = `<span>✨</span><span>All States</span>`;
    allPill.onclick = () => selectState("all", true);
    statePillsList.appendChild(allPill);

    // Individual State Pills
    STATES_DIRECTORY.forEach(st => {
        const pill = document.createElement("button");
        const isActive = (st.id === activeStateId || st.name.toLowerCase() === activeStateId);
        pill.className = `state-pill-btn ${isActive ? "active" : ""}`;
        pill.dataset.state = st.id;
        pill.innerHTML = `<span>${st.icon || "📍"}</span><span>${st.name}</span>`;
        pill.onclick = () => selectState(st.id, true);
        statePillsList.appendChild(pill);
    });
}

// 🔹 SWITCH & RENDER ACTIVE STATE
function selectState(stateId, updateUrl = true) {
    activeStateId = stateId.toLowerCase().trim();

    // 1. Update active class on pills
    if (statePillsList) {
        const buttons = statePillsList.querySelectorAll(".state-pill-btn");
        buttons.forEach(btn => {
            const btnState = btn.dataset.state;
            if (btnState === activeStateId) {
                btn.classList.add("active");
                // Scroll into view if needed
                btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
            } else {
                btn.classList.remove("active");
            }
        });
    }

    // 2. Fetch State Configuration
    const stateConfig = (typeof getStateConfig === "function") ? getStateConfig(activeStateId) : null;

    // 3. Filter Destinations
    let filteredPlaces = [];
    if (activeStateId === "all") {
        filteredPlaces = currentDataStore;
    } else {
        const cleanTarget = activeStateId.replace(/[^a-z0-9]/g, '');
        filteredPlaces = currentDataStore.filter(p => {
            const pState = (p.state || "").toLowerCase().replace(/[^a-z0-9]/g, '');
            return pState === cleanTarget || pState.includes(cleanTarget) || cleanTarget.includes(pState);
        });
    }

    // 4. Update Hero & Metadata
    if (activeStateId === "all") {
        if (stateTitle) stateTitle.innerText = "All Sovereign Regions";
        if (stateDesc) stateDesc.innerText = "Discover handpicked luxury estates, ancient heritage, and serene natural escapes across every state of Incredible India.";
        if (stateBadge) stateBadge.innerText = "The Sovereign Federation of Bharat";
        if (breadcrumbState) breadcrumbState.innerText = "All Regions";
        if (regionalHero) {
            regionalHero.style.backgroundImage = `url('images/jaisalmer.jpg')`;
        }

        // Facts
        if (factCapital) factCapital.innerText = "28 States & Regions";
        if (factSeason) factSeason.innerText = "Year-Round Escapes";
        if (factHighlights) factHighlights.innerText = "Heritage, Coast, Peaks & Sanctuaries";
        if (factDestinations) factDestinations.innerText = `${currentDataStore.length} Curated Escapes`;

        // Section Title
        if (statePortfolioTitle) statePortfolioTitle.innerText = "Complete Indian Heritage Portfolio";
        if (statePortfolioSubtitle) statePortfolioSubtitle.innerText = "Curated private estates across the sovereign regions of Bharat.";
        if (stateSectionTag) stateSectionTag.innerText = "National Directory";

        // Concierge
        if (conciergeBannerTitle) conciergeBannerTitle.innerText = "Curate Your Sovereign Multi-State Odyssey";
        if (conciergeBannerDesc) conciergeBannerDesc.innerText = "Connect with our elite travel concierges for bespoke cross-state itineraries with private aviation and heritage palace stays.";
        const defaultWa = `https://wa.me/917489771078?text=${encodeURIComponent("Hello TravelBharat! I wish to curate a bespoke luxury journey across India.")}`;
        if (conciergeWhatsappBtn) conciergeWhatsappBtn.href = defaultWa;
        if (navVipBtn) navVipBtn.href = defaultWa;

    } else if (stateConfig) {
        if (stateTitle) stateTitle.innerText = `${stateConfig.name} • ${stateConfig.tagline}`;
        if (stateDesc) stateDesc.innerText = stateConfig.desc;
        if (stateBadge) stateBadge.innerText = `${stateConfig.badge} • Sovereign Gateway`;
        if (breadcrumbState) breadcrumbState.innerText = stateConfig.name;
        if (regionalHero && stateConfig.hero) {
            regionalHero.style.backgroundImage = `url('${stateConfig.hero}')`;
        }

        // Facts
        if (factCapital) factCapital.innerText = stateConfig.capital;
        if (factSeason) factSeason.innerText = stateConfig.bestSeason;
        if (factHighlights) factHighlights.innerText = stateConfig.famousFor;
        const countStr = `${filteredPlaces.length} Signature ${filteredPlaces.length === 1 ? 'Escape' : 'Escapes'}`;
        if (factDestinations) factDestinations.innerText = countStr;

        // Section Title
        if (statePortfolioTitle) statePortfolioTitle.innerHTML = `Curated Escapes in <span style="background: var(--gold-grad); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${stateConfig.name}</span>`;
        if (statePortfolioSubtitle) statePortfolioSubtitle.innerText = `Handpicked private sanctuaries and architectural wonders in ${stateConfig.name}.`;
        if (stateSectionTag) stateSectionTag.innerText = `${stateConfig.name} Portfolio`;

        // Concierge
        if (conciergeBannerTitle) conciergeBannerTitle.innerText = `Curate Your Private ${stateConfig.name} Expedition`;
        if (conciergeBannerDesc) conciergeBannerDesc.innerText = `Our royal historians and concierge desk organize private palace suites, sunrise fortress access, and chauffeured transit across ${stateConfig.name}.`;
        const waMsg = `Hello TravelBharat! I would like to plan a bespoke VIP journey to ${stateConfig.name}.`;
        const waLink = `https://wa.me/917489771078?text=${encodeURIComponent(waMsg)}`;
        if (conciergeWhatsappBtn) conciergeWhatsappBtn.href = waLink;
        if (navVipBtn) navVipBtn.href = waLink;

    } else {
        // Fallback for custom state query
        const displayName = activeStateId.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        if (stateTitle) stateTitle.innerText = `${displayName} • Sovereign Territory`;
        if (stateDesc) stateDesc.innerText = `Explore handpicked luxury estates and private itineraries throughout ${displayName}.`;
        if (stateBadge) stateBadge.innerText = "Regional Gateway";
        if (breadcrumbState) breadcrumbState.innerText = displayName;
        if (regionalHero) regionalHero.style.backgroundImage = `url('images/tajmahal.jpg')`;

        if (factCapital) factCapital.innerText = "Regional Gateway";
        if (factSeason) factSeason.innerText = "October to March";
        if (factHighlights) factHighlights.innerText = "Heritage & Nature";
        if (factDestinations) factDestinations.innerText = `${filteredPlaces.length} Destinations`;

        if (statePortfolioTitle) statePortfolioTitle.innerText = `Curated Escapes in ${displayName}`;
        if (statePortfolioSubtitle) statePortfolioSubtitle.innerText = `Handpicked private sanctuaries in ${displayName}.`;
    }

    // 5. Render Destination Cards
    renderDestinationCards(filteredPlaces);

    // 6. Update URL in Browser Address Bar without reloading
    if (updateUrl && window.history && window.history.pushState) {
        const newUrl = (activeStateId === "all") 
            ? `${window.location.pathname}`
            : `${window.location.pathname}?state=${encodeURIComponent(activeStateId)}`;
        window.history.pushState({ state: activeStateId }, "", newUrl);
    }
}

// 🔹 RENDER LUXURY DESTINATION CARDS
function renderDestinationCards(placesList) {
    if (!stateContainer) return;

    stateContainer.innerHTML = "";

    if (!placesList || placesList.length === 0) {
        stateContainer.innerHTML = `
            <div style="text-align: center; padding: 70px 20px; grid-column: 1 / -1; background: rgba(16, 25, 46, 0.45); border-radius: var(--radius-xl); border: 1px dashed var(--gold-border);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">✨</div>
                <h3 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--text-pure); margin-bottom: 10px;">Private Curations In Progress</h3>
                <p style="color: var(--text-muted); max-width: 520px; margin: 0 auto 1.6rem; line-height: 1.7;">
                    Our cultural historians are actively documenting new sovereign estates and private palace accesses for this state. Inquire directly or explore our other top regions.
                </p>
                <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                    <button onclick="selectState('all', true)" class="btn-gold">View All 19 Escapes →</button>
                    <button onclick="selectState('rajasthan', true)" class="btn-outline">Explore Rajasthan</button>
                    <button onclick="selectState('kerala', true)" class="btn-outline">Explore Kerala</button>
                </div>
            </div>
        `;
        return;
    }

    placesList.forEach((place, index) => {
        const title = (place.title || place.name || "").split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        const stateStr = (place.state || "India").toUpperCase();
        const cityStr = place.city ? `${place.city}, ` : "";
        const category = (place.category || "Luxury").toUpperCase();
        const rating = place.rating || 4.95;
        const reviews = place.reviews || 2400;
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
                     loading="lazy"
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
                        <span style="color: var(--text-muted); font-size: 0.75rem; font-weight: 500;">(${reviews.toLocaleString()})</span>
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