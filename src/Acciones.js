import Personaje from "./Personaje.js";

class Acciones extends Personaje {
    constructor(nombre) {
        super(nombre);
    }

    atkBasico(jugador) {
        this.setEnergia(parseInt(this.getEnergia() - 5));
        this.setKi(parseInt(this.getKi() - 10));
        this.mostrarEstadisticas();
    }

    atkEspecial() {
        this.setEnergia(parseInt(this.getEnergia() - 15));
        this.setKi(parseInt(this.getKi() - 20));
        this.mostrarEstadisticas();
    }

    curacion() {
        if (this.getSemilla() > 0) {
            this.setEnergia(100);
            this.setKi(100);
            this.setVida(100);
            this.setSemilla(this.getSemilla() - 1);
            this.mostrarEstadisticas();
        } else {
            console.log("¡No te quedan semillas del ermitaño!");
        }
    }

    cargaEnergia() {
        this.setEnergia((this.getEnergia() + 15) > 100 ? 100 : (this.getEnergia() + 15));
        this.setKi((this.getKi() + 10) > 100 ? 100 : (this.getKi() + 10));
        this.mostrarEstadisticas();
    }

    defensa() {

    }
}

export default Acciones;