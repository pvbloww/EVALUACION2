import ProductoCard from '../components/ProductoCard.jsx'
import { useStore } from '../hooks/useStore.js'
import { obtenerOferta } from '../data/ofertas.js'
import './Productos.css'

export default function Ofertas() {
  const { productos } = useStore()

  // Calcula el precio rebajado y conserva el precio original para mostrarlo.
  const productosEnOferta = productos
    .map(obtenerOferta)
    .filter(Boolean)

  return (
    <div className="productos-pagina">
      <header className="productos-titulo">
        <h1>Ofertas</h1>
        <p>Encuentra productos seleccionados con un 15% de descuento.</p>
      </header>

      {productosEnOferta.length > 0 ? (
        <section className="productos-grid" aria-label="Productos en oferta">
          {productosEnOferta.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </section>
      ) : (
        <p>Por ahora no hay productos en oferta.</p>
      )}
    </div>
  )
}
