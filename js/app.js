
const imputArea = document.getElementById("areaHosp");
const tipo = document.getElementById("tipoRPBI");
const peso = document.getElementById("pesoKg");
const btn = document.getElementById("btnAgregarResiduo");
const lista = document.getElementById("listaResiduos");

const totalPunzo = document.getElementById("totPunzo");
const totalPato = document.getElementById("totPato");

// Vamos a cargar los residuos de la página
document.addEventListener("DOMContentLoaded", Mostrar);

// Agregamos residuo al hacer clic en el botón
btn.addEventListener("click", agregarResiduo);

// Clase
class ResiduoRPBI {
    constructor(area, tipo, peso) {
        this.area = area;
        this.peso = peso;
        this.tipo = tipo;
    }
}

// Método para agregar un nuevo residuo
function agregarResiduo() {

    const area = imputArea.value.trim();
    const tipoResiduo = tipo.value;
    const pesoResiduo = parseFloat(peso.value);

    if (area === "" || peso.value === "" || isNaN(pesoResiduo) || pesoResiduo <= 0) {
        alert("Ingresa todos los datos bien");
        return;
    }

    const residuos = obtenerResiduos() || [];

    const nuevoResiduo = new ResiduoRPBI(
        area,
        tipoResiduo,
        pesoResiduo
    );

    residuos.push(nuevoResiduo);

    localStorage.setItem("residuos", JSON.stringify(residuos));

    imputArea.value = "";
    peso.value = "";

    Mostrar();
}

// Obtener los residuos del LocalStorage
function obtenerResiduos() {
    return JSON.parse(localStorage.getItem("residuos"));
}

// Mostrar residuos con el DOM
function Mostrar() {

    const residuos = obtenerResiduos() || [];

    lista.innerHTML = "";

    let sumaPunzo = 0;
    let sumaPato = 0;

    residuos.forEach((residuo, index) => {

        const li = document.createElement("li");

        li.textContent = "Área: " + residuo.area +
            " | Tipo: " + residuo.tipo +
            " | Peso: " + residuo.peso + " kg";

        lista.appendChild(li);

        // Calcular los pesos por categoría
        if (residuo.tipo === "punzocortante") {
            sumaPunzo += residuo.peso;
        }
        else if (residuo.tipo === "patologico") {
            sumaPato += residuo.peso;
        }

    });

    // Mostrar los totales
    totalPunzo.textContent = sumaPunzo.toFixed(1);
    totalPato.textContent = sumaPato.toFixed(1);
}
