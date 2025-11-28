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

function atualizarStatusVisual(linha, novaQuantidade, estoqueMinimo) {
    const spanStatus = linha.children[4].querySelector('.status');
    let statusTexto;
    let statusClasse;
    
    if (novaQuantidade > estoqueMinimo) {
        statusTexto = 'Normal';
        statusClasse = 'normal';
    } else if (novaQuantidade === 0) {
        statusTexto = 'Esgotado';
        statusClasse = 'esgotado';
    } else if (novaQuantidade > 0 && novaQuantidade <= estoqueMinimo) {
        statusTexto = 'Baixo Estoque';
        statusClasse = 'baixo';
    } else { 
        statusTexto = 'Indefinido';
        statusClasse = 'indefinido';
    }

    spanStatus.textContent = statusTexto;
    spanStatus.classList.remove('normal', 'baixo', 'esgotado', 'high'); 
    spanStatus.classList.add(statusClasse);
}


async function alterarQuantidade(botao, mudanca) {
    try {
        const linhaProduto = botao.closest('tr');
        const btnEditar = linhaProduto.querySelector('.btnedit');
        const estoqueMinimo = parseInt(btnEditar.dataset.estoqueminimo, 10) || 0;
        
        const idProduto = linhaProduto.querySelector('.btndelete').dataset.id;
        
        const elementoQuantidade = linhaProduto.children[2]; 
        const quantidadeAtual = parseInt(elementoQuantidade.textContent, 10);
        const novaQuantidade = quantidadeAtual + mudanca;
        
        if (novaQuantidade < 0) return;

        elementoQuantidade.textContent = novaQuantidade;
        atualizarStatusVisual(linhaProduto, novaQuantidade, estoqueMinimo);

        try {
            await enviarAtualizacaoAPI(idProduto, novaQuantidade);
        } catch (erroApi) {
            console.error('Erro na API, revertendo...', erroApi);
            elementoQuantidade.textContent = quantidadeAtual; 
            atualizarStatusVisual(linhaProduto, quantidadeAtual, estoqueMinimo); 
            alert("Não foi possível salvar a alteração na API.");
        }

    } catch (error) {
        console.error('Erro crítico na manipulação do DOM:', error);
    }
}

function carregarProdutoParaEdicao(botaoEditar) {
    const linhaProduto = botaoEditar.closest('tr');
    const produtoId = botaoEditar.dataset.id;
    const preco = botaoEditar.dataset.preco;
    const estoqueMinimo = botaoEditar.dataset.estoqueminimo;

    const nome = linhaProduto.children[0].textContent;
    const sku = linhaProduto.children[1].textContent;
    const quantidade = linhaProduto.children[2].textContent;
    const localizacao = linhaProduto.children[5].textContent; // Índice corrigido para 5 após adicionar a coluna de preço

    document.getElementById('nome').value = nome;
    document.getElementById('sku').value = sku;
    document.getElementById('quantidade').value = quantidade;
    document.getElementById('preco').value = preco;
    document.getElementById('estoqueMinimo').value = estoqueMinimo;
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
        carregarProdutoParaEdicao(editarButton);
    }
});