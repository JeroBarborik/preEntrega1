// 1 - BIENVENIDA
// 2 - FORMULARIO - TOMA DE DATOS
// 3 - CALCULO DE ANTIGUEDAD
// 4 - CALCULO DE INDEMNIZACION
// 5 - CAPTACION
// 6 - ARRAY PARA ALMACENAR DATOS DE CONSULTANTES

/*
ENTREGA FINAL: 
OBJETOS Y ARRAYS - OK
FUNCIONES Y CONDICIONALES - OK
GENERACION DEL DOM EN FORMA DINAMICA, EVENTOS  - OK
SINTAXIS AVANZADA  - OK 
USO DE UNA LIBRERIA  - OK 
ASINCRONIA, SETTIMEOUT  - OK


MANEJO DE PROMESAS CON FETCH  - ok
CARGA DE DATOS DESDE UN JSON LOCAL - ok


SOLO FALTA USAR DATOS DEUNA API EXTERNA. 







*/
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

//FORMULARIO - TOMA DE DATOS

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
    const fechaIngreso = new Date(
      document.getElementById("fechaIngreso").value
    );
    const fechaDespido = new Date(
      document.getElementById("fechaDespido").value
    );
    const sueldo = document.getElementById("sueldo").value;
    let fechaActual = new Date();
    console.log(fechaActual);

    //VALIDACION DE PAIS

    if (pais && pais.toLowerCase() === "argentina") {
      console.log("Es de Argentina, se puede continuar");
    } else {
      Swal.fire({
        text: "Lamentablemente, si no trabajabas en Argentina no podemos ayudarte. Busca un abogado de tu zona",
        icon: "warning",
      });

      console.log("No es de Argentina, no se puede continuar");
      return;
    }

    //VALIDACION DE FECHAS  
    if (fechaIngreso) {
      console.log("Fecha ingresada válida " + fechaIngreso);
    } else {
      Swal.fire("Fecha no válida");
      return;
    }

    if (fechaDespido > fechaActual) {
      Swal.fire({
        text: "Fecha de despido no válida, deber ser anterior al dia de hoy",
        icon: "warning",
      });
      return;
    } else if (fechaDespido < fechaIngreso) {
      Swal.fire({
        text: "Fecha de despido no válida, deber ser posterior a la fecha de ingreso",
        icon: "warning",
      });
      return;
    } else {
      console.log("Fecha ingresada válida " + fechaDespido);
    }

    //VALIDACION DE SUELDO

    if (isNaN(sueldo) || sueldo == 0 || sueldo == "") {
      Swal.fire({
        text: "Debes ingresar un sueldo valido",
        icon: "warning",
      });
      return;
    } else {
      console.log("sueldo ingresado valido");
    }

    // si pasa las validaciones, y envía el formulario
    const resultadoAntiguedad = calcularAntiguedad(fechaIngreso, fechaDespido);
    calcularIndemnizacion(resultadoAntiguedad);

    boton1.style.display = "none"
  });

  const boton1 = form.querySelector("button[type='submit']");
  boton1.classList.add("button");

  body.appendChild(form);
}

formulario();


//CALCULO DE ANTIGUEDAD

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
  }
  return {
    mesesRestantes: mesesRestantes,
    antiguedadEnAños: antiguedadEnAños,
  };
}


//CALCULO DE INDEMNIZACION

