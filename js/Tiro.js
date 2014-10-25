function Tiro(context, nave) {
	this.context = context;
	this.nave = nave;

	this.largura = 3;
	this.altura = 10;
	this.x = nave.x + nave.imagem.width / 2 - this.largura / 2;
	this.y = this.nave.y - this.altura;
	this.velocidade = 300;
	this.cor = 'yellow';
}

Tiro.prototype = {
	atualizar: function () {
		this.y -= this.velocidade * this.animacao.decorrido / 1000;

		if (this.y < -this.altura) {
			this.animacao.excluirSprite(this);
			this.colisor.excluirSprite(this);
		}
	},
	desenhar: function () {
		var ctx = this.context;
		ctx.save();

		ctx.fillStyle = this.cor;
		ctx.fillRect(this.x, this.y, this.largura, this.altura);

		ctx.restore();
	},
	retangulosColisao: function () {
		return [
			{
				x: this.x,
				y: this.y,
				largura: this.largura,
				altura: this.altura
			}
		];
	},
	colidiuCom: function () {
	}
}