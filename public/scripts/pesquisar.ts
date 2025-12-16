function filtrarTabela(): void {
    const searchInput = document.getElementById("search-input") as HTMLInputElement | null;
    const tabelaCorpo = document.querySelector(".table-container tbody") as HTMLTableSectionElement | null;
    const mensagemErro = document.getElementById("erro-busca") as HTMLElement | null;

    if (!searchInput || !tabelaCorpo) return;

    const termoBusca = searchInput.value.toLowerCase().trim();
    const linhas = tabelaCorpo.querySelectorAll("tr");
    let resultadosEncontrados = 0;

    linhas.forEach((linha) => {
        const nomeProduto = linha.children[0]?.textContent?.toLowerCase() || "";
        const skuProduto = linha.children[1]?.textContent?.toLowerCase() || "";

        const corresponde = nomeProduto.includes(termoBusca) || skuProduto.includes(termoBusca);

        if (corresponde) {
            (linha as HTMLElement).style.display = "";
            resultadosEncontrados++;
        } else {
            (linha as HTMLElement).style.display = "none";
        }
    });

    if (mensagemErro) {
        mensagemErro.style.display =
            resultadosEncontrados === 0 && termoBusca.length > 0 ? "block" : "none";
    }
}

function ativarFiltroBusca(): void {
    const searchInput = document.getElementById("search-input") as HTMLInputElement | null;

    if (searchInput) {
        searchInput.addEventListener("keyup", filtrarTabela);

        searchInput.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                e.preventDefault();
                filtrarTabela();
            }
        });
    }
}
