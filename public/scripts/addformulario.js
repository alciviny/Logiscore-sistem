// const formulario = document.getElementById('formulario');

// formulario.addEventListener('submit',(e)=>{
//     e.preventDefault();

//     formdata = FormData(e.target)
//     data = new Object.entries()
// })

const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', async (e) => {
    // 1. Evita que a página recarregue ao submeter o formulário
    e.preventDefault();

    // 2. Coleta os dados do formulário
    const formData = new FormData(e.target);
    const data = {};

    // Converte o FormData para um objeto JSON (necessário para a API)
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        // 3. Envia os dados para o endpoint de cadastro/criação (CREATE)
        const response = await fetch('/api/seu-recurso', { // <-- ATENÇÃO: Mude 'seu-recurso' para o endpoint do backend!
            method: 'POST', // Método HTTP para criação de dados
            headers: {
                'Content-Type': 'application/json' // Informa que estamos enviando JSON
            },
            body: JSON.stringify(data) // Transforma o objeto JavaScript em uma string JSON
        });

        // 4. Trata a resposta do servidor
        if (response.ok) {
            alert('Dados cadastrados com sucesso!');
            formulario.reset(); // Limpa o formulário
        } else {
            // Se o status HTTP for 4xx ou 5xx
            const errorData = await response.json();
            alert(`Erro no cadastro: ${errorData.message || response.statusText}`);
        }

    } catch (error) {
        // Trata erros de conexão (rede, servidor fora do ar)
        console.error('Erro de conexão:', error);
        alert('Ocorreu um erro de rede ao tentar cadastrar.');
    }
});