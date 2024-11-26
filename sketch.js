let obstaculos;
let numAleatorio;
let pontuacao;
let perdeu;
let proximo;
let controle;
let desertao; // Variável para a imagem de fundo

function preload() {
  desertao = loadImage('desertao.avif'); // Carregando o GIF de fundo
}

function setup() {
  createCanvas(600, 450);
  textSize(24);
  controle = createSlider(10, 20, 12, 1);
  controle.position(width - controle.width, 0);
  reiniciarEsboco();
}

function keyPressed() {
  if (key == ' ') {
    quadrado.pular();
    if (perdeu) {
      reiniciarEsboco();
    }
  }
}

function reiniciarEsboco() {
  console.log("Reiniciando jogo");
  pontuacao = 0;
  perdeu = false;
  obstaculos = [];
  proximo = 0;
  quadrado = new Quadrado();
  new Obstaculo();
  numAleatorio = int(random(50, 150));
  loop();
}

function draw() {
  background(desertao); // Define o plano de fundo como a imagem animada
  text(pontuacao, 5, 24);
  proximo += 1;
  if (proximo == numAleatorio) {
    obstaculos.push(new Obstaculo());
    pontuacao += 1;
    proximo = 0;
    numAleatorio = int(random(40, width / 5));
  }

  for (let obstaculo of obstaculos) {
    if (obstaculo.x < 0) {
      if (obstaculos.length > 3) {
        obstaculos.shift();
      }
    }
    obstaculo.mover();
    obstaculo.mostrar();
    if (quadrado.colide(obstaculo)) {
      console.log("Fim de jogo!");
      perdeu = true;
      noLoop();
    }
  }

  quadrado.mostrar();
  quadrado.mover();
}
