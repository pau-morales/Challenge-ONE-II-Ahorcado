const vistaInicio = document.getElementById("inicio");
const vistaAgregarPalabra = document.getElementById("agregar-palabra");
const vistaJuego = document.getElementById("juego");

var palabraAdivinar = "";
var letrasAdivinadas = "";
var letrasErradas = [];
var intentos = 0;
var jugando = false;
var debug = true;
var debugAh = false;
const GUION = "_";
const CANTIDADINTENTOS = 9;
var bDPalabras = [ "archivo", "arrastrar", "beta", "biblioteca", "binario", "bug", "captura",
"cliente", "colgar", "comando", "compilador", "componente", "comprimido",
"controladores", "copia", "crack", "datos", "desarrollo", "editar",
"ejecutable", "ensamblador", "freeware", "fuente", "funcionamiento", 
"herramientas", "icono", "interfaz", "lenguaje", "licencia", "malware",
"mantenimiento", "memoria", "modelo", "pirata", "producto", "protocolo",
"rendimiento", "requisitos", "rutina", "servidores", "shareware",
"sistema", "soporte", "tarea", "tester", "usuario", "utilidades", "videojuegos"
];
const regex = new RegExp("^[A-Z\\s]+$");

function mostrar(vista){
    vistaInicio.classList.add("display-none");
    vistaAgregarPalabra.classList.add("display-none");
    vistaJuego.classList.add("display-none");
    vista.classList.remove("display-none");
}

function guionesDibujar() {
    let guiones = [];
    for (var i = 0; i < palabraAdivinar.length; i++){
        guiones.push(GUION)
    }
    letrasAdivinadas = guiones;
};

function palabraSecreta(){
    intentos = CANTIDADINTENTOS;
    palabraAdivinar = bDPalabras[Math.floor(Math.random() * bDPalabras.length)].toUpperCase();
    letrasAdivinadas = "";
    letrasErradas = [];
    // Debug
    if (debug){ 
        console.log("Palabra :" + palabraAdivinar);
        console.log("Intentos: " + intentos);
    };
};

function mostrarLetraCorrecta(letra) { 
    const letter = document.querySelectorAll(`.${letra}`);
    letter.forEach(letra =>(
        letra.classList.remove("display-none")
    ));
}

function escribirLetraIncorrecta(errores) { 
    const other = document.querySelector(".other");
    other.innerHTML = "";
    errores.forEach(error =>(other.innerHTML += `<p>${error}</p>`));
    
}

function gDibujarAhorcado(paso){
    if (debugAh){
        console.log("Dibujo Ahorcado: " + paso);
    };
    switch (paso) {
        case 8:
            pBase();
            p1GColumnaAh();
            break;
        case 7:
            p2GTiranteAh();
            break;
        case 6:
            p3GCuerdaAh();
            break;
        case 5:
            p4GCabeza();
            break;
        case 4:
            p5GCuerpoAh();
            break;
        case 3:
            p6GPiernaDerAh();
            break;
        case 2:
            p7GPiernaIzqAh();
            break;
        case 1:
            p8GBrazoDerAh();
            break;
        case 0:
            p9GBrazoIzqAh();
            break;
        default:
            p0GLimpiarPizarra();
            break;
    };
};


function guiConstruirTd(dato){
    var td = document.createElement("td");
    td.textContent = dato;
    return td;
};

function guiConstruirTrLetrasCorrectas(){
    var trLetrasAdivinadas = document.getElementById("letras-correctas");
    for (let i = 0; i < letrasAdivinadas.length; i++){
        if (letrasAdivinadas[i] != GUION){
            trLetrasAdivinadas.appendChild(guiConstruirTd(letrasAdivinadas[i]));
        } else {
            trLetrasAdivinadas.appendChild(guiConstruirTd("_"));
        };
    };
};

function guiPresentarLetrasCorrectas(){
    var trLetrasAdivinadas = document.getElementById("letras-correctas");
    var cadaTdLetrasAdivinadas = trLetrasAdivinadas.getElementsByTagName("td");
    for (let i = 0; i < letrasAdivinadas.length; i++){
        if (letrasAdivinadas[i] != GUION){
            cadaTdLetrasAdivinadas[i].innerText = letrasAdivinadas[i];
        } else {
            cadaTdLetrasAdivinadas[i].innerText = "_";
        };
    }
};

