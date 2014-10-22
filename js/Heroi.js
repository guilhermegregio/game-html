var DIRECAO_ESQUERDA = 1;
var DIRECAO_DIREITA = 2;
var DIRECAO_CIMA = 3;
var DIRECAO_BAIXO = 4;

function clone(obj) {
	if (null == obj || "object" != typeof obj) return obj;
	var copy = obj.constructor();
	for (var attr in obj) {
		if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	}
	return copy;
}

function Heroi(context, teclado, animacao) {
	this.context = context;
	this.teclado = teclado;
	this.animacao = animacao;
	this.x = 0;
	this.y = 0;

	this.direcao = DIRECAO_DIREITA;
}

Heroi.prototype = {
	atualizar: function () {
		if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0) {
			this.direcao = DIRECAO_ESQUERDA;
			this.x -= 10;
		} else if (this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - 20) {
			this.direcao = DIRECAO_DIREITA;
			this.x += 10;
		} else if (this.teclado.pressionada(SETA_CIMA) && this.y > 0) {
			this.direcao = DIRECAO_CIMA;
			this.y -= 10;
		} else if (this.teclado.pressionada(SETA_BAIXO) && this.y < this.context.canvas.height - 50) {
			this.direcao = DIRECAO_BAIXO;
			this.y += 10;
		}
	},
	desenhar: function () {
		this.context.fillRect(this.x, this.y, 20, 50);
	},
	atirar: function () {
		var tiro = new Bola(this.context);
		tiro.x = this.x + 20 / 2;
		tiro.y = this.y + 50 / 2;
		tiro.raio = 2;
		tiro.cor = 'red';

		switch (this.direcao) {
			case DIRECAO_ESQUERDA:
				tiro.velocidadeX = -20;
				break;
			case DIRECAO_DIREITA:
				tiro.velocidadeX = 20;
				break;
			case DIRECAO_CIMA:
				tiro.velocidadeY = -20;
				break;
			case DIRECAO_BAIXO:
				tiro.velocidadeY = 20;
				break;
		}

		this.animacao.novoSprite(tiro);
	}
};