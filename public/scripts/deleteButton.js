
document.addEventListener('click', async (e) => {
    const elementoClicado = e.target.closest('.btndelete');

    if (elementoClicado) {
       
        elementoClicado.disabled = true; 
        
        const idParaDeletar = elementoClicado.getAttribute('data-id');
        console.log('Tentando deletar ID:', idParaDeletar);

        if (idParaDeletar) {
            try {
                const response = await fetch(`http://localhost:3000/produtos/${idParaDeletar}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Erro no servidor: ${response.status}`);
                }

                
                console.log('Deletado com sucesso no banco!');

                const itemVisual = elementoClicado.closest('.produto-item') || elementoClicado.closest('li') || elementoClicado.closest('tr');
                
                if (itemVisual) {
                    itemVisual.remove(); 
                } else {
                    window.location.reload();
                }

            } catch (error) {
                console.error('Não foi possível remover o item:', error);
                alert('Erro ao deletar o item. Tente novamente.');
                elementoClicado.disabled = false;
            }
        }
    }
});