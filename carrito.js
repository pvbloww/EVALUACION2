/* =========================================================
   Veterinaria San Marcos - Carrito de compras
   Guardamos el carrito en el localStorage del navegador,
   así no se pierde si el usuario recarga la página.
   ========================================================= */

var NOMBRE_GUARDADO_CARRITO = "carritoVeterinaria";

// Lee el carrito guardado en localStorage y lo devuelve como arreglo.
// Si no hay nada guardado todavía, devuelve un arreglo vacío.
function obtenerCarrito() {
  var textoGuardado = localStorage.getItem(NOMBRE_GUARDADO_CARRITO);

  if (textoGuardado === null) {
    return [];
  }

  return JSON.parse(textoGuardado);
}

// Guarda el arreglo del carrito en localStorage (hay que convertirlo a texto con JSON.stringify).
function guardarCarrito(carrito) {
  var texto = JSON.stringify(carrito);
  localStorage.setItem(NOMBRE_GUARDADO_CARRITO, texto);
  actualizarContadorCarrito();
}

// Agrega un producto al carrito. Si ya estaba, le suma la cantidad.
function agregarAlCarrito(idProducto, cantidad) {
  var carrito = obtenerCarrito();
  var yaExiste = false;

  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id === idProducto) {
      carrito[i].cantidad = carrito[i].cantidad + cantidad;
      yaExiste = true;
      break;
    }
  }

  if (yaExiste === false) {
    carrito.push({ id: idProducto, cantidad: cantidad });
  }

  guardarCarrito(carrito);
}

// Cambia la cantidad de un producto específico (se usa con los botones + y -)
function cambiarCantidadCarrito(idProducto, nuevaCantidad) {
  var carrito = obtenerCarrito();

  if (nuevaCantidad <= 0) {
    // si la cantidad llega a 0, eliminamos el producto del carrito
    quitarDelCarrito(idProducto);
    return;
  }

  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id === idProducto) {
      carrito[i].cantidad = nuevaCantidad;
    }
  }

  guardarCarrito(carrito);
  mostrarCarrito();
}

// Elimina un producto completo del carrito
function quitarDelCarrito(idProducto) {
  var carrito = obtenerCarrito();
  var carritoNuevo = [];

  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id !== idProducto) {
      carritoNuevo.push(carrito[i]);
    }
  }

  guardarCarrito(carritoNuevo);
  mostrarCarrito();
}

// Suma todas las cantidades del carrito (para mostrar el número en el ícono del carrito)
function contarUnidadesCarrito() {
  var carrito = obtenerCarrito();
  var total = 0;

  for (var i = 0; i < carrito.length; i++) {
    total = total + carrito[i].cantidad;
  }

  return total;
}

// Actualiza el número que aparece al lado del ícono del carrito en el menú
function actualizarContadorCarrito() {
  var totalUnidades = contarUnidadesCarrito();
  var elementos = document.querySelectorAll(".contador-carrito");

  for (var i = 0; i < elementos.length; i++) {
    elementos[i].textContent = totalUnidades;
  }
}

// Dibuja la tabla del carrito en la página carrito.html
function mostrarCarrito() {
  var cuerpoTabla = document.getElementById("cuerpo-carrito");
  if (cuerpoTabla === null) {
    return; // esta función solo funciona en carrito.html
  }

  var carrito = obtenerCarrito();
  var divVacio = document.getElementById("carrito-vacio");
  var divTabla = document.getElementById("tabla-carrito-wrapper");

  if (carrito.length === 0) {
    divVacio.style.display = "block";
    divTabla.style.display = "none";
    return;
  }

  divVacio.style.display = "none";
  divTabla.style.display = "block";

  var html = "";
  var totalCompra = 0;

  for (var i = 0; i < carrito.length; i++) {
    var itemCarrito = carrito[i];
    var producto = buscarProductoPorId(itemCarrito.id);

    if (producto === null) {
      continue; // por si el producto ya no existe
    }

    var subtotal = producto.precio * itemCarrito.cantidad;
    totalCompra = totalCompra + subtotal;

    html += "<tr>";
    html += "  <td>";
    html += "    <div class='fila-producto-carrito'>";
    html += "      <div class='placeholder-img'>" + producto.nombre + "</div>";
    html += "      <div><strong>" + producto.nombre + "</strong><br><small>" + producto.categoria + "</small></div>";
    html += "    </div>";
    html += "  </td>";
    html += "  <td>" + formatearPrecio(producto.precio) + "</td>";
    html += "  <td>";
    html += "    <div class='controles-cantidad'>";
    html += "      <button onclick=\"cambiarCantidadCarrito('" + producto.id + "', " + (itemCarrito.cantidad - 1) + ")\">-</button>";
    html += "      <span>" + itemCarrito.cantidad + "</span>";
    html += "      <button onclick=\"cambiarCantidadCarrito('" + producto.id + "', " + (itemCarrito.cantidad + 1) + ")\">+</button>";
    html += "    </div>";
    html += "  </td>";
    html += "  <td>" + formatearPrecio(subtotal) + "</td>";
    html += "  <td><button class='btn btn-secundario' onclick=\"quitarDelCarrito('" + producto.id + "')\">Quitar</button></td>";
    html += "</tr>";
  }

  cuerpoTabla.innerHTML = html;
  document.getElementById("total-carrito").textContent = formatearPrecio(totalCompra);
}

// Vacía todo el carrito (se usa después de "pagar")
function vaciarCarrito() {
  guardarCarrito([]);
  mostrarCarrito();
}

// Simula el pago. Como es un proyecto frontend, no hay un banco real conectado.
function pagarCarrito(evento) {
  evento.preventDefault();

  var carrito = obtenerCarrito();
  if (carrito.length === 0) {
    alert("Tu carrito está vacío. Añade productos antes de pagar.");
    return;
  }

  alert("¡Gracias por tu compra! (simulación para la evaluación).");
  vaciarCarrito();
}

document.addEventListener("DOMContentLoaded", function () {
  actualizarContadorCarrito();
  mostrarCarrito();
});
