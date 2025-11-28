// Variável global para armazenar a instância do gráfico
let graficoLocalizacaoInstance = null;

/**
 * @description Busca os dados da API de dashboard e atualiza os elementos da página.
 */
async function carregarRelatorios() {
    try {
        const response = await fetch('/relatorios/dashboard');
        if (!response.ok) {
            console.error('Erro na requisição:', response);
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        const data = await response.json();

        // Atualiza os cards de KPI
        document.getElementById('total-produtos-valor').textContent = data.totalProdutos;
        document.getElementById('baixo-estoque-valor').textContent = data.baixoEstoque;

        // Renderiza o gráfico
        renderizarGraficoLocalizacao(data.porLocalizacao);

    } catch (error) {
        console.error('Erro ao carregar relatórios:', error);
        // Adicionar feedback visual para o usuário, se necessário
    }
}

/**
 * @description Renderiza ou atualiza o gráfico de barras de produtos por localização.
 * @param {Array} dadosLocalizacao - Array de objetos, cada um contendo { localizacao: string, quantidade: number }
 */
function renderizarGraficoLocalizacao(dadosLocalizacao) {
    const ctx = document.getElementById('graficoLocalizacao').getContext('2d');

    // Prepara os dados para o formato do Chart.js
    const labels = dadosLocalizacao.map(item => item.localizacao);
    const data = dadosLocalizacao.map(item => item.quantidade);

    // Se já existe uma instância do gráfico, a destrói antes de criar uma nova.
    // Isso evita sobreposição de tooltips e outros comportamentos inesperados.
    if (graficoLocalizacaoInstance) {
        graficoLocalizacaoInstance.destroy();
    }

    // Cria uma nova instância do gráfico
    graficoLocalizacaoInstance = new Chart(ctx, {
        type: 'bar', // Tipo de gráfico
        data: {
            labels: labels,
            datasets: [{
                label: 'Nº de Produtos por Localização',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        // Garante que o eixo Y só tenha números inteiros
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Distribuição de Produtos no Armazém'
                }
            }
        }
    });
}
