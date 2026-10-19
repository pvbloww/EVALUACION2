import { Link } from 'react-router-dom'
import { formatearPrecio } from '../data/productos.js'
import { imagenes } from '../data/imagenes.js'
import Imagen from './Imagen.jsx'
import './ProductoCard.css'
import { useStore } from '../hooks/useStore.js'
import { obtenerOferta } from '../data/ofertas.js'

export default function ProductoCard({ producto }) {
  const { agregar } = useStore()
  const productoOferta = obtenerOferta(producto)
  const productoMostrado = productoOferta ?? producto

  return (
    <article className="producto-card">
      <Imagen src={producto.imagen || imagenes.productos[producto.id]} alt={producto.nombre} className="producto-imagen" />
      <div className="producto-card-info">
        <span className="producto-categoria">{producto.categoria}</span>
        {productoOferta && <span className="producto-etiqueta-oferta">OFERTA 15%</span>}
        <h3>{producto.nombre}</h3>
        <p className="producto-precio">
          {productoMostrado.precioOriginal && (
            <span className="producto-precio-anterior">
              Antes: {formatearPrecio(productoMostrado.precioOriginal)} ·{' '}
            </span>
          )}
          {formatearPrecio(productoMostrado.precio)}
        </p>
        <div className="producto-card-acciones">
          <Link
            to={`/productos/${producto.id}`}
            className="producto-boton producto-boton-secundario"
            aria-label={`Ver detalle de ${producto.nombre}`}
          >
            Ver detalle
          </Link>
          <button
            type="button"
            className="producto-boton producto-boton-primario"
            onClick={() => agregar(productoMostrado)}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </article>
  )
}
