import { Link, useParams } from 'react-router-dom'
import Imagen from '../components/Imagen.jsx'
import { blogs } from '../data/blogs.js'
import { imagenes } from '../data/imagenes.js'
import './Blogs.css'

export default function DetalleBlog() {
  const { id } = useParams()
  const blog = blogs.find((item) => item.id === id)

  if (!blog) {
    return <section className="v-pagina v-centrado"><h1>Artículo no encontrado</h1><Link className="v-boton" to="/blogs">Volver a Blogs</Link></section>
  }

  return (
    <div className="v-pagina">
      <nav className="v-migas" aria-label="Ruta de navegación"><Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/blogs">Blogs</Link><span aria-hidden="true">/</span><span aria-current="page">Caso curioso #{blog.id}</span></nav>
      <article className="blog-articulo">
        <Imagen src={imagenes.blogs[blog.id]} alt={blog.imagenTexto} />
        <h1>{blog.titulo}</h1><p>{blog.introduccion}</p>
        <h2>{blog.subtitulo}</h2><ul>{blog.puntos.map((punto) => <li key={punto}>{punto}</li>)}</ul>
        <p>{blog.cierre}</p><Link className="v-boton" to={blog.destino}>{blog.enlace}</Link>
        <p className="mt-4"><Link className="v-enlace" to="/blogs">Volver a Blogs</Link></p>
      </article>
    </div>
  )
}
