
//Capturamos el evento 'load' para que se carge todo el contenido y despues lanze la función iniciar
window.addEventListener('load', iniciar, false);

function iniciar() {
    
    //Vamos a crear los div necesarios en la función iniciar

    //Primero creamos el wraper que contendra todo
    const wraper = document.createElement("div");

    wraper.setAttribute("id", "wraper");

    const body = document.getElementById("body");

    body.appendChild(wraper);

    //Añadimos el tablero al contenedor
    wraper.appendChild(tablero());

    //Añadimos la musica de fondo
    wraper.appendChild(musica());

    //Capturamos el boton comenzar
    const comenzar = document.getElementById("btnComenzar");

    //Creamos el evento con la función crearEvento
    crearEvento(comenzar, "click", comenzarPartida);

}
//-------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------//
//Funcion para comenzar la partida

function comenzarPartida() {

    clearInterval();//Limpimos todos los intervalo

    clearTimeout();

    //capturamos el contador de puntos 
    score = document.getElementById("contador");

    //Ponemos la puntuación a cero
    score.value = 0;

    //Capturamos el elemento que muestra las vidas
    life = document.getElementById("contadorVidas");

    //Ponemos las vidas en 3
    life.value = 3;

    // escuchamos los eventos de click y del teclado en el DOM
    escucharEventos();

    //Comenzamos el juego a travez de un setInterval
    intervalo = setInterval(meteoroAleatorio, 1500);


}
//-------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------//
//Funcion para hacer aparecer el meteoro

let contador; //Variable global 

function meteoroAleatorio() {

     //capturamos los agujeros
     let elementos = document.querySelectorAll('.meteoro');

     //Capturamos los agujeros con la clase explosion
     let explosion = document.getElementsByClassName('explosion');

     if (life.value > 0) {//Si sigue teniendo vidas

         //Comprobamos si hemos hecho click en el meteorito o no, ya sea con raton o teclado 
         if (explosion.length == 0 & contador != undefined) {
             life.value--;
         }

         //Limpiamos los elementos que tengan alguna clase
         limpiarClases(elementos);

         //Generamos el número aleatorio con una función 
         const aleatorio = numAleatorio();

         //Añadimos la clase mostrar a la imagen que corresponde con el número aleatorio
         elementos[aleatorio].classList.add("mostrar");

         //Asignamos el id de la posicion del metoro a la variable posición para usarla mas tarde
         posMeteoro = elementos[aleatorio].parentNode.id;


         contador++;

     } else {//Si tiene 0 vidas 

         //finalizamos el intervalo
         clearInterval(intervalo);

         clearTimeout();

         let padre = document.getElementById('wraper');

         //Añadimos el div con la información de que el juego acabo
         padre.appendChild(gameOver(score.value));

         //Limpiamos el tablero del juego
         limpiarClases(elementos);

         //Eliminamos la función gameOver del tablero despues de 4 segundos
         final = setTimeout(finalJuego, 3000);

         //Ponemos el contador en null por si queremos jugar otra vez sin recargar la página
         contador = null;


     }

}
//-------------------------------------------------------------------------------------------------------------//

//------------------------------------------------------------------------------------------------------------//
//Funcion para escuchar eventos de tipo click y de teclado

function escucharEventos() {

    //capturamos los agujeros
    let meteoritos = document.querySelectorAll('.agujeros');

    //Añadimos los eventos a cada elemento con la función de crear eventos
    meteoritos.forEach(eventos => {
        crearEvento(eventos, 'click', explotarMeteoros);

    });

    //Añadimos los eventos del teclado con la funcion de crear eventos
    crearEvento(document, 'keypress', explotarMeteoritosTeclado);

}
//------------------------------------------------------------------------------------------------------------//


//------------------------------------------------------------------------------------------------------------//
//Funcion para eliminar eventos del DOM

