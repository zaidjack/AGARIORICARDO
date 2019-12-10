var powerups = null;
var jugadores = null;
var yo = 'RICARDO';
var mis_datos = {
  nom: yo,
  tam: 12,
  pos: [Math.random() * 800, Math.random() * 800],
  col: 'black'
};
var url = 'https://ucslpcontenidos-agario.herokuapp.com/';
function tecla(e) {
  switch (e.keyCode) {
    case 38: // arriba
      mis_datos.pos[1] -= 10;
      break;
    case 40: // abajo
      mis_datos.pos[1] += 10;
      break;
    case 39: // derecha
      mis_datos.pos[0] += 10;
      break;
    case 37: // izquierda
      mis_datos.pos[0] -= 10;
      break;
  }
}
$('body').keydown(tecla);
function circulito(c, ctx, d) {
  ctx.beginPath();
  ctx.arc(d.pos[0] + c.width / 2 - mis_datos.pos[0],
    d.pos[1] + c.height / 2 - mis_datos.pos[1],
    d.tam * 2,
    0, 2 * Math.PI);
  ctx.fillStyle = d.col;
  ctx.fill();
}
function dibujar() {
  if (jugadores === null)
    return;

  var c = $('#pantalla')[0];
  var ctx = c.getContext('2d');
  ctx.clearRect(0, 0, c.width, c.height);
  circulito(c, ctx, mis_datos);
  for (var i = 0; i < powerups.length; i++) {
    circulito(c, ctx, powerups[i]);
  }
  for (var i = 0; i < jugadores.length; i++) {
    if (jugadores[i].nom !== yo) {
      circulito(c, ctx, jugadores[i]);
    }
  }
}
function exito(t) {
  jugadores = t[0];
  powerups = t[1];
  actualizar();
}
setInterval(dibujar, 100);
function actualizar() {
    $.get(url + '?' + $.param({
      jugador: JSON.stringify(mis_datos),
      ale: Math.random()
    }), exito);
}
actualizar();
