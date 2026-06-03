// ==========================================
// MENU LATERAL
// ==========================================

document.addEventListener("click", function(event) {

    const sidebar = document.getElementById("sidebar");
    const menuIcon = document.querySelector(".menu-icon");

    if (!sidebar || !menuIcon) return;

    const clicouDentroMenu = sidebar.contains(event.target);
    const clicouNoBotao = menuIcon.contains(event.target);

    if (!clicouDentroMenu && !clicouNoBotao) {
        sidebar.style.left = "-220px";
    }

});

// ==========================================
// NORMALIZAR TEXTO
// ==========================================

function normalizeText(text) {

    return (text || "")
        .toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, "")
        .trim();

}

// ==========================================
// VARIÁVEIS GLOBAIS BRECHÓ
// ==========================================

let brechoCategoriaAtual = "todos";
let brechoGeneroAtual = "todos";

// ==========================================
// FILTROS BRECHÓ
// ==========================================

if (window.location.pathname.includes("brecho.html")) {

    document.addEventListener("DOMContentLoaded", function() {

        // ------------------------
        // FILTROS CATEGORIA
        // ------------------------

        document
            .querySelectorAll(".filtros-brecho .filtro-btn")
            .forEach(btn => {

                btn.addEventListener("click", function() {

                    document
                        .querySelectorAll(".filtros-brecho .filtro-btn")
                        .forEach(b => b.classList.remove("active"));

                    this.classList.add("active");

                    filtrarProdutosBrecho(
                        this.dataset.categoria
                    );

                });

            });

        // ------------------------
        // FILTROS GÊNERO
        // ------------------------

        document
            .querySelectorAll(".generos-brecho .genero-btn")
            .forEach(btn => {

                btn.addEventListener("click", function() {

                    document
                        .querySelectorAll(".generos-brecho .genero-btn")
                        .forEach(b => b.classList.remove("active"));

                    this.classList.add("active");

                    brechoGeneroAtual =
                        this.dataset.genero || "todos";

                    atualizarEstadoGenero();

                    filtrarProdutosBrecho(
                        brechoCategoriaAtual
                    );

                });

            });

        // ------------------------
        // PESQUISA
        // ------------------------

        const inputBusca =
            document.getElementById("searchInputBrecho");

        if (inputBusca) {

            inputBusca.addEventListener("input", function() {

                filtrarProdutosBrecho(
                    brechoCategoriaAtual
                );

            });

        }

    });

}

// ==========================================
// DESATIVAR SAIAS E VESTIDOS NO MASCULINO
// ==========================================

function atualizarEstadoGenero() {

    const categoriaBotoes =
        document.querySelectorAll(
            ".filtros-brecho .filtro-btn"
        );

    categoriaBotoes.forEach(btn => {

        const categoria =
            normalizeText(
                btn.dataset.categoria || ""
            );

        const bloquear =
            brechoGeneroAtual === "masculino" &&
            (
                categoria === "saias" ||
                categoria === "vestidos"
            );

        if (bloquear) {

            btn.classList.add("disabled");

            if (btn.classList.contains("active")) {

                btn.classList.remove("active");

                const btnTodos =
                    document.querySelector(
                        '.filtros-brecho .filtro-btn[data-categoria="todos"]'
                    );

                if (btnTodos) {
                    btnTodos.classList.add("active");
                }

                brechoCategoriaAtual = "todos";

            }

        } else {

            btn.classList.remove("disabled");

        }

    });

}

// ==========================================
// FILTRAR PRODUTOS BRECHÓ
// ==========================================

function filtrarProdutosBrecho(categoria) {

    brechoCategoriaAtual = categoria;

    const termoBusca =
        normalizeText(
            document.getElementById("searchInputBrecho")?.value || ""
        );

    const cards =
        document.querySelectorAll(
            "#produtosBrecho .produto"
        );

    const semProdutos =
        document.getElementById("semProdutos");

    let visiveis = 0;

    cards.forEach(card => {

        const categoriaPeca =
            normalizeText(
                card.dataset.categoria || ""
            );

        const generoPeca =
            normalizeText(
                card.dataset.genero || "todos"
            );

        const nomePeca =
            normalizeText(
                card.dataset.nome || ""
            );

        const matchesCategoria =
            categoria === "todos" ||
            categoriaPeca === normalizeText(categoria);

        const matchesGenero =
            brechoGeneroAtual === "todos" ||
            generoPeca === brechoGeneroAtual;

        const matchesBusca =
            termoBusca === "" ||
            nomePeca.includes(termoBusca);

        const masculinoBloqueado =
            brechoGeneroAtual === "masculino" &&
            (
                categoriaPeca === "saias" ||
                categoriaPeca === "vestidos"
            );

        if (
            matchesCategoria &&
            matchesGenero &&
            matchesBusca &&
            !masculinoBloqueado
        ) {

            card.style.display = "block";
            visiveis++;

        } else {

            card.style.display = "none";

        }

    });

    if (semProdutos) {

        semProdutos.style.display =
            visiveis === 0
                ? "flex"
                : "none";

    }

}