const modalBackground = document.getElementById('modal-form');
const openModalButton = document.getElementById('add-produto-btn');

function openModal() {
    modalBackground.classList.add('active'); 
}

function closeModal() {
    modalBackground.classList.remove('active');
    document.getElementById('name').value = '';
    document.getElementById('sku').value = '';
    document.getElementById('qty').value = '';
    document.getElementById('loc').value = '';
}

function addProduct() {
    const name = document.getElementById('name').value;
    const sku = document.getElementById('sku').value;
    const qty = document.getElementById('qty').value;
    const loc = document.getElementById('loc').value;

    if (!name || !sku || !qty || !loc) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    console.log("Novo Produto a ser adicionado:", {
        nome: name,
        sku: sku,
        quantidade: qty,
        localizacao: loc
    });

    alert(`Produto '${name}' com SKU '${sku}' adicionado com sucesso (SIMULADO)!`);

    closeModal();
}

if (openModalButton) {
    openModalButton.addEventListener('click', openModal);
}

if (modalBackground) {
    modalBackground.addEventListener('click', function(event) {
        if (event.target === modalBackground) {
            closeModal();
        }
    });
}