function eliminarEventos() {

    //capturamos los agujeros
    let meteoritos = document.querySelectorAll('.agujeros');

    //Eliminamos los eventos a cada elemento 
    meteoritos.forEach(eventos => {
       eventos.removeEventListener('click', explotarMeteoros);

    });

    //Eliminamos los eventos del teclado 
    document.removeEventListener('keypress', explotarMeteoritosTeclado);

}
//------------------------------------------------------------------------------------------------------------//



//------------------------------------------------------------------------------------------------------------//
//Función para explotar meteoritos con el teclado

function explotarMeteoritosTeclado(event) {

    let tecla = event.key; //Capturamos la tecla pulsada

    let meteoro = document.querySelectorAll('.mostrar'); //Capturamos el meteorito que se muestra en el agujero

    let letraPadre = meteoro[0].parentElement.attributes[2].value; //Añadimos la letra que tiene el elemento html para diferenciarlo



    if (tecla === letraPadre) { //Si las letras coinciden

        score.value = parseInt(score.value) + 10;

        meteoro[0].firstElementChild.play();

        meteoro[0].classList.remove('mostrar');

        meteoro[0].classList.add('explosion');

        meteoro[0].parentNode.classList.add('borde-verde');

    } else {

        life.value--;

        meteoro[0].parentNode.classList.add('borde-rojo');
    }
}
//------------------------------------------------------------------------------------------------------------//

//------------------------------------------------------------------------------------------------------------//
//Funcion para destrozar los meteoritos con el evento click

function explotarMeteoros(event) {

    let meteoro = event.currentTarget //Capturamos el elemento que a disparado el evento


    if (meteoro.id === posMeteoro) { //Si su id es igual al del meteoro aleatorio

        score.value = parseInt(score.value) + 10; //Sumamos los puntos

        meteoro.firstChild.firstElementChild.play();

        meteoro.firstChild.classList.remove('mostrar'); //Quitamos la clase mostrar

        meteoro.firstChild.classList.add('explosion'); //Añadimos la clase explosion

        meteoro.classList.add('borde-verde');


    } else {

        life.value--;

        meteoro.classList.add('borde-rojo');
    }


}
//------------------------------------------------------------------------------------------------------------//


//------------------------------------------------------------------------------------------------------------//
//Función para generar el número aleatorio
//Variable global para que no se repitan los números
let numBase;

function numAleatorio() {

    let aleatorio = Math.floor(Math.random() * 4); //Generamos el número aleatorio

    if (aleatorio == numBase) { //Si es igual al aterior número le restamos o sumamos

        if (aleatorio === 4) {

            aleatorio -= 1;

            numBase = aleatorio;
        } else {
            aleatorio += 1;
            numBase = aleatorio;
        }

    } else {
        numBase = aleatorio;
    }

    return aleatorio;
}
//------------------------------------------------------------------------------------------------------------//



//-------------------------------------------------------------------------------------------------------------//
//Funcion para crear el tablero del juego

function tablero() {

    let tablero = document.createElement("div"); //Creamos el elemento tablero

    tablero.setAttribute("id", "tablero"); //Pponemos un id

    //Ponemos los estilos y la imegan de fondo
    tablero.style.width = "80%";

    tablero.style.padding = "30px";

    tablero.style.height = "100% ";

    tablero.style.margin = "auto";

    tablero.style.background = "#f3f3f3 url('img/tierra.jpg') no-repeat top center";

    tablero.style.backgroundSize = "cover";

    tablero.style.opacity = "70%";

    tablero.style.display = "grid"; //Creamos un grid para posicionar los agujeros

    tablero.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr";

    tablero.style.gridTemplateRows = "100px 1fr 0.2fr 1fr 80px";


    // Añadimos los agujeros negros mediante una función que los creara.
    let hijos = agujeros(5);

    for (i in hijos) {

        //Con un bucle for los insertamos en el tablero
        tablero.appendChild(hijos[i]);
    }

    //Añadimos el boton de comenzar

    tablero.appendChild(btnComenzar());

    //Añadimos el marcador de los puntos

    tablero.appendChild(puntos());


    //Añadimos el titulo
    tablero.appendChild(titulo());

    //Añadimos el contador de las vidas
    tablero.appendChild(contadorVidas());

    return tablero;

}
//-------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------//
//Función para crear los agujeros negros que luego vamos a insertarlos en el tablero

