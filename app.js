// let titulo = document.querySelector('h1');//nome da propriedade a ser selecionada no html que eu selecionei a linha 22
// titulo.innerHTML = 'Jogo do número secreto';//inner significa dentro do html vamos colocar o título pq a linha 22 estava vazia

// let paragrafo = document.querySelector('p');//selecionando o paragrafo no html linha 23
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

//substituindo tudo que foi criado acima por uma função mais limpa fazendo as mesmas alterações
let listaDeNumerosSorteados = [];//criando lista para não repetir os números sorteados
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
function exibirMensagemInicial(){
  exibirTextoNaTela('h1' , 'Jogo do número secreto');
  exibirTextoNaTela('p' , 'Escolha um número entre 1 e 10');
}
exibirMensagemInicial();


function verificarChute() {// trecho de código que executa uma ação ou tem alguma responsabilidade, neste caso função que vai verificar o chute que a pessoa deu
    // Corpo da função vai sempre entre chaves similar com o if e else
    let chute = document.querySelector('input').value;//Ao clicar em "Chutar", queremos pegar o valor especificado no input que é a entrada da pessoa usuária, e compará-lo com o número aleatório. Inicialmente, vamos mostrar no console para conferir se acertamos ou erramos o chute.
    //o input não é um texto, é um valor inserido por alguém, portanto, usamos .value
    //console.log(numeroSecreto);//para mostrar o número aleatorio secreto e não mais o botao foi clicado
    console.log(chute == numeroSecreto);//= para atribuir valor == para comparar valor
    if (chute == numeroSecreto) {
      exibirTextoNaTela('h1', 'Acertou');//ele vai exibir esta mensagem no título
      let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'//aparecer na tela com quantas tentativas acertou
      let mensagemTentativas = `Você descobriu o número secreto com  ${tentativas} ${palavraTentativa}!`;
      //exibirTextoNaTela('p', 'Você descobriu o número secreto com  5 tentativas!');//agora a linha do paragrafo vai mudar a mensagem
      exibirTextoNaTela('p', mensagemTentativas);
      //ativando o botão novo jogo ao acertar o número secreto O id é um atributo que especifica o botão e deve ser único, não pode ser usado em outro lugar.
      document.getElementById('reiniciar').removeAttribute('disabled');//reiniciar e disabled tem que estar escrito exatamente como no .htm
    }else {
      if (chute > numeroSecreto) {
        exibirTextoNaTela('p', 'O número secreto é menor!');
      }else {
        exibirTextoNaTela('p', 'O número secreto é maior!');
      }
      tentativas++;//é o mesmo que tentativas = tentativas + 1; esta é a maneira menos usada
      limparCampo();//para funcionar a limpeza do campo aonde coloca o número precisa criar um função abaixo
    }
  }

  function gerarNumeroAleatorio() {
    //return parseInt(Math.random() * 10 + 1);//para que o computador escolha de 1 a 10 numero secreto aleatorio foi criado uma variavel primeira linha let numeroSecreto = gerarNumeroAleatorio();
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);//vamos substiruir o antigo return por esta variavel
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == numeroLimite) {//se a quantidade de elementos da lista for 3 iremos limpar a lista
      listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {// verificar se já temos o número escolhido na nossa lista o includes(), que verifica se o elemento está na lista ele é uma função por isso deve ir entre ()
      return gerarNumeroAleatorio();
    } else {//else, em que o elemento não está na lista. Se não está na lista, queremos retornar o numeroEscolhido, e para isso usaremos o return
      listaDeNumerosSorteados.push(numeroEscolhido)//método para adicionar elementos na lista é o push() adiciona o elemento que passamos nos parênteses ao final da lista
      console.log(listaDeNumerosSorteados)
      return numeroEscolhido;
    }
  }
    function limparCampo() {
      chute = document.querySelector('input');//não vai o value pq não queremos pegar valor
      chute.value = '';//não foi informado string entre '' pq queremos que o campo fique vazio
    }
    //após altarar .HTML dando sentido para o botão reiniciar Jogo na linha 27, criar função .JS para reiniciar o jogo após acertar o número secreto
    function reiniciarJogo(){
      //tem que reescrever o jogo todo para ele saber o que fazer após clicar no botão reiniciar jogo que começa do zero
      numeroSecreto = gerarNumeroAleatorio();
      limparCampo();
      tentativas = 1;
      //para poder pegar o título e paragrafo poderiamos fazer assim porém código copiado dá problema futuro pq se mexer na linha 16 e 17 vai dar problema aqui se esquecer de alterar
      //exibirTextoNaTela('h1' , 'Jogo do número secreto');
      //exibirTextoNaTela('p' , 'Escolha um número entre 1 e 10');
      //adicionamos uma função exibirMensagemInicial no ínicio do programa
      exibirMensagemInicial()
      //agora voltar o botão novo jogo em desabilitado para habilitar somente quando acertar o número para reiniciar jogo
      document.getElementById('reiniciar').setAttribute('disabled', true);//agora o botão será desabilitado novamente após iniciar novo jogo
    }
   
  