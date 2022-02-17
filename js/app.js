function adicionarOuAtualizar(event) {
    let id = document.getElementById('id')

    if (id.value == '') {
        addJogador(event)
    } else {
        atualizarJogador(id.value)
    }
}

function addJogador(event) {
    let jogador = getDadosEntradaJogador()
    let addRef = firebase.database().ref('jogador')
    jogador.id = addRef.push().key
    addRef.child(jogador.id).set(jogador)

    event.preventDefault();
}

function getDadosEntradaJogador() {
    let nome = document.getElementById('nome')
    let idade = document.getElementById('idade')
    let dado = { nome: nome.value, idade: idade.value }
    nome.value = ''
    idade.value = ''

    return dado
}