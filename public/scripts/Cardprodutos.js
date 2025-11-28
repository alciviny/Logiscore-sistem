
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
                        <button class="btnedit" data-id="${produto._id}"><i class="fas fa-edit"></i></button>
                        <button class="btnadd"><i class="fas fa-cart-plus"></i></button>
                        <button class="btnremove"><i class="fas fa-minus"></i></button>
                        <button class="btndelete" data-id="${produto._id}"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>`

                return card;
}

async function carregarProdutos() {
    
    try {
        const response = await fetch('http://localhost:3000/produtos');
        const produtos = await response.json();
        const tbody = document.querySelector('.table-container tbody');

        tbody.innerHTML = produtos.map(cardProdutos).join('');

        ativarFiltroBusca();
        
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

document.addEventListener('DOMContentLoaded', carregarProdutos);