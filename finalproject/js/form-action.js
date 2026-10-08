const resultsContainer = document.querySelector("#form-results");
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

function displayFormResults() {
    const params = new URLSearchParams(window.location.search);

    const name = params.get("name");
    const email = params.get("email");
    const travelDate = params.get("travel-date");
    const experience = params.get("experience");
    const travelers = params.get("travelers");
    const message = params.get("message");

    if (!name || !email) {
        resultsContainer.innerHTML = `
            <p>
                No travel plan information was submitted.
            </p>

            <a href="visit.html" class="button">
                Return to Travel Planner
            </a>
        `;

        return;
    }

    resultsContainer.innerHTML = `
        <h2>Thank you, ${name}!</h2>

        <p>
            Your travel planning information has been received.
        </p>

        <dl>
            <div>
                <dt>Email</dt>
                <dd>${email}</dd>
            </div>

            <div>
                <dt>Preferred Travel Date</dt>
                <dd>${travelDate || "Not provided"}</dd>
            </div>

            <div>
                <dt>Experience</dt>
                <dd>${experience || "Not provided"}</dd>
            </div>

            <div>
                <dt>Number of Travelers</dt>
                <dd>${travelers || "Not provided"}</dd>
            </div>

            <div>
                <dt>Trip Details</dt>
                <dd>${message || "No additional details provided."}</dd>
            </div>
        </dl>
    `;
}

function setCurrentYear() {
    currentYear.textContent = new Date().getFullYear();
}

setCurrentYear();
setupNavigation();
displayFormResults();