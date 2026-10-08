import { getAttractions } from "./data.js";
import { setupModal } from "./modules/modal.js";

const destinationList = document.querySelector("#destination-list");
const categoryFilter = document.querySelector("#category-filter");
const currentYear = document.querySelector("#current-year");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#main-navigation");

const modal = setupModal();

let allAttractions = [];
let savedDestinations =
    JSON.parse(localStorage.getItem("savedDestinations")) || [];

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

function setupSaveButtons() {
    const saveButtons =
        destinationList.querySelectorAll("[data-save-id]");

    saveButtons.forEach((button) => {
        const attractionId = Number(button.dataset.saveId);

        if (savedDestinations.includes(attractionId)) {
            button.textContent = "Saved";
        }

        button.addEventListener("click", () => {
            if (savedDestinations.includes(attractionId)) {
                savedDestinations = savedDestinations.filter(
                    (id) => id !== attractionId
                );

                button.textContent = "Save";
            } else {
                savedDestinations.push(attractionId);

                button.textContent = "Saved";
            }

            localStorage.setItem(
                "savedDestinations",
                JSON.stringify(savedDestinations)
            );
        });
    });
}

function displayDestinations(attractions) {
    if (attractions.length === 0) {
        destinationList.innerHTML = `
            <p>
                No destinations were found for this category.
            </p>
        `;

        return;
    }

    destinationList.innerHTML = attractions
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

                        <p class="category">
                            ${attraction.category}
                        </p>

                        <h2>${attraction.name}</h2>

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

                        <div class="card-actions">

                            <button
                                class="button"
                                type="button"
                                data-id="${attraction.id}"
                            >
                                View Details
                            </button>

                            <button
                                class="button secondary-button save-button"
                                type="button"
                                data-save-id="${attraction.id}"
                            >
                                Save
                            </button>

                        </div>

                    </div>

                </article>
            `;
        })
        .join("");

    const detailButtons =
        destinationList.querySelectorAll("[data-id]");

    detailButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const attractionId = Number(button.dataset.id);

            const attraction = allAttractions.find(
                (item) => item.id === attractionId
            );

            if (attraction) {
                modal.openModal(attraction);
            }
        });
    });

    setupSaveButtons();
}

function filterDestinations() {
    const selectedCategory = categoryFilter.value;

    if (selectedCategory === "all") {
        displayDestinations(allAttractions);
        return;
    }

    const filteredAttractions = allAttractions.filter(
        (attraction) => attraction.category === selectedCategory
    );

    displayDestinations(filteredAttractions);
}

async function loadDestinations() {
    try {
        allAttractions = await getAttractions();

        displayDestinations(allAttractions);
    } catch (error) {
        destinationList.innerHTML = `
            <p>
                We couldn't load the destinations right now.
                Please try again later.
            </p>
        `;

        console.error("Error loading destinations:", error);
    }
}

function setCurrentYear() {
    currentYear.textContent = new Date().getFullYear();
}

categoryFilter.addEventListener("change", filterDestinations);

setCurrentYear();
setupNavigation();
loadDestinations();