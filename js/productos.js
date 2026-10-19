/* =========================================================
   Veterinaria San Marcos - Catálogo de productos
   Aquí guardamos los productos en un arreglo de objetos
   y hacemos funciones simples para mostrarlos en pantalla.
   ========================================================= */

// Arreglo con todos los productos de la tienda.
// Cada producto es un objeto con: id, nombre, categoria, precio,
// stock, stockCritico y descripcion.
var listaProductos = [
  {
    id: "VA001",
    nombre: "Vacuna antirrábica canina",
    categoria: "Vacunas",
    precio: 12000,
    stock: 48,
    stockCritico: 10,
    descripcion: "Vacuna antirrábica obligatoria por ley para perros. Se debe aplicar una vez al año.",
  },
  {
    id: "VA003",
    nombre: "Vacuna bivalente felina",
    categoria: "Vacunas",
    precio: 15000,
    stock: 36,
    stockCritico: 8,
    descripcion: "Refuerzo anual para gatos, protege contra las principales enfermedades virales felinas.",
  },
  {
    id: "VA005",
    nombre: "Vacuna Bordetella canina",
    categoria: "Vacunas",
    precio: 14000,
    stock: 22,
    stockCritico: 5,
    descripcion: "Conocida como la vacuna contra la 'tos de las perreras'. Recomendada para perros que van a guarderías.",
  },
  {
    id: "DE001",
    nombre: "Desparasitación interna pequeños (<10 kg)",
    categoria: "Desparasitación",
    precio: 8000,
    stock: 60,
    stockCritico: 15,
    descripcion: "Tratamiento antiparasitario interno para perros de hasta 10 kg.",
  },
  {
    id: "DE005",
    nombre: "Antiparasitario externo (pipeta)",
    categoria: "Desparasitación",
    precio: 7500,
    stock: 40,
    stockCritico: 10,
    descripcion: "Pipeta antiparasitaria externa para perros y gatos.",
  },
  {
    id: "ME004",
    nombre: "Nexgard (Afoxolaner)",
    categoria: "Antiparasitarios",
    precio: 9500,
    stock: 60,
    stockCritico: 12,
    descripcion: "Comprimido masticable que protege contra pulgas y garrapatas.",
  },
  {
    id: "ME006",
    nombre: "Revolution Plus",
    categoria: "Antiparasitarios",
    precio: 14500,
    stock: 35,
    stockCritico: 8,
    descripcion: "Pipeta antiparasitaria para gatos, protege contra varios parásitos a la vez.",
  },
  {
    id: "ME009",
    nombre: "Meloxicam 1mg",
    categoria: "Medicamentos",
    precio: 4500,
    stock: 55,
    stockCritico: 10,
    descripcion: "Antiinflamatorio de uso veterinario. Requiere indicación médica.",
  },
  {
    id: "ME011",
    nombre: "Clorhexidina shampoo",
    categoria: "Dermatología",
    precio: 8900,
    stock: 25,
    stockCritico: 5,
    descripcion: "Shampoo dermatológico para el cuidado de la piel de perros y gatos.",
  },
  {
    id: "ME021",
    nombre: "Omega vet 3-6-9",
    categoria: "Suplementos",
    precio: 9900,
    stock: 30,
    stockCritico: 6,
    descripcion: "Suplemento con ácidos grasos para un pelaje saludable.",
  },
  {
    id: "OT001",
    nombre: "Corte de uñas",
    categoria: "Servicios",
    precio: 5000,
    stock: 99,
    stockCritico: 0,
    descripcion: "Servicio de corte de uñas para perros y gatos.",
  },
  {
    id: "OT003",
    nombre: "Microchip identificación",
    categoria: "Servicios",
    precio: 15000,
    stock: 99,
    stockCritico: 0,
    descripcion: "Implante de microchip de identificación, incluye registro.",
  },
];

// Función que da formato de precio chileno, ejemplo: 12000 -> $12.000
function formatearPrecio(numero) {
  // toLocaleString ya viene con JavaScript y ordena los números con puntos
  return "$" + numero.toLocaleString("es-CL");
}

