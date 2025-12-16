import { IDashboardData, IProdutoCritico } from "./types";

let graficoLocalizacaoInstance: any = null;
let graficoStatusInstance: any = null;
let graficoTop5Instance: any = null;

async function carregarRelatorios(): Promise<void> {
    try {
        const response = await fetch("/api/relatorios/dashboard");
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        const data = (await response.json()) as IDashboardData;

        const totalProdutosEl = document.getElementById("total-produtos-valor");
        const baixoEstoqueEl = document.getElementById("baixo-estoque-valor");
        const valorTotalEl = document.getElementById("valor-total-estoque");

        if (totalProdutosEl) totalProdutosEl.textContent = data.totalProdutos.toString();
        if (baixoEstoqueEl) baixoEstoqueEl.textContent = data.baixoEstoque.toString();

        const valorTotalEstoque = data.valorTotalEstoque || 0;
        const valorFormatado = valorTotalEstoque.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
        if (valorTotalEl) valorTotalEl.textContent = valorFormatado;

        renderizarGraficoLocalizacao(data.porLocalizacao);
        renderizarGraficoStatus(data.distribuicaoStatus);
        renderizarGraficoTop5(data.top5Produtos);

        popularTabelaEsgotados(data.produtosEsgotados);

        await carregarAlertas();
    } catch (error) {
        console.error("Erro ao carregar relatórios:", error);
    }
}

async function carregarAlertas(): Promise<void> {
    try {
        const response = await fetch("/api/relatorios/produtos-criticos");
        if (!response.ok) {
            throw new Error(`Erro ao buscar produtos críticos: ${response.statusText}`);
        }
        const produtosCriticos = (await response.json()) as IProdutoCritico[];

        const tabelaBody = document.getElementById("tabela-produtos-criticos") as HTMLElement | null;
        const mensagemNenhum = document.getElementById("nenhum-critico-msg") as HTMLElement | null;

        if (tabelaBody) tabelaBody.innerHTML = "";

        if (produtosCriticos.length === 0) {
            if (mensagemNenhum) mensagemNenhum.style.display = "block";
            if (tabelaBody) tabelaBody.style.display = "none";
        } else {
            if (mensagemNenhum) mensagemNenhum.style.display = "none";
            if (tabelaBody) tabelaBody.style.display = "";

            produtosCriticos.forEach((produto) => {
                const row = `<tr>
                               <td>${produto.nome}</td>
                               <td>${produto.SKU}</td>
                               <td>${produto.quantidade}</td>
                               <td>${produto.estoqueMinimo}</td>
                               <td>${produto.localizacao}</td>
                             </tr>`;
                if (tabelaBody) tabelaBody.innerHTML += row;
            });
        }

        atualizarContadorAlertas(produtosCriticos.length);
    } catch (error) {
        console.error("Erro ao carregar alertas de produtos críticos:", error);
    }
}

function atualizarContadorAlertas(count: number): void {
    const navItems = document.querySelectorAll(".nav-item");
    const alertsButton = Array.from(navItems).find((item) =>
        item.textContent?.trim().startsWith("Alertas")
    ) as HTMLElement | undefined;

    if (alertsButton) {
        const existingBadge = alertsButton.querySelector(".badge") as HTMLElement | null;
        if (existingBadge) {
            existingBadge.remove();
        }

        if (count > 0) {
            const badge = document.createElement("span");
            badge.className = "badge";
            badge.textContent = count.toString();
            alertsButton.appendChild(badge);
        }
    }
}

