class Personaje {
    #vida = 100;
    #nombre;
    #ki = 100;
    #energia = 100;
    #semilla = 2;
    #personaje = "";

    constructor(nombre) {
        this.#nombre = nombre;
        this.#personaje = nombre;
        this.mostrarEstadisticas();
    }

    mostrarEstadisticas() {
        console.log(`
            nombre:${this.#nombre},
            ki:${this.#ki},
        vida:${this.#vida},
        energia:${this.#energia},
        semilla:${this.#semilla},
    `);
}

getPersonaje(){
    return this.#personaje;
}

getVida() {
    return this.#vida;
}

getKi() {
    return this.#ki;
}

getEnergia() {
    return this.#energia;
}

getSemilla() {
    return this.#semilla;
}

getNombre() {
    return this.#nombre;
}

setVida(vida) {
    this.#vida = Math.max(0, vida);
}

setKi(ki) {
    this.#ki = Math.max(0, ki);
}

setEnergia(energia) {
    this.#energia = Math.max(0, energia);
}

setSemilla(semilla) {
    this.#semilla = Math.max(0, semilla);
}
}

export default Personaje;