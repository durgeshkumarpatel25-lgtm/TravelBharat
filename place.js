// ==========================================================================
// TRAVELBHARAT ELITE - CINEMATIC DESTINATION CONTROLLER
// ==========================================================================

const params = new URLSearchParams(window.location.search);
const placeParam = params.get("name") ? params.get("name").trim() : null;
const placeDetailsContainer = document.getElementById("placeDetails");

document.addEventListener("DOMContentLoaded", () => {
    if (typeof places !== "undefined" && Array.isArray(places)) {
        renderDestination(places);
    }

    syncBackendData((updatedPlaces) => {
        renderDestination(updatedPlaces);
    });

    // Mobile Menu Toggle
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
});

function renderDestination(allData) {
    if (!placeDetailsContainer) return;

    if (!placeParam) {
        placeDetailsContainer.innerHTML = `
            <div style="text-align: center; padding: 160px 20px 100px;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🏛️</div>
                <h2 style="font-family: var(--font-heading); font-size: 2.2rem; color: var(--text-pure); margin-bottom: 1rem;">No Destination Selected</h2>
                <p style="color: var(--text-muted); margin-bottom: 2rem;">Please choose a destination from our curated portfolio to view private insights.</p>
                <a href="index.html#destinations" class="btn-gold">Explore Handpicked Escapes →</a>
            </div>
        `;
        return;
    }

    const searchKey = placeParam.toLowerCase().replace(/[^a-z0-9]/g, '');
    const place = allData.find(p => {
        const pId = (p._id || "").toString().toLowerCase();
        const pName = (p.name || "").toLowerCase().replace(/[^a-z0-9]/g, '');
        const pTitle = (p.title || "").toLowerCase().replace(/[^a-z0-9]/g, '');
        return pId === placeParam.toLowerCase() ||
            pName === searchKey ||
            pTitle === searchKey ||
            (searchKey.length >= 4 && (pName.includes(searchKey) || searchKey.includes(pName))) ||
            (searchKey.length >= 4 && (pTitle.includes(searchKey) || searchKey.includes(pTitle)));
    }) || allData.find(p => p.name === "tajmahal") || allData[0];

    if (!place) {
        placeDetailsContainer.innerHTML = `
            <div style="text-align: center; padding: 160px 20px 100px;">
                <h2 style="font-family: var(--font-heading); font-size: 2.2rem; color: var(--text-pure); margin-bottom: 1rem;">Destination Not Found In Portfolio</h2>
                <p style="color: var(--text-muted); margin-bottom: 2rem;">The requested retreat is either private or undergoing curation.</p>
                <a href="index.html#destinations" class="btn-gold">Return to Portfolio →</a>
            </div>
        `;
        return;
    }

    const title = (place.title || place.name || "").split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const state = (place.state || "India").toUpperCase();
    const city = place.city ? `${place.city}, ` : "";
    const category = (place.category || "Luxury Heritage").toUpperCase();
    const rating = place.rating || 4.98;
    const reviews = place.reviews || 8400;
    const rawTime = place.bestTime || "";
    const bestTime = (rawTime.length > 0 && rawTime.length < 32) ? rawTime : "October to March";
    const desc = (place.description && place.description.length > 20) ? place.description : (rawTime.length > 32 ? rawTime : "Step into a realm where time stands still. This elite destination offers an unparalleled convergence of timeless heritage, royal architectural grace, and pristine natural serenity.");
    const heroImage = (typeof getPlaceImage === 'function') ? getPlaceImage(place, {}) : (place.image || 'images/jaisalmer.jpg');

    // Filter related places
    const related = allData.filter(p => p.name !== place.name).slice(0, 3);

    placeDetailsContainer.innerHTML = `
        <!-- CINEMATIC HERO -->
        <div class="cinematic-hero reveal active" style="background-image: url('${heroImage}');">
            <div class="cinematic-hero-content">
                <div class="cinematic-meta-row" style="margin-bottom: 1.2rem;">
                    <span class="gold-badge">${category}</span>
                    <span style="color: var(--gold-primary); font-weight: 700; font-size: 0.95rem;">★ ${rating.toFixed(2)} (${reviews.toLocaleString()} Elite Reviews)</span>
                    <span style="color: var(--text-secondary); font-size: 0.85rem; background: rgba(7,11,20,0.6); padding: 4px 12px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.1);">📍 ${city}${state}</span>
                </div>
                <h1 class="cinematic-title">${title}</h1>
                <p style="color: var(--text-secondary); font-size: 1.15rem; max-width: 750px; line-height: 1.7;">
                    An authenticated national treasure. Unveil private historical access, chauffeured transfers, and curated royal privileges.
                </p>
            </div>
        </div>

        <!-- DETAILS 2-COLUMN LAYOUT -->
        <div class="details-layout reveal active">
            <!-- Left Narrative Column -->
            <div>
                <div class="info-card">
                    <span class="section-tag">Historical Narrative & Soul</span>
                    <h3>The Essence of ${title}</h3>
                    <p class="description">${desc}</p>

                    <!-- Feature Matrix -->
                    <div class="details-feature-grid">
                        <div class="detail-feature-item">
                            <h4>Territory & State</h4>
                            <p>${state}</p>
                        </div>
                        <div class="detail-feature-item">
                            <h4>Urban Center / Base</h4>
                            <p>${place.city || state}</p>
                        </div>
                        <div class="detail-feature-item">
                            <h4>Curated Category</h4>
                            <p>${category}</p>
                        </div>
                        <div class="detail-feature-item">
                            <h4>Prime Seasonal Window</h4>
                            <p>${bestTime}</p>
                        </div>
                    </div>

                    <!-- Bespoke Privileges -->
                    <div style="margin-top: 3.5rem; padding-top: 2.5rem; border-top: 1px solid rgba(255,255,255,0.08);">
                        <h4 style="font-family: var(--font-heading); font-size: 1.4rem; color: var(--text-pure); margin-bottom: 1.5rem;">Sovereign Curated Privileges</h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem;">
                            <div style="display: flex; gap: 12px; align-items: flex-start;">
                                <span style="color: var(--gold-accent); font-size: 1.2rem;">✦</span>
                                <div>
                                    <h5 style="color: var(--text-pure); font-size: 0.95rem; font-weight: 700;">Private Off-Hour Access</h5>
                                    <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 3px;">Experience iconic monuments and temple sanctums away from public crowds.</p>
                                </div>
                            </div>
                            <div style="display: flex; gap: 12px; align-items: flex-start;">
                                <span style="color: var(--gold-accent); font-size: 1.2rem;">✦</span>
                                <div>
                                    <h5 style="color: var(--text-pure); font-size: 0.95rem; font-weight: 700;">Historian Escort</h5>
                                    <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 3px;">Accompanied by certified national archaeological and cultural scholars.</p>
                                </div>
                            </div>
                            <div style="display: flex; gap: 12px; align-items: flex-start;">
                                <span style="color: var(--gold-accent); font-size: 1.2rem;">✦</span>
                                <div>
                                    <h5 style="color: var(--text-pure); font-size: 0.95rem; font-weight: 700;">Chauffeured Armored Luxury</h5>
                                    <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 3px;">Mercedes-Maybach or Range Rover transfers with trained security drivers.</p>
                                </div>
                            </div>
                            <div style="display: flex; gap: 12px; align-items: flex-start;">
                                <span style="color: var(--gold-accent); font-size: 1.2rem;">✦</span>
                                <div>
                                    <h5 style="color: var(--text-pure); font-size: 0.95rem; font-weight: 700;">Royal Dining Experiences</h5>
                                    <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 3px;">Private candle-lit banquets prepared in historic pavilions by royal chefs.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Sticky Concierge Sidebar -->
            <div class="sidebar">
                <div class="sidebar-card">
                    <span class="gold-badge" style="margin-bottom: 1.2rem;">Bespoke Concierge Booking</span>
                    <h3 style="font-family: var(--font-heading); font-size: 1.7rem; color: var(--text-pure); margin-bottom: 1rem;">Experience ${title}</h3>
                    <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.7; margin-bottom: 1.8rem;">
                        Our senior travel concierges arrange fully customized private jets, palace suites, and cultural curators tailored to your party.
                    </p>

                    <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 18px; border-radius: var(--radius-md); margin-bottom: 2rem;">
                        <div style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 1.5px; color: var(--gold-accent); font-weight: 700;">Seasonal Status</div>
                        <div style="font-weight: 800; font-size: 1.15rem; color: var(--text-pure); margin-top: 4px;">Prime Window: ${bestTime}</div>
                        <div style="font-size: 0.8rem; color: var(--emerald-regal); margin-top: 5px;">● Concierge Reservations Active</div>
                    </div>

                    <a href="https://wa.me/917489771078?text=Hello TravelBharat Elite! I am interested in curating a private luxury journey to ${encodeURIComponent(title)} in ${encodeURIComponent(state)}. Please connect me with a senior concierge."
                       target="_blank" 
                       class="btn-gold" 
                       style="width: 100%; justify-content: center; text-decoration: none; padding: 16px; margin-bottom: 12px;">
                        <span>Inquire on WhatsApp</span>
                        <span>✦</span>
                    </a>

                    <button onclick="downloadBrochure('${title}', \`${desc}\`, '${bestTime}')" 
                            class="btn-outline" 
                            style="width: 100%; justify-content: center; padding: 14px; margin-bottom: 12px;">
                        <span>📥 Download Collector's Brochure</span>
                    </button>

                    <button onclick="shareExpedition('${title}')" 
                            class="btn-outline" 
                            style="width: 100%; justify-content: center; padding: 14px;">
                        <span>🔗 Share Destination</span>
                    </button>

                    <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.06); text-align: center;">
                        <div style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-muted);">VIP Concierge Direct Line</div>
                        <div style="font-weight: 700; color: var(--gold-primary); font-size: 1.1rem; margin-top: 4px;">+91 74897 71078</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- RELATED ESCAPES SECTION -->
        <section style="background: var(--bg-deep); border-top: 1px solid var(--gold-border);">
            <div class="section-header reveal active">
                <span class="section-tag">Complementary Portfolios</span>
                <h2 class="section-title">Other Sovereign Escapes</h2>
            </div>
            <div class="grid-container" style="max-width: 1300px; margin: 0 auto;">
                ${related.map(r => `
                    <div class="lux-card reveal active">
                        <div class="card-img-wrapper">
                            <span class="card-badge">${(r.category || 'Luxury').toUpperCase()}</span>
                            <img src="${(typeof getPlaceImage === 'function') ? getPlaceImage(r, {}) : (r.image || 'images/tajmahal.jpg')}" alt="${r.title}">
                            <div class="card-season-pill"><span>🗓️</span> ${r.bestTime || 'Oct - Mar'}</div>
                        </div>
                        <div class="card-content">
                            <div class="card-location"><span>📍</span> ${(r.state || 'India').toUpperCase()}</div>
                            <h3 class="card-title">${r.title}</h3>
                            <p class="card-description">${r.description || ''}</p>
                            <div class="card-footer">
                                <div class="card-rating">★ ${(r.rating || 4.95).toFixed(2)}</div>
                                <a href="place.html?name=${encodeURIComponent(r.name)}" class="card-link-btn">Explore</a>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}

