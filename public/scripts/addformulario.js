
const formulario = document.querySelector('.modal');

if (!formulario) {
    console.error('Formulário não encontrado: seletor ".modal" retornou nulo.');
} else {
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('formulario reconhecido');
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        try {
            const response = await fetch('http://localhost:3000/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Dados cadastrados com sucesso!');
                formulario.reset();

            } else {
                
                let errBody;
                try {
                    errBody = await response.json();
                } catch (e) {
                    errBody = await response.text();
                }
                console.error('Resposta de erro do servidor:', response.status, errBody);
                alert(`Erro no cadastro: ${JSON.stringify(errBody) || response.statusText}`);
            }

        } catch (error) {
            console.error('Erro de conexão:', error);
            alert('Ocorreu um erro de rede ao tentar cadastrar.');
        }
    });
}