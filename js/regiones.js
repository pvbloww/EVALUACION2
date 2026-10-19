/* =========================================================
   Veterinaria San Marcos - Regiones y comunas
   Datos de ejemplo para los selects de región y comuna
   que se relacionan entre sí (select dependiente).
   ========================================================= */

// Usamos un objeto: cada región es una "llave" y su valor es
// un arreglo con las comunas de esa región.
var regionesYComunas = {
  "Región Metropolitana de Santiago": ["Santiago", "Providencia", "Ñuñoa", "Maipú", "Puente Alto"],
  "Región del Libertador Gral. B. O'Higgins": ["Rancagua", "Machalí", "San Fernando", "Rengo"],
  "Región de la Araucanía": ["Temuco", "Villarrica", "Angol", "Pucón"],
  "Región de Ñuble": ["Chillán", "San Carlos", "Bulnes"],
  "Región del Biobío": ["Concepción", "Talcahuano", "Los Ángeles"],
};

// Llena el select de regiones y deja el select de comunas escuchando
// los cambios, para que se actualice cada vez que cambia la región.
function llenarSelectRegiones(idSelectRegion, idSelectComuna) {
  var selectRegion = document.getElementById(idSelectRegion);
  var selectComuna = document.getElementById(idSelectComuna);

  if (selectRegion === null || selectComuna === null) {
    return;
  }

  // Primera opción: "-- Seleccione la región --"
  var htmlRegiones = "<option value=''>-- Seleccione la región --</option>";

  // Recorremos las llaves del objeto (los nombres de las regiones) con un for..in
  for (var nombreRegion in regionesYComunas) {
    htmlRegiones += "<option value='" + nombreRegion + "'>" + nombreRegion + "</option>";
  }

  selectRegion.innerHTML = htmlRegiones;
  selectComuna.innerHTML = "<option value=''>-- Seleccione la comuna --</option>";

  // Cuando el usuario elige una región, mostramos solo las comunas de esa región
  selectRegion.addEventListener("change", function () {
    var comunas = regionesYComunas[selectRegion.value];

    if (comunas === undefined) {
      comunas = [];
    }

    var htmlComunas = "<option value=''>-- Seleccione la comuna --</option>";
    for (var i = 0; i < comunas.length; i++) {
      htmlComunas += "<option value='" + comunas[i] + "'>" + comunas[i] + "</option>";
    }

    selectComuna.innerHTML = htmlComunas;
  });
}
