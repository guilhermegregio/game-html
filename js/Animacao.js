function Animacao(context) {
	this.context = context;
	this.sprites = [];
	this.ligado = false;
	this.processamentos = [];
	this.spritesExcluir = [];
	this.processamentoExcluir = [];
}

Animacao.prototype = {
	novoSprite: function (sprite) {
		this.sprites.push(sprite);
		sprite.animacao = this;
	},
	excluirSprite: function (sprite) {
		this.spritesExcluir.push(sprite);
	},
	excluirProcessamento: function (processamento) {
		this.processamentoExcluir.push(processamento);
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

		//self.limparTela();

		self.sprites.forEach(function (sprite) {
			sprite.atualizar();
		});

		self.sprites.forEach(function (sprite) {
			sprite.desenhar();
		});

		self.processamentos.forEach(function (processamento) {
			processamento.processar();
		});

		self.processarExclusoes();

		requestAnimationFrame(function () {
			self.proximoFrame();
		});
	},
	processarExclusoes: function () {
		var novoSprites = [];
		var novoProcessamentos = [];

		for (var i in this.sprites) {
			if (this.spritesExcluir.indexOf(this.sprites[i]) === -1) {
				novoSprites.push(this.sprites[i]);
			}
		}

		for (var i in this.processamentos) {
			if (this.processamentoExcluir.indexOf(this.processamentos[i]) === -1) {
				novoProcessamentos.push(this.processamentos[i]);
			}
		}

		this.spritesExcluir = [];
		this.processamentoExcluir = [];

		this.sprites = novoSprites;
		this.processamentos = novoProcessamentos;
	},
	novoProcessamento: function (processamento) {
		this.processamentos.push(processamento);
		processamento.animacao = this;
	}
};