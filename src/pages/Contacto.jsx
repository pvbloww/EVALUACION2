import Campo from '../components/Campo.jsx'
import useFormulario from '../hooks/useFormulario.js'
import '../styles/Formularios.css'
import './Contacto.css'

export default function Contacto() {
  const { validado, enviar, campo } = useFormulario({
    nombre: '',
    correo: '',
    comentario: '',
  })

  return (
    <div className="v-pagina">
      <section className="form-tarjeta" aria-label="Formulario de contacto">
        <h1>Formulario de contacto</h1>
        <p className="form-ayuda">¿Tienes dudas sobre nuestros servicios? Escríbenos.</p>
        {validado && (
          <p className="form-aviso" role="status">
            Mensaje validado en modo demostración. No se envió ningún correo.
          </p>
        )}
        <form noValidate onSubmit={enviar}>
          {/* El nombre, el correo y el comentario son obligatorios. */}
          <Campo
            {...campo('nombre')}
            etiqueta="Nombre completo"
            maxLength={100}
            required
            autoComplete="name"
          />
          {/* El correo debe usar uno de los tres dominios permitidos. */}
          <Campo
            {...campo('correo')}
            etiqueta="Correo electrónico"
            tipo="email"
            maxLength={100}
            required
            autoComplete="email"
            ayuda="Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com."
          />
          {/* El comentario es obligatorio y tiene un máximo de 500 caracteres. */}
          <Campo
            {...campo('comentario')}
            etiqueta="Comentario"
            tipo="textarea"
            rows={4}
            maxLength={500}
            required
            ayuda="Máximo 500 caracteres."
          />
          <button className="v-boton form-boton" type="submit">
            Enviar mensaje
          </button>
        </form>
      </section>
      <section className="v-seccion" aria-label="Ubicación de la clínica">
        <div className="v-titulo">
          <h2>Encuéntranos</h2>
          <p>Rancagua, Región del Libertador General Bernardo O'Higgins.</p>
        </div>
        <div className="contacto-mapa">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-70.7600%2C-34.1900%2C-70.6900%2C-34.1500&layer=mapnik&marker=-34.1708%2C-70.7444"
            title="Mapa de ubicación de Veterinaria San Marcos en Rancagua"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  )
}
