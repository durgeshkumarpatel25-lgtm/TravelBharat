const container = document.getElementById("placeContainer") || document.getElementById("stateContainer");

let places = [];

// 🔥 API CALL
fetch(`http://localhost:5000/places?t=${Date.now()}`)
    .then(res => res.json())
    .then(data => {
        places = data;
        // Check if renderPlaces exists globally (from script.js or state.js)
        if (typeof renderPlaces === "function") {
            renderPlaces(places);
        } else {
            // Fallback for pages that only use data.js
            defaultRender(places);
        }
    })
    .catch(err => {
        console.error("Error fetching data:", err);
        if (container) {
            container.innerHTML = `
                <div style="text-align:center; padding: 20px; color: #ef4444;">
                    <p>Failed to connect to backend server. ❌</p>
                </div>
            `;
        }
    });


// 🔹 Default Render Function (if not overwritten)
function defaultRender(data) {
    if (!container) return;
    container.innerHTML = "";
    if (!data || data.length === 0) {
        container.innerHTML = "<p style='text-align:center;'>No places found. <a href='http://localhost:5000/add' target='_blank'>Seed Data</a></p>";
        return;
    }
    data.forEach(place => {
        container.innerHTML += `
        <div class="place-card" data-name="${place.name}" data-state="${place.state}">
        <a href="place.html?name=${encodeURIComponent((place.name || "").trim())}">
        <img src="${place.image || 'images/default.jpg'}" onerror="this.onerror=null; this.src='images/default.jpg';" alt="${place.title}">
        <h3>${place.title}</h3>
        <p>${place.state}</p>
        </a>
        </div>
        `;
    });
}


// 🔹 Search (Only if searchInput exists)
const searchInput = document.getElementById("searchInput");
if (searchInput) {
    searchInput.addEventListener("keyup", function () {
        let input = this.value.toLowerCase();
        let filtered = places.filter(place =>
            (place.name || "").toLowerCase().includes(input) ||
            (place.state || "").toLowerCase().includes(input) ||
            (place.category || "").toLowerCase().includes(input)
        );
        if (typeof renderPlaces === "function") renderPlaces(filtered);
        else defaultRender(filtered);
    });
}


// 🔹 State Filter
function filterState(state) {
    if (state === "all") {
        if (typeof renderPlaces === "function") renderPlaces(places);
        else defaultRender(places);
    } else {
        const sName = state.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        let filtered = places.filter(place => (place.state || "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase() === sName);
        if (typeof renderPlaces === "function") renderPlaces(filtered);
        else defaultRender(filtered);
    }
}


// 🔹 Category Filter
function filterCategory(category) {
    if (category === "all") {
        if (typeof renderPlaces === "function") renderPlaces(places);
        else defaultRender(places);
    } else {
        let filtered = places.filter(place => (place.category || "").toLowerCase() === category.toLowerCase());
        if (typeof renderPlaces === "function") renderPlaces(filtered);
        else defaultRender(filtered);
    }
}