import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Swal from "sweetalert2";
import Acciones from "./Acciones.js";
import { atk_basico, atk_especial, cargar_ki, usar_semilla } from './interfaz.js';

const btn_player1 = document.getElementById("btn_player1");
const btn_player2 = document.getElementById("btn_player2");
const nombre1 = document.getElementById("player1");
const nombre2 = document.getElementById("player2");
const nombres = document.getElementById("nombres");
const tarjetas = document.getElementById("tarjetas");

const username1 = document.getElementById("username1");
const personaje1 = document.getElementById("personaje1"); 
const img1 = document.getElementById("img1");
const vida1 = document.getElementById("vida1");
const energia1 = document.getElementById("energia1");
const ki1 = document.getElementById("ki1");

const username2 = document.getElementById("username2");
const personaje2 = document.getElementById("personaje2");
const img2 = document.getElementById("img2");
const vida2 = document.getElementById("vida2");
const energia2 = document.getElementById("energia2");
const ki2 = document.getElementById("ki2");

let pj1 = "", pj2 = "";
let jugador1, jugador2;

let turno = 1;
let espera1 = 1, espera2 = 1;
let fin = false;

let semillas1 = 2;
let semillas2 = 2;

const barras = () => {
    if (jugador1) {
        vida1.style.width = `${jugador1.getVida()}%`;
        vida1.innerText = `${jugador1.getVida()}%`;
        energia1.style.width = `${jugador1.getEnergia()}%`;
        energia1.innerText = `${jugador1.getEnergia()}%`;
        ki1.style.width = `${jugador1.getKi()}%`;
        ki1.innerText = `${jugador1.getKi()}%`;
    }
    if (jugador2) {
        vida2.style.width = `${jugador2.getVida()}%`;
        vida2.innerText = `${jugador2.getVida()}%`;
        energia2.style.width = `${jugador2.getEnergia()}%`;
        energia2.innerText = `${jugador2.getEnergia()}%`;
        ki2.style.width = `${jugador2.getKi()}%`;
        ki2.innerText = `${jugador2.getKi()}%`;
    }
};

if (nombre1) {
    nombre1.addEventListener("input", (event) => {
        event.target.value = event.target.value.replace(/[^a-zA-Z0-9]+/, "");
    });
}

if (nombre2) {
    nombre2.addEventListener("input", (event) => {
        event.target.value = event.target.value.replace(/[^a-zA-Z0-9]+/, "");
    });
}

const remover_seleccion = (color, elementos) => {
    elementos.map((elemento) => {
        elemento.classList.remove("bg-warning");
        elemento.classList.add("bg-" + color);
    });
};

const msj_error = (msj) => {
    Swal.fire({
        icon: "warning",
        title: "Error!",
        text: msj
    });
};

const btn_py1 = document.getElementById("btn_py1");
const btn_py2 = document.getElementById("btn_py2");

const actualizar_turnos = () => {
    [...btn_py1.querySelectorAll("button")].map(boton => {
        const especial = boton.textContent.trim().toLowerCase().includes("ataque especial");
        boton.disabled = fin || turno !== 1 || (especial && espera1 > 0);
    });
    [...btn_py2.querySelectorAll("button")].map(boton => {
        const especial = boton.textContent.trim().toLowerCase().includes("ataque especial");
        boton.disabled = fin || turno !== 2 || (especial && espera2 > 0);
    });
};

const revisar_fin = () => {
    const v1 = jugador1.getVida();
    const v2 = jugador2.getVida();
    if (v1 > 0 && v2 > 0) return false;
    fin = true;
    
    const ganador = v1 <= 0 ? nombre2.value : nombre1.value;
    const personajeGanador = v1 <= 0 ? pj2 : pj1;
    
    const perdedor = v1 <= 0 ? nombre1.value : nombre2.value;
    const personajePerdedor = v1 <= 0 ? pj1 : pj2;

    setTimeout(() => {
        Swal.fire({
            icon: "success",
            title: "¡Combate terminado!",
            text: `${ganador} (${personajeGanador}) has derrotado a ${perdedor} (${personajePerdedor})`,
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "index.html"; 
            }
        });
    }, 1600);
    return true;
};

const iniciar_combate = () => {
    nombres.classList.add("d-none");
    let intervalo;
    Swal.fire({
        icon: "info",
        title: "QUE COMIENCE LA BATALLA!!",
        html: `${nombre1.value} (${pj1}) VS ${nombre2.value} (${pj2})<br><br>Comienza en <b>3</b> segundos`,
        timer: 3000,
        timerProgressBar: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
            const contador = Swal.getHtmlContainer().querySelector("b");
            intervalo = setInterval(() => {
                contador.textContent = Math.ceil(Swal.getTimerLeft() / 1000);
            }, 200);
        },
        willClose: () => clearInterval(intervalo)
    }).then(() => {
        tarjetas.classList.remove("d-none");
        actualizar_turnos();
    });
};

