const formulario = document.querySelector('.modal');

if (!formulario) {
    console.error('Formulário não encontrado: seletor ".modal" retornou nulo.');
} else {
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const idInput = document.getElementById('produto-id');
        const produtoId = idInput ? idInput.value : null; 
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Garante que os campos numéricos sejam enviados como números para a API
        if (data.quantidade) {
            data.quantidade = Number(data.quantidade);
        }
        if (data.preco) {
            data.preco = Number(data.preco);
        }
        
        let method;
        let url;

        if (produtoId) {
            method = 'PATCH'; 
            url = `http://localhost:3000/produtos/${produtoId}`;
            delete data['produto-id'];
        } else {
            method = 'POST';
            url = 'http://localhost:3000/produtos';
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert(`Produto ${produtoId ? 'editado' : 'cadastrado'} com sucesso!`);
                
                closeModal();
                
                window.location.reload(); 

            } else {
                let errBody = await response.text();
                console.error('Resposta de erro do servidor:', response.status, errBody);
                alert(`Erro no cadastro/edição: ${response.statusText}`);
            }

        } catch (error) {
            console.error('Erro de conexão:', error);
            alert('Ocorreu um erro de rede ao tentar salvar.');
        }
    });
}