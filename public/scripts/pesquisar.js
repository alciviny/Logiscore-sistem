function filtrarTabela() {
    const searchInput = document.getElementById('search-input');
    const tabelaCorpo = document.querySelector('.table-container tbody');
    const mensagemErro = document.getElementById('erro-busca');
    
    const termoBusca = searchInput.value.toLowerCase().trim();
    const linhas = tabelaCorpo.querySelectorAll('tr');
    let resultadosEncontrados = 0;

    linhas.forEach(linha => {
        const nomeProduto = linha.children[0]?.textContent.toLowerCase() || '';
        const skuProduto = linha.children[1]?.textContent.toLowerCase() || '';

        const corresponde = nomeProduto.includes(termoBusca) || skuProduto.includes(termoBusca);
        
        if (corresponde) {
            linha.style.display = ''; 
            resultadosEncontrados++;
        } else {
            linha.style.display = 'none'; 
        }
    });

    if (mensagemErro) {
        mensagemErro.style.display = (resultadosEncontrados === 0 && termoBusca.length > 0) ? 'block' : 'none';
    }
}

function ativarFiltroBusca() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    if (searchButton) {
    }
    
    if (searchInput) {
        searchInput.addEventListener('keyup', filtrarTabela);
        
        searchInput.addEventListener('keydown', (e) => {
             if (e.key === 'Enter') {
                e.preventDefault(); 
                filtrarTabela();
            }
        });
    }
}
