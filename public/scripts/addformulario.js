// const formulario = document.getElementById('formulario');

// formulario.addEventListener('submit',(e)=>{
//     e.preventDefault();

//     formdata = FormData(e.target)
//     data = new Object.entries()
// })

const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('/api/seu-recurso', {
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
            const errorData = await response.json();
            alert(`Erro no cadastro: ${errorData.message || response.statusText}`);
        }

    } catch (error) {
        console.error('Erro de conexão:', error);
        alert('Ocorreu um erro de rede ao tentar cadastrar.');
    }
});