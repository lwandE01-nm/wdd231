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

function setCurrentYear() {
    currentYear.textContent = new Date().getFullYear();
}

setCurrentYear();
setupNavigation();