// 🔹 DOWNLOAD COLLECTOR'S BROCHURE (PDF GENERATOR)
window.downloadBrochure = function (placeTitle, description, bestTime) {
    try {
        const cleanDesc = (description || "No description available.").replace(/[^\x00-\x7F]/g, "").substring(0, 750);

        const content = `%PDF-1.7
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj
4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> endobj
5 0 obj << /Length 2200 >> stream
BT
/F1 26 Tf
72 730 Td (TRAVELBHARAT ELITE COLLECTOR'S GUIDE) Tj
/F1 18 Tf
0 -45 Td (Destination: ${placeTitle}) Tj
/F1 12 Tf
0 -30 Td (Prime Seasonal Window: ${bestTime}) Tj
0 -25 Td (Curator Rating: 5.0 Star Verified Heritage Asset) Tj
0 -25 Td (Private Concierge Hotline: +91 74897 71078) Tj
0 -30 Td (------------------------------------------------------------------------------------------------) Tj
0 -30 Td (HISTORICAL NARRATIVE & CURATOR SUMMARY:) Tj
0 -25 Td (${cleanDesc.substring(0, 85)}) Tj
0 -20 Td (${cleanDesc.substring(85, 170)}) Tj
0 -20 Td (${cleanDesc.substring(170, 255)}) Tj
0 -20 Td (${cleanDesc.substring(255, 340)}) Tj
0 -20 Td (${cleanDesc.substring(340, 425)}) Tj
0 -20 Td (${cleanDesc.substring(425, 510)}) Tj
0 -20 Td (${cleanDesc.substring(510, 595)}) Tj
0 -20 Td (${cleanDesc.substring(595, 680)}) Tj
0 -40 Td (EXCLUSIVE CURATED PRIVILEGES INCLUDED:) Tj
0 -20 Td (* Private sunrise access prior to public hours) Tj
0 -20 Td (* Dedicated senior cultural historian and archaeologist escort) Tj
0 -20 Td (* Chauffeured luxury transport with security protocol) Tj
0 -20 Td (* White-glove 24/7 personal concierge support) Tj
0 -40 Td ((c) 2026 TravelBharat Elite. Handcrafted for Sovereign Excellence.) Tj
ET
endstream endobj
xref
0 6
0000000000 65535 f
0000000015 00000 n
0000000067 00000 n
0000000121 00000 n
0000000244 00000 n
0000000343 00000 n
trailer << /Size 6 /Root 1 0 R >>
startxref
450
%%EOF`;

        const blob = new Blob([content], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `TravelBharat_Elite_${placeTitle.replace(/\s+/g, '_')}_Brochure.pdf`;
        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }, 100);

        alert(`✨ Your Sovereign Guide for "${placeTitle}" has been prepared!`);
    } catch (e) {
        console.error("Brochure creation failed:", e);
        alert("A technical error occurred while preparing your brochure. Please contact your concierge.");
    }
};

window.shareExpedition = function (title) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        alert(`✨ The link to "${title}" has been copied to your clipboard.`);
    } else {
        alert("Expedition URL: " + window.location.href);
    }
};