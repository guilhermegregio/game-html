var canvas = document.getElementById('game');

var context = canvas.getContext('2d');

var imagens,
	animacao,
	teclado,
	colisor,
	nave,
	criadorInimigos,
	totalImagens = 0,
	carregadas = 0;

carregarImagens();


function carregarImagens() {
	imagens = {
		espaco: 'fundo-espaco.png',
		estrelas: 'fundo-estrelas.png',
		nuvens: 'fundo-nuvens.png',
		nave: 'nave.png',
		ovni: 'ovni.png'
	};

	Object.keys(imagens).forEach(function (key) {
		var img = new Image();
		img.src = 'images/'.concat(imagens[key]);
		img.onload = carregando;
		totalImagens++;

		imagens[key] = img;
	});
}

function carregando() {
	carregadas++;
	if (carregadas === totalImagens) {
		iniciarObjetos();
	}
}

function iniciarObjetos() {
	animacao = new Animacao(context);
	teclado = new Teclado(document);
	colisor = new Colisor();

	espaco = new Fundo(context, imagens.espaco);
	estrelas = new Fundo(context, imagens.estrelas);
	nuvens = new Fundo(context, imagens.nuvens);

	nave = new Nave(context, teclado, imagens.nave);

	animacao.novoSprite(espaco);
	animacao.novoSprite(estrelas);
	animacao.novoSprite(nuvens);

	animacao.novoSprite(nave);
	colisor.novoSprite(nave);

	animacao.novoProcessamento(colisor);

	configuracoesIniciais();
}

function configuracoesIniciais() {
	// Fundo
	espaco.velocidade = 60;
	estrelas.velocidade = 150;
	nuvens.velocidade = 500;

	// Nave
	nave.x = canvas.width / 2 - imagens.nave.width / 2;
	nave.y = canvas.height - imagens.nave.height;
	nave.velocidade = 200;

	// Tiro
	teclado.disparou(ESPACO, function () {
		nave.atirar();
	});

	animacao.ligar();

	criacaoInimigos();
}

function criacaoInimigos() {
	criadorInimigos = {
		ultimoOvni: new Date().getTime(),
		processar: function () {
			var agora = new Date().getTime();
			var decorrido = agora - this.ultimoOvni;

			if (decorrido > 1000) {
				novoOvni();
				this.ultimoOvni = agora;
			}
		}
	};

	animacao.novoProcessamento(criadorInimigos);
}

function novoOvni() {
	var imgOvni = imagens.ovni;
	var ovni = new Ovni(context, imgOvni);

	ovni.velocidade = Math.floor(100 + Math.random() * 260);
	ovni.x = Math.floor(Math.random() * (canvas.width - imgOvni.width + 1));
	ovni.y = -imgOvni.height;

	animacao.novoSprite(ovni);
	colisor.novoSprite(ovni);
}