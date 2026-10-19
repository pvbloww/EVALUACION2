import { Link } from 'react-router-dom'
import Imagen from '../components/Imagen.jsx'
import { blogs } from '../data/blogs.js'
import { imagenes } from '../data/imagenes.js'
import './Blogs.css'

export default function Blogs() {
  return (
    <div className="v-pagina">
      <header className="v-titulo"><h1>Noticias importantes</h1><p>Datos curiosos y consejos para el cuidado de tu mascota.</p></header>
      <div className="blogs-grid">
        {blogs.map((blog) => (
          <article key={blog.id} className="v-card">
            <Imagen src={imagenes.blogs[blog.id]} alt={blog.imagenTexto} texto={`Caso curioso #${blog.id}`} />
            <div className="v-card-info">
              <h2>{blog.titulo}</h2><p>{blog.resumen}</p>
              <Link className="v-boton v-boton-secundario" to={`/blogs/${blog.id}`} aria-label={`Ver caso: ${blog.titulo}`}>Ver caso</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