function agujeros(cantidad) {

    let numAgujeros = cantidad; //Cantidad de agujeros en el tablero

    let agujeros = []; //Array en donde gardaremos todos los agujeros creados

    let letras = ["q", "w", "e", "z", "x"]; //Letras para los eventos del teclado

    //Con un bucle for los creamos 
    for (let a = 0; a < numAgujeros; a++) {

        let hijos = document.createElement("div");

        hijos.setAttribute("id", "agujero" + (a + 1));

        hijos.setAttribute("class", "agujeros");

        hijos.setAttribute("data", letras[a]);

        hijos.style.width = "270px";

        hijos.style.height = "270px";

        hijos.style.margin = "auto";

        hijos.style.padding = "10px";

        hijos.style.background = "#f3f3f3 url('img/agujeroNegro.jpg') no-repeat center center";

        hijos.style.borderRadius = "50%";

        hijos.style.position = "relative";

        hijos.appendChild(meteoro());

        agujeros.push(hijos);

    }

    return agujeros;
}
//-------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------//
//Funcion para crear el boton de comenzar 

function btnComenzar() {

    let btnComenzar = document.createElement("button"); //Creamos el elemento

    btnComenzar.setAttribute("id", "btnComenzar"); //Ponemos un id

    btnComenzar.appendChild(document.createTextNode("Iniciar Partida"));

    btnComenzar.style.gridArea = "5 / 3 / 6 / 4"; //Lo posicionamos en el grid

    btnComenzar.style.border = " 2px solid white";

    btnComenzar.style.background = "#E3EBED";

    btnComenzar.style.color = "black"

    btnComenzar.style.margin = "25px";

    btnComenzar.style.borderRadius = "10px";

    return btnComenzar;
}
//-------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------//
//función para crear contador de los puntos.

function puntos() {

    let marcador = document.createElement("div"); //Creamos el elemento.

    marcador.textContent = "Marcador: "; //Le ponemos el texto Marcador.

    marcador.setAttribute("id", "marcador"); //Ponemos el id marcador.

    //Le damos los estilos al marcador de puntos.
    marcador.style.gridArea = "1 / 1 / 2 / 2";

    marcador.style.background = "#E3EBED";

    marcador.style.margin = "auto";

    marcador.style.borderRadius = "10px";

    marcador.style.textAlign = "center";

    marcador.style.padding = "15px 15px 15px 15px";

    //Creamos el input de tipo text para ir incrementando los puntos.

    let contador = document.createElement("input");

    contador.type = "number";

    contador.setAttribute("id", "contador");

    contador.readOnly = true;

    contador.style.width = "80px";

    //Añadimos el elemento input al marcador.
    marcador.appendChild(contador);

    return marcador;
}


//-------------------------------------------------------------------------------------------------------------//
//Funcion para crear el titulo del juego

function titulo() {

    //Creamos el elemento h1 y le damos todas sus estilos.
    let titulo = document.createElement("h1");

    titulo.textContent = "Whac-a-mole Reptiliano";

    titulo.style.gridArea = "1 / 2 / 2 / 5"; //Lo posicionamos en el grid

    titulo.style.textAlign = "center";

    titulo.style.color = "white";

    titulo.style.textShadow = "5px 5px  #DBB56C"

    titulo.style.lineHeight = "2em";

    titulo.style.fontSize = "2em"

    return titulo;
}
//-------------------------------------------------------------------------------------------------------------//



//Función para el contador de vidas

