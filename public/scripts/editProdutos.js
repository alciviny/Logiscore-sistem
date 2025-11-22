// 1. Função dedicada apenas para a comunicação com a API (Separation of Concerns)
async function enviarAtualizacaoAPI(id, novaQuantidade) {
    const response = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantidade: novaQuantidade })
    });

    if (!response.ok) {
        throw new Error('Erro na resposta do servidor');
    }
    return response.json();
}


async function alterarQuantidade(botao, mudanca) {
    try {
        const linhaProduto = botao.closest('tr');
        
      
        const elementoQuantidade = linhaProduto.children[2]; 
        
      
        const idProduto = linhaProduto.querySelector('.btndelete').dataset.id;

        const quantidadeAtual = parseInt(elementoQuantidade.textContent, 10);
        const novaQuantidade = quantidadeAtual + mudanca;

       
        if (novaQuantidade < 0) return;

    
        elementoQuantidade.textContent = novaQuantidade;

        
        atualizarStatusVisual(linhaProduto, novaQuantidade);

        // --- CHAMADA API ---
        try {
            await enviarAtualizacaoAPI(idProduto, novaQuantidade);
            console.log(`Produto ${idProduto} atualizado para ${novaQuantidade}`);
        } catch (erroApi) {
            console.error('Erro na API, revertendo...', erroApi);
            elementoQuantidade.textContent = quantidadeAtual; 
            atualizarStatusVisual(linhaProduto, quantidadeAtual); // Reverte status também
            alert("Não foi possível salvar a alteração.");
        }

    } catch (error) {
        console.error('Erro crítico na manipulação do DOM:', error);
    }
}


function atualizarStatusVisual(linha, quantidade) {
   
}


document.addEventListener('click', (e) => {
    const adicaoButton = e.target.closest(".btnadd");
    const subtracaoButton = e.target.closest(".btnremove");

    if (adicaoButton) {
        alterarQuantidade(adicaoButton, 1); 
    } else if (subtracaoButton) {
        alterarQuantidade(subtracaoButton, -1); 
    }
});