// Busca un producto dentro del arreglo usando su id.
// Recorremos el arreglo con un for normal y comparamos uno por uno.
function buscarProductoPorId(idBuscado) {
  for (var i = 0; i < listaProductos.length; i++) {
    if (listaProductos[i].id === idBuscado) {
      return listaProductos[i];
    }
  }
  return null; // si no lo encuentra, devuelve null
}

// Dibuja las tarjetas de producto dentro de un contenedor (div) del HTML.
// contenedorId: el id del div donde se van a poner las tarjetas.
// categoria: si es "Todos" muestra todos los productos, si no, solo los de esa categoría.
function mostrarProductos(contenedorId, categoria) {
  var contenedor = document.getElementById(contenedorId);
  if (contenedor === null) {
    return; // si no existe el contenedor en esta página, no hacemos nada
  }

  var html = ""; // aquí vamos a ir armando el HTML como texto

  for (var i = 0; i < listaProductos.length; i++) {
    var producto = listaProductos[i];

    // si pidieron una categoría específica y este producto no es de esa categoría, lo saltamos
    if (categoria !== "Todos" && producto.categoria !== categoria) {
      continue;
    }

    html += "<div class='card'>";
    html += "  <a href='detalle-producto.html?id=" + producto.id + "'>";
    html += "    <div class='placeholder-img'>" + producto.nombre + "</div>";
    html += "  </a>";
    html += "  <div class='info'>";
    html += "    <span class='categoria'>" + producto.categoria + "</span>";
    html += "    <h3><a href='detalle-producto.html?id=" + producto.id + "'>" + producto.nombre + "</a></h3>";
    html += "    <span class='precio'>" + formatearPrecio(producto.precio) + "</span>";
    html += "    <button class='btn btn-primario btn-bloque' onclick=\"agregarAlCarrito('" + producto.id + "', 1)\">Añadir al carrito</button>";
    html += "  </div>";
    html += "</div>";
  }

  contenedor.innerHTML = html;
}

// Crea los botones de filtro por categoría (Todos, Vacunas, etc.)
function mostrarFiltros() {
  var contenedor = document.getElementById("filtros-categoria");
  if (contenedor === null) {
    return;
  }

  // armamos un arreglo de categorías sin repetir, empezando por "Todos"
  var categorias = ["Todos"];
  for (var i = 0; i < listaProductos.length; i++) {
    var categoriaProducto = listaProductos[i].categoria;
    if (categorias.indexOf(categoriaProducto) === -1) {
      categorias.push(categoriaProducto);
    }
  }

  var html = "";
  for (var j = 0; j < categorias.length; j++) {
    var claseActivo = j === 0 ? "activo" : "";
    html += "<button type='button' class='" + claseActivo + "' onclick=\"filtrarPorCategoria('" + categorias[j] + "', this)\">" + categorias[j] + "</button>";
  }

  contenedor.innerHTML = html;
}

// Se ejecuta cuando el usuario hace clic en un botón de filtro.
function filtrarPorCategoria(categoria, boton) {
  // le quitamos la clase "activo" a todos los botones
  var botones = document.querySelectorAll("#filtros-categoria button");
  for (var i = 0; i < botones.length; i++) {
    botones[i].classList.remove("activo");
  }
  // y se la ponemos solo al que apretó el usuario
  boton.classList.add("activo");

  mostrarProductos("grid-productos", categoria);
}

