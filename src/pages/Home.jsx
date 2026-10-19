import { Link } from 'react-router-dom'
import Imagen from '../components/Imagen.jsx'
import ProductoCard from '../components/ProductoCard.jsx'
import { imagenes } from '../data/imagenes.js'
import { useStore } from '../hooks/useStore.js'
import './Productos.css'
import './Home.css'

export default function Home() {
  const { productos } = useStore()

  return (
    <div className="v-pagina">
      <section className="home-hero">
        <div>
          <h1>Cuidamos a tu mascota como parte de tu familia</h1>
          <p>
            En Veterinaria San Marcos ofrecemos consultas, vacunación, cirugías
            y una tienda con productos veterinarios de calidad para perros,
            gatos y otras mascotas. Agenda tu hora o compra en línea de forma
            simple.
          </p>
          <Link className="v-boton" to="/productos">
            Ver productos
          </Link>
        </div>
        <Imagen
          src={imagenes.inicio}
          alt="Clínica Veterinaria San Marcos"
          texto="Imagen de la clínica veterinaria"
          style={{ aspectRatio: '16 / 10' }}
        />
      </section>

      <section className="v-seccion" aria-labelledby="destacados-titulo">
        <div className="v-titulo">
          <h2 id="destacados-titulo">Productos destacados</h2>
          <p>
            Una muestra de nuestro catálogo de vacunas, medicamentos y
            servicios.
          </p>
        </div>
        <div className="productos-grid">
          {productos.slice(0, 4).map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </div>
        <p className="v-centrado mt-4">
          <Link className="v-boton v-boton-secundario" to="/productos">
            Ver todo el catálogo
          </Link>
        </p>
      </section>

      <section className="v-seccion" aria-labelledby="beneficios-titulo">
        <div className="v-titulo">
          <h2 id="beneficios-titulo">¿Por qué elegirnos?</h2>
        </div>
        <div className="v-grid">
          {/* Estos stickers son emojis; Imagen los centra si no recibe src. */}
          <article className="v-card v-card-centro">
            <Imagen alt="Equipo profesional" texto="🩺" />
            <h3>Equipo profesional</h3>
            <p>3 médicos veterinarios y personal técnico capacitado.</p>
          </article>
          <article className="v-card v-card-centro">
            <Imagen alt="Vacunación" texto="💉" />
            <h3>Vacunación al día</h3>
            <p>Control de vacunas y recordatorios para tu mascota.</p>
          </article>
          <article className="v-card v-card-centro">
            <Imagen alt="Tienda online" texto="🛍️" />
            <h3>Tienda online</h3>
            <p>Compra medicamentos y accesorios sin salir de casa.</p>
          </article>
        </div>
      </section>
    </div>
  )
}
