/* =========================================================
   Veterinaria San Marcos - Script principal
   Menú hamburguesa (para celular), año del footer y
   formulario de newsletter (simulado).
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  // --- Menú hamburguesa ---
  var botonMenu = document.querySelector(".nav-toggle");
  var menu = document.querySelector("nav.main-nav");

  if (botonMenu !== null && menu !== null) {
    botonMenu.addEventListener("click", function () {
      menu.classList.toggle("open");
    });
  }

  // --- Año actual en el footer ---
  var elementosAnio = document.querySelectorAll(".anio-actual");
  var anioActual = new Date().getFullYear();

  for (var i = 0; i < elementosAnio.length; i++) {
    elementosAnio[i].textContent = anioActual;
  }

  // --- Formulario de newsletter (footer) ---
  var formNewsletter = document.querySelector(".newsletter-form");

  if (formNewsletter !== null) {
    formNewsletter.addEventListener("submit", function (evento) {
      evento.preventDefault();
      var inputCorreo = formNewsletter.querySelector("input[type='email']");

      if (inputCorreo !== null && inputCorreo.value.trim() !== "") {
        alert("Gracias por suscribirte, te escribiremos a " + inputCorreo.value);
        formNewsletter.reset();
      }
    });
  }
});
