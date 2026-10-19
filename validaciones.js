/* =========================================================
   Veterinaria San Marcos - Validaciones de formularios
   Reglas pedidas en las instrucciones de la Evaluación
   Parcial 1. Todo validado con if/else, sin librerías.
   ========================================================= */

// Muestra un mensaje de error debajo de un campo del formulario.
// idCampo: el id del input/select/textarea.
// mensaje: el texto de error. Si el mensaje es vacío ("") se considera válido.
function mostrarError(idCampo, mensaje) {
  var input = document.getElementById(idCampo);
  var divCampo = input.closest(".campo"); // el div que envuelve el input
  var parrafoError = divCampo.querySelector(".mensaje-error");

  if (mensaje === "") {
    divCampo.classList.remove("invalido");
    divCampo.classList.add("valido");
    parrafoError.textContent = "";
    return true; // el campo es válido
  } else {
    divCampo.classList.add("invalido");
    divCampo.classList.remove("valido");
    parrafoError.textContent = mensaje;
    return false; // el campo NO es válido
  }
}

// Revisa que un correo termine en uno de los 3 dominios permitidos.
// Usamos endsWith(), que es un método simple de los textos (strings).
function correoTerminaEnDominioPermitido(correo) {
  if (correo.endsWith("@duoc.cl")) {
    return true;
  }
  if (correo.endsWith("@profesor.duoc.cl")) {
    return true;
  }
  if (correo.endsWith("@gmail.com")) {
    return true;
  }
  return false;
}

