/* Este es un desarrollo que servira para administrar grupos electrogenos
en tres aspectos: alquiler, venta y mantenimiento de correctivo
 */

//Menu de ingreso
let msg = "Ingrese la operacion que quiere realizar" + "\n" +
           "1 - Alquiler" + "\n" +
           "2 - Venta" + "\n" +
           "3 - Correctivo" + "\n" +
           "4 - Ingreso de equipo (NUEVA OPCION)" + "\n" +
           "    a. Ver listado de equipos activos" + "\n" +
           "    b. Agregar un equipo" + "\n" +
           "    c. Quitar un equipo" + "\n" +
           "    d. Buscar archivo" + "\n" +
           "5 - Salir" + "\n";

const SUBMENU = "Seleccione entre las opciones disponibles:" + "\n" +
                " a. Ver listado de equipos activos" + "\n" +
                " b. Agregar un equipo" + "\n" +
                " c. Quitar un equipo" + "\n" +
                " d. Buscar equipo por nombre" + "\n";

//creo objeto de errores
const ERRORES = {error_menu: "Error ha ingresado una opcion incorrecta.",
                 error_voltaje: "Ha seleccionado correctivo. No hace falta calcular Voltaje.",
                 error_default: "Ha seleccionado una opcion incorrecta. No es posible realizar su pedido",
                 error_formato: "Ingresado las horas en formato incorrecto",
                 error_maxQ: "Ha ingreado un parametro no establecido o supero la cantidad disponible. Por favo, intente nuevamente.",
                 error_tipo: "Ha ingresado un tipo no aceptado o la cantidad de caracteres supera la cantidad permitida",
                 error_equipo: "No se encuentra el equipo buscado",
                 error_deposito: "No existe equipo registrado en el depósito."};


//mensajes de inputs
const ENTRADAS = {msg_voltaje: "Ingrese la cantidad de horas necesarias para calcular voltaje",
                  msg_cantidadEquipos: "Ingrese la cantidad de grupos que quiere registrar || Maximo disponible: 5",
                  msg_equipoIngreso: "Ingrese el equipo que esta buscando:",
                  msg_equipoEliminar:"Ingrese el equipo que esta buscando: ",
                  msg_codigoInterno: "Ingrese el equipo que esta buscando: "
                 }

//Objeto de limites
const LIMITS = {limit_menu_down: 0, limit_menu_up: 5, limit_down_q_electrogenos: 1, limit_up_q_electrogenos: 5};

//Arroja menu de opciones y captura valor por prompt
let menu = () => parseInt(prompt(msg));
let opcionKey = () => prompt(SUBMENU)
let result = menu();
let output = "";

//function verificacion
let pass = (input, downLimit, upLimit,  error) => {
    while(input < downLimit || input > upLimit || isNaN(input)){
        alert(error); //Agrego Error segun feedback
        input = menu();     
   }
   let result = parseInt(input)
   return result;
}

//voltaje
let voltaje = (tipo, horas) => {
    if(tipo === 1 || tipo === 2){
        horas = parseInt(prompt(ENTRADAS.msg_voltaje));
        while(isNaN(horas)){
            alert(ERRORES.error_formato);
            horas = parseInt(prompt(ENTRADAS.msg_voltaje));
        }
        const VOLTAJE = 2;
        return horas * VOLTAJE;
    }else{
        alert(ERRORES.error_voltaje);
    }
}

//control de submenu
let submenuVerificacion = (input) => {
    let arrOpc = ["a", "b", "c", "d"];
    const result = arrOpc.find(element => element === input);
    if(result === input){
        return input;
    }else{
        alert(ERRORES.error_menu)
    }
 
}

//Creacion de Clase grupo electrogeno
class Electrogeno{
    constructor(nombre, kva, descripcion, tipo){
        this.nombre = nombre;
        this.kva = kva;
        this.descripcion = descripcion;
        this.tipo = tipo
    }

    actividad(){
        return true;
    }

    traerGrupo(){
        let equipo = {
            "Equipo": this.nombre,
            "kva": this.kva,
            "Descripcion": this.descripcion,
            "Tipo": this.tipo
          }
        return equipo;

    }

}

//Creacion de deposito

class Deposito{
    constructor(){
        this.nuevoEquipo = [];
    }

    agregarEquipo(Equipo){
        this.nuevoEquipo.push(Equipo)
    }

    eliminarEquipo(Equipo){

        const index = this.nuevoEquipo.map(obj => obj.nombre).indexOf(Equipo);
        this.nuevoEquipo.splice(index, 1);
        alert(`El producto ${Equipo} ha sido eliminado del deposito`);
    }

