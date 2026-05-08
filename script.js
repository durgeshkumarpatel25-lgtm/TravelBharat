const container = document.getElementById("placeContainer");
const searchInput = document.getElementById("searchInput");

let allPlaces = [];

// 🔥 API CALL
fetch(`http://localhost:5000/places?t=${Date.now()}`)
    .then(res => {
        if (!res.ok) throw new Error("Failed to fetch places");
        return res.json();
    })
    .then(data => {
        allPlaces = data;
        renderPlaces(allPlaces);
        renderStates(allPlaces);

        // 🔍 Search event
        if (searchInput) {
            searchInput.addEventListener("keyup", (e) => {
                handleSearch();
            });
        }
    })
    .catch(err => {
        console.error("Error fetching data:", err);
        if (container) {
            container.innerHTML = `
                <div style="text-align:center; padding: 40px; color: #ef4444; background: white; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                    <h3 style="font-family: 'Outfit'; margin-bottom: 10px;">Service Connection Interrupted ❌</h3>
                    <p style="opacity: 0.7;">Unable to reach the luxury travel database. Please ensure the backend is active.</p>
                </div>
            `;
        }
    });


// 🔹 Render Function (Luxury Cards)
function renderPlaces(data) {
    if (!container) return;
    container.innerHTML = "";

    if (!data || data.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 100px 0; width: 100%; grid-column: 1 / -1;">
                <p style="font-size: 1.2rem; opacity: 0.5;">No elite destinations match your criteria.</p>
            </div>
        `;
        return;
    }

    data.forEach((place, index) => {
        const capitalizedTitle = (place.title || '').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const capitalizedState = (place.state || '').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        container.innerHTML += `
        <div class="lux-card reveal" style="animation-delay: ${index * 0.1}s">
            <a href="place.html?name=${encodeURIComponent(place.name || '')}" style="text-decoration: none; color: inherit;">
                <div class="card-img-wrapper">
                    <span class="card-badge">${place.category || 'Destinations'}</span>
                    <img src="${place.image || 'images/default.jpg'}" 
                         onerror="this.onerror=null; this.src='images/default.jpg';" 
                         alt="${capitalizedTitle}">
                </div>
                <div class="card-content">
                    <h3>${capitalizedTitle}</h3>
                    <p>${capitalizedState}</p>
                </div>
            </a>
        </div>
        `;
    });

    // Re-initialize animations
    initReveal();
}

// 🔹 Scroll Reveal Logic
function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}


// 🔹 Render States (Luxury Bubbles)
function renderStates(data) {
    // print data 
    console.log(data);
    const stateContainer = document.getElementById("homeStateContainer");
    if (!stateContainer) return;

    const normalizedData = data.map(p => ({
        ...p,
        normState: (p.state || "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase(),
        displayState: (p.state || "").trim()
    }));

    const uniqueNorms = [...new Set(normalizedData.map(p => p.normState))].filter(Boolean);

    if (uniqueNorms.length === 0) return;

    stateContainer.innerHTML = "";

    // Luxury Gradients Palette
    const gradients = [
        "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
        "linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)",
        "linear-gradient(135deg, #0ea5e9 0%, #22d3ee 100%)",
        "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
        "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
        "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)"
    ];

    uniqueNorms.forEach((norm, index) => {
        const displayState = normalizedData.find(p => p.normState === norm).displayState;
        const capitalizedState = displayState.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const count = normalizedData.filter(p => p.normState === norm).length;
        const grad = gradients[index % gradients.length];

        stateContainer.innerHTML += `
            <a href="state.html?state=${encodeURIComponent(norm)}&display=${encodeURIComponent(displayState)}" class="state-item" style="background: ${grad}; border: none; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
                <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
                    <b style="color: white; font-size: 1.2rem;">${capitalizedState}</b>
                    <span style="font-size: 0.75rem; opacity: 0.9; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: white;">
                        ${count} Destinations
                    </span>
                </div>
            </a>
        `;
    });
}


// 🔹 Global Scroll Effects
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');

    if (window.scrollY > 50) {
        if (nav) nav.classList.add('scrolled');
        if (backToTop) backToTop.classList.add('visible');
    } else {
        if (nav) nav.classList.remove('scrolled');
        if (backToTop) backToTop.classList.remove('visible');
    }
});

// 🔹 Back to Top Function
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 🔹 Search with UX Feedback
let searchTimeout;
function handleSearch() {
    if (!searchInput) return;

    // Show subtle loading state
    container.style.opacity = '0.5';

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        let input = searchInput.value.toLowerCase();
        let filtered = allPlaces.filter(place => {
            const name = (place.name || "").toLowerCase();
            const state = (place.state || "").toLowerCase();
            const category = (place.category || "").toLowerCase();
            return name.includes(input) || state.includes(input) || category.includes(input);
        });

        renderPlaces(filtered);
        container.style.opacity = '1';
    }, 300);
}

// 🔹 Initial Reveal for existing content
document.addEventListener('DOMContentLoaded', () => {
    // Add Back to Top Button to body
    const btt = document.createElement('button');
    btt.id = 'backToTop';
    btt.innerHTML = '↑';
    btt.onclick = scrollToTop;
    document.body.appendChild(btt);

    initReveal();
});

// 🔹 State Filter (BEST VERSION)
function filterState(state) {
    const sName = state === "all" ? "all" : state.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    let filtered = state === "all" ? allPlaces :
        allPlaces.filter(p => (p.state || "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase() === sName);
    renderPlaces(filtered);

    // Smooth scroll to destinations
    document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
}

function filterCategory(category) {
    updateActiveFilter(category);
    let filtered = category === "all" ? allPlaces :
        allPlaces.filter(p => (p.category || "").toLowerCase() === category.toLowerCase());
    renderPlaces(filtered);

    // Smooth scroll to destinations
    document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
}

// 🔹 Filter Logic with Active State
function updateActiveFilter(value) {
    document.querySelectorAll('.filter-tab').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase() === value.toLowerCase() ||
            (value === 'all' && btn.innerText.toLowerCase() === 'all')) {
            btn.classList.add('active');
        }
    });
}

// Add reveal class to sections on load
document.querySelectorAll('section').forEach(sec => sec.classList.add('reveal'));
initReveal();
