var SETA_ESQUERDA = 37;
var SETA_DIREITA = 39;
var ESPACO = 32;

function Teclado(elemento) {
	var self = this;
	self.elemento = elemento;
	self.pressionadas = [];
	self.disparadas = [];
	self.funcoesDisparo = [];

	elemento.addEventListener('keydown', function (evento) {
		var tecla = evento.keyCode;

		self.pressionadas[tecla] = true;

		if (self.funcoesDisparo[tecla] && !self.disparadas[tecla]) {
			self.disparadas[tecla] = true;
			self.funcoesDisparo[tecla]();
		}
	});

	elemento.addEventListener('keyup', function (evento) {
		var tecla = evento.keyCode;

		self.pressionadas[tecla] = false;
		self.disparadas[tecla] = false;
	});
}

Teclado.prototype = {
	pressionada: function (tecla) {
		return this.pressionadas[tecla];
	},
	disparou: function (tecla, callback) {
		this.funcoesDisparo[tecla] = callback;
	}
};
