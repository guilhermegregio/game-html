function Animacao(context) {
	this.context = context;
	this.sprites = [];
	this.ligado = false;
}

Animacao.prototype = {
	novoSprite: function (sprite) {
		this.sprites.push(sprite);
	},
	ligar: function () {
		this.ligado = true;
		this.proximoFrame();
	},
	desligar: function () {
		this.ligado = false;
	},
	limparTela: function () {
		var ctx = this.context;

		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	},
	proximoFrame: function proximoFrame() {
		if (!this.ligado) {
			return;
		}

		this.limparTela();

		this.sprites.forEach(function (sprite) {
			sprite.atualizar();
		});

		this.sprites.forEach(function (sprite) {
			sprite.desenhar();
		});

		var animacao = this;
		requestAnimationFrame(function () {
			animacao.proximoFrame();
		});
	}
};