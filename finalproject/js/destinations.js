
import { getAttractions } from "./data.js";
import { setupModal } from "./modules/modal.js";

const destinationList = document.querySelector("#destination-list");
const categoryFilter = document.querySelector("#category-filter");
const currentYear = document.querySelector("#current-year");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#main-navigation");

const modal = setupModal();

let allAttractions = [];

let savedDestinations = [];

try {
    const storedDestinations = JSON.parse(
        localStorage.getItem("savedDestinations")
    );

    savedDestinations = Array.isArray(storedDestinations)
        ? storedDestinations
        : [];
} catch (error) {
    console.error("Could not load saved destinations:", error);
}

// Convert image paths into URLs relative to this page's location.
function getImagePath(imagePath) {
    if (!imagePath) {
        return "";
    }

    const path = String(imagePath).trim();

    // Keep full web URLs and root-relative paths unchanged.
    if (/^(https?:\/\/|data:|\/)/i.test(path)) {
        return path;
    }

    // Remove an optional "./" at the start.
    const cleanPath = path.replace(/^\.\/+/, "");

    return new URL(cleanPath, document.baseURI).href;
}

function setupNavigation() {
    if (!menuButton || !navigation) return;

    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", String(isOpen));
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

        button.textContent = savedDestinations.includes(attractionId)
            ? "Saved"
            : "Save";

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
    if (!destinationList) return;

    if (!attractions.length) {
        destinationList.innerHTML = `
            <p>No destinations were found for this category.</p>
        `;
        return;
    }

    destinationList.innerHTML = attractions.map((attraction) => {
        const imagePath = getImagePath(attraction.image);

        return `
            <article class="destination-card">
                <img
                    src="${imagePath}"
                    alt="${attraction.name}"
                    width="800"
                    height="500"
                    loading="lazy"
                >

                <div class="destination-card-content">
                    <p class="category">${attraction.category}</p>

                    <h2>${attraction.name}</h2>

                    <p>${attraction.description}</p>

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
    }).join("");

    // Show a useful message if a particular image fails to load.
    destinationList.querySelectorAll("img").forEach((image) => {
        image.addEventListener("error", () => {
            console.error("Image failed to load:", image.src);

            image.alt = `${image.alt} — image unavailable`;
            image.classList.add("image-error");
        }, { once: true });
    });

    destinationList.querySelectorAll("[data-id]").forEach((button) => {
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
    if (!categoryFilter) return;

    const selectedCategory = categoryFilter.value;

    const filteredAttractions = selectedCategory === "all"
        ? allAttractions
        : allAttractions.filter(
            (attraction) =>
                attraction.category === selectedCategory
        );

    displayDestinations(filteredAttractions);
}

async function loadDestinations() {
    try {
        allAttractions = await getAttractions();

        if (!Array.isArray(allAttractions)) {
            throw new Error("The attractions data is not an array.");
        }

        displayDestinations(allAttractions);
    } catch (error) {
        if (destinationList) {
            destinationList.innerHTML = `
                <p>
                    We couldn't load the destinations right now.
                    Please try again later.
                </p>
            `;
        }

        console.error("Error loading destinations:", error);
    }
}

function setCurrentYear() {
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", filterDestinations);
}

setCurrentYear();
setupNavigation();
loadDestinations();
