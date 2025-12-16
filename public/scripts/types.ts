export interface IProduto {
    _id: string;
    nome: string;
    SKU: string;
    preco: number;
    quantidade: number;
    estoqueMinimo: number;
    localizacao: string;
    categoria?: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IDashboardData {
    totalProdutos: number;
    baixoEstoque: number;
    porLocalizacao: Array<{ localizacao: string; quantidade: number }>;
    valorTotalEstoque: number;
    distribuicaoStatus: Array<{ _id: string; count: number }>;
    top5Produtos: Array<{ nome: string; quantidade: number }>;
    produtosEsgotados: Array<{ nome: string; SKU: string }>;
}

export interface IProdutoCritico {
    _id: string;
    nome: string;
    SKU: string;
    quantidade: number;
    estoqueMinimo: number;
    localizacao: string;
}
