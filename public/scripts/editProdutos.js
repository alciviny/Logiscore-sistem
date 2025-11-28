async function enviarAtualizacaoAPI(id, novaQuantidade) {
    const response = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantidade: novaQuantidade })
    });
    if (!response.ok) {
        throw new Error('Erro na resposta do servidor ao atualizar quantidade');
    }
    return response.json();
}

function atualizarStatusVisual(linha, novaQuantidade) {
    const spanStatus = linha.children[3].querySelector('.status');
    let statusTexto;
    let statusClasse;
    
    if (novaQuantidade > 5) {
        statusTexto = 'Normal';
        statusClasse = 'normal';
    } else if (novaQuantidade >= 1 && novaQuantidade <= 5) {
        statusTexto = 'Baixo Estoque';
        statusClasse = 'baixo';
    } else { 
        statusTexto = 'Esgotado';
        statusClasse = 'esgotado';
    }

    spanStatus.textContent = statusTexto;
    spanStatus.classList.remove('normal', 'baixo', 'esgotado', 'high'); 
    spanStatus.classList.add(statusClasse);
}


async function alterarQuantidade(botao, mudanca) {
    try {
        const linhaProduto = botao.closest('tr');
        
        const idProduto = linhaProduto.querySelector('.btndelete').dataset.id;
        
        const elementoQuantidade = linhaProduto.children[2]; 
        const quantidadeAtual = parseInt(elementoQuantidade.textContent, 10);
        const novaQuantidade = quantidadeAtual + mudanca;
        
        if (novaQuantidade < 0) return;

        elementoQuantidade.textContent = novaQuantidade;
        atualizarStatusVisual(linhaProduto, novaQuantidade);

        try {
            await enviarAtualizacaoAPI(idProduto, novaQuantidade);
        } catch (erroApi) {
            console.error('Erro na API, revertendo...', erroApi);
            elementoQuantidade.textContent = quantidadeAtual; 
            atualizarStatusVisual(linhaProduto, quantidadeAtual); 
            alert("Não foi possível salvar a alteração na API.");
        }

    } catch (error) {
        console.error('Erro crítico na manipulação do DOM:', error);
    }
}

function carregarProdutoParaEdicao(produtoId, linhaProduto) {
    const nome = linhaProduto.children[0].textContent;
    const sku = linhaProduto.children[1].textContent;
    const quantidade = linhaProduto.children[2].textContent; 
    const localizacao = linhaProduto.children[4].textContent;

    document.getElementById('nome').value = nome;
    document.getElementById('sku').value = sku;
    document.getElementById('quantidade').value = quantidade; 
    document.getElementById('localizacao').value = localizacao;

    let idInput = document.getElementById('produto-id');
    const form = document.querySelector('.modal');
    
    if (!idInput) {
        idInput = document.createElement('input');
        idInput.type = 'hidden';
        idInput.id = 'produto-id';
        idInput.name = 'produto-id';
        form.appendChild(idInput);
    }
    idInput.value = produtoId;

    document.querySelector('.modal h2').textContent = 'Editar Produto';
    document.querySelector('.buttonSubmit').textContent = 'Salvar Alterações';
    
    openModal();
}

document.addEventListener('click', (e) => {
    const adicaoButton = e.target.closest(".btnadd");
    const subtracaoButton = e.target.closest(".btnremove");

    if (adicaoButton) {
        alterarQuantidade(adicaoButton, 1); 
    } else if (subtracaoButton) {
        alterarQuantidade(subtracaoButton, -1); 
    }

    const editarButton = e.target.closest(".btnedit");

    if (editarButton) {
        const idProduto = editarButton.dataset.id;
        const linhaProduto = editarButton.closest('tr');
        
        if (idProduto && linhaProduto) {
            carregarProdutoParaEdicao(idProduto, linhaProduto);
        }
    }
});