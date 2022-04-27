/* Este es un desarrollo que servira para administrar grupos electrogenos
en tres aspectos: alquiler, venta y mantenimiento de correctivo
 */

//Menu de ingreso
//**** AGREGO PARA ENTREGA DE ARRAY Y CLASES PARA DESAFIO ADICIONAL - OPCION 4 *********
let msg = "Ingrese la operacion que quiere realizar" + "\n" +
           "1 - Alquiler" + "\n" +
           "2 - Venta" + "\n" +
           "3 - Correctivo" + "\n" +
           "4 - Ingreso de equipo (NUEVA OPCION)" + "\n";

//creo objeto de errores
const ERRORES = {error_menu: "Error ha ingresado una opcion incorrecta.",
                 error_voltaje: "Ha seleccionado correctivo. No hace falta calcular Voltaje.",
                 error_default: "Ha seleccionado una opcion incorrecta. No es posible realizar su pedidoW",
                 error_formato: "Ingresado las horas en formato incorrecto",
                 error_maxQ: "Ha ingreado un parametro no establecido o supero la cantidad disponible. Por favo, intente nuevamente.",
                 error_tipo: "Ha ingresado un tipo no aceptado o la cantidad de caracteres supera la cantidad permitida"};

//Objeto de limites
const LIMITS = {limit_menu_down: 1, limit_menu_up: 4, limit_down_q_electrogenos: 1, limit_up_q_electrogenos: 5};


//Arroja menu de opciones y captura valor por prompt
let menu = () => parseInt(prompt(msg));
let result = menu();

//function verificacion
let pass = (input, downLimit, upLimit,  error) => {
    while(input < downLimit || result > upLimit || isNaN(result)){
        alert(error); //Agrego Error segun feedback
        result = menu();     
   }
   return true;
}


//voltaje
let voltaje = (tipo, horas) => {
    if(tipo === 1 || tipo === 2){
        horas = parseInt(prompt("Ingrese la cantidad de horas necesarias para calcular voltaje"));
        while(isNaN(horas)){
            alert(ERRORES.error_formato);
            horas = parseInt(prompt("Ingrese la cantidad de horas necesarias para calcular voltaje"));
        }
        const VOLTAJE = 2;
        return horas * VOLTAJE;
    }else{
        alert(ERRORES.error_voltaje);
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
}


if(pass(result, LIMITS.limit_menu_down, LIMITS.limit_menu_up, ERRORES.error_menu)){
//Calculo voltaje por hora de acuerdo a la opcion.
switch (result) {
                case 1:
                    msg = "Usted ha seleccionado Alquiler. Seleccione voltaje";
                    alert("El volatje por hora requerido es de " + voltaje(result));
                break;
                case 2:
                    msg = "Usted ha seleccionado Venta. Seleccione voltaje";
                    alert("El volatje por hora requerido es de " + voltaje(result));
                break;
                case 3:
                    let codigoInterno = prompt(msg = "Usted ha seleccionado reparacion. Ingrese el codigo interno");
                    alert(`El codigo de equipo ${codigoInterno} ha sido registrado correctamente.`)
                break;
                case 4:
                            let qGrupos;
                            let inicio = 0;
                            let nuevoEquipo;
                            let arrElectrogeno = [];
                            let output = "";
                        
                            qGrupos = parseInt(prompt("Ingrese la cantidad de grupos que quiere registrar || Maximo disponible: 5"));
                            while(isNaN(qGrupos) || (qGrupos > 5) || (qGrupos < 1)){
                                alert(ERRORES.error_maxQ);
                                qGrupos = parseInt(prompt("Ingrese la cantidad de grupos que quiere registrar || Maximo disponible: 5"));
                            }

                                while(inicio < qGrupos){
                                    let nombre = prompt("Ingrese la marca del grupo electrogeno");
                                    let kva = prompt("Ingrese la cantidad de Kva maximo");
                                    let descripcion = prompt("Ingrese breve descripcion");
                                    let tipo = prompt("Ingrese tipo de equipo");
                                    nuevoEquipo = new Electrogeno(nombre, kva, descripcion,tipo);
                                    //activo equipo
                                    nuevoEquipo.actividad();
                                    alert("Equipo ingresado correctamente. Por favor gargue el equipo n°" + (inicio + 1))
                                    arrElectrogeno.push(nuevoEquipo);
                                    output +=  `Nombre: ${nuevoEquipo.nombre} \n kva: ${nuevoEquipo.kva} \n Descripcion: ${nuevoEquipo.descripcion} \n Tipo: ${nuevoEquipo.tipo} \n ----------------------------- \n`
                                    ++inicio;
                                   
                                }
                                
                                alert(`Resumen de los equipos ingresados correctamente: \n -------------------------------- \n ${output}`);
                break;

                default:
                    alert(ERRORES.error_default);
                break;
                }
}


alert("Gracias. Vuelva pronto");



