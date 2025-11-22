
function cardProdutos(produto){
    let status;
    let statusClass;

    if (produto.quantidade > 5) {
        status = 'Normal';
        statusClass = 'normal';
    } else if (produto.quantidade >= 0 && produto.quantidade <= 5) {
        status = 'Baixo Estoque';
        statusClass = 'baixo';
    } else {
        status = 'Indefinido';
        statusClass = 'indefinido';
    }


    const card= `
    <tr>
                    <td>${produto.nome}</td>
                    <td class="sku">${produto.SKU}</td>
                    <td>${produto.quantidade}</td>
                    <td><span class="status ${statusClass}">${status}</span></td>
                    <td>${produto.localizacao}</td>
                    <td class="btns">
                        <button class="btnadd"><i class="fas fa-plus"></i></button>
                        <button class="btnremove"><i class="fas fa-minus"></i></button>
                        <button class="btndelete" data-id="${produto._id}"><i class="fas fa-trash-alt"></i></button>
                    </td>
                </tr>`

                return card;
}

   async function renderizarProdutos() {
    const table = document.querySelector('.table-container')

    try {
        const response = await fetch('http://localhost:3000/produtos')
        const data = await response.json()

        console.log(data)

        if (!data || data.length === 0) {
            console.log("Nenhum produto encontrado.")
            return
        }

        data.forEach(produto => {
            const cardHTML = cardProdutos(produto)
            table.insertAdjacentHTML("beforeend", cardHTML)
        })

    } catch (error) {
        console.log('Não foi possível puxar do banco de dados:', error)
    }
    
} 
renderizarProdutos()