    obtenerDeposito(){
       let equiposSeleccionados = [];
       for (let i = 0; i < this.nuevoEquipo.length; i++) {
           if(typeof this.nuevoEquipo[i].nombre != undefined){
                equiposSeleccionados.push(this.nuevoEquipo[i].traerGrupo())
           }
       }
     
      return equiposSeleccionados;
      
    }

}

//listamos todas los equipos con sus caracteristicas
const list = (arr) => {
    let output ="";
    if(arr.length > 0){
        for (let i = 0; i < arr.length; i++) {
            output += `\nEquipo ${arr[i].Equipo}\nKva: ${arr[i].kva}\nDescripcion: ${arr[i].Descripcion}\nTipo: ${arr[i].Tipo}\n -------------------------------`;
        }
        return alert(output);

    }else{
        alert(ERRORES.error_deposito);
    }
}

//agrego multiples equipos
const addEquipo = () => {
    let qGrupos;
    let inicio = 0;
    let nuevoEquipo;
    
    qGrupos = parseInt(prompt(ENTRADAS.msg_cantidadEquipos));
    while(isNaN(qGrupos) || (qGrupos > 5) || (qGrupos < 1)){
        alert(ERRORES.error_maxQ);
        qGrupos = parseInt(prompt(ENTRADAS.msg_cantidadEquipos));
    }
        
        while(inicio < qGrupos){
            let nombre = prompt("Ingrese la marca del grupo electrogeno");
            let kva = prompt("Ingrese la cantidad de Kva maximo");
            let descripcion = prompt("Ingrese breve descripcion");
            let tipo = prompt("Ingrese tipo de equipo");
            nuevoEquipo = new Electrogeno(nombre, kva, descripcion,tipo);
            //activo equipo
            deposito.agregarEquipo(nuevoEquipo);
            nuevoEquipo.actividad();
            alert("Equipo ingresado correctamente. Por favor cargue el equipo n°" + (inicio + 1))
            ++inicio;
            
        }
        list(deposito.obtenerDeposito());
        result = 0;
        return true;
}

//busca equipo
const searchEquipo = () => {
    let ingreso = prompt(ENTRADAS.msg_equipoIngreso);
    let output;
    const resposnseFind = deposito.obtenerDeposito().find((element) => element.Equipo == ingreso);
    if(resposnseFind != undefined){
        output = `Existe un equipo de nombre ${resposnseFind.Equipo} dentro del deposito. Aqui sus detalles:\n---------------------------------------\nKva: ${resposnseFind.kva}\n Descripcion: ${resposnseFind.Descripcion}\n
        Tipo: ${resposnseFind.Tipo}`;
        alert(output);
        return true;
    }else{
        alert(ERRORES.error_equipo)
        return true;
    }
}

//borra equipo
const borrarEquipo = (arr) => {
    if(arr.length > 0){
        let equipoEliminar = prompt(ENTRADAS.msg_equipoEliminar)
        deposito.eliminarEquipo(equipoEliminar);
    }
}


let deposito = new Deposito();
result = pass(result, LIMITS.limit_menu_down, LIMITS.limit_menu_up, ERRORES.error_menu);

const process = (result) => { 

                //Calculo voltaje por hora de acuerdo a la opcion.
                switch (result) {
                                case 1:
                                    alert("El voltaje por hora requerido es de " + voltaje(result));
                                    result = 0;
                                    return true;
                                break;
                                case 2:
                                    alert("El voltaje por hora requerido es de " + voltaje(result));
                                    result = 0
                                    return true;
                                break;
                                case 3:
                                    let codigoInterno = prompt(ENTRADAS.msg_codigoInterno);
                                    alert(`El codigo de equipo ${codigoInterno} ha sido registrado correctamente.`);
                                    result = 0;
                                    return true;
                                break;
                                case 4:
                                //let optionKey = prompt(SUBMENU);
                                let response = submenuVerificacion(opcionKey());
                                                                                switch (response) {
                                                                                    case "a":
                                                                                        list(deposito.obtenerDeposito());
                                                                                        return true;
                                                                                    break;
                                                                                        case "b":
                                                                                        //agregar Equipo  
                                                                                        addEquipo();
                                                                                    return true;
                                                                                    break;
                                                                                        case "c":
                                                                                        borrarEquipo(deposito.obtenerDeposito());
                                                                                        return true;
                                                                                    break;
                                                                                        case "d":
                                                                                        searchEquipo();
                                                                                        return true;
                                                                                    break;
                                                                                    default:
                                                                                        return true;
                                                                                    break;
                                                                                                     }
                                           
                                break;
                                case 5:
                                    return false;
                                break;
                                default:
                                    alert(ERRORES.error_default);
                                    return true;
                                break;
                                }
                             }


let app = () => {while(process(result)){result = menu();}}

app();
alert("Programa finalizado. Todos los cambios se perderan");
