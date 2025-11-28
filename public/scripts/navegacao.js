document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos de navegação e os contêineres de conteúdo
    const navItems = document.querySelectorAll('.nav-item');
    const inventoryButton = Array.from(navItems).find(item => item.textContent.trim() === 'Inventário');
    const reportsButton = Array.from(navItems).find(item => item.textContent.trim().startsWith('Relatórios'));
    const alertsButton = Array.from(navItems).find(item => item.textContent.trim().startsWith('Alertas'));

    const inventoryContainer = document.querySelector('.table-container');
    const reportsContainer = document.getElementById('relatorios-container');
    const alertsContainer = document.getElementById('alertas-container');
    const principalContainer = document.querySelector('.principal');

    // Verifica se todos os elementos necessários existem
    if (!inventoryButton || !reportsButton || !alertsButton || !inventoryContainer || !reportsContainer || !alertsContainer || !principalContainer) {
        console.error('Um ou mais elementos da interface não foram encontrados. A navegação pode não funcionar corretamente.');
        return;
    }

    // Função para redefinir o estado de todos os contêineres e botões
    function resetState() {
        // Esconde todos os contêineres
        principalContainer.style.display = 'none';
        inventoryContainer.style.display = 'none';
        reportsContainer.style.display = 'none';
        alertsContainer.style.display = 'none';

        // Remove a classe 'active' de todos os botões
        navItems.forEach(item => item.classList.remove('active'));
    }

    // Adiciona o listener para o botão de Relatórios
    reportsButton.addEventListener('click', () => {
        resetState();
        // Mostra o conteúdo dos relatórios
        reportsContainer.style.display = 'block';
        // Carrega os dados dos relatórios
        carregarRelatorios();
        // Atualiza o estado ativo da navegação
        reportsButton.classList.add('active');
    });

    // Adiciona o listener para o botão de Inventário
    inventoryButton.addEventListener('click', () => {
        resetState();
        // Mostra o conteúdo do inventário
        principalContainer.style.display = 'block'; // Ou 'flex', dependendo do seu CSS
        inventoryContainer.style.display = 'table'; // Ou 'block'
        // Atualiza o estado ativo da navegação
        inventoryButton.classList.add('active');
    });

    // Adiciona o listener para o botão de Alertas
    alertsButton.addEventListener('click', () => {
        resetState();
        // Mostra o conteúdo dos alertas
        alertsContainer.style.display = 'block';
        // Carrega os dados dos alertas (a função será criada em relatorios.js ou outro arquivo)
        carregarAlertas();
        // Atualiza o estado ativo da navegação
        alertsButton.classList.add('active');
    });


    // Define o estado inicial (Inventário como ativo)
    inventoryButton.click();
});
