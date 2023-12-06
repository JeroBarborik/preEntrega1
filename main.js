// 1 - BIENVENIDA
// 2 - FORMULARIO - TOMA DE DATOS
// 3 - CALCULO DE ANTIGUEDAD
// 4 - CALCULO DE INDEMNIZACION
// 5 - CAPTACION
// 6 - ARRAY PARA ALMACENAR DATOS DE CONSULTANTES

// BIENVENIDA
const body = document.querySelector("body");

function bienvenida() {
  const saludo = document.createElement("h1");
  saludo.textContent = "CALCULA TU INDEMNIZACION!";
  body.appendChild(saludo);

  const saludoB = document.createElement("h2");
  saludoB.textContent =
    "Te despidieron? no te preocupes, te vamos a pedir una serie de datos que son necesarios para saber cuánto dinero te corresponde.";
  body.appendChild(saludoB);
}

bienvenida();

function formulario() {
  const formularioExistente = document.getElementById("formulario");
  if (formularioExistente) {
    formularioExistente.remove();
  }

  const form = document.createElement("form");
  form.id = "formulario";
  form.innerHTML = `
  <label for="pais" class= "label">Ingresa tu país</label>
  <input id="pais" class= "input" type="text" step="0.01" required>
  <br><hr><br>

  <label for="fechaIngreso" class= "label">Ingresa la fecha de ingreso al trabajo </label>
  <input id="fechaIngreso" class= "input" type="date" required>
  <br><hr><br>

  <label for="fechaDespido" class= "label">Ingresa la fecha de despido </label>
  <input id="fechaDespido" class= "input" type="date" required>
  <br><hr><br>

  <label for="sueldo" class= "label">Ingresa tu último sueldo, sin puntos ni comas: (ej. 200000)</label>
  <input id="sueldo" class= "input" type="number" step="1000" required>
  <br><hr><br>

  <label for="preaviso" class= "label">Marca si recibiste un preaviso de 30 dias </label>
  <input id="preaviso" type="checkbox">
  <br><hr><br>

    

    <button id="boton1" type="submit" class="button">Enviar</button>
  `;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const pais = document.getElementById("pais").value.trim();
    const fechaIngreso = new Date(document.getElementById("fechaIngreso").value);
    const fechaDespido = new Date(document.getElementById("fechaDespido").value);

    if (pais && pais.toLowerCase() === "argentina") {
      console.log("Es de Argentina, se puede continuar");
    } else {
      alert(
        "Lamentablemente, si no trabajabas en Argentina no podemos ayudarte. Busca un abogado de tu zona"
      );
      console.log("No es de Argentina, no se puede continuar");
      return;
    }

    if (fechaIngreso) {
      console.log("Fecha ingresada válida " + fechaIngreso);
    } else {
      alert("Fecha no válida");
      return;
    }

    if (fechaDespido) {
      console.log("Fecha ingresada válida " + fechaDespido);
    } else {
      alert("Fecha no válida");
      return;
    }

    // si pasa las validaciones, y envía el formulario
    const resultadoAntiguedad = calcularAntiguedad(fechaIngreso, fechaDespido);
    calcularIndemnizacion(resultadoAntiguedad);
  });

  const boton1 = form.querySelector("button[type='submit']");
  boton1.classList.add("button");

  body.appendChild(form);
}

formulario();

function calcularAntiguedad(fechaIngreso, fechaDespido) {
  let antiguedadEnMilisegundos = fechaDespido - fechaIngreso;
  let antiguedadEnDias = antiguedadEnMilisegundos / (1000 * 60 * 60 * 24);
  let antiguedadEnMeses = Math.floor(antiguedadEnDias / 30);
  let antiguedadEnAños = Math.floor(antiguedadEnMeses / 12);
  let mesesRestantes = antiguedadEnMeses % 12;

  if (antiguedadEnAños === 0) {
    console.log(`Tiene ${antiguedadEnMeses} mes/es de antigüedad.`);
  } else if (mesesRestantes === 0) {
    console.log(`Tiene ${antiguedadEnAños} año/s de antigüedad.`);
  } else {
    console.log(
      `Tiene ${antiguedadEnAños} año/s y ${mesesRestantes} mes/es de antigüedad.`
    );

    return {
      mesesRestantes: mesesRestantes,
      antiguedadEnAños: antiguedadEnAños,
    };
  }

  // Si la antigüedad es menor a 3 meses, devolver 0 para ambas propiedades
  return {
    mesesRestantes: 0,
    antiguedadEnAños: 0,
  };
}