const player1 = document.getElementById("py1");
[...player1.querySelectorAll("img")].map((imagen) => {
    imagen.addEventListener('click', (event) => {
        remover_seleccion("danger", [...player1.querySelectorAll("img")]);
        event.target.classList.add("bg-warning");
        event.target.classList.remove("bg-danger");
        pj1 = event.target.alt;
    });
});

btn_player1.addEventListener("click", () => {
    if (nombre1.value == "") {
        return msj_error("El jugador 1 no ha ingresado un nombre de usuario!");
    } else if (pj1 == "") {
        return msj_error("El jugador 1 debe seleccionar un personaje!");
    }
    jugador1 = new Acciones(nombre1.value);
    nombre1.disabled = true;
    player1.classList.add("d-none");
    
    username1.innerText = nombre1.value;
    personaje1.innerText = pj1;
    img1.src = `./public/img/${pj1}/base.png`;

    if (jugador1 && jugador2) {
        iniciar_combate();
    }
});

const player2 = document.getElementById("py2");
[...player2.querySelectorAll("img")].map((imagen) => {
    imagen.addEventListener('click', (event) => {
        remover_seleccion("primary", [...player2.querySelectorAll("img")]);
        event.target.classList.add("bg-warning");
        event.target.classList.remove("bg-primary");
        pj2 = event.target.alt;
    });
});

btn_player2.addEventListener("click", () => {
    if (nombre2.value == "") {
        return msj_error("Ingresa tu nombre jugador 2");
    } else if (pj2 == "") {
        return msj_error("Debes ingresar tu nombre jugador 2");
    }
    jugador2 = new Acciones(nombre2.value);
    nombre2.disabled = true;
    player2.classList.add("d-none");
    
    username2.innerText = nombre2.value;
    personaje2.innerText = pj2;
    img2.src = `./public/img/${pj2}/base.png`;

    if (jugador1 && jugador2) {
        iniciar_combate();
    }
});

if (btn_py1) {
    [...btn_py1.querySelectorAll("button")].map(boton => {
        boton.addEventListener("click", () => {
            if (!jugador1 || !jugador2 || fin) return;
            if (turno !== 1) return msj_error("No es tu turno jugador 1!");
            const accion = boton.textContent.trim().toLowerCase();
            const especial = accion.includes("ataque especial");
            if (especial && espera1 > 0) {
                return msj_error("Este ataque solo se puede usar cada dos turnos");
            }
            if (accion.includes("semilla") && jugador1.getVida() >= 100) {
                return msj_error("Vida al maximo, no puedes usar semillas");
            }
            
            if (accion.includes("semilla")) {
                if (semillas1 <= 0) {
                    return msj_error("¡Ya no tienes semillas del ermitaño disponibles!");
                }
                semillas1--;
                usar_semilla(jugador1);
            }

            if (accion.includes("ataque básico")) {
                atk_basico(jugador1, jugador2, pj1);
            } else if (especial) {
                atk_especial(jugador1, jugador2, pj1);
            } else if (accion.includes("cargar ki")) {
                cargar_ki(jugador1);
            }

            if (especial) {
                espera1 = 1;
            } else if (espera1 > 0) {
                espera1--;
            }
            turno = 2;
            barras();
            revisar_fin();
            actualizar_turnos();
        });
    });
}

if (btn_py2) {
    [...btn_py2.querySelectorAll("button")].map(boton => {
        boton.addEventListener("click", () => {
            if (!jugador1 || !jugador2 || fin) return;
            if (turno !== 2) return msj_error("No es tu turno jugador 2");
            const accion = boton.textContent.trim().toLowerCase();
            const especial = accion.includes("ataque especial");
            if (especial && espera2 > 0) {
                return msj_error("Este ataque solo se puede usar cada dos turnos");
            }
            if (accion.includes("semilla") && jugador2.getVida() >= 100) {
                return msj_error("Vida al maximo, no puedes usar semillas");
            }

            if (accion.includes("semilla")) {
                if (semillas2 <= 0) {
                    return msj_error("¡Ya no tienes semillas del ermitaño disponibles!");
                }
                semillas2--;
                usar_semilla(jugador2);
            }

            if (accion.includes("ataque básico")) {
                atk_basico(jugador2, jugador1, pj2);
            } else if (especial) {
                atk_especial(jugador2, jugador1, pj2);
            } else if (accion.includes("cargar ki")) {
                cargar_ki(jugador2);
            }

            if (especial) {
                espera2 = 1;
            } else if (espera2 > 0) {
                espera2--;
            }
            turno = 1;
            barras();
            revisar_fin();
            actualizar_turnos();
        });
    });
}