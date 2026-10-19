import { Link } from 'react-router-dom'
import Campo from '../components/Campo.jsx'
import Imagen from '../components/Imagen.jsx'
import { imagenes } from '../data/imagenes.js'
import useFormulario from '../hooks/useFormulario.js'
import '../styles/Formularios.css'

export default function Login() {
  const { validado, enviar, campo } = useFormulario({
    correo: '',
    contrasena: '',
  })

  return (
    <div className="v-pagina">
      <section className="form-tarjeta" aria-label="Formulario de inicio de sesión">
        <Imagen src={imagenes.logo} alt="Veterinaria revisando a un perro y un gato" style={{ aspectRatio: '2 / 1' }} />
        <h1>Iniciar sesión</h1>
        {validado && (
          <p className="form-aviso" role="status">
            Formato de datos validado. Esta demostración no inicia una sesión
            real.
          </p>
        )}
        <form noValidate onSubmit={enviar}>
          {/* Ambos son obligatorios y el correo debe usar un dominio permitido. */}
          <Campo
            {...campo('correo')}
            etiqueta="Correo electrónico"
            tipo="email"
            maxLength={100}
            required
            autoComplete="email"
            ayuda="Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com."
          />
          {/* La contraseña es obligatoria y admite entre 4 y 10 caracteres. */}
          <Campo
            {...campo('contrasena')}
            etiqueta="Contraseña"
            tipo="password"
            minLength={4}
            maxLength={10}
            required
            autoComplete="current-password"
            ayuda="Entre 4 y 10 caracteres."
          />
          <button className="v-boton form-boton" type="submit">
            Iniciar sesión
          </button>
        </form>
        <p className="form-pie">
          ¿No tienes cuenta?{' '}
          <Link className="v-enlace" to="/registro">
            Regístrate aquí
          </Link>
        </p>
      </section>
    </div>
  )
}