function calcularIndemnizacion(resultadoAntiguedad) {
  let sueldoUsuario = parseInt(document.getElementById("sueldo").value);
  let preaviso = document.getElementById("preaviso").checked;

  let mesesRestantes = resultadoAntiguedad.mesesRestantes;
  let antiguedadEnAños = resultadoAntiguedad.antiguedadEnAños;

  let indemnizacion;

  if (antiguedadEnAños === 0 && mesesRestantes > 3) {
    indemnizacion = sueldoUsuario;
    console.log(`$${indemnizacion} es la indemnizacion sin cobrar preaviso (A)`);
  } else if (antiguedadEnAños !== 0 && mesesRestantes < 3) {
    indemnizacion = sueldoUsuario * antiguedadEnAños;
    console.log(`$${indemnizacion} es la indemnizacion sin cobrar preaviso (B)`);
  } else if (antiguedadEnAños !== 0 && mesesRestantes >= 3) {
    indemnizacion = sueldoUsuario * antiguedadEnAños + sueldoUsuario;
    console.log(`$${indemnizacion} es la indemnizacion sin cobrar preaviso (C)`);
  } else {
    indemnizacion = 0;
    alert("Al haber trabajado menos de tres meses, no te corresponde una indemnizacion.");
  }

  if (indemnizacion !== 0) {
    if (preaviso) {
      indemnizacion = indemnizacion;
    } else {
      indemnizacion = indemnizacion + sueldoUsuario;
    }
  }
  const numeroFinal = document.createElement("h1");
  numeroFinal.textContent = "Tu indemnizacion es de: $" + indemnizacion;
  body.appendChild(numeroFinal);

  const aclaracion = document.createElement("h3");
  aclaracion.textContent = "(Los montos son aproximados, para mas informacion carga tus datos de contacto y nos comunicamos)";
  numeroFinal.appendChild(aclaracion);
}

const Contacto = function (nombre, apellido, email, numero, localidad) {
  this.nombre = nombre;
  this.apellido = apellido;
  this.email = email;
  this.numero = numero;
  this.localidad = localidad;
};


function formularioContacto() {
  const botonExistente = document.getElementById("botonPideContacto");
  if (botonExistente) {
    botonExistente.remove();
  }

  const formContacto = document.createElement("form");
  formContacto.innerHTML = `
    <label for="nombre" class= "label">Nombre: </label>
    <input id="nombre" class= "input" type="text" step="0.01" required>

    <label for="apellido" class= "label">Apellido: </label>
    <input id="apellido" class= "input" type="text" step="0.01" required>
    <br><hr><br>

    <label for="email" class= "label" >Email:</label>
    <input id="email" class= "input" type="email" step="0.01" required>
    <br><hr><br>

    <label for="numero" class= "label" >Numero de telefono (10 digitos):</label>
    <input id="numero" class= "input" type="tel"  maxlength="10" minlength="10"  required>
    <br><hr><br>

    <label for="localidad" class= "label" >Localidad: </label>
    <input id="localidad" class= "input" type="text" step="0.01" required>
    <br><hr><br>

    <button type="submit" class="button">Enviar</button>
  `;

  formContacto.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const numero = parseInt(document.getElementById("numero").value);
    const localidad = document.getElementById("localidad").value.trim();


    const localidadesValidas = [
      "CABA",
      "CAPITAL FEDERAL",
      "CIUDAD AUTONOMA DE BUENOS AIRES",
      "AVELLANEDA",
      "LANUS",
      "LOMAS DE ZAMORA",
      "LA MATANZA",
      "QUILMES",
      "VICENTE LOPEZ",
      "SAN MARTIN",
      "TRES DE FEBRERO",
      "MORON",
      "EZEIZA",
      "FLORENCIO VARELA",
      "BERAZATEGUI",
      "MERLO",
      "MORENO",
      "SAN MIGUEL",
      "SAN ISIDRO",
      "SAN FERNANDO",
      "TIGRE",
    ];

    function filtrarLocalidad(localidad) {
      let resultado = localidadesValidas.filter(
        (x) => x.toUpperCase().includes(localidad.toUpperCase())
      );

      if (resultado.length > 0) {
        console.log("Podemos ejercer en su localidad. Posible cliente.");
      } else {
        console.log("No contamos con matrícula para ejercer en su localidad.");
      }
    }

    filtrarLocalidad(localidad);

    const datosContacto1 = new Contacto(
      nombre,
      apellido,
      email,
      numero,
      localidad
    );
    botonPideContacto.disabled = true;


    datosContactoEnJson = JSON.stringify(datosContacto1);

    localStorage.setItem("contacto1", datosContactoEnJson);

    alert("Pronto te estaremos contactando. ¡Gracias!");

    // ARRAY DONDE SE VAN A PUSHEAR Y ALMACENAR TODOS LOS CONSULTANTES
    let consultantes = [];
    consultantes.push(datosContacto1);
    console.log(consultantes);
  });

  formContacto.classList.add("form");
  body.appendChild(formContacto);
  botonPideContacto.classList.add("button");
  body.appendChild(botonPideContacto);
}

  const botonPideContacto = document.createElement("button");
  botonPideContacto.id = "botonPideContacto";
  botonPideContacto.classList.add("button");
  botonPideContacto.textContent = "Quiero que me contacten";
  botonPideContacto.addEventListener("click", function () {
    formularioContacto();
    botonPideContacto.disabled = true; // Desactivar solo el botón presionado
  });


  body.appendChild(botonPideContacto);


if (!document.getElementById("botonPideContacto")) {
  formularioContacto();
}




