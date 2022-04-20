/* Este es un desarrollo que servira para administrar grupos electrogenos
en tres aspectos: alquiler, venta y mantenimiento de correctivo
 */

//Menu de ingreso
let msg = "Ingrese la operacion que quiere realizar" + "\n" +
           "1 - Alquiler" + "\n" +
           "2 - Venta" + "\n" +
           "3 - Correctivo" + "\n";


//Arroja menu de opciones y captura valor por prompt
let menu = () => parseInt(prompt(msg));
let result = menu();

//Comprueba si podemos avanzar
 while(result < 1 || result > 3 || isNaN(result)){
     result = menu();     
}

//voltaje
let voltaje = (tipo, horas) => {
    if(tipo === 1 || tipo === 2){
        horas = parseInt(prompt("Ingrese la cantidad de horas necesarias para calcular voltaje"));
        while(isNaN(horas)){
            horas = parseInt(prompt("Ingrese la cantidad de horas necesarias para calcular voltaje"));
        }
        const VOLTAJE = 2;
        return horas * VOLTAJE;
    }else{
        alert("Ha seleccionado correctivo. No hace falta calcular voltaje");
    }
}

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
        alert(`El codigo de equipo ${codigoInterno} ha sido registrado correctamente.` )
    break;

    default:
        msg = "No es posible realizar su pedido";
    break;
}

alert("Gracias. Vuelvas prontos");




