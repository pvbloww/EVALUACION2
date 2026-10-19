/* =========================================================
   Veterinaria San Marcos - Panel administrador
   Guardamos usuarios y productos en localStorage para
   simular una base de datos (en esta entrega no hay
   backend todavía, solo frontend).
   ========================================================= */

var NOMBRE_GUARDADO_USUARIOS = "adminUsuariosVeterinaria";
var NOMBRE_GUARDADO_PRODUCTOS = "adminProductosVeterinaria";

// Usuarios de ejemplo que se cargan la primera vez que se abre el panel.
var usuariosDeEjemplo = [
  {
    run: "191102201",
    nombre: "Camila",
    apellidos: "Reyes Soto",
    correo: "camila.reyes@duoc.cl",
    tipo: "Administrador",
    region: "Región Metropolitana de Santiago",
    comuna: "Santiago",
    direccion: "Av. Siempre Viva 123",
  },
  {
    run: "180456782",
    nombre: "Pedro",
    apellidos: "Muñoz Díaz",
    correo: "pedro.munoz@gmail.com",
    tipo: "Vendedor",
    region: "Región del Libertador Gral. B. O'Higgins",
    comuna: "Rancagua",
    direccion: "Calle Los Aromos 456",
  },
  {
    run: "205678901",
    nombre: "Javiera",
    apellidos: "López Peña",
    correo: "javiera.lopez@profesor.duoc.cl",
    tipo: "Cliente",
    region: "Región de la Araucanía",
    comuna: "Temuco",
    direccion: "Pasaje Las Rosas 789",
  },
];

// --- Funciones para leer y guardar en localStorage ---

function obtenerUsuarios() {
  var texto = localStorage.getItem(NOMBRE_GUARDADO_USUARIOS);
  if (texto === null) {
    guardarUsuarios(usuariosDeEjemplo);
    return usuariosDeEjemplo;
  }
  return JSON.parse(texto);
}

function guardarUsuarios(listaUsuarios) {
  localStorage.setItem(NOMBRE_GUARDADO_USUARIOS, JSON.stringify(listaUsuarios));
}

function obtenerProductosAdmin() {
  var texto = localStorage.getItem(NOMBRE_GUARDADO_PRODUCTOS);
  if (texto === null) {
    guardarProductosAdmin(listaProductos); // "listaProductos" viene de productos.js
    return listaProductos;
  }
  return JSON.parse(texto);
}

function guardarProductosAdmin(productos) {
  localStorage.setItem(NOMBRE_GUARDADO_PRODUCTOS, JSON.stringify(productos));
}

// --- Página de inicio del admin (admin/index.html) ---

function mostrarResumenAdmin() {
  var elementoUsuarios = document.getElementById("resumen-usuarios");
  if (elementoUsuarios === null) {
    return; // esta función solo aplica en admin/index.html
  }

  var usuarios = obtenerUsuarios();
  var productos = obtenerProductosAdmin();

  var cantidadStockCritico = 0;
  for (var i = 0; i < productos.length; i++) {
    var producto = productos[i];
    if (producto.stockCritico > 0 && producto.stock <= producto.stockCritico) {
      cantidadStockCritico++;
    }
  }

  elementoUsuarios.textContent = usuarios.length;
  document.getElementById("resumen-productos").textContent = productos.length;
  document.getElementById("resumen-stock-critico").textContent = cantidadStockCritico;
}

// --- Listado de usuarios (admin/usuarios.html) ---

function mostrarListadoUsuarios() {
  var cuerpoTabla = document.getElementById("cuerpo-tabla-usuarios");
  if (cuerpoTabla === null) {
    return;
  }

  var usuarios = obtenerUsuarios();
  var html = "";

  for (var i = 0; i < usuarios.length; i++) {
    var usuario = usuarios[i];
    html += "<tr>";
    html += "  <td>" + usuario.run + "</td>";
    html += "  <td>" + usuario.nombre + " " + usuario.apellidos + "</td>";
    html += "  <td>" + usuario.correo + "</td>";
    html += "  <td><span class='badge badge-ok'>" + usuario.tipo + "</span></td>";
    html += "  <td>" + usuario.comuna + "</td>";
    html += "  <td class='acciones-tabla'>";
    html += "    <a href='usuario-nuevo.html?posicion=" + i + "'>Editar</a>";
    html += "    <button onclick='eliminarUsuario(" + i + ")'>Eliminar</button>";
    html += "  </td>";
    html += "</tr>";
  }

  cuerpoTabla.innerHTML = html;
}

