const button = document.querySelector('#enviar')
const verEstoque = document.querySelector('#verEstoque')
const limpar = document.querySelector('#limpar')

//validação dos dados dos Inputs
button.onclick = function() {
    const nome = document.querySelector('#txtNomeProduto').value
    const codigo = document.querySelector('#txtCodProduto').value
    const quantidade = document.querySelector('#qtdeProduto').value
    if (nome === '') {
        alert('Preencha os dados corretamente!')
    } else if (codigo === '') {
        alert('Preencha os dados corretamente!')
    } else {
        cadastrarProduto(nome, codigo, parseInt(quantidade))
    }
}

//cadastramento de produtos
function cadastrarProduto(produto, codigo, quantidade) {
    let novoProduto = { nome: produto, codigo: codigo, quantidade: quantidade }

    if (typeof(Storage) !== 'undefined') { // verificar se o navegador suporta a versão do Storage

        let produtos = localStorage.getItem('produtos')
        if (produtos === null) produtos = []
        else produtos = JSON.parse(produtos) // converter para JSON para obj para trabalhar os dados
        produtos.push(novoProduto) // faz push dos produtos digitados
        localStorage.setItem('produtos', JSON.stringify(produtos)) // retornar para string para salvar os dados
        alert(`Foram cadastradas com sucesso ${quantidade} unidades do produto ${produto}`)
        atualizarEstoque('totalEstoque')
        location.reload()

    } else alert('A versão do seu navegador não suporta essa aplicação')
}

//atualização de Carrinho
function atualizarEstoque(idCampo) {
    localStorage.setItem('totalEstoque', ++document.getElementById(idCampo).innerHTML)
}

//carregar informações do Estoque
function carregarTotalEstoque(idCampo) {
    if (typeof(Storage) !== 'undefined') {

        let totalEstoque = localStorage.getItem('totalEstoque')
        if (totalEstoque == null) totalEstoque = 0
        document.getElementById(idCampo).innerHTML = totalEstoque
    } else alert('A versão do seu navegador não suporta essa aplicação')
}

//Inner do objeto para consulta
verEstoque.onclick = function listarEstoque() {
    if (typeof(Storage) !== 'undefined') {

        let produtos = localStorage.getItem('produtos')
        document.write(`<h1>Estoque</h1>`)
        if (produtos == null) document.write(`<h3>Ainda não há itens no estoque</h3>`)
        else {
            produtos = JSON.parse(produtos)
            produtos.forEach(produto => {
                document.write(`<ul>`)
                document.write(`<li>Nome do produto: ${produto.nome}</li>`)
                document.write(`<li>Código do produto: ${produto.codigo}</li>`)
                document.write(`<li>Quantidade do produto: ${produto.quantidade}</li>`)
                document.write(`</ul>`)
            })

        }
    } else alert('A versão do seu navegador não suporta essa aplicação')
}

//Botão em teste, limpar dados
limpar.onclick = () => {
    alert('campo em teste')
}


//localStorage.clear()