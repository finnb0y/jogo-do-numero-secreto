let listaDeNúmerosSorteados = [];
let númeroMáximo = gerarNúmeroMáximo();
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

console.log(`Número Secreto: ${numeroSecreto}\nNúmero Máximo: ${númeroMáximo}`);

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada");
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    let mensagem = `Escolha um número entre 0 e ${númeroMáximo}`;
    exibirTextoNaTela('p', mensagem);
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela("h1", "Parabéns, você acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}!!`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled', 'desativado');
    } else {
        let palavraErrou = chute > numeroSecreto ? "menor" : "maior";
        let mensagemErrou = `O número secreto é ${palavraErrou} que ${chute}`;        
        exibirTextoNaTela("p", mensagemErrou);
        tentativas++;
        limparCampo();
    }
}

function gerarNúmeroMáximo() {
    return Math.round(Math.random() * 499 + 1);
}

function gerarNumeroAleatorio() {
    let númeroEscolhido = Math.round(Math.random() * númeroMáximo);
    let quantidadeDeNúmeroosNaLista = listaDeNúmerosSorteados.length;

    if (quantidadeDeNúmeroosNaLista == númeroMáximo) {
        listaDeNúmerosSorteados = [];
    }
    
    if (listaDeNúmerosSorteados.includes(númeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNúmerosSorteados.push(númeroEscolhido);
        return númeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input').value = '';
}

function reiniciarJogo() {
    limparCampo();
    numeroSecreto = gerarNumeroAleatorio();
    númeroMáximo = gerarNúmeroMáximo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chutar').removeAttribute('disabled');
}

