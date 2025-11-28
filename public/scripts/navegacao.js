document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos de navegação e os contêineres de conteúdo
    const navItems = document.querySelectorAll('.nav-item');
    const inventoryButton = Array.from(navItems).find(item => item.textContent.trim() === 'Inventário');
    const reportsButton = Array.from(navItems).find(item => item.textContent.trim() === 'Relatórios');

    const inventoryContainer = document.querySelector('.table-container');
    const reportsContainer = document.getElementById('relatorios-container');
    const principalContainer = document.querySelector('.principal');

    // Verifica se todos os elementos necessários existem
    if (!inventoryButton || !reportsButton || !inventoryContainer || !reportsContainer || !principalContainer) {
        console.error('Um ou mais elementos da interface não foram encontrados. A navegação pode não funcionar corretamente.');
        return;
    }

    // Adiciona o listener para o botão de Relatórios
    reportsButton.addEventListener('click', () => {
        // Esconde o conteúdo do inventário
        principalContainer.style.display = 'none';
        inventoryContainer.style.display = 'none';

        // Mostra o conteúdo dos relatórios
        reportsContainer.style.display = 'block';

        // Carrega os dados dos relatórios
        carregarRelatorios();

        // Atualiza o estado ativo da navegação
        inventoryButton.classList.remove('active');
        reportsButton.classList.add('active');
    });

    // Adiciona o listener para o botão de Inventário
    inventoryButton.addEventListener('click', () => {
        // Mostra o conteúdo do inventário
        principalContainer.style.display = 'block'; // Ou 'flex', dependendo do seu CSS
        inventoryContainer.style.display = 'table'; // Ou 'block'

        // Esconde o conteúdo dos relatórios
        reportsContainer.style.display = 'none';

        // Atualiza o estado ativo da navegação
        reportsButton.classList.remove('active');
        inventoryButton.classList.add('active');
    });

    // Define o estado inicial (Inventário como ativo)
    inventoryButton.classList.add('active');
});
