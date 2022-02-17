// Inciar Lista
$(document).ready(function() {
    listaJogadores()
})

// Adicionar Jogador
function adicionarOuAtualizar(event) {
    let id = document.getElementById('id')

    if (id.value == '') {
        addJogador(event)
    } else {
        atualizarJogador(id.value)
        id.value = ''
        $('#btnAdd').removeClass('d-none')
        $('#btnAtualizar').addClass('d-none')
    }
    event.preventDefault()
}

function addJogador(event) {
    let jogador = getDadosEntradaJogador()
    let addRef = firebase.database().ref('jogador')
    jogador.id = addRef.push().key
    addRef.child(jogador.id).set(jogador)
    listaJogadores()
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

// Lista de todos os Jogadores
function listaJogadores() {
    $('.lista').html('')

    let jogadorRef = firebase.database().ref('jogador')
    jogadorRef.on('value', function(snap) {
        let jogador = snap.val()

        for (var dado in jogador) {
            if (!jogador.hasOwnProperty(dado)) continue

            let obj = jogador[dado]

            criarCartaoLista(obj)
        }
    })
}

function criarCartaoLista(dado) {
    $('.lista').append(
        `<div class="card mt-2">
		   <div class="card-body">
		     <div class="card-title">Nome: ${dado.nome} <br>Idade: ${dado.idade}</div>
			 <a href="#" class="btn btn-danger" onclick="deletarJogador('${dado.id}')">
			   <i class="fas fa-trash"></i>
			 </a>
			 <a href="#" class="btn btn-warning" onclick="editarJogador('${dado.id}')">
			   <i class="fas fa-pencil-alt"></i>
			 </a>
		   </div>
		</div>`)
}

// Chamando a Função Atualizar Jogador
function editarJogador(pid) {
    $('#btnAdd').removeClass('d-block')
    $('#btnAdd').addClass('d-none')
    $('#btnAtualizar').removeClass('d-none')

    let jogador = getDadosPorId(pid)
    preencherCamposEntrada(jogador)
}

function getDadosPorId(pid) {
    let jogador = ''
    let ref = firebase.database().ref('jogador/' + pid)

    ref.on('value', function(dado) {
        jogador = dado.val()
    }, function(erro) {
        console.log(erro)
    })
    return jogador
}

// Preencher campos para editar
function preencherCamposEntrada(jogador) {
    let nome = document.getElementById('nome')
    let idade = document.getElementById('idade')
    let id = document.getElementById('id')

    nome.value = jogador.nome
    idade.value = jogador.idade
    id.value = jogador.id
}

// Atualizar Jogador
function atualizarJogador(id) {
    let jogador = getDadosEntradaJogador()
    let atualizarRef = firebase.database().ref('jogador/' + id)
    jogador.id = id
    atualizarRef.update(jogador)

    listaJogadores()

    event.preventDefault()
}

// Deletar Jogador
function deletarJogador(id) {
    let jogadorRef = firebase.database().ref('jogador/' + id)
    jogadorRef.remove()

    listaJogadores()
}