// Valida un campo de correo completo: que no esté vacío, que no sea muy largo
// y que use uno de los dominios permitidos.
function validarCorreo(idCampo) {
  var input = document.getElementById(idCampo);
  var correo = input.value.trim();

  if (correo === "") {
    return mostrarError(idCampo, "El correo es obligatorio.");
  }
  if (correo.length > 100) {
    return mostrarError(idCampo, "El correo no puede tener más de 100 caracteres.");
  }
  if (correoTerminaEnDominioPermitido(correo) === false) {
    return mostrarError(idCampo, "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
  }

  return mostrarError(idCampo, "");
}

// Valida que un campo de texto no esté vacío y no pase de un largo máximo.
function validarTexto(idCampo, nombreCampo, largoMaximo) {
  var input = document.getElementById(idCampo);
  var valor = input.value.trim();

  if (valor === "") {
    return mostrarError(idCampo, nombreCampo + " es obligatorio.");
  }
  if (valor.length > largoMaximo) {
    return mostrarError(idCampo, nombreCampo + " no puede tener más de " + largoMaximo + " caracteres.");
  }

  return mostrarError(idCampo, "");
}

// Valida la contraseña: entre 4 y 10 caracteres.
function validarContrasena(idCampo) {
  var input = document.getElementById(idCampo);
  var valor = input.value;

  if (valor === "") {
    return mostrarError(idCampo, "La contraseña es obligatoria.");
  }
  if (valor.length < 4 || valor.length > 10) {
    return mostrarError(idCampo, "La contraseña debe tener entre 4 y 10 caracteres.");
  }

  return mostrarError(idCampo, "");
}

// Valida que la confirmación de contraseña sea igual a la contraseña original.
function validarConfirmarContrasena(idConfirmar, idOriginal) {
  var confirmar = document.getElementById(idConfirmar).value;
  var original = document.getElementById(idOriginal).value;

  if (confirmar !== original) {
    return mostrarError(idConfirmar, "Las contraseñas no coinciden.");
  }

  return mostrarError(idConfirmar, "");
}

// Valida el RUN chileno de forma simple: que no esté vacío, que tenga entre
// 7 y 9 caracteres (sin puntos ni guion) y que el último carácter sea un
// número o la letra K. No calculamos el dígito verificador real para
// mantenerlo simple, pero se podría agregar más adelante.
function validarRun(idCampo) {
  var input = document.getElementById(idCampo);
  var run = input.value.trim().toUpperCase();

  if (run === "") {
    return mostrarError(idCampo, "El RUN es obligatorio.");
  }
  if (run.length < 7 || run.length > 9) {
    return mostrarError(idCampo, "El RUN debe tener entre 7 y 9 caracteres, sin puntos ni guion.");
  }

  var cuerpo = run.substring(0, run.length - 1); // todo menos el último carácter
  var ultimoCaracter = run.substring(run.length - 1);

  // isNaN() nos dice si algo NO es un número
  if (isNaN(cuerpo)) {
    return mostrarError(idCampo, "El RUN solo puede tener números (y K al final). Ejemplo: 19011022K.");
  }
  if (isNaN(ultimoCaracter) && ultimoCaracter !== "K") {
    return mostrarError(idCampo, "El último carácter del RUN debe ser un número o la letra K.");
  }

  return mostrarError(idCampo, "");
}

// Valida que se haya elegido una opción en un <select>.
function validarSelect(idCampo, nombreCampo) {
  var select = document.getElementById(idCampo);

  if (select.value === "") {
    return mostrarError(idCampo, "Debe seleccionar " + nombreCampo + ".");
  }

  return mostrarError(idCampo, "");
}

// Valida un número dentro de un rango. maximo puede ser null si no hay límite.
function validarNumero(idCampo, minimo, maximo, opcional) {
  var input = document.getElementById(idCampo);
  var valor = input.value.trim();

  if (valor === "") {
    if (opcional === true) {
      return mostrarError(idCampo, "");
    }
    return mostrarError(idCampo, "Este campo es obligatorio.");
  }

  var numero = Number(valor);

  if (isNaN(numero)) {
    return mostrarError(idCampo, "Debe ingresar solo números.");
  }
  if (numero < minimo) {
    return mostrarError(idCampo, "El valor mínimo permitido es " + minimo + ".");
  }
  if (maximo !== null && numero > maximo) {
    return mostrarError(idCampo, "El valor máximo permitido es " + maximo + ".");
  }

  return mostrarError(idCampo, "");
}

/* ---------------------------------------------------------
   A partir de aquí: una función por formulario, que junta
   las validaciones de arriba y revisa si TODAS pasaron.
   --------------------------------------------------------- */

// Formulario de inicio de sesión (login.html)
function validarFormularioLogin(evento) {
  evento.preventDefault(); // evita que la página se recargue

  var correoOk = validarCorreo("correo");
  var contrasenaOk = validarContrasena("contrasena");

  if (correoOk && contrasenaOk) {
    document.getElementById("mensaje-resultado").style.display = "block";
    document.getElementById("form-login").reset();
  }
}

// Formulario de registro de usuario (registro.html)
function validarFormularioRegistro(evento) {
  evento.preventDefault();

  var runOk = validarRun("run");
  var nombreOk = validarTexto("nombre", "El nombre", 50);
  var apellidosOk = validarTexto("apellidos", "Los apellidos", 100);
  var correoOk = validarCorreo("correo");
  var contrasenaOk = validarContrasena("contrasena");
  var confirmarOk = validarConfirmarContrasena("confirmar-contrasena", "contrasena");
  var regionOk = validarSelect("region", "una región");
  var comunaOk = validarSelect("comuna", "una comuna");
  var direccionOk = validarTexto("direccion", "La dirección", 300);

  var todoValido =
    runOk && nombreOk && apellidosOk && correoOk && contrasenaOk &&
    confirmarOk && regionOk && comunaOk && direccionOk;

  if (todoValido) {
    document.getElementById("mensaje-resultado").style.display = "block";
    document.getElementById("form-registro").reset();
  }
}

// Formulario de contacto (contacto.html)
function validarFormularioContacto(evento) {
  evento.preventDefault();

  var nombreOk = validarTexto("nombre", "El nombre", 100);
  var correoOk = validarCorreo("correo");
  var comentarioOk = validarTexto("comentario", "El comentario", 500);

  if (nombreOk && correoOk && comentarioOk) {
    document.getElementById("mensaje-resultado").style.display = "block";
    document.getElementById("form-contacto").reset();
  }
}

// Conectamos cada formulario con su función de validación cuando carga la página.
// Con "if" revisamos que el formulario exista en la página actual antes de usarlo.
document.addEventListener("DOMContentLoaded", function () {
  var formLogin = document.getElementById("form-login");
  if (formLogin !== null) {
    formLogin.addEventListener("submit", validarFormularioLogin);
  }

  var formRegistro = document.getElementById("form-registro");
  if (formRegistro !== null) {
    formRegistro.addEventListener("submit", validarFormularioRegistro);
  }

  var formContacto = document.getElementById("form-contacto");
  if (formContacto !== null) {
    formContacto.addEventListener("submit", validarFormularioContacto);
  }
});
