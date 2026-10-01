import { attractions } from "../data/discover.mjs";

const discoverGrid = document.querySelector("#discover-grid");
const visitMessage = document.querySelector("#visit-message");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#main-nav");


// Display the eight attractions
function displayAttractions() {

    discoverGrid.innerHTML = "";

    attractions.forEach((attraction, index) => {

        const card = document.createElement("article");

        card.classList.add("discover-card");
        card.style.gridArea = `item${index + 1}`;

        card.innerHTML = `
            <h2>${attraction.name}</h2>

            <figure>
                <img
                    src="images/${attraction.image}"
                    alt="${attraction.name}"
                    width="300"
                    height="200"
                    loading="lazy"
                >
            </figure>

            <address>${attraction.address}</address>

            <p>${attraction.description}</p>

            <button type="button">Learn More</button>
        `;

        discoverGrid.appendChild(card);
    });
}


// Display the visitor message
function displayVisitMessage() {

    const currentDate = Date.now();
    const lastVisit = localStorage.getItem("lastVisit");

    if (!lastVisit) {

        visitMessage.textContent =
            "Welcome! Let us know if you have any questions.";

    } else {

        const timeDifference = currentDate - Number(lastVisit);

        const oneDay = 24 * 60 * 60 * 1000;

        if (timeDifference < oneDay) {

            visitMessage.textContent =
                "Back so soon! Awesome!";

        } else {

            const days = Math.floor(timeDifference / oneDay);

            if (days === 1) {

                visitMessage.textContent =
                    "You last visited 1 day ago.";

            } else {

                visitMessage.textContent =
                    `You last visited ${days} days ago.`;
            }
        }
    }

    localStorage.setItem("lastVisit", currentDate);
}


// Mobile navigation
menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

});


// Footer information
document.querySelector("#current-year").textContent =
    new Date().getFullYear();

document.querySelector("#last-modified").textContent =
    document.lastModified;


// Run the functions
displayAttractions();
displayVisitMessage();