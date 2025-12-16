const modalBackground = document.getElementById("modal-form") as HTMLElement | null;

function openModal(): void {
    if (modalBackground) {
        modalBackground.classList.add("active");
    }

    const inputNome = document.getElementById("nome") as HTMLInputElement | null;

    if (inputNome) {
        inputNome.focus();
    }
}

function closeModal(): void {
    const form = document.querySelector(".modal") as HTMLFormElement | null;

    if (modalBackground) {
        modalBackground.classList.remove("active");
    }

    if (form) {
        form.reset();

        const h2 = document.querySelector(".modal h2") as HTMLElement | null;
        const button = document.querySelector(".buttonSubmit") as HTMLElement | null;

        if (h2) h2.textContent = "Novo Produto";
        if (button) button.textContent = "Adicionar Produto";

        const idInput = document.getElementById("produto-id") as HTMLInputElement | null;
        if (idInput) {
            idInput.remove();
        }
    }
}

if (modalBackground) {
    modalBackground.addEventListener("click", function (event: MouseEvent): void {
        if (event.target === modalBackground) {
            closeModal();
        }
    });
}
