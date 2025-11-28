// Variáveis globais para armazenar as instâncias dos gráficos
let graficoLocalizacaoInstance = null;
let graficoStatusInstance = null;
let graficoTop5Instance = null;

/**
 * @description Busca os dados da API de dashboard e atualiza os elementos da página.
 */
async function carregarRelatorios() {
    try {
        const response = await fetch('/relatorios/dashboard');
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        const data = await response.json();

        // 1. Atualiza os cards de KPI
        document.getElementById('total-produtos-valor').textContent = data.totalProdutos;
        document.getElementById('baixo-estoque-valor').textContent = data.baixoEstoque;
        
        // Formata o valor monetário para BRL (Real Brasileiro) com segurança
        const valorTotalEstoque = data.valorTotalEstoque || 0;
        const valorFormatado = valorTotalEstoque.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        document.getElementById('valor-total-estoque').textContent = valorFormatado;

        // 2. Renderiza os gráficos
        renderizarGraficoLocalizacao(data.porLocalizacao);
        renderizarGraficoStatus(data.distribuicaoStatus);
        renderizarGraficoTop5(data.top5Produtos);

        // 3. Preenche a tabela de produtos esgotados
        popularTabelaEsgotados(data.produtosEsgotados);

    } catch (error) {
        console.error('Erro ao carregar relatórios:', error);
        // Adicionar feedback visual para o usuário, se necessário
    }
}

/**
 * @description Renderiza ou atualiza o gráfico de barras de produtos por localização.
 * @param {Array} dadosLocalizacao - Array de objetos [{ localizacao: string, quantidade: number }]
 */
function renderizarGraficoLocalizacao(dadosLocalizacao) {
    const dadosValidos = (dadosLocalizacao || []).filter(item => item.localizacao !== null);

    const ctx = document.getElementById('graficoLocalizacao').getContext('2d');
    if (graficoLocalizacaoInstance) {
        graficoLocalizacaoInstance.destroy();
    }
    graficoLocalizacaoInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dadosValidos.map(item => item.localizacao),
            datasets: [{
                label: 'Nº de Produtos por Localização',
                data: dadosValidos.map(item => item.quantidade),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
            plugins: {
                legend: { display: true, position: 'top' },
                title: { display: true, text: 'Distribuição de Produtos no Armazém' }
            }
        }
    });
}

/**
 * @description Renderiza o gráfico de pizza da distribuição de status.
 * @param {Array} dadosStatus - Array de objetos [{ _id: string, count: number }]
 */
function renderizarGraficoStatus(dadosStatus) {
    // Linha de segurança: Se dadosStatus for nulo/undefined, usa um array vazio.
    // Também filtra quaisquer categorias com status nulo para evitar fatias em branco.
    const dadosValidos = (dadosStatus || []).filter(item => item._id !== null);

    const ctx = document.getElementById('graficoStatus').getContext('2d');
    if (graficoStatusInstance) {
        graficoStatusInstance.destroy();
    }
    graficoStatusInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: dadosValidos.map(item => item._id),
            datasets: [{
                label: 'Distribuição por Status',
                data: dadosValidos.map(item => item.count),
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)', // Em estoque
                    'rgba(255, 206, 86, 0.7)', // Baixo estoque
                    'rgba(255, 99, 132, 0.7)'  // Fora de estoque
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true, position: 'top' },
                title: { display: true, text: 'Distribuição de Status do Estoque' }
            }
        }
    });
}

/**
 * @description Renderiza o gráfico de barras horizontais do top 5 produtos.
 * @param {Array} dadosTop5 - Array de objetos [{ nome: string, quantidade: number }]
 */
function renderizarGraficoTop5(dadosTop5) {
    const dadosValidos = (dadosTop5 || []).filter(item => item.nome !== null);

    const ctx = document.getElementById('graficoTop5').getContext('2d');
    if (graficoTop5Instance) {
        graficoTop5Instance.destroy();
    }
    graficoTop5Instance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dadosValidos.map(p => p.nome),
            datasets: [{
                label: 'Quantidade em Estoque',
                data: dadosValidos.map(p => p.quantidade),
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y', // Torna o gráfico de barras horizontal
            responsive: true,
            maintainAspectRatio: false,
            scales: { x: { beginAtZero: true } },
            plugins: {
                legend: { display: false },
                title: { display: true, text: 'Top 5 Produtos com Mais Estoque' }
            }
        }
    });
}

/**
 * @description Preenche a tabela de produtos esgotados.
 * @param {Array} produtosEsgotados - Array de objetos [{ nome: string, SKU: string }]
 */
function popularTabelaEsgotados(produtosEsgotados) {
    // Linha de segurança: se produtosEsgotados for nulo/undefined, usa um array vazio.
    const dadosValidos = produtosEsgotados || [];

    const tabelaBody = document.getElementById('tabela-produtos-esgotados');
    const mensagemNenhum = document.getElementById('nenhum-esgotado-msg');
    tabelaBody.innerHTML = ''; // Limpa a tabela

    if (dadosValidos.length === 0) {
        mensagemNenhum.style.display = 'block';
        tabelaBody.style.display = 'none';

    } else {
        mensagemNenhum.style.display = 'none';
        tabelaBody.style.display = '';
        dadosValidos.forEach(produto => {
            const row = `<tr>
                           <td>${produto.nome}</td>
                           <td>${produto.SKU}</td>
                         </tr>`;
            tabelaBody.innerHTML += row;
        });
    }
}
