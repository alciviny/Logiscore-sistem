// const formulario = document.getElementById('formulario');

// formulario.addEventListener('submit',(e)=>{
//     e.preventDefault();

//     formdata = FormData(e.target)
//     data = new Object.entries()
// })

const formulario = document.querySelector('.modal');

if (!formulario) {
    console.error('Formulário não encontrado: seletor ".modal" retornou nulo.');
} else {
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('formulario reconhecido');
        const formData = new FormData(e.target);
        for (const [k, v] of formData.entries()) {
            console.log('FormData entry:', k, v);
        }
        const data = Object.fromEntries(formData);
        if (data.quantidade) {
            const n = Number(data.quantidade);
            data.quantidade = Number.isNaN(n) ? data.quantidade : n;
        }
        if (data.sku) data.sku = String(data.sku).trim();
        console.log('Objeto final a ser enviado:', data);
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