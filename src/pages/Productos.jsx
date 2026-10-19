import { useState } from 'react'
import ProductoCard from '../components/ProductoCard.jsx'
import { useStore } from '../hooks/useStore.js'
import './Productos.css'

export default function Productos() {
  const { productos } = useStore()
  const [categoria, setCategoria] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')
  const categorias = ['Todos', ...new Set(productos.map((producto) => producto.categoria))]
  const porCategoria = categoria === 'Todos'
    ? productos
    : productos.filter((producto) => producto.categoria === categoria)
  const productosFiltrados = porCategoria.filter((producto) => (producto.nombre + ' ' + producto.descripcion).toLocaleLowerCase('es').includes(busqueda.toLocaleLowerCase('es')))

  return (
    <div className="productos-pagina">
      <header className="productos-titulo">
        <h1>Productos</h1>
        <p>Vacunas, medicamentos, antiparasitarios y servicios para el cuidado de tu mascota.</p>
      </header>

      <section className="productos-filtros" aria-label="Filtro de categorías">
        {categorias.map((nombre) => (
          <button
            key={nombre}
            type="button"
            className={categoria === nombre ? 'activo' : ''}
            aria-pressed={categoria === nombre}
            onClick={() => setCategoria(nombre)}
          >
            {nombre}
          </button>
        ))}
      </section>

      <label className="catalogo-busqueda">Buscar producto
        <input type="search" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Nombre o descripción" />
      </label>

      <section className="productos-grid" aria-label="Listado de productos">
        {productosFiltrados.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </section>
    </div>
  )
}
