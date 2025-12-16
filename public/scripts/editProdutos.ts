async function enviarAtualizacaoAPI(id: string, novaQuantidade: number): Promise<any> {
    const response = await fetch(`/api/produtos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantidade: novaQuantidade })
    });

    if (!response.ok) {
        throw new Error("Erro na resposta do servidor ao atualizar quantidade");
    }

    return response.json();
}

function atualizarStatusVisual(linha: HTMLTableRowElement, novaQuantidade: number, estoqueMinimo: number): void {
    const spanStatus = (linha.children[4] as HTMLTableCellElement)?.querySelector(
        ".status"
    ) as HTMLElement | null;

    if (!spanStatus) return;

    let statusTexto: string;
    let statusClasse: string;

    if (novaQuantidade > estoqueMinimo) {
        statusTexto = "Normal";
        statusClasse = "normal";
    } else if (novaQuantidade === 0) {
        statusTexto = "Esgotado";
        statusClasse = "esgotado";
    } else if (novaQuantidade > 0 && novaQuantidade <= estoqueMinimo) {
        statusTexto = "Baixo Estoque";
        statusClasse = "baixo";
    } else {
        statusTexto = "Indefinido";
        statusClasse = "indefinido";
    }

    spanStatus.textContent = statusTexto;
    spanStatus.classList.remove("normal", "baixo", "esgotado", "high");
    spanStatus.classList.add(statusClasse);
}

async function alterarQuantidade(botao: HTMLElement, mudanca: number): Promise<void> {
    try {
        const linhaProduto = botao.closest("tr") as HTMLTableRowElement | null;
        if (!linhaProduto) return;

        const btnEditar = linhaProduto.querySelector(".btnedit") as HTMLElement | null;
        const estoqueMinimo = parseInt(btnEditar?.dataset.estoqueminimo || "0", 10) || 0;

        const idProduto = (linhaProduto.querySelector(".btndelete") as HTMLElement)?.dataset.id;

        const elementoQuantidade = linhaProduto.children[2] as HTMLTableCellElement;
        const quantidadeAtual = parseInt(elementoQuantidade.textContent || "0", 10);
        const novaQuantidade = quantidadeAtual + mudanca;

        if (novaQuantidade < 0) return;

        elementoQuantidade.textContent = novaQuantidade.toString();
        atualizarStatusVisual(linhaProduto, novaQuantidade, estoqueMinimo);

        try {
            await enviarAtualizacaoAPI(idProduto || "", novaQuantidade);
        } catch (erroApi) {
            console.error("Erro na API, revertendo...", erroApi);
            elementoQuantidade.textContent = quantidadeAtual.toString();
            atualizarStatusVisual(linhaProduto, quantidadeAtual, estoqueMinimo);
            alert("Não foi possível salvar a alteração na API.");
        }
    } catch (error) {
        console.error("Erro crítico na manipulação do DOM:", error);
    }
}

function carregarProdutoParaEdicao(botaoEditar: HTMLElement): void {
    const linhaProduto = botaoEditar.closest("tr") as HTMLTableRowElement | null;
    if (!linhaProduto) return;

    const produtoId = botaoEditar.getAttribute("data-id");
    const preco = botaoEditar.getAttribute("data-preco");
    const estoqueMinimo = botaoEditar.getAttribute("data-estoque-minimo");

    const nome = (linhaProduto.children[0] as HTMLTableCellElement).textContent;
    const sku = (linhaProduto.children[1] as HTMLTableCellElement).textContent;
    const quantidade = (linhaProduto.children[2] as HTMLTableCellElement).textContent;
    const localizacao = (linhaProduto.children[5] as HTMLTableCellElement).textContent;

    const nomeInput = document.getElementById("nome") as HTMLInputElement | null;
    const skuInput = document.getElementById("sku") as HTMLInputElement | null;
    const quantidadeInput = document.getElementById("quantidade") as HTMLInputElement | null;
    const precoInput = document.getElementById("preco") as HTMLInputElement | null;
    const estoqueInput = document.getElementById("estoqueMinimo") as HTMLInputElement | null;
    const localizacaoInput = document.getElementById("localizacao") as HTMLInputElement | null;

    if (nomeInput) nomeInput.value = nome || "";
    if (skuInput) skuInput.value = sku || "";
    if (quantidadeInput) quantidadeInput.value = quantidade || "";
    if (precoInput) precoInput.value = preco || "";
    if (estoqueInput) estoqueInput.value = estoqueMinimo || "";
    if (localizacaoInput) localizacaoInput.value = localizacao || "";

    let idInput = document.getElementById("produto-id") as HTMLInputElement | null;
    const form = document.querySelector(".modal") as HTMLFormElement | null;

    if (!idInput && form) {
        idInput = document.createElement("input");
        idInput.type = "hidden";
        idInput.id = "produto-id";
        idInput.name = "produto-id";
        form.appendChild(idInput);
    }

    if (idInput) idInput.value = produtoId || "";

    const h2 = document.querySelector(".modal h2") as HTMLElement | null;
    const submitButton = document.querySelector(".buttonSubmit") as HTMLElement | null;

    if (h2) h2.textContent = "Editar Produto";
    if (submitButton) submitButton.textContent = "Salvar Alterações";

    openModal();
}

document.addEventListener("click", (e: MouseEvent) => {
    const adicaoButton = (e.target as HTMLElement)?.closest(".btnadd") as HTMLElement | null;
    const subtracaoButton = (e.target as HTMLElement)?.closest(".btnremove") as HTMLElement | null;
    const editarButton = (e.target as HTMLElement)?.closest(".btnedit") as HTMLElement | null;

    if (adicaoButton) {
        alterarQuantidade(adicaoButton, 1);
    } else if (subtracaoButton) {
        alterarQuantidade(subtracaoButton, -1);
    }

    if (editarButton) {
        carregarProdutoParaEdicao(editarButton);
    }
});
