const currentYear = new Date().getFullYear();

document.querySelector("#currentYear").textContent = currentYear;

document.querySelector("#lastModified").textContent =
    `Last Modification: ${document.lastModified}`;
