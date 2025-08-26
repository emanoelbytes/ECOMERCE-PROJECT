// ===== DADOS DOS PRODUTOS =====
const produtos = [
    {
        id: 1,
        nome: "iPhone 15 Pro",
        categoria: "smartphones",
        preco: 7999,
        precoOriginal: 8999,
        desconto: 11,
        imagem: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
        descricao: "Smartphone Apple com câmera avançada",
        urlDetalhes: "https://www.tudocelular.com/Apple/fichas-tecnicas/n8898/Apple-iPhone-15-Pro.html"
    },
    {
        id: 2,
        nome: "MacBook Air M2",
        categoria: "laptops",
        preco: 8999,
        precoOriginal: 10999,
        desconto: 18,
        imagem: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
        descricao: "Notebook Apple ultrafino e potente",
        urlDetalhes: "https://canaltech.com.br/produto/apple/macbook-air-m2/"
    },
    {
        id: 3,
        nome: "AirPods Pro",
        categoria: "headphones",
        preco: 1899,
        precoOriginal: 2299,
        desconto: 17,
        imagem: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400",
        descricao: "Fones sem fio com cancelamento de ruído",
        urlDetalhes: "https://canaltech.com.br/produto/apple/airpods-pro/"
    },
    {
        id: 4,
        nome: "Samsung Galaxy S24",
        categoria: "smartphones",
        preco: 5499,
        precoOriginal: 6299,
        desconto: 13,
        imagem: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
        descricao: "Smartphone Samsung com tela AMOLED",
        urlDetalhes: "https://www.tudocelular.com/Samsung/fichas-tecnicas/n9105/Samsung-Galaxy-S24.html"
    },
    {
        id: 5,
        nome: "Apple Watch Series 9",
        categoria: "smartwatch",
        preco: 3299,
        precoOriginal: 3799,
        desconto: 13,
        imagem: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400",
        descricao: "Relógio inteligente com monitoramento",
        urlDetalhes: "https://canaltech.com.br/produto/apple/watch-series-9/"
    },
    {
        id: 6,
        nome: "Apple Magic Keyboard",
        categoria: "accessories",
        preco: 499,
        precoOriginal: null,
        desconto: null,
        imagem: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
        descricao: "Teclado mecânico RGB para gamers",
        urlDetalhes: "https://support.apple.com/pt-br/112443"
    },
    {
        id: 7,
        nome: "Sony WH-1000XM5",
        categoria: "headphones",
        preco: 2499,
        precoOriginal: 2999,
        desconto: 17,
        imagem: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
        descricao: "Fone com cancelamento de ruído",
        urlDetalhes: "https://canaltech.com.br/produto/sony/wh-1000xm5/"
    },
    {
        id: 8,
        nome: "Dell XPS 13",
        categoria: "laptops",
        preco: 7999,
        precoOriginal: null,
        desconto: null,
        imagem: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400",
        descricao: "Notebook Windows premium",
        urlDetalhes: "https://canaltech.com.br/produto/sony/wh-1000xm5/"
    }
];

// ===== ELEMENTOS DO DOM =====
const containerProduto = document.querySelector(".produto-container");
const inputSearch = document.querySelector(".input-search");
const bntCategorias = document.querySelectorAll(".categoria-bnt");

// ===== FUNÇÕES PRINCIPAIS =====

/**
 * Renderiza a lista de produtos na tela
 * @param {Array} lista - Lista de produtos para exibir (padrão: todos os produtos)
 */
function mostrarProdutos(lista = produtos) {
    if (!lista || lista.length === 0) {
        containerProduto.innerHTML = '<p class="no-results">Nenhum produto encontrado</p>';
        return;
    }

    const htmlProdutos = lista.map(produto => `
        <div class="produto-card">
            <img src="${produto.imagem}" class="produto-imagem" alt="${produto.nome}">
            <div class="info-produto">
                <h3 class="produto-nome">${produto.nome}</h3>
                <p class="produto-descricao">${produto.descricao}</p>
                <p class="produto-preco">R$ ${produto.preco.toLocaleString('pt-BR')}</p>
                <a href="${produto.urlDetalhes}" target="_blank" class="detalhes-btn">
                    <i class="fa-solid fa-external-link-alt"></i> Ver Ficha Técnica
                </a>
            </div>
        </div>
    `).join('');

    containerProduto.innerHTML = htmlProdutos;
}

/**
 * Filtra produtos por termo de busca
 * @param {string} termo - Termo para buscar nos nomes e descrições
 */
function pesquisarProdutos(termo) {
    const consulta = (termo || "").toLowerCase().trim();

    if (!consulta) {
        mostrarProdutos(produtos);
        return;
    }

    const filtrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(consulta) ||
        produto.descricao.toLowerCase().includes(consulta)
    );

    mostrarProdutos(filtrados);
}

/**
 * Filtra produtos por categoria
 * @param {string} categoria - Categoria para filtrar
 * @param {Event} event - Evento do clique
 */
function filtrarPorCategoria(categoria, event) {
    // Remove classe 'ativo' de todos os botões
    bntCategorias.forEach(btn => btn.classList.remove('ativo'));

    // Adiciona classe 'ativo' ao botão clicado
    event.target.classList.add('ativo');

    if (categoria === 'todos') {
        mostrarProdutos(produtos);
    } else {
        const filtrados = produtos.filter(produto => produto.categoria === categoria);
        mostrarProdutos(filtrados);
    }
}

// ===== EVENT LISTENERS =====

// Busca em tempo real
inputSearch.addEventListener("input", (e) => {
    pesquisarProdutos(e.target.value);
});

// Filtros de categoria
bntCategorias.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const categoria = e.target.dataset.categoria;
        filtrarPorCategoria(categoria, e);
    });
});

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    mostrarProdutos();
});




