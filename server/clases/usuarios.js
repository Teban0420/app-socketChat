
class Usuarios {

    constructor(){
        this.personas = [];
    }

    // agregar personas al chat
    agregarpersona(id, nombre, sala){

        let persona = { id, nombre, sala};

        // agrego la persona al arreglo de personas
        this.personas.push(persona);
        return this.personas;
    }

    // obtener una persona por id
    getPersona(id){
       
        // busco ese id en el arreglo de personas
        let persona = this.personas.filter(persona =>{
            return persona.id == id;
        })[0]; // si lo encuentra regreso la primera posicion
        return persona;
    }

    // obtener todas las personas
    getPersonas(){
        return this.personas;
    }

    getPersonasPorSala(sala){

        let personasEnSala = this.personas.filter(persona => persona.sala == sala);
        return personasEnSala;       
    }

    // borro persona cuando se desconecta
    borrarPersona(id){

        let personaBorrada = this.getPersona(id); // obtengo la persona borrada

        // luego la saco del arreglo
        this.personas = this.personas.filter(persona => persona.id != id);
            return personaBorrada; 
        }
    }


module.exports = {
    Usuarios
}