import Swal from "sweetalert2";

const atributosPersonaje = {
    "Goku": {
        atk_basico: "Kame Hame Ha!",
        atk_especial: "Muereeee!",
        fondo: "rgb(7, 196, 238, 0.7)"
    },
    "Trunks": {
        atk_basico: "¡Ataque de espada!",
        atk_especial: "¡Destello final!",
    },
    "Gohan": {
        atk_basico: "¡Masenko!",
        atk_especial: "¡Kamehameha anger!",
    },
    "Vegitto": {
        atk_basico: "¡Espada de ki!",
        atk_especial: "¡Final Kamehameha!",
    },
    "Vegeta": {
        atk_basico: "¡Cañón Gallick!",
        atk_especial: "¡Final Flash!",
    },
    "Cell": {
        atk_basico: "¡Rayo mortal!",
        atk_especial: "¡Kamehameha solar!",
    },
    "Piccolo": {
        atk_basico: "¡Makankosappo!",
        atk_especial: "¡Granada de luz!",
    },
    "Gogeta": {
        atk_basico: "¡Golpe meteoro!",
        atk_especial: "¡Punizador de almas!",
    }
};

const atk_basico = (atacante, defensor, personajeActual) => {
    atacante.atkBasico();
    defensor.setVida((defensor.getVida() - 10) < 1 ? 0 : defensor.getVida() - 10);

    const textoAtaque = atributosPersonaje[personajeActual]?.atk_basico || "¡Ataque básico!";

    Swal.fire({
        text: textoAtaque,
        imageUrl: `./public/img/${personajeActual}/basico.png`,
        imageWidth: 300,
        imageHeight: 300,
        position: "center-center",
        width: 600,
        color: "#fff",
        background: "none",
        imageAlt: "Ataque Basico",
        backdrop: `rgba(237, 222, 7, 0.5)`,
        showConfirmButton: false,
        timer: 1500 
    });
};

const atk_especial = (atacante, defensor, personajeActual) => {
    atacante.atkEspecial();
    defensor.setVida((defensor.getVida() - 25) < 1 ? 0 : defensor.getVida() - 25);

    const textoAtaque = atributosPersonaje[personajeActual]?.atk_especial || "¡Ataque especial!";

    Swal.fire({
        text: textoAtaque,
        imageUrl: `./public/img/${personajeActual}/especial.png`,
        imageWidth: 300,
        imageHeight: 300,
        position: "center-center",
        width: 600,
        color: "#fff",
        background: "none",
        imageAlt: "Ataque Especial",
        backdrop: `rgba(237, 222, 7, 0.5)`,
        showConfirmButton: false,
        timer: 1500 
    });
};

const cargar_ki = (jugador) => {
    jugador.cargaEnergia();
    Swal.fire({
        icon: "success",
        title: "¡Ki cargado!",
        showConfirmButton: false,
        timer: 1000
    });
};

const usar_semilla = (jugador) => {
    jugador.curacion();
    Swal.fire({
        icon: "success",
        title: "¡Semilla usada!",
        showConfirmButton: false,
        timer: 1000
    });
};

export { atk_basico, atk_especial, cargar_ki, usar_semilla };