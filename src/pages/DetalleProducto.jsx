import { Link, useParams } from 'react-router-dom'
import ProductoCard from '../components/ProductoCard.jsx'
import { formatearPrecio } from '../data/productos.js'
import { imagenes } from '../data/imagenes.js'
import Imagen from '../components/Imagen.jsx'
import './Productos.css'
import './DetalleProducto.css'
import { useStore } from '../hooks/useStore.js'
import { obtenerOferta } from '../data/ofertas.js'

export default function DetalleProducto() {
  // El id proviene de la ruta /productos/:id.
  const { id } = useParams()
  const { productos: catalogo, agregar } = useStore()
  const producto = catalogo.find((item) => item.id === id)

  if (!producto) {
    return (
      <section className="productos-pagina producto-no-encontrado">
        <h1>Producto no encontrado</h1>
        <p>No hay un producto con el código solicitado.</p>
        <Link to="/productos" className="producto-boton producto-boton-secundario">
          Volver a productos
        </Link>
      </section>
    )
  }

  // Usa el mismo precio de oferta en el catálogo, el detalle y el carrito.
  const productoActual = obtenerOferta(producto) ?? producto

  const relacionados = catalogo
    .filter((item) => item.categoria === producto.categoria && item.id !== producto.id)
    .slice(0, 4)

  return (
    <div className="productos-pagina">
      <nav className="producto-migas" aria-label="Ruta de navegación">
        <Link to="/">Home</Link>
        <span aria-hidden="true"> / </span>
        <Link to="/productos">Productos</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{producto.nombre}</span>
      </nav>

      <section className="detalle-producto" aria-labelledby="nombre-producto">
        <Imagen src={producto.imagen || imagenes.productos[producto.id]} alt={producto.nombre} className="producto-imagen detalle-producto-imagen" />
        <div>
          <span className="producto-categoria">{producto.categoria}</span>
          <h1 id="nombre-producto">{producto.nombre}</h1>
          <p className="detalle-producto-codigo">Código: {producto.id}</p>
          <p className="detalle-producto-precio">
            {productoActual.precioOriginal && (
              <span className="producto-precio-anterior">
                Antes: {formatearPrecio(productoActual.precioOriginal)} ·{' '}
              </span>
            )}
            {formatearPrecio(productoActual.precio)}
          </p>
          <p>{producto.descripcion}</p>
          <p><strong>Stock disponible:</strong> {producto.stock} unidades</p>
          <div className="detalle-producto-acciones">
            <Link to="/productos" className="producto-boton producto-boton-secundario">
              Volver a productos
            </Link>
            <button type="button" className="producto-boton producto-boton-primario" onClick={() => agregar(productoActual)}>
              Añadir al carrito
            </button>
          </div>
        </div>
      </section>

      {relacionados.length > 0 && (
        <section className="productos-relacionados" aria-labelledby="titulo-relacionados">
          <h2 id="titulo-relacionados">Productos relacionados</h2>
          <div className="productos-grid">
            {relacionados.map((item) => (
              <ProductoCard key={item.id} producto={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
