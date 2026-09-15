```javascript
let carrinho = [];
let categoriaAtual = "todos";


// =========================
// ADICIONAR PRODUTO AO CARRINHO
// =========================

function adicionarCarrinho(nome, preco) {

    let produtoExistente = carrinho.find(function(produto) {
        return produto.nome === nome;
    });

    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });

    }

    atualizarCarrinho();
    abrirCarrinho();
}


// =========================
// ATUALIZAR CARRINHO
// =========================

function atualizarCarrinho() {

    let quantidade =
        document.getElementById("quantidade-carrinho");

    let lista =
        document.getElementById("lista-carrinho");

    let total =
        document.getElementById("total-carrinho");


    let quantidadeTotal = 0;
    let valorTotal = 0;


    carrinho.forEach(function(produto) {

        quantidadeTotal += produto.quantidade;

        valorTotal +=
            produto.preco * produto.quantidade;

    });


    quantidade.textContent = quantidadeTotal;


    lista.innerHTML = "";


    if (carrinho.length === 0) {

        lista.innerHTML =
            '<p class="carrinho-vazio">' +
            'Seu carrinho está vazio.' +
            '</p>';

    } else {

        carrinho.forEach(function(produto, index) {

            let subtotal =
                produto.preco * produto.quantidade;


            lista.innerHTML +=

                '<div class="item-carrinho">' +

                    '<div>' +

                        '<h4>' +
                            produto.nome +
                        '</h4>' +

                        '<p>' +
                            'R$ ' +
                            subtotal
                                .toFixed(2)
                                .replace(".", ",") +
                        '</p>' +

                        '<div class="controles-quantidade">' +

                            '<button ' +
                                'onclick="diminuirQuantidade(' +
                                index +
                                ')">' +
                                '−' +
                            '</button>' +

                            '<strong>' +
                                produto.quantidade +
                            '</strong>' +

                            '<button ' +
                                'onclick="aumentarQuantidade(' +
                                index +
                                ')">' +
                                '+' +
                            '</button>' +

                            '<button ' +
                                'class="remover" ' +
                                'onclick="removerProduto(' +
                                index +
                                ')">' +
                                'Remover' +
                            '</button>' +

                        '</div>' +

                    '</div>' +

                '</div>';

        });

    }


    total.textContent =
        "R$ " +
        valorTotal
            .toFixed(2)
            .replace(".", ",");
}


// =========================
// AUMENTAR QUANTIDADE
// =========================

function aumentarQuantidade(index) {

    carrinho[index].quantidade++;

    atualizarCarrinho();
}


// =========================
// DIMINUIR QUANTIDADE
// =========================

function diminuirQuantidade(index) {

    if (carrinho[index].quantidade > 1) {

        carrinho[index].quantidade--;

    } else {

        carrinho.splice(index, 1);

    }

    atualizarCarrinho();
}


// =========================
// REMOVER PRODUTO
// =========================

function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}


// =========================
// ABRIR CARRINHO
// =========================

function abrirCarrinho() {

    let carrinhoElemento =
        document.getElementById("carrinho");

    let fundo =
        document.getElementById("fundo-carrinho");


    if (carrinhoElemento) {

        carrinhoElemento.classList.add("aberto");

    }


    if (fundo) {

        fundo.classList.add("aberto");

    }


    document.body.classList.add(
        "carrinho-aberto"
    );
}


// =========================
// FECHAR CARRINHO
// =========================

function fecharCarrinho() {

    let carrinhoElemento =
        document.getElementById("carrinho");

    let fundo =
        document.getElementById("fundo-carrinho");


    if (carrinhoElemento) {

        carrinhoElemento.classList.remove("aberto");

    }


    if (fundo) {

        fundo.classList.remove("aberto");

    }


    document.body.classList.remove(
        "carrinho-aberto"
    );
}


// =========================
// FINALIZAR PEDIDO PELO WHATSAPP
// =========================

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        return;
    }


    let mensagem =
        "Olá! Gostaria de fazer um pedido na Clingio Outlet:\n\n";


    let total = 0;


    carrinho.forEach(function(produto) {

        let subtotal =
            produto.preco *
            produto.quantidade;


        total += subtotal;


        mensagem +=
            produto.nome +
            " - " +
            produto.quantidade +
            "x - R$ " +
            subtotal
                .toFixed(2)
                .replace(".", ",") +
            "\n";

    });


    mensagem +=
        "\nTotal: R$ " +
        total
            .toFixed(2)
            .replace(".", ",");


    // WhatsApp oficial da Clingio Outlet

    let numeroWhatsApp =
        "5511960299105";


    let link =
        "https://wa.me/" +
        numeroWhatsApp +
        "?text=" +
        encodeURIComponent(mensagem);


    window.open(
        link,
        "_blank"
    );
}


// =========================
// FAVORITOS
// =========================

function adicionarFavorito(botao) {

    botao.classList.toggle(
        "favoritado"
    );


    if (
        botao.classList.contains(
            "favoritado"
        )
    ) {

        botao.textContent = "♥";

    } else {

        botao.textContent = "♡";

    }
}


// =========================
// FILTRAR PRODUTOS
// =========================

function filtrarProdutos(
    categoria,
    botao
) {

    categoriaAtual = categoria;


    let botoes =
        document.querySelectorAll(
            ".categoria"
        );


    botoes.forEach(function(item) {

        item.classList.remove(
            "ativa"
        );

    });


    botao.classList.add(
        "ativa"
    );


    pesquisarProdutos();
}


// =========================
// PESQUISAR PRODUTOS
// =========================

function pesquisarProdutos() {

    let campo =
        document.getElementById(
            "pesquisa"
        );


    if (!campo) {

        return;

    }


    let pesquisa =
        campo.value
            .toLowerCase()
            .trim();


    let produtos =
        document.querySelectorAll(
            ".produto"
        );


    produtos.forEach(function(produto) {

        let categoria =
            produto.dataset.categoria;


        let nome =
            produto.dataset.nome
                .toLowerCase();


        let correspondeCategoria =
            categoriaAtual === "todos" ||
            categoria === categoriaAtual;


        let correspondePesquisa =
            nome.includes(
                pesquisa
            );


        if (
            correspondeCategoria &&
            correspondePesquisa
        ) {

            produto.classList.remove(
                "oculto"
            );

        } else {

            produto.classList.add(
                "oculto"
            );

        }

    });
}


// =========================
// INICIAR SITE
// =========================

atualizarCarrinho();
```
