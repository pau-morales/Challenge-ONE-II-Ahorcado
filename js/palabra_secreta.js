var inputNuevaPalabra = document.getElementById("input-nueva-palabra");

function agregarPalabra(nuevaPalabra){
    	localStorage.setItem("palabraNueva", nuevaPalabra.toLowerCase());
};

function btnAgregarPalabra(){
	agregarPalabra(inputNuevaPalabra.value);
	location.href = "ahorcado.html";
};

