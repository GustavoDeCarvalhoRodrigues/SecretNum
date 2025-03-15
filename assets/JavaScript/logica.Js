let listNumber = [];
let maxNumber = 20;
let limiteNumber = maxNumber;
let numberMin = 0;
let secretNumber = gerarNumeroAleatorio();
let tentativas = 1;
let maxTentativas = 3;


function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limiteNumber + 1)
    let qtdElementList = listNumber.length

    if (qtdElementList == limiteNumber) {
        listNumber = [];
    }

    if (listNumber.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listNumber.push(numeroEscolhido)
        console.log(listNumber)
        return numeroEscolhido;
    }
}

function limparCampo() {
    let chute = document.getElementById("chute").value;
    chute = "";
}

function reiniciarJogo() {
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chute').removeAttribute('disabled');
    secretNumber = gerarNumeroAleatorio();
    tentativas = 1;
     limparCampo();
    exibirTextoNaTela('h1', 'Adivinhe o <span class="container__texto-azul">número secreto</span>');
    exibirTextoNaTela('p', 'Escolha um número entre' + numberMin + ' a ' + maxNumber);
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log(secretNumber);
    if (chute == secretNumber) {
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chute').setAttribute('disabled', true);
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', 'Meus parabéns, clique em novo jogo e volte a brincar!');

    } else if (chute > maxNumber || chute < numberMin) {
        exibirTextoNaTela('p', 'Por favor, insira um numero entre ' + numberMin + ' a ' + limiteNumber);
    }

    else if (tentativas == maxTentativas) {
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chute').setAttribute('disabled', true);
        exibirTextoNaTela('h1', 'Errou! Número máximo de tentativas é ' + maxTentativas);
        exibirTextoNaTela('p', 'O número secreto era: ' + secretNumber);
        
    }
    else { 
        tentativas++;

        if (chute > secretNumber) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }

        limparCampo();
    }
}
