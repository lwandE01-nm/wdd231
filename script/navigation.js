const menuButton = document.querySelector("#menuButton");
const navMenu = document.querySelector("#navMenu");

menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");

    const isOpen = navMenu.classList.contains("open");

    menuButton.textContent = isOpen ? "✕" : "☰";
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});
