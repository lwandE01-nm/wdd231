import { getAttractions } from "./data.js";
import { setupModal } from "./modules/modal.js";

const featuredList = document.querySelector("#featured-list");
const currentYear = document.querySelector("#current-year");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#main-navigation");

function setupNavigation() {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuButton.textContent = isOpen ? "✕" : "☰";
    });
}

function displayFeaturedAttractions(attractions) {
    const featuredAttractions = attractions.slice(0, 6);

    featuredList.innerHTML = featuredAttractions
        .map((attraction) => {
            return `
                <article class="destination-card">
                    <img
                        src="${attraction.image}"
                        alt="${attraction.name}"
                        width="800"
                        height="500"
                        loading="lazy"
                    >

                    <div class="destination-card-content">
                        <p class="category">${attraction.category}</p>

                        <h3>${attraction.name}</h3>

                        <p>
                            ${attraction.description}
                        </p>

                        <p>
                            <strong>Region:</strong>
                            ${attraction.region}
                        </p>

                        <p>
                            <strong>Best time:</strong>
                            ${attraction.bestTime}
                        </p>

                        <button
                            class="button"
                            type="button"
                            data-id="${attraction.id}"
                        >
                            View Details
                        </button>
                    </div>
                </article>
            `;
        })
        .join("");
}

async function loadFeaturedAttractions() {
    try {
        const attractions = await getAttractions();

        displayFeaturedAttractions(attractions);
    } catch (error) {
        featuredList.innerHTML = `
            <p>
                We couldn't load the destinations right now.
                Please try again later.
            </p>
        `;

        console.error("Error loading featured attractions:", error);
    }
}

function setCurrentYear() {
    currentYear.textContent = new Date().getFullYear();
}

setCurrentYear();
setupNavigation();
loadFeaturedAttractions();