function eliminarUsuario(posicion) {
  var usuarios = obtenerUsuarios();
  var confirmacion = confirm("¿Eliminar al usuario " + usuarios[posicion].nombre + "?");

  if (confirmacion === false) {
    return;
  }

  usuarios.splice(posicion, 1); // saca 1 elemento en esa posición
  guardarUsuarios(usuarios);
  mostrarListadoUsuarios();
}

// Filtra las filas de la tabla de usuarios según lo que el admin escriba en el buscador.
function buscarUsuario(texto) {
  var filas = document.querySelectorAll("#cuerpo-tabla-usuarios tr");
  var textoBusqueda = texto.toLowerCase();

  for (var i = 0; i < filas.length; i++) {
    var contenidoFila = filas[i].textContent.toLowerCase();

    if (contenidoFila.indexOf(textoBusqueda) !== -1) {
      filas[i].style.display = "";
    } else {
      filas[i].style.display = "none";
    }
  }
}

// --- Formulario nuevo / editar usuario (admin/usuario-nuevo.html) ---

function inicializarFormularioUsuario() {
  var formulario = document.getElementById("form-usuario-admin");
  if (formulario === null) {
    return;
  }

  llenarSelectRegiones("region", "comuna"); // función de regiones.js

  // Revisamos si venimos a EDITAR un usuario (llega ?posicion=N en la URL)
  var parametros = new URLSearchParams(window.location.search);
  var posicionTexto = parametros.get("posicion");
  var estaEditando = posicionTexto !== null;
  var posicion = Number(posicionTexto);

  if (estaEditando) {
    var usuarios = obtenerUsuarios();
    var usuario = usuarios[posicion];

    document.getElementById("titulo-formulario-usuario").textContent = "Editar usuario";
    document.getElementById("run").value = usuario.run;
    document.getElementById("run").disabled = true; // el RUN no se cambia al editar
    document.getElementById("nombre").value = usuario.nombre;
    document.getElementById("apellidos").value = usuario.apellidos;
    document.getElementById("correo").value = usuario.correo;
    document.getElementById("tipo-usuario").value = usuario.tipo;
    document.getElementById("direccion").value = usuario.direccion;

    // Como la comuna depende de la región, esperamos un poquito a que se
    // llene la región y ahí recién elegimos la comuna guardada.
    var selectRegion = document.getElementById("region");
    selectRegion.value = usuario.region;
    selectRegion.dispatchEvent(new Event("change"));
    setTimeout(function () {
      document.getElementById("comuna").value = usuario.comuna;
    }, 100);
  }

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var runOk = estaEditando ? true : validarRun("run");
    var nombreOk = validarTexto("nombre", "El nombre", 50);
    var apellidosOk = validarTexto("apellidos", "Los apellidos", 100);
    var correoOk = validarCorreo("correo");
    var tipoOk = validarSelect("tipo-usuario", "un tipo de usuario");
    var regionOk = validarSelect("region", "una región");
    var comunaOk = validarSelect("comuna", "una comuna");
    var direccionOk = validarTexto("direccion", "La dirección", 300);

    var todoValido =
      runOk && nombreOk && apellidosOk && correoOk && tipoOk &&
      regionOk && comunaOk && direccionOk;

    if (todoValido === false) {
      return;
    }

    var usuarioNuevo = {
      run: document.getElementById("run").value.trim().toUpperCase(),
      nombre: document.getElementById("nombre").value.trim(),
      apellidos: document.getElementById("apellidos").value.trim(),
      correo: document.getElementById("correo").value.trim(),
      tipo: document.getElementById("tipo-usuario").value,
      region: document.getElementById("region").value,
      comuna: document.getElementById("comuna").value,
      direccion: document.getElementById("direccion").value.trim(),
    };

    var usuarios = obtenerUsuarios();

    if (estaEditando) {
      usuarios[posicion] = usuarioNuevo;
    } else {
      usuarios.push(usuarioNuevo);
    }

    guardarUsuarios(usuarios);
    window.location.href = "usuarios.html";
  });
}

// --- Listado de productos (admin/productos.html) ---

