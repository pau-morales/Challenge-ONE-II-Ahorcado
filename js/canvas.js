const pantalla = document.getElementById("ahorcado");
var pincel = pantalla.getContext("2d");

/* Definimos estilos del pincel */
pincel.strokeStyle = "#0A3871";
pincel.lineWidth = 4;
pincel.font = "48px Inter";

/* Dibujamos la horca inicial*/

function pGGanaste(){
	pincel.fillStyle = "White";
	pincel.fillRect(130, 140, 220, 55);
	pincel.fillStyle = "Green";
	pincel.fillText("¡Ganaste!", 140, 180);
};

function pGPerdiste(){
	pincel.fillStyle = "White";
	pincel.fillRect(130, 140, 220, 55);
	pincel.fillStyle = "Red";
	pincel.fillText("¡Perdiste!", 140, 180);
};

function p0GLimpiarPizarra(){
	pincel.clearRect(0, 0, pantalla.width, pantalla.height);
	pincel.beginPath();
	pincel.moveTo(140, 300);
	pincel.lineTo(340, 300);
	pincel.stroke();
};

function pBase(){
    pincel.beginPath();
    pincel.moveTo(200, 300);
    pincel.lineTo(280, 300);
    pincel.stroke();
}

function p1GColumnaAh(){
	pincel.beginPath();
	pincel.moveTo(240, 300);
	pincel.lineTo(240, 60);
	pincel.stroke();
};

function p2GTiranteAh(){
	pincel.beginPath();
	pincel.moveTo(238, 60);
	pincel.lineTo(315, 60);
	pincel.stroke();
};

function p3GCuerdaAh() {
	pincel.beginPath();
	pincel.moveTo(315, 58);
	pincel.lineTo(315, 80);
	pincel.stroke();
};

function p4GCabeza(){
	pincel.beginPath();
	pincel.arc(315, 105, 25, 0, 2 * Math.PI);
	pincel.stroke();
};

function p5GCuerpoAh() {
	pincel.beginPath();
	pincel.moveTo(315, 130);
	pincel.lineTo(315, 210);
	pincel.stroke();
};

function p6GPiernaDerAh() {
	pincel.beginPath();
	pincel.moveTo(315, 210);
	pincel.lineTo(340, 235);
	pincel.stroke();
};

function p7GPiernaIzqAh() {
	pincel.beginPath();
	pincel.moveTo(315, 210);
	pincel.lineTo(290, 235);
	pincel.stroke();
};

function p8GBrazoDerAh() {
	pincel.beginPath();
	pincel.moveTo(315, 150);
	pincel.lineTo(340, 175);
	pincel.stroke();
};

function p9GBrazoIzqAh() {
	pincel.beginPath();
	pincel.moveTo(315, 150);
	pincel.lineTo(290, 175);
	pincel.stroke();
};
function escribirTexto(texto, color) {
    pincel.beginPath();
    pincel.fillStyle = color;
    pincel.strokeStyle="black";
    pincel.font = "bold 5rem arial";
    pincel.fillText(texto,100,200);
    pincel.strokeText(texto,100,200);
}

function mostrarPalabra(palabra) {
    pincel.beginPath();
    pincel.fillStyle = "black";
    pincel.font = "bold 1.5rem arial";
    pincel.fillText("La palabra era " + palabra,100,385);
}