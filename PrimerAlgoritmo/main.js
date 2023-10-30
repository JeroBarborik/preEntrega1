/*
let nombreUsuario = prompt("Indique su nombre:")
let apellidoUsuario = prompt("Indique su apellido:")
let edadUsuario = prompt("Indique su edad:")

let datosUsuario = "Nombre: "+  nombreUsuario + " " + apellidoUsuario + "." + " Edad: " + edadUsuario

alert(datosUsuario)
console.log (datosUsuario)

*/

let numeroA = parseInt(prompt("Ingrese un numero:"))
let numeroB = parseInt(prompt("ingrse otro numero:"))
let resultadoSuma = numeroA + numeroB
alert("La suma de ambos numeros es: " + resultadoSuma)



/* condicionales y comparacion.
if (CONDICION) entonces {OPERACION}
*/

 if(resultadoSuma > 10){
    console.log("si la suma es mayor a 10 se muestra este mensaje en la consola")
}
else if(resultadoSuma < 10){
    console.log("si la suma es menor a 10 se muestra este mensaje en la consola")
}
else {
    console.log("si la suma es igual a 10 se muestra este mensaje en la consola")
}


/*  EN ESTE CASO, LA VARIABLE RECIBE UN BOOLEANO, 
SI ES TRUE SE MUESTRA EL MENSAJE EN LA CONSOLA, SI ES FALSE NO

let numero = 9
let esMayorQue5 = (numero > 5);

if (esMayorQue5) {
    console.log("si el numero es mayor que 5 se muestra este mensaje en la consola")
};
*/