function renderizarGraficoLocalizacao(
    dadosLocalizacao: Array<{ localizacao: string; quantidade: number }>
): void {
    const dadosValidos = (dadosLocalizacao || []).filter((item) => item.localizacao !== null);

    const ctx = (document.getElementById("graficoLocalizacao") as HTMLCanvasElement)?.getContext(
        "2d"
    );
    if (!ctx) return;

    if (graficoLocalizacaoInstance) {
        graficoLocalizacaoInstance.destroy();
    }

    graficoLocalizacaoInstance = new (window as any).Chart(ctx, {
        type: "bar",
        data: {
            labels: dadosValidos.map((item) => item.localizacao),
            datasets: [
                {
                    label: "Nº de Produtos por Localização",
                    data: dadosValidos.map((item) => item.quantidade),
                    backgroundColor: "rgba(75, 192, 192, 0.5)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
            plugins: {
                legend: { display: true, position: "top" },
                title: { display: true, text: "Distribuição de Produtos no Armazém" }
            }
        }
    });
}

function renderizarGraficoStatus(
    dadosStatus: Array<{ _id: string; count: number }>
): void {
    const dadosValidos = (dadosStatus || []).filter((item) => item._id !== null);

    const ctx = (document.getElementById("graficoStatus") as HTMLCanvasElement)?.getContext(
        "2d"
    );
    if (!ctx) return;

    if (graficoStatusInstance) {
        graficoStatusInstance.destroy();
    }

    graficoStatusInstance = new (window as any).Chart(ctx, {
        type: "pie",
        data: {
            labels: dadosValidos.map((item) => item._id),
            datasets: [
                {
                    label: "Distribuição por Status",
                    data: dadosValidos.map((item) => item.count),
                    backgroundColor: [
                        "rgba(54, 162, 235, 0.7)",
                        "rgba(255, 206, 86, 0.7)",
                        "rgba(255, 99, 132, 0.7)"
                    ],
                    borderColor: [
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(255, 99, 132, 1)"
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true, position: "top" },
                title: { display: true, text: "Distribuição de Status do Estoque" }
            }
        }
    });
}

function renderizarGraficoTop5(
    dadosTop5: Array<{ nome: string; quantidade: number }>
): void {
    const dadosValidos = (dadosTop5 || []).filter((item) => item.nome !== null);

    const ctx = (document.getElementById("graficoTop5") as HTMLCanvasElement)?.getContext(
        "2d"
    );
    if (!ctx) return;

    if (graficoTop5Instance) {
        graficoTop5Instance.destroy();
    }

    graficoTop5Instance = new (window as any).Chart(ctx, {
        type: "bar",
        data: {
            labels: dadosValidos.map((p) => p.nome),
            datasets: [
                {
                    label: "Quantidade em Estoque",
                    data: dadosValidos.map((p) => p.quantidade),
                    backgroundColor: "rgba(153, 102, 255, 0.5)",
                    borderColor: "rgba(153, 102, 255, 1)",
                    borderWidth: 1
                }
            ]
        },
        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            scales: { x: { beginAtZero: true } },
            plugins: {
                legend: { display: false },
                title: { display: true, text: "Top 5 Produtos com Mais Estoque" }
            }
        }
    });
}

function popularTabelaEsgotados(produtosEsgotados: Array<{ nome: string; SKU: string }>): void {
    const dadosValidos = produtosEsgotados || [];

    const tabelaBody = document.getElementById("tabela-produtos-esgotados") as HTMLElement | null;
    const mensagemNenhum = document.getElementById("nenhum-esgotado-msg") as HTMLElement | null;

    if (tabelaBody) tabelaBody.innerHTML = "";

    if (dadosValidos.length === 0) {
        if (mensagemNenhum) mensagemNenhum.style.display = "block";
        if (tabelaBody) tabelaBody.style.display = "none";
    } else {
        if (mensagemNenhum) mensagemNenhum.style.display = "none";
        if (tabelaBody) tabelaBody.style.display = "";

        dadosValidos.forEach((produto) => {
            const row = `<tr>
                           <td>${produto.nome}</td>
                           <td>${produto.SKU}</td>
                         </tr>`;
            if (tabelaBody) tabelaBody.innerHTML += row;
        });
    }
}
