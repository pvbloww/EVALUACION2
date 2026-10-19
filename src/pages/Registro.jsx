import { Link } from 'react-router-dom'
import Campo from '../components/Campo.jsx'
import useFormulario from '../hooks/useFormulario.js'
import { regionesYComunas } from '../data/regiones.js'
import '../styles/Formularios.css'

const iniciales = {
  run: '',
  nombre: '',
  apellidos: '',
  correo: '',
  contrasena: '',
  telefono: '',
  fechaNacimiento: '',
  region: '',
  comuna: '',
  direccion: '',
}

export default function Registro() {
  const { valores, validado, enviar, campo } = useFormulario(iniciales)
  const comunas = regionesYComunas[valores.region] || []

  return (
    <div className="v-pagina">
      <section
        className="form-tarjeta form-tarjeta-ancha"
        aria-label="Formulario de registro"
      >
        <h1>Registro de usuario</h1>
        <p className="form-ayuda">
          Crea tu cuenta para agendar horas y comprar en nuestra tienda online.
        </p>
        {validado && (
          <p className="form-aviso" role="status">
            Formulario revisado en modo demostración. No se creó una cuenta ni
            se guardaron datos.
          </p>
        )}

        <form noValidate onSubmit={enviar}>
          {/* RUN: se pide y se limita a entre 7 y 9 caracteres. */}
          <Campo
            {...campo('run')}
            etiqueta="RUN"
            minLength={7}
            maxLength={9}
            required
            placeholder="Ej: 19011022K"
            autoComplete="off"
            ayuda="Escribe entre 7 y 9 caracteres."
          />

          {/* Nombre y apellidos son obligatorios y tienen largo máximo. */}
          <div className="form-fila">
            <Campo
              {...campo('nombre')}
              etiqueta="Nombre completo"
              maxLength={50}
              required
              autoComplete="given-name"
            />
            <Campo
              {...campo('apellidos')}
              etiqueta="Apellidos"
              maxLength={100}
              required
              autoComplete="family-name"
            />
          </div>

          {/* El correo es obligatorio y debe tener formato de correo. */}
          <Campo
            {...campo('correo')}
            etiqueta="Correo electrónico"
            tipo="email"
            maxLength={100}
            required
            autoComplete="email"
            ayuda="Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com."
          />

          {/* La contraseña obligatoria acepta entre 4 y 10 caracteres. */}
          <div className="form-fila">
            <Campo
              {...campo('contrasena')}
              etiqueta="Contraseña"
              tipo="password"
              minLength={4}
              maxLength={10}
              required
              autoComplete="new-password"
              ayuda="Entre 4 y 10 caracteres."
            />
          </div>

          {/* Teléfono y fecha son opcionales; no tienen reglas extra. */}
          <div className="form-fila">
            <Campo
              {...campo('telefono')}
              etiqueta="Teléfono (opcional)"
              tipo="tel"
              placeholder="+56 9 1234 5678"
              autoComplete="tel"
            />
            <Campo
              {...campo('fechaNacimiento')}
              etiqueta="Fecha de nacimiento (opcional)"
              tipo="date"
              autoComplete="bday"
            />
          </div>

          {/* Región y comuna deben seleccionarse para completar la dirección. */}
          <div className="form-fila">
            <Campo
              {...campo('region')}
              etiqueta="Región"
              tipo="select"
              required
              autoComplete="address-level1"
            >
              <option value="">-- Seleccione la región --</option>
              {Object.keys(regionesYComunas).map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </Campo>
            <Campo
              {...campo('comuna')}
              etiqueta="Comuna"
              tipo="select"
              required
              disabled={!valores.region}
              autoComplete="address-level2"
            >
              <option value="">-- Seleccione la comuna --</option>
              {comunas.map((comuna) => (
                <option key={comuna} value={comuna}>
                  {comuna}
                </option>
              ))}
            </Campo>
          </div>

          {/* La dirección es obligatoria y tiene un máximo de caracteres. */}
          <Campo
            {...campo('direccion')}
            etiqueta="Dirección"
            maxLength={300}
            required
            autoComplete="street-address"
          />

          <button className="v-boton form-boton" type="submit">
            Registrar
          </button>
        </form>

        <p className="form-pie">
          ¿Ya tienes cuenta?{' '}
          <Link className="v-enlace" to="/login">
            Inicia sesión
          </Link>
        </p>
      </section>
    </div>
  )
}