function guiAgregarLetraIncorrecta(letra){
    var trLetrasErradas = document.getElementById("letras-incorrectas");
    trLetrasErradas.appendChild(guiConstruirTd(letra));
};

function ingresarLetraAdivinada(letraCorrecta){
    for (var idx = 0; idx < palabraAdivinar.length; idx++){
        if (palabraAdivinar[idx] == letraCorrecta) {
            letrasAdivinadas[idx] = letraCorrecta;
        }
        if (palabraAdivinar == letrasAdivinadas.join("")){
            pGGanaste();
            console.log("Ganaste!!!");
            jugando = false;
        }
    }
};

function ingresarLetraIncorrecta(letraIncorrecta){
    if (errores.includes(letraIncorrecta)){
        alert(letraIncorrecta + " ya ingresada!");
    }
    if (!letrasErradas.includes(letraIncorrecta)){
        letrasErradas.push(letraIncorrecta);
        errores += letraIncorrecta;
        guiAgregarLetraIncorrecta(letraIncorrecta);
        intentos -= 1;
        gDibujarAhorcado(intentos);
        if (intentos == 0){
            pGPerdiste();
            console.log("Perdiste!!!");
            jugando = false;
        }
    }
};

function procesarLetra(letra){
    if (regex.test(letra)){
        return letra[0].toUpperCase();
    }else{
        alert("Solo letras mayúsculas!");
    }
};

function verificarLetra(letraAVerificar) {
    if (palabraAdivinar.includes(letraAVerificar)){
        ingresarLetraAdivinada(letraAVerificar);
        guiPresentarLetrasCorrectas();
        if (debug){
            console.log("Letra ingresada como Adivinada: " + letrasAdivinadas);
        };

    } else if (letraAVerificar != undefined){
        ingresarLetraIncorrecta(letraAVerificar);
        if (debug){
            console.log("Letra ingresada como Erradas: " + letrasErradas);
            console.log("Intentos: " + intentos);
        };
    };
};

function IniciarJuego (){
    errores = [];
    jugando = true;
    let letrasCorrectas = [];
    palabraSecreta();
    mostrar(vistaJuego);
    guionesDibujar();
    guiConstruirTrLetrasCorrectas();
    
}

document.addEventListener('keyup', function(event) {
    console.log(event.key);
    if (jugando) {
        verificarLetra(procesarLetra(event.key));
    };
});


function AgregarPalabra (palabra){
    if (palabra != "") {
        nuevaPalabra = palabra.replace(/ /g, "").toUpperCase();
        if (!bDPalabras.includes(nuevaPalabra)){
            bDPalabras.push(nuevaPalabra);
            alert("Se agregó: " + nuevaPalabra);
        }else{
            alert(nuevaPalabra + " ya se habia agregado");
        }

    }
}

const btnInciarJuego = document.getElementById("button-inicio");
btnInciarJuego.addEventListener("click", ()=> {
    IniciarJuego();
})

const btnAgregarPalabra = document.getElementById("button-agregar");
btnAgregarPalabra.onclick = ()=>{mostrar(vistaAgregarPalabra)};

const inputNuevaPalabra = document.getElementById("input-nueva-palabra");
inputNuevaPalabra.addEventListener("keyup", (e)=>{
    if (e.key == "Enter") {
        const palabra = inputNuevaPalabra.value;
        AgregarPalabra(palabra);
        inputNuevaPalabra.value = "";
    }
})

const btnGuardar = document.getElementById("guardar");
btnGuardar.addEventListener("click",()=>{
    const palabra = inputNuevaPalabra.value;
    AgregarPalabra(palabra);
    IniciarJuego();
})

const btnCancelar = document.getElementById("cancelar");
btnCancelar.onclick = ()=>{location.reload()};

const btnNuevoJuego = document.getElementById("nuevoJuego");
btnNuevoJuego.onclick = ()=>{
    sessionStorage.removeItem("array");
    location.reload();
    jugando = true;
};

const btnDesistir = document.getElementById("desistir");
btnDesistir.onclick = ()=>{
    sessionStorage.setItem("array", JSON.stringify(bDPalabras));
    location.reload();
    jugando = false;
    mostrar(vistaInicio);
}