var partida = {
  init: function () {
    partida.array = Array.from(document.querySelectorAll(".tablero .carta"));
    partida.array.forEach(function (element) {
      element.addEventListener("click", partida.turningOver);
    });
    //it will count the number of card that was turn over
    partida.number = 0;
    partida.previousCard = 0;
    partida.isbusy = 0;
    partida.shuffleItems();
    //reset button
    partida.resetBtn = document
      .querySelector("#reset")
      .addEventListener("click", function () {
        partida.number = 0;
        partida.previousCard = 0;
        partida.isbusy = 0;
        partida.array.forEach(function (element) {
          element.classList.remove("flip");
        });
        partida.shuffleItems();
        partida.div.remove();
      });
  },
  shuffleItems: function () {
    partida.array = partida.array
      .map(function (e) {
        e.parentNode.removeChild(e);
        return e;
      })
      .sort(function () {
        return 0.5 - Math.random();
      })
      .map(function (e) {
        document.querySelector(".tablero").appendChild(e);
        return e;
      });
  },
  compareElements: function (event) {
    if (
      event.target.parentNode.getAttribute("data-framework") ==
      partida.previousCard.getAttribute("data-framework")
    ) {
      // console.log('daaaa');
    } else {
      event.target.parentNode.classList.remove("flip");
      partida.previousCard.classList.remove("flip");
    }
  },
  turningOver: function (event) {
    if (partida.isbusy) {
      return;
    }
    event.target.parentNode.classList.add("flip");
    if (partida.number < 1) {
      partida.number++;
    } else {
      setTimeout(partida.compareElements, 800, event);
      partida.number = 0;
      partida.isbusy = 1;
    }
    setTimeout(
      function (event) {
        partida.previousCard = event.target.parentNode;
        partida.isbusy = 0;
      },
      800,
      event
    );
    //if we have all cards flip
    if (document.querySelectorAll(".carta.flip").length == 20) {
      setTimeout(function () {
        // alert('You are a winner!');
        partida.div = document.createElement("div");
        partida.div.innerHTML = "Ganaste";
        partida.div.classList.add("youAreAWinner");
        document.querySelector(".tablero").appendChild(partida.div);
      }, 800);
    }
  },
};
window.onload = function () {
  partida.init();
};
