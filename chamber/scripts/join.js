// Set the current year
const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// Set the last modified date
const lastModified = document.querySelector("#last-modified");

if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
}


// Set the timestamp when the form page loads
const timestamp = document.querySelector("#timestamp");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}


// Mobile navigation
const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav");

if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
        mainNav.classList.toggle("open");
    });
}


// Membership modals
const modalLinks = document.querySelectorAll(".modal-link");
const closeButtons = document.querySelectorAll(".close-modal");

modalLinks.forEach((button) => {
    button.addEventListener("click", () => {
        const modalId = button.dataset.modal;
        const modal = document.querySelector(`#${modalId}`);

        if (modal) {
            modal.showModal();
        }
    });
});


closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = button.closest("dialog");

        if (modal) {
            modal.close();
        }
    });
});


// Display submitted information on thankyou.html
const params = new URLSearchParams(window.location.search);

const firstName = document.querySelector("#display-first-name");
const lastName = document.querySelector("#display-last-name");
const email = document.querySelector("#display-email");
const phone = document.querySelector("#display-phone");
const organization = document.querySelector("#display-organization");
const submittedTimestamp = document.querySelector("#display-timestamp");

if (firstName) {
    firstName.textContent = params.get("firstName") || "";
}

if (lastName) {
    lastName.textContent = params.get("lastName") || "";
}

if (email) {
    email.textContent = params.get("email") || "";
}

if (phone) {
    phone.textContent = params.get("phone") || "";
}

if (organization) {
    organization.textContent = params.get("organization") || "";
}

if (submittedTimestamp) {
    submittedTimestamp.textContent = params.get("timestamp") || "";
}
