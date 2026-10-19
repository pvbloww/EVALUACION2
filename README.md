# Veterinaria San Marcos

Aplicación académica de una veterinaria, hecha con React, Vite, React-Bootstrap y CSS sencillo.

## Iniciar el proyecto

Instala Node.js LTS. Abre una terminal en la carpeta del proyecto y ejecuta:

```sh
npm install
npm run dev
```

Abre la dirección local que muestra Vite. Para revisar una versión de producción:

```sh
npm run build
npm run preview
```

## Funciones disponibles

- Inicio, Nosotros, catálogo, detalle de productos, Ofertas, Blogs, detalle de artículos, Contacto, Login y Registro.
- Búsqueda y filtro de productos por categoría.
- Carrito con cantidades, eliminación, persistencia local y cálculo de subtotal.
- Formulario de pedido demostrativo con retiro o despacho y pantallas de resultado exitoso y fallido.
- Administración de catálogo con alta, edición y eliminación.
- Imágenes locales, colores verdes y acento naranjo; vista adaptable a móvil y escritorio.
- Validaciones nativas del navegador para campos obligatorios, correo, largo y tipo de dato.
- Pruebas unitarias básicas del carrito y los descuentos de oferta (6 casos).
- Mensajes de validación sencillos debajo de los campos de los formularios.

## Validaciones para explicar

Todos los formularios usan reglas sencillas: campos obligatorios, formato de correo y límites básicos de largo o número. Los errores aparecen debajo del campo y no como avisos flotantes del navegador. Registro no pide confirmar la contraseña ni restringe el dominio del correo. Administración conserva la comprobación de código duplicado para mantener identificadores únicos.

## Stickers de la portada

Los tres íconos de “¿Por qué elegirnos?” son emojis escritos como el atributo texto en src/pages/Home.jsx. src/components/Imagen.jsx los muestra cuando no recibe una ruta src. El círculo y el fondo claro rayado están definidos por las clases imagen-pendiente e imagen-contenido en src/components/Imagen.css y por .v-card-centro en src/styles/Contenido.css.

## Administración de demostración

Entra en /admin con el usuario admin y la clave admin123. El inicio de sesión y la gestión de catálogo son locales al navegador. No son autenticación segura ni usan roles de servidor. Los productos administrados y el carrito se guardan en localStorage; la sesión administrativa usa sessionStorage.

La compra, el despacho, los formularios de Login, Registro, Contacto y newsletter son demostraciones: no cobran, no envían correos, no crean cuentas y no persisten información personal. El mapa de contacto es un iframe de OpenStreetMap.

La vista Ofertas muestra tres productos con un 15% de descuento calculado en `src/data/ofertas.js`. En el carrito se conserva ese precio si el producto se agrega desde la oferta o su detalle. La compra exitosa muestra un resumen temporal del pedido y vacía el carrito. El botón «Mostrar resultado fallido» permite revisar la pantalla alternativa y conserva el carrito. Ninguno de los dos resultados representa un pago real.

## Ejecutar pruebas

```sh
npm run test:run
npm run lint
```

## Estructura

- src/pages: páginas y vistas.
- src/components: menú, pie, campos, imágenes y tarjeta de producto reutilizables.
- src/context/StoreContext.jsx: catálogo y carrito compartidos entre páginas.
- src/data: productos, artículos, imágenes, regiones y reglas del carrito.
- src/hooks/useFormulario.js: estado y envío sencillo de los formularios.
- src/styles: reglas CSS compartidas.
- public/imagenes: recursos visuales incluidos.

## Alcance académico

La aplicación cubre una SPA React, componentes reutilizables, catálogo, carrito/pedido simulado, administración local y pruebas unitarias básicas. No incluye backend Spring Boot, API, autenticación real ni control de roles del servidor. El mapa es de ubicación y no agenda horas; tampoco existe flujo de citas. La cobertura porcentual de código no está configurada en esta entrega.
