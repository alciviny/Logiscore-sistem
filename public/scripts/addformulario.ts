const formulario = document.querySelector(".modal") as HTMLFormElement | null;

if (!formulario) {
    console.error('Formulário não encontrado: seletor ".modal" retornou nulo.');
} else {
    formulario.addEventListener("submit", async (e: SubmitEvent): Promise<void> => {
        e.preventDefault();

        const idInput = document.getElementById("produto-id") as HTMLInputElement | null;
        const produtoId = idInput ? idInput.value : null;

        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData) as Record<string, any>;

        if (data.quantidade) {
            data.quantidade = Number(data.quantidade);
        }
        if (data.preco) {
            data.preco = Number(data.preco);
        }
        if (data.estoqueMinimo) {
            data.estoqueMinimo = Number(data.estoqueMinimo);
        }

        let method: string;
        let url: string;

        if (produtoId) {
            method = "PATCH";
            url = `/api/produtos/${produtoId}`;
            delete data["produto-id"];
        } else {
            method = "POST";
            url = "/api/produtos";
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert(`Produto ${produtoId ? "editado" : "cadastrado"} com sucesso!`);
                closeModal();
                window.location.reload();
            } else {
                const errBody = await response.text();
                console.error("Resposta de erro do servidor:", response.status, errBody);
                alert(`Erro no cadastro/edição: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Erro de conexão:", error);
            alert("Ocorreu um erro de rede ao tentar salvar.");
        }
    });
}