function contadorVidas() {

    let vidas = document.createElement("div"); //Creamos el elemento.

    vidas.textContent = "Vidas: "; //Le ponemos el texto Vidas.

    vidas.setAttribute("id", "vidas"); //Ponemos el id vidas.

    //Le damos los estilos al div
    vidas.style.gridArea = "1 / 5 / 2 / 6"; //Lo posicionamos en el grid

    vidas.style.background = "#E3EBED";

    vidas.style.margin = "auto";

    vidas.style.borderRadius = "10px";

    vidas.style.textAlign = "center";

    vidas.style.padding = "15px 15px 15px 15px";

    //Le añadimos el input de tipo text para ir disminuyendo las vidas.

    let contadorVidas = document.createElement("input");

    contadorVidas.type = "number";

    contadorVidas.value = "3";

    contadorVidas.setAttribute("id", "contadorVidas");

    contadorVidas.readOnly = true;

    contadorVidas.style.width = "80px";

    //Añadimos el elemento al marcador.
    vidas.appendChild(contadorVidas);

    return vidas;
}
//-------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------//
//Funcion para reproducir audio en la web

function musica() {
    //Creamos el elemento audio.
    let sonido = document.createElement("audio");

    sonido.setAttribute("id", "audio");

    sonido.setAttribute("src", "audio/fondo.mp3");

    sonido.setAttribute("autoplay", "autoplay");

    return sonido;
} 
//-------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------//
//Función para crear los eventos a los botones segun el navegador

function crearEvento(elemento, tipoEvento, funcion) {

    let respuesta = false;

    if (elemento.addEventListener) { //Para Chrome, Modzilla
        elemento.addEventListener(tipoEvento, funcion, false);
        respuesta = true
    } else if (elemento.attachEvent) { //Para IE
        elemento.attachEvent("on" + tipoEvento, funcion);
        respuesta = true
    } else {
        elemento["on" + tipoEvento] = funcion;
        respuesta = true
    }

    return respuesta;
}
//-------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------//
//Funcion para crear el div en donde apareceran los meteoros

function meteoro() {

    let div = document.createElement("div");

    div.setAttribute("class", "meteoro");

    let sonido = document.createElement('audio');

    sonido.setAttribute("src", "audio/explosion.mp3");

    div.appendChild(sonido);

    return div;
}
//-------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------//
//Funcion que crea el div para el final del juego
function gameOver(puntos) {

    //Creamos el elemento div que mostrara el mensaje de game over y le ponemos estilos
    let final = document.createElement("div");

    final.setAttribute("id", "final");

    final.style.width = "500px";

    final.style.height = "500px";

    final.style.position = "absolute";

    final.style.zIndex = "1";

    final.style.top = "20%";

    final.style.left = "35%";

    //Creamos el elemento de tipo p que guardara el texto y le ponemos estilos.
    let elementoP = document.createElement("p");

    elementoP.style.fontSize = "8em";

    elementoP.style.color = "red";

    let texto = document.createTextNode('GAME OVER');

    elementoP.appendChild(texto);

    final.appendChild(elementoP);

    //Creamos el elemento que contendra los puntos del usuario y le damos estilos
    let datosPuntos = document.createElement("p");

    datosPuntos.style.fontSize = "50px";

    datosPuntos.style.textAlign = "center";

    datosPuntos.style.color = "red";

    //Creamos el elemento de la musica para el final del juego

    let sonidoFinal = document.createElement("audio");

    sonidoFinal.setAttribute("src", "audio/gameOver.mp3");

    sonidoFinal.setAttribute("autoplay", "autoplay");

    final.appendChild(sonidoFinal);

    let textoPuntos = document.createTextNode(`Su puntuación: ${puntos}`);

    datosPuntos.appendChild(textoPuntos);

    final.appendChild(datosPuntos);

    return final;
}
//-------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------//
//Función para finalizar el juego
function finalJuego() {
    //Añadimos el elemento Game Over al tablero
    let id = document.getElementById('final');

    id.parentNode.removeChild(id);

}
//-------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------//
//Función para limpiar las clases de los elementos 
function limpiarClases(elemento) {

    for (let a = 0; a < elemento.length; a++) {

        elemento[a].classList.remove('mostrar');

        elemento[a].classList.remove('explosion');

        elemento[a].parentNode.classList.remove('borde-rojo');

        elemento[a].parentNode.classList.remove('borde-verde');
    }
}
//-------------------------------------------------------------------------------------------------------------//
