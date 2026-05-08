const params = new URLSearchParams(window.location.search);
const stateName = params.get("state") ? params.get("state").trim() : null;
console.log("State Name from URL:", stateName);

// elements
const stateTitle = document.getElementById("stateTitle");
const stateDesc = document.getElementById("stateDesc");
const stateContainer = document.getElementById("stateContainer");

// State Descriptions Map
const descriptions = {
    "rajasthan": "The Land of Kings, Rajasthan is a tapestry of desert sands, majestic forts, and vibrant culture. Home to the Thar Desert and the ancient Aravalli Range, it offers a glimpse into India's royal past.",
    "kerala": "God's Own Country, Kerala is a tropical paradise of palm-lined backwaters, misty hill stations, and rich spice plantations. It is the cradle of Ayurveda and traditional performing arts.",
    "goa": "India's Sunshine State, Goa is famous for its endless golden beaches, Portuguese heritage, and vibrant nightlife. It is a unique blend of coastal relaxation and cultural history.",
    "himachal pradesh": "The Abode of Snow, Himachal is a majestic mountain region of towering peaks, lush valleys, and serene monasteries. It is a haven for adventurers and spiritual seekers alike.",
    "madhya pradesh": "The Heart of Incredible India, MP is home to dense teak forests, ancient temples, and rich tribal heritage. It is where history meets the wild, from Khajuraho to Kanha.",
    "uttar pradesh": "The Cradle of Civilization, UP is the spiritual soul of India. From the timeless ghats of Varanasi to the iconic Taj Mahal, it is a journey through deep spirituality and history.",
    "chhattisgarh": "The Tribal Heartland, Chhattisgarh is a land of unexplored forests, breathtaking waterfalls, and ancient folk traditions. It is one of India's most ecologically diverse and culturally rich regions."
};

// Override renderPlaces to filter by state on this page
function renderPlaces(allData) {
    if (!stateContainer) return;

    if (!stateName) {
        if (stateTitle) stateTitle.innerText = "Explore All Regions";
        if (stateDesc) stateDesc.innerText = "Discover the diverse beauty and hidden gems across all of India's states.";
    } else {
        const capitalizedState = stateName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        if (stateTitle) stateTitle.innerText = capitalizedState;
        if (stateDesc) stateDesc.innerText = descriptions[stateName.toLowerCase()] || `Explore the hidden gems and breathtaking landscapes of ${capitalizedState}.`;
    }

    stateContainer.innerHTML = "";

    console.log("Filtering places for state:", stateName);
    const displayParam = params.get("display");

    if (stateName && displayParam) {
        const capitalizedState = displayParam.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        if (stateTitle) stateTitle.innerText = capitalizedState;
        if (stateDesc) stateDesc.innerText = descriptions[displayParam.toLowerCase()] || `Explore the hidden gems and breathtaking landscapes of ${capitalizedState}.`;
    }

    const filtered = !stateName ? allData : allData.filter(p => {
        const pState = (p.state || "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        const sName = stateName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        return pState === sName;
    });

    console.log("Filtered Results Count:", filtered.length);

    if (filtered.length === 0) {
        stateContainer.innerHTML = "<h2 style='grid-column: 1/-1; text-align:center; padding: 50px;'>Coming soon to this region...</h2>";
        return;
    }

    // render
    filtered.forEach(function (place) {
        const capitalizedTitle = (place.title || '').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const capitalizedState = (place.state || '').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        stateContainer.innerHTML += `
        <div class="lux-card reveal">
            <a href="place.html?name=${encodeURIComponent(place.name || '')}" style="text-decoration: none; color: inherit;">
                <div class="card-img-wrapper">
                    <img src="${place.image || 'images/default.jpg'}" onerror="this.onerror=null; this.src='images/default.jpg';">
                    <div class="card-badge">Premium Experience</div>
                </div>
                <div class="card-content">
                    <h3>${capitalizedTitle}</h3>
                    <p>${capitalizedState} • 📍 Explore Heritage</p>
                </div>
            </a>
        </div>
        `;
    });

    // Trigger reveal animation for newly added cards
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    }, 50);
}

// If data is already loaded in data.js, call renderPlaces manually
if (typeof places !== "undefined" && places.length > 0) {
    renderPlaces(places);
}