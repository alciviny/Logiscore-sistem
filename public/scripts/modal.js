const modalBackground = document.getElementById('modal-form');
function openModal() {
    if (modalBackground) {
        modalBackground.classList.add('active');
    }
    
    const inputNome = document.getElementById('nome'); 
    
    if (inputNome) {
        inputNome.focus();
    }
}

function closeModal() {
    const form = document.querySelector('.modal');
    
    if (modalBackground) {
        modalBackground.classList.remove('active');
    }
    
    if (form) {
        form.reset(); 

        document.querySelector('.modal h2').textContent = 'Novo Produto';
        document.querySelector('.buttonSubmit').textContent = 'Adicionar Produto';

        const idInput = document.getElementById('produto-id');
        if (idInput) {
            idInput.remove();
        }
    }
}

if (modalBackground) {
    modalBackground.addEventListener('click', function(event) {
        if (event.target === modalBackground) {
            closeModal();
        }
    });
}