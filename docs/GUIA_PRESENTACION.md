# Guía rápida para presentar el proyecto

Las pantallas están escritas como componentes React en archivos JSX. El archivo
index.html solo tiene el elemento root donde React dibuja la aplicación.
Para encontrar una parte en el editor, busca el nombre del componente o la
palabra destacada en cada fila.

| Si preguntan por… | Abre este archivo | Busca… |
| --- | --- | --- |
| Cómo se conectan las páginas | src/App.jsx | BrowserRouter y Routes |
| Menú y número del carrito | src/components/Menu.jsx | Menu y cantidad |
| Portada y productos destacados | src/pages/Home.jsx | Home |
| Stickers de la portada | src/pages/Home.jsx | 🩺, 💉 y 🛍️ |
| Cómo aparece un sticker sin archivo de imagen | src/components/Imagen.jsx | texto y la condición que revisa src |
| Círculo claro y rayado del sticker | src/components/Imagen.css y src/styles/Contenido.css | imagen-pendiente y v-card-centro |
| Colores principales | src/index.css | --verde, --verde-oscuro y --naranjo |
| Imágenes que se muestran en el sitio | src/data/imagenes.js | inicio, productos y blogs |
| Archivos de imagen | public/imagenes | nombres de los archivos PNG |
| Productos, precio y stock | src/data/productos.js | productos |
| Tarjeta reutilizable del catálogo | src/components/ProductoCard.jsx | ProductoCard |
| Carrito que comparten las páginas | src/context/StoreContext.jsx | StoreProvider |
| Cómo se suma o cambia una cantidad | src/data/carrito.js | agregarArticulo y cambiarCantidadArticulo |
| Vista del carrito y formulario del pedido | src/pages/Carrito.jsx | Carrito y confirmarPedido |
| Blog y artículo | src/pages/Blogs.jsx y src/pages/DetalleBlog.jsx | Blogs y DetalleBlog |
| Formulario de contacto | src/pages/Contacto.jsx | Formulario de contacto |
| Validación simple de Administración | src/pages/Admin.jsx | required, min y max |
| Administración del catálogo | src/pages/Admin.jsx | guardarProducto, editarProducto y eliminarProducto |
| Estilo general de contenido | src/styles/Contenido.css | v-pagina y v-boton |
| Estilo de formularios | src/styles/Formularios.css | form-campo y form-error |
| Pruebas del carrito | tests/carrito.test.js | carrito de compras |

## Cómo explicar las validaciones

1. En cada formulario, propiedades como required, type=email, minLength,
   maxLength y min se escriben directamente en el control.
2. src/components/Campo.jsx reutiliza esos controles y pasa las propiedades
   al input, select o textarea.
3. El navegador revisa los valores y muestra sus avisos sin una función
   personalizada de validación.
4. src/hooks/useFormulario.js guarda los valores y muestra el aviso de éxito
   cuando el formulario pasa la revisión HTML.

Si aparece el aviso “Completa este campo”, puedes explicar: “El input tiene
required. El navegador detecta que está vacío y muestra el mensaje antes de
enviar el formulario; no escribí una función especial para ese aviso.”

Todos los formularios usan el mismo enfoque sencillo. Login, Registro y
Contacto son demostrativos: no crean cuentas, no inician sesión y no envían
mensajes. Administración también evita guardar un código de producto repetido.

## Cómo explicar los stickers

Los tres dibujos de “¿Por qué elegirnos?” no son imágenes descargadas. Son los
caracteres emoji 🩺, 💉 y 🛍️ escritos como propiedad texto en src/pages/Home.jsx.
El componente src/components/Imagen.jsx ve que no hay una ruta de imagen y
devuelve un div decorativo con el emoji. Las reglas de
src/components/Imagen.css dibujan el fondo claro rayado, y
src/styles/Contenido.css lo hace circular y centra el contenido.
