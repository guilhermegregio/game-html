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
	proximoFrame: function () {
		var self = this;
		if (!self.ligado) {
			return;
		}

		self.limparTela();

		self.sprites.forEach(function (sprite) {
			sprite.atualizar();
		});

		self.sprites.forEach(function (sprite) {
			sprite.desenhar();
		});

		requestAnimationFrame(function () {
			self.proximoFrame();
		});
	}
};