function mostrarListadoProductosAdmin() {
  var cuerpoTabla = document.getElementById("cuerpo-tabla-productos");
  if (cuerpoTabla === null) {
    return;
  }

  var productos = obtenerProductosAdmin();
  var html = "";

  for (var i = 0; i < productos.length; i++) {
    var producto = productos[i];
    var esStockCritico = producto.stockCritico > 0 && producto.stock <= producto.stockCritico;

    html += "<tr>";
    html += "  <td>" + producto.id + "</td>";
    html += "  <td>" + producto.nombre + "</td>";
    html += "  <td>" + producto.categoria + "</td>";
    html += "  <td>" + formatearPrecio(producto.precio) + "</td>";
    html += "  <td>" + producto.stock;
    if (esStockCritico) {
      html += " <span class='badge badge-alerta'>Stock crítico</span>";
    }
    html += "  </td>";
    html += "  <td class='acciones-tabla'>";
    html += "    <a href='producto-nuevo.html?posicion=" + i + "'>Editar</a>";
    html += "    <button onclick='eliminarProducto(" + i + ")'>Eliminar</button>";
    html += "  </td>";
    html += "</tr>";
  }

  cuerpoTabla.innerHTML = html;
}

function eliminarProducto(posicion) {
  var productos = obtenerProductosAdmin();
  var confirmacion = confirm("¿Eliminar el producto " + productos[posicion].nombre + "?");

  if (confirmacion === false) {
    return;
  }

  productos.splice(posicion, 1);
  guardarProductosAdmin(productos);
  mostrarListadoProductosAdmin();
}

function buscarProductoAdmin(texto) {
  var filas = document.querySelectorAll("#cuerpo-tabla-productos tr");
  var textoBusqueda = texto.toLowerCase();

  for (var i = 0; i < filas.length; i++) {
    var contenidoFila = filas[i].textContent.toLowerCase();

    if (contenidoFila.indexOf(textoBusqueda) !== -1) {
      filas[i].style.display = "";
    } else {
      filas[i].style.display = "none";
    }
  }
}

// --- Formulario nuevo / editar producto (admin/producto-nuevo.html) ---

function inicializarFormularioProducto() {
  var formulario = document.getElementById("form-producto-admin");
  if (formulario === null) {
    return;
  }

  var parametros = new URLSearchParams(window.location.search);
  var posicionTexto = parametros.get("posicion");
  var estaEditando = posicionTexto !== null;
  var posicion = Number(posicionTexto);

  if (estaEditando) {
    var productos = obtenerProductosAdmin();
    var producto = productos[posicion];

    document.getElementById("titulo-formulario-producto").textContent = "Editar producto";
    document.getElementById("codigo").value = producto.id;
    document.getElementById("codigo").disabled = true; // el código no se cambia al editar
    document.getElementById("prod-nombre").value = producto.nombre;
    document.getElementById("descripcion").value = producto.descripcion;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("stock").value = producto.stock;
    document.getElementById("stock-critico").value = producto.stockCritico;
    document.getElementById("categoria").value = producto.categoria;
  }

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var codigoOk = true;
    if (estaEditando === false) {
      var codigo = document.getElementById("codigo").value.trim();
      if (codigo === "") {
        codigoOk = mostrarError("codigo", "El código es obligatorio.");
      } else if (codigo.length < 3) {
        codigoOk = mostrarError("codigo", "El código debe tener al menos 3 caracteres.");
      } else {
        codigoOk = mostrarError("codigo", "");
      }
    }

    var nombreOk = validarTexto("prod-nombre", "El nombre", 100);
    var precioOk = validarNumero("precio", 0, null, false);
    var stockOk = validarNumero("stock", 0, null, false);
    var stockCriticoOk = validarNumero("stock-critico", 0, null, true);
    var categoriaOk = validarSelect("categoria", "una categoría");

    var todoValido = codigoOk && nombreOk && precioOk && stockOk && stockCriticoOk && categoriaOk;

    if (todoValido === false) {
      return;
    }

    var stockCriticoValor = document.getElementById("stock-critico").value;

    var productoNuevo = {
      id: document.getElementById("codigo").value.trim().toUpperCase(),
      nombre: document.getElementById("prod-nombre").value.trim(),
      categoria: document.getElementById("categoria").value,
      precio: Number(document.getElementById("precio").value),
      stock: parseInt(document.getElementById("stock").value),
      stockCritico: stockCriticoValor === "" ? 0 : parseInt(stockCriticoValor),
      descripcion: document.getElementById("descripcion").value.trim(),
    };

    var productos = obtenerProductosAdmin();

    if (estaEditando) {
      productos[posicion] = productoNuevo;
    } else {
      productos.push(productoNuevo);
    }

    guardarProductosAdmin(productos);
    window.location.href = "productos.html";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  mostrarResumenAdmin();
  mostrarListadoUsuarios();
  mostrarListadoProductosAdmin();
  inicializarFormularioUsuario();
  inicializarFormularioProducto();
});
