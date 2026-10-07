export function setupModal() {
    const modal = document.querySelector("#details-modal");
    const modalContent = document.querySelector("#modal-content");
    const closeButton = document.querySelector("#modal-close");

    function openModal(attraction) {
        modalContent.innerHTML = `
            <img
                src="${attraction.image}"
                alt="${attraction.name}"
                width="800"
                height="500"
            >

            <p class="category">${attraction.category}</p>

            <h2 id="modal-title">${attraction.name}</h2>

            <p>${attraction.description}</p>

            <p>
                <strong>Region:</strong>
                ${attraction.region}
            </p>

            <p>
                <strong>Entry fee:</strong>
                ${attraction.entryFee}
            </p>

            <p>
                <strong>Best time to visit:</strong>
                ${attraction.bestTime}
            </p>
        `;

        modal.showModal();
        closeButton.focus();
    }

    function closeModal() {
        modal.close();
    }

    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    return {
        openModal
    };
}