function calcularIndemnizacion(resultadoAntiguedad) {
  let sueldoUsuario = parseInt(document.getElementById("sueldo").value);
  let preaviso = document.getElementById("preaviso").checked;

  let mesesRestantes = resultadoAntiguedad.mesesRestantes;
  let antiguedadEnAños = resultadoAntiguedad.antiguedadEnAños;

  console.log("antiguedadEnAños:", antiguedadEnAños);
  console.log("mesesRestantes:", mesesRestantes);

  let indemnizacion;

  if (antiguedadEnAños === 0 && mesesRestantes > 3) {
    indemnizacion = sueldoUsuario;
    console.log(
      `$${indemnizacion} es la indemnizacion sin cobrar preaviso (A)`
    );
  } else if (antiguedadEnAños !== 0 && mesesRestantes < 3) {
    indemnizacion = sueldoUsuario * antiguedadEnAños;
    console.log(
      `$${indemnizacion} es la indemnizacion sin cobrar preaviso (B)`
    );
  } else if (antiguedadEnAños !== 0 && mesesRestantes >= 3) {
    indemnizacion = sueldoUsuario * antiguedadEnAños + sueldoUsuario;
    console.log(
      `$${indemnizacion} es la indemnizacion sin cobrar preaviso (C)`
    );
  } else {
    indemnizacion = 0;
    Swal.fire({
      text: "Al haber trabajado menos de 3 meses no te corresponde indemnizacion.",
      icon: "info",
    });
  }

  if (indemnizacion !== 0) {
    preaviso
      ? (indemnizacion = indemnizacion)
      : (indemnizacion = indemnizacion + sueldoUsuario);

    console.log(indemnizacion);
  }
  function numeroFinal() {
    Swal.fire({
      text: "Tu indemnizacion es de: $" + indemnizacion,
    });

    const numeroFinal = document.createElement("h1");
    numeroFinal.textContent = "Tu indemnizacion es de: $" + indemnizacion;
    body.appendChild(numeroFinal);
  }
  numeroFinal();

  function aclaracion() {
    setTimeout(() => {
      Swal.fire({
        text: "La cifra es aproximada, para mas informacion carga tus datos de contacto",
        icon: "info",
      });
    }, 2500);
  }
  aclaracion();


  //FUNCION QUE CONSTRUYE CONTACTO

  const Contacto = function (nombre, apellido, email, numero, localidad) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.numero = numero;
    this.localidad = localidad;
  };
  

  //FORMULARIO DE CONTACTO

  function formularioContacto() {
    const botonExistente = document.getElementById("botonPideContacto");
    if (botonExistente) {
      botonExistente.remove();
    }

    const formContacto = document.createElement("form");
    formContacto.id = "formContacto"
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
        let resultado = localidadesValidas.filter((x) =>
          x.toUpperCase().includes(localidad.toUpperCase())
        );

        resultado.length > 0
          ? console.log("Podemos ejercer en su localidad. Posible cliente.")
          : console.log(
              "No contamos con matrícula para ejercer en su localidad."
            );
      }
      filtrarLocalidad(localidad);

      const datosContacto1 = new Contacto(
        nombre,
        apellido,
        email,
        numero,
        localidad
      );
      botonPideContacto.style.display = "none"

      datosContactoEnJson = JSON.stringify(datosContacto1);

      localStorage.setItem("contacto1", datosContactoEnJson);

      Swal.fire({
        text: "Gracias!, pronto te estaremos contactando.",
        icon: "success",
      });

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
    botonPideContacto.style.display = "none"
    formularioContacto();
    
  });

  body.appendChild(botonPideContacto);

  if (!document.getElementById("botonPideContacto")) {
    formularioContacto();
  }




  
  //FUNCION QUE CONSUME EL ARCHIVO JSON


  function info() {
    fetch("articulos.json")
      .then((response) => response.json())
      .then((data) => {
        const articulos = data.articulos;
  
        const articulosContainer = document.createElement("div");
        articulosContainer.id = "articulosContainer";
  
        articulos.forEach((articulo) => {
          const articulosElement = document.createElement("p");
          articulosElement.textContent = `${articulo.articulo} : ${articulo.texto}`;
          articulosContainer.appendChild(articulosElement)
            document.body.appendChild(articulosContainer)
  
            
        })
        
      })
    
  }

  
  let botonInfo = document.createElement("button")
  botonInfo.id = "botonInfo"
  botonInfo.classList.add("botonInfo")
  botonInfo.textContent = "INFO"
  botonInfo.addEventListener("click", info)
  botonInfo.addEventListener("click", function () {
    botonInfo.style.display = "none"})
  document.body.appendChild(botonInfo)
 
}


//SE LE AGREGA EL CONSUMO DE LA API DE DOLAR PARA COMPLETAR TODOS LOS PUNTOS DEL PROYECTO, NO ENCONTRE OTRA API PUBLICA QUE ME SIRVA

let dolar = document.createElement("div")
dolar.id = "dolar"
dolar.classList.add("dolar")
document.body.appendChild(dolar)


let urlDolarOficial = "https://dolarapi.com/v1/dolares/oficial"
fetch(urlDolarOficial)
.then( (response) => response.json())
.then((data) => {
  const dolarOficial = document.createElement("table")
  dolarOficial.id = "dolarOficial"
  dolarOficial.innerHTML = `
  <tr>
    <th>Dolar ${data.nombre}</th>
  </tr>
  <tr>
    <td>Compra:${data.compra}</td>
  </tr>
  <tr>
    <td>Venta:${data.venta}</td>
  </tr>
`
  dolar.appendChild(dolarOficial)
})



let urlDolarBlue = "https://dolarapi.com/v1/dolares/blue"
fetch(urlDolarBlue)
.then( (response) => response.json())
.then((data) => {
  const dolarBlue = document.createElement("table")
  dolarBlue.id = "dolarBlue"
  dolarBlue.innerHTML =
  `
  <tr>
    <th>Dolar ${data.nombre}</th>
  </tr>
  <tr>
    <td>Compra:${data.compra}</td>
  </tr>
  <tr>
    <td>Venta:${data.venta}</td>
  </tr>

`
  dolar.appendChild(dolarBlue)
})

