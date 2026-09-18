// ===== Navigation =====

const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav");

if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
        mainNav.classList.toggle("open");

        const isOpen = mainNav.classList.contains("open");

        menuButton.textContent = isOpen ? "✕" : "☰";
        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });
}


// ===== Footer =====

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = document.lastModified;
}


// ===== Business Spotlights =====

async function loadSpotlights() {

    const container = document.querySelector("#spotlight-container");

    if (!container) {
        return;
    }

    try {

        // Load the chamber member information
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load members.json");
        }

        const members = await response.json();

        // Only Gold (3) and Silver (2) members
        const qualifiedMembers = members.filter(
            member => member.membership === 3 || member.membership === 2
        );

        // Randomize the members
        qualifiedMembers.sort(() => Math.random() - 0.5);

        // Select 2 or 3 members
        const selectedMembers = qualifiedMembers.slice(0, 3);

        container.innerHTML = "";

        selectedMembers.forEach(member => {

            const card = document.createElement("article");

            card.classList.add("spotlight-card");

            const membershipLevel =
                member.membership === 3
                    ? "Gold Member"
                    : "Silver Member";

            card.innerHTML = `
                <img
                    src="images/${member.image}"
                    alt="${member.name} logo"
                    loading="lazy"
                >

                <h3>${member.name}</h3>

                <p>${member.description}</p>

                <p>
                    <strong>Phone:</strong>
                    ${member.phone}
                </p>

                <p>
                    <strong>Address:</strong>
                    ${member.address}
                </p>

                <p>
                    <strong>Membership:</strong>
                    ${membershipLevel}
                </p>

                <p>
                    <a
                        href="${member.website}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Visit Website
                    </a>
                </p>
            `;

            container.appendChild(card);
        });

    } catch (error) {

        console.error("Business spotlight error:", error);

        container.innerHTML = `
            <p>
                Business spotlights could not be loaded at this time.
            </p>
        `;
    }
}


// ===== Weather =====

// OpenWeather API is not being used yet.
// This keeps the weather section visible while an API key is unavailable.

function displayWeather() {

    const temperature = document.querySelector("#current-temperature");
    const description = document.querySelector("#weather-description");
    const forecast = document.querySelector("#forecast-container");

    if (temperature) {
        temperature.textContent = "Weather unavailable";
    }

    if (description) {
        description.textContent =
            "Weather information will be available soon.";
    }

    if (forecast) {

        forecast.innerHTML = `
            <div class="forecast-card">
                <h4>Day 1</h4>
                <p>Forecast unavailable</p>
            </div>

            <div class="forecast-card">
                <h4>Day 2</h4>
                <p>Forecast unavailable</p>
            </div>

            <div class="forecast-card">
                <h4>Day 3</h4>
                <p>Forecast unavailable</p>
            </div>
        `;
    }
}


// ===== Start Page =====

loadSpotlights();
displayWeather();