// Muestra el detalle de un producto (para la página detalle-producto.html)
// El id del producto viene en la URL, ejemplo: detalle-producto.html?id=VA001
function mostrarDetalleProducto() {
  var contenedor = document.getElementById("detalle-producto");
  if (contenedor === null) {
    return;
  }

  // leemos el parámetro "id" desde la URL
  var parametros = new URLSearchParams(window.location.search);
  var idProducto = parametros.get("id");

  var producto = buscarProductoPorId(idProducto);
  if (producto === null) {
    producto = listaProductos[0]; // si no encontramos el producto, mostramos el primero
  }

  document.title = producto.nombre + " - Veterinaria San Marcos";
  document.getElementById("miga-producto").textContent = producto.nombre;

  var html = "";
  html += "<div><div class='placeholder-img' style='aspect-ratio:1/1;'>" + producto.nombre + "</div></div>";
  html += "<div>";
  html += "  <span class='categoria'>" + producto.categoria + "</span>";
  html += "  <h1>" + producto.nombre + "</h1>";
  html += "  <p class='precio-grande'>" + formatearPrecio(producto.precio) + "</p>";
  html += "  <p>" + producto.descripcion + "</p>";
  html += "  <p><strong>Stock disponible:</strong> " + producto.stock + " unidades</p>";
  html += "  <div class='selector-cantidad'>";
  html += "    <label for='cantidad'>Cantidad</label>";
  html += "    <input type='number' id='cantidad' min='1' max='" + producto.stock + "' value='1' />";
  html += "  </div>";
  html += "  <button class='btn btn-primario' onclick=\"agregarDesdeDetalle('" + producto.id + "')\">Añadir al carrito</button>";
  html += "  <p id='mensaje-agregado' class='alerta alerta-exito' style='display:none;'>Producto añadido al carrito.</p>";
  html += "</div>";

  contenedor.innerHTML = html;

  mostrarRelacionados(producto);
}

// Al hacer clic en "Añadir al carrito" desde el detalle, leemos la cantidad escogida.
function agregarDesdeDetalle(idProducto) {
  var inputCantidad = document.getElementById("cantidad");
  var cantidad = parseInt(inputCantidad.value);

  if (isNaN(cantidad) || cantidad < 1) {
    cantidad = 1;
  }

  agregarAlCarrito(idProducto, cantidad);

  var mensaje = document.getElementById("mensaje-agregado");
  mensaje.style.display = "block";
}

// Muestra hasta 4 productos de la misma categoría como "relacionados"
function mostrarRelacionados(productoActual) {
  var contenedor = document.getElementById("productos-relacionados");
  if (contenedor === null) {
    return;
  }

  var html = "";
  var contador = 0;

  for (var i = 0; i < listaProductos.length; i++) {
    var producto = listaProductos[i];

    if (producto.categoria === productoActual.categoria && producto.id !== productoActual.id) {
      html += "<a href='detalle-producto.html?id=" + producto.id + "' class='card'>";
      html += "  <div class='placeholder-img'>" + producto.nombre + "</div>";
      html += "  <div class='info'>";
      html += "    <h3>" + producto.nombre + "</h3>";
      html += "    <span class='precio'>" + formatearPrecio(producto.precio) + "</span>";
      html += "  </div>";
      html += "</a>";
      contador++;
    }

    if (contador === 4) {
      break; // ya tenemos suficientes relacionados, dejamos de buscar
    }
  }

  contenedor.innerHTML = html;
}

// Muestra solo los primeros 4 productos en la página de inicio (Home)
function mostrarProductosDestacados() {
  var contenedor = document.getElementById("grid-productos-home");
  if (contenedor === null) {
    return;
  }

  var html = "";
  for (var i = 0; i < 4; i++) {
    var producto = listaProductos[i];
    html += "<div class='card'>";
    html += "  <a href='detalle-producto.html?id=" + producto.id + "'>";
    html += "    <div class='placeholder-img'>" + producto.nombre + "</div>";
    html += "  </a>";
    html += "  <div class='info'>";
    html += "    <span class='categoria'>" + producto.categoria + "</span>";
    html += "    <h3><a href='detalle-producto.html?id=" + producto.id + "'>" + producto.nombre + "</a></h3>";
    html += "    <span class='precio'>" + formatearPrecio(producto.precio) + "</span>";
    html += "    <button class='btn btn-primario btn-bloque' onclick=\"agregarAlCarrito('" + producto.id + "', 1)\">Añadir al carrito</button>";
    html += "  </div>";
    html += "</div>";
  }
  contenedor.innerHTML = html;
}

// Cuando se carga la página, ejecutamos las funciones que correspondan.
// Cada función se sale sola (return) si no encuentra su contenedor,
// así que no hay problema en llamarlas todas desde cualquier página.
document.addEventListener("DOMContentLoaded", function () {
  mostrarFiltros();
  mostrarProductos("grid-productos", "Todos");
  mostrarDetalleProducto();
  mostrarProductosDestacados();
});
