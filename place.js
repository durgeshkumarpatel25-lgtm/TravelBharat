const params = new URLSearchParams(window.location.search);
const placeName = params.get("name") ? params.get("name").trim() : null;
console.log("Place Name from URL:", placeName);
const placeDetailsContainer = document.getElementById("placeDetails");

function renderPlaces(allData) {
    if (!placeDetailsContainer) return;

    if (!placeName) {
        placeDetailsContainer.innerHTML = "<h2 style='text-align:center; padding: 100px;'>No destination selected.</h2>";
        return;
    }

    console.log("Searching for place:", placeName);
    const place = allData.find(p => {
        const pName = (p.name || "").trim().toLowerCase();
        const sName = placeName.toLowerCase();
        return pName === sName;
    });
    console.log("Place Found:", place);

    if (place) {
        const capitalizedTitle = (place.title || '').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        placeDetailsContainer.innerHTML = `
            <div class="cinematic-hero reveal" style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${place.image || 'images/default.jpg'}')">
                <h2 class="cinematic-title" style="color: white; text-shadow: 0 20px 40px rgba(0,0,0,0.4);">${capitalizedTitle}</h2>
            </div>
            
            <div class="details-layout section reveal" style="padding: 0 8% 100px;">
                <div class="info-card">
                    <span class="section-tag">Historical Narrative</span>
                    <h3 style="font-size: 2rem; margin-bottom: 2rem; font-family: 'Outfit';">The Essence of ${capitalizedTitle}</h3>
                    <p class="description">${place.description || 'Step into a world where time stands still. This elite destination offers an unparalleled blend of heritage and modern luxury. Every corner reveals a new story, every view a masterpiece of nature.'}</p>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 3rem;">
                        <div style="padding: 20px; background: #f8fafc; border-radius: 16px;">
                            <h4 style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 5px;">Region</h4>
                            <p style="font-weight: 700;">${place.state || 'India'}</p>
                        </div>
                        <div style="padding: 20px; background: #f8fafc; border-radius: 16px;">
                            <h4 style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 5px;">Category</h4>
                            <p style="font-weight: 700;">${place.category || 'Luxury Discovery'}</p>
                        </div>
                    </div>
                </div>

                <div class="sidebar">
                    <div class="info-box" style="margin-bottom: 2rem; box-shadow: 0 40px 100px rgba(0,0,0,0.06); background: white;">
                        <h3 style="color: var(--dark);">✨ Elite Insights</h3>
                        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1.5rem;">Our curators recommend visiting during the prime season for the most immersive experience.</p>
                        <h4 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: var(--primary);">Prime Season</h4>
                        <p style="font-weight: 800; font-size: 1.1rem; margin-top: 5px;">${place.bestTime || 'Year Round'}</p>
                    </div>
                    
                    <a href="https://wa.me/917489771078?text=Hello TravelBharat! I am interested in exploring ${capitalizedTitle}. Please share more details." 
                       target="_blank" 
                       class="search-btn" 
                       style="display: block; text-align: center; text-decoration: none; width: 100%; margin-bottom: 1rem; padding: 20px;">
                       Inquire Now
                    </a>
                    
                    <button onclick="downloadBrochure('${capitalizedTitle}', \`${place.description}\`, '${place.bestTime || 'Year Round'}')" class="search-btn" style="width: 100%; background: var(--dark); padding: 20px;">
                       Download Brochure
                    </button>
                </div>
            </div>
        `;

        // Trigger reveal
        setTimeout(() => {
            document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
        }, 100);
    } else {
        placeDetailsContainer.innerHTML = "<h2 style='text-align:center; padding: 100px;'>Destination not found in our elite gallery.</h2>";
    }
}

window.downloadBrochure = function (placeTitle, description, bestTime) {
    try {
        // Clean text for PDF (remove special characters that might break raw PDF)
        const cleanDesc = (description || "No description available.").replace(/[^\x00-\x7F]/g, "").substring(0, 800);

        // Simple PDF structure with more lines
        const content = `%PDF-1.7
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj
4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj
5 0 obj << /Length 2000 >> stream
BT
/F1 28 Tf
72 720 Td (TravelBharat: ${placeTitle}) Tj
/F1 14 Tf
0 -40 Td (Best Time to Visit: ${bestTime}) Tj
0 -40 Td (About this Destination:) Tj
0 -25 Td (---------------------------------------) Tj
0 -30 Td (${cleanDesc.substring(0, 80)}) Tj
0 -20 Td (${cleanDesc.substring(80, 160)}) Tj
0 -20 Td (${cleanDesc.substring(160, 240)}) Tj
0 -20 Td (${cleanDesc.substring(240, 320)}) Tj
0 -20 Td (${cleanDesc.substring(320, 400)}) Tj
0 -20 Td (${cleanDesc.substring(400, 480)}) Tj
0 -20 Td (${cleanDesc.substring(480, 560)}) Tj
0 -20 Td (${cleanDesc.substring(560, 640)}) Tj
ET
endstream endobj
xref
0 6
0000000000 65535 f
0000000015 00000 n
0000000067 00000 n
0000000121 00000 n
0000000244 00000 n
0000000338 00000 n
trailer << /Size 6 /Root 1 0 R >>
startxref
431
%%EOF`;

        const blob = new Blob([content], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `TravelBharat_${placeTitle.replace(/\s+/g, '_')}_Brochure.pdf`;
        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }, 100);

        alert("✨ Your Detailed Elite Guide for " + placeTitle + " is ready!");
    } catch (e) {
        console.error("Download failed:", e);
        alert("We encountered an issue. Please try again.");
    }
}

if (typeof places !== "undefined" && places.length > 0) {
    renderPlaces(places);
}