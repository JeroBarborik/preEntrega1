//BIENVENIDA 
function bienvenida() {
  alert(
    "Bienvenido!, te despidieron? segui los pasos y calcula tu indemnizacion en pocos minutos."
  );
  alert(
    "Te vamos a pedir una serie de datos que son necesarios para saber cuanto dinero te corresponde."
  );
}
bienvenida();

// TOMA DE DATOS 
let nombreUsuario
do {
  nombreUsuario = prompt("Ingresa tu nombre: ");
  let pais = confirm("Si el trabajo fue en Argentina presiona ACEPTAR");
  if (pais == false) {
    alert(
      "Lamentablemente, si no trabajabas en Argentina no podemos ayudarte. Busca un abogado de tu zona"
    )
    console.log ("No es de Argentina, no se puede continuar");
  } else if (pais == true) {
    console.log("Es de Argentina, se puede continuar");
    break;
  }
} while (nombreUsuario);

let fechaIngreso = prompt(
  "Ingresa tu fecha de ingreso al trabajo (IMPORTANTE: aaaa/mm/dd):"
);

  while (!/^(\d{4}\/\d{2}\/\d{2})$/.test(fechaIngreso)) {  // Esto es para validar el formato de fecha
  alert("Error: El formato de fecha no es válido. Debe ser aaaa/mm/dd.");
  fechaIngreso = prompt("Por favor, ingresa una fecha en formato aaaa/mm/dd:");  
}

fechaIngreso = new Date(fechaIngreso);  // Esto es para convertir la fecha a un objeto Date

console.log(`fecha ingresada valida ${fechaIngreso}`);

let fechaDespido = prompt(
  "Ingresa la fecha del despido (IMPORTANTE: aaaa/mm/dd):"
);

while (!/^(\d{4}\/\d{2}\/\d{2})$/.test(fechaDespido)) {
  alert("Error: El formato de fecha no es válido. Debe ser aaaa/mm/dd.");
  fechaDespido = prompt("Por favor, ingresa una fecha en formato aaaa/mm/dd:");
}

fechaDespido = new Date(fechaDespido);

console.log(`Fecha ingresada valida ${fechaDespido}`);

// CALCULO DE ANTIGUEDAD  --------------------------------------------------------------------------------------

let antiguedadEnMilisegundos = fechaDespido - fechaIngreso; // CALCULA LA DIFERENCIA ENTRE FECHAS EN MILISEGUNDOS
let antiguedadEnDias = antiguedadEnMilisegundos / (1000 * 60 * 60 * 24); //PASA MILISEGUNDOS A DIAS
let antiguedadEnMeses = Math.floor(antiguedadEnDias / 30); // PASA LOS DIAS A MESES
let antiguedadEnAños = Math.floor(antiguedadEnMeses / 12); // PASA LOS MESES A AÑOS
let mesesRestantes = antiguedadEnMeses % 12; //ESTO CALCULA CUANTOS MESES SOBRAN SI NO LLEGA A COMPLETAR UN AÑO

function antiguedad(antiguedadEnMeses, antiguedadEnAños, mesesRestantes, nombreUsuario) {

  if (antiguedadEnAños === 0) {
    console.log(
      `${nombreUsuario} tiene ${antiguedadEnMeses} mes/es de antiguedad`
    );
  } else if (mesesRestantes === 0) {
    console.log(
      `${nombreUsuario} tiene ${antiguedadEnAños} año/s de antiguedad`
    );
  } else {
    console.log(
      `${nombreUsuario} tiene ${antiguedadEnAños} año/s y ${mesesRestantes} mes/es de antiguedad`
    );
  }
}
antiguedad(antiguedadEnMeses, antiguedadEnAños, mesesRestantes, nombreUsuario);


let sueldoUsuario = 0
do {
  sueldoUsuario = prompt(
    "Ingrese su ultimo sueldo, sin puntos ni comas: (ej. 200000)"
  )
  if (isNaN(sueldoUsuario)) {
    alert("Debe ingresar un numero");
  } else {
    console.log("es un numero, puede continuar")
    break
  }
} while (sueldoUsuario);

console.log(`el sueldo de ${nombreUsuario} es ${sueldoUsuario}`)


// CALCULO DE INDEMNIZACION  ---------------------------------------------------------------

function calcularIndemnizacion(nombreUsuario, mesesRestantes, antiguedadEnAños, sueldoUsuario) {
  
  sueldoUsuario = parseInt(sueldoUsuario)

  let indemnizacion

  if (antiguedadEnAños === 0 && mesesRestantes > 3) {
    indemnizacion = sueldoUsuario
    console.log(`$${indemnizacion} es la indemnizacion sin cobrar preaviso (A)`)}

  else if ( antiguedadEnAños != 0 && mesesRestantes < 3) {
    indemnizacion = sueldoUsuario * antiguedadEnAños
    console.log(`$${indemnizacion} es la indemnizacion sin cobrar preaviso (B)`)
  }
  else if ( antiguedadEnAños != 0 && mesesRestantes >= 3) {
    indemnizacion = sueldoUsuario * antiguedadEnAños + sueldoUsuario
    console.log(`$${indemnizacion} es la indemnizacion sin cobrar preaviso (C)`)
  }
  else {
    indemnizacion = 0
    alert("Al haber trabajado menos de tres meses, no te corresponde una indemnizacion.")
  };

    while(indemnizacion != 0){
     let preaviso = confirm("si recibiste un preaviso con 30 dias de anticipacion hace click en ACEPTAR")

      if (preaviso == false) {
       alert(`${nombreUsuario}, tu indemnizacion es de: $${indemnizacion + sueldoUsuario }`);
       break } 

       else if (preaviso == true) {
        alert(`${nombreUsuario}, tu indemnizacion es de: $${indemnizacion}`); break} } 
    }
 
  calcularIndemnizacion(nombreUsuario, mesesRestantes, antiguedadEnAños, sueldoUsuario)
 
