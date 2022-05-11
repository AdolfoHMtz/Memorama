// creado por Adolfo Huerta y Viridiana Torres
// variable de la portida
var partida = {
  init: function () {
    partida.array = Array.from(document.querySelectorAll(".tablero .carta"));
    partida.array.forEach(function (element) {
    element.addEventListener("click", partida.voltearCarta);
    });
    //objetos de la partida
    partida.numeroCartaVolteada = 0;
    partida.primeraCartaVolteada = 0;
    partida.segundaCartaVolteada = 0;
    partida.mezclarCartas();
    //boton de reseteo
    partida.resetearPartida = document
      .querySelector("#resetear")
      .addEventListener("click", function () {
        partida.numeroCartaVolteada = 0;
        partida.primeraCartaVolteada = 0;
        partida.segundaCartaVolteada = 0;
        partida.array.forEach(function (element) {
          element.classList.remove("flip");
        });
        partida.mezclarCartas();
        partida.div.remove();
      });
  },
  // se mezclan las cartas
  mezclarCartas: function () {
    partida.array = partida.array
      .map(function (a) {
        a.parentNode.removeChild(a);          //parentNode es el padre del nodo en si es una carta // a solo es un
        return a;
      })
      .sort(function () {
        return 0.5 - Math.random();
      })
      .map(function (a) {
        document.querySelector(".tablero").appendChild(a);
        return a;
      });
  },
  // se comparan las cartas por su atributo que se asigno en html
  compararCartas: function (event) {
    if (
      event.target.parentNode.getAttribute("data-framework") ==
      partida.primeraCartaVolteada.getAttribute("data-framework")
    ) {
    } else {
      event.target.parentNode.classList.remove("flip");
      partida.primeraCartaVolteada.classList.remove("flip");
    }
  },
  //funcion de c¿voltear cartas
  voltearCarta: function (event) {
    if (partida.segundaCartaVolteada) {
      return;
    }
    event.target.parentNode.classList.add("flip");
    if (partida.numeroCartaVolteada < 1) {
      partida.numeroCartaVolteada++;
    } else {
      setTimeout(partida.compararCartas, 800, event);
      partida.numeroCartaVolteada = 0;
      partida.segundaCartaVolteada = 1;
    }
    setTimeout(
      function (event) {
        partida.primeraCartaVolteada = event.target.parentNode;
        partida.segundaCartaVolteada = 0;
      },
      800,
      event
    );
    //Si se encontraron todos los pares
    if (document.querySelectorAll(".carta.flip").length == 20) {
      setTimeout(function () {
        //anuncio de que ganaste
        partida.div = document.createElement("div");
        partida.div.innerHTML = "¡¡Ganaste!!";
        partida.div.classList.add("victoria");
        document.querySelector(".tablero").appendChild(partida.div);
      }, 800);
    }
  },
};
  partida.init();
