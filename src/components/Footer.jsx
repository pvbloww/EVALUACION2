import { useState } from 'react'
import { Link } from 'react-router-dom'
import { correoValido } from '../utils/correo.js'
import './Footer.css'

export default function Footer() {
  const [validado, setValidado] = useState(false)
  const [correo, setCorreo] = useState('')
  const [errorCorreo, setErrorCorreo] = useState('')

  function enviar(evento) {
    evento.preventDefault()
    // Primero revisa que el correo no esté vacío.
    if (!correo.trim()) {
      setErrorCorreo('Este campo es obligatorio.')
      return
    }
    // Aplica la misma regla de dominios que en Registro y el pedido.
    if (!correoValido(correo)) {
      setErrorCorreo('Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.')
      return
    }

    setErrorCorreo('')
    setValidado(true)
    setCorreo('')
  }

  return (
    <footer className="footer-sitio">
      <div className="container footer-contenido">
        <div><h2>Veterinaria San Marcos</h2><p>Rancagua, Región del Libertador Gral. Bernardo O'Higgins.</p></div>
        <nav aria-label="Enlaces del pie de página"><h2>Enlaces</h2><ul><li><Link to="/">Home</Link></li><li><Link to="/productos">Productos</Link></li><li><Link to="/nosotros">Nosotros</Link></li><li><Link to="/contacto">Contacto</Link></li></ul></nav>
        <div>
          <h2>Newsletter</h2>
          <form className="footer-newsletter" noValidate onSubmit={enviar}>
            <label className="visually-hidden" htmlFor="newsletter-correo">Correo electrónico</label>
            <input type="email" id="newsletter-correo" name="correo" placeholder="Tu correo" autoComplete="email" maxLength={100} value={correo} onChange={(evento) => { setCorreo(evento.target.value); setErrorCorreo(''); setValidado(false) }} />
            {errorCorreo && <small className="form-error">{errorCorreo}</small>}
            <button type="submit">Unirme</button>
          </form>
          {validado && <p className="footer-aviso" role="status">Correo validado. Suscripción de demostración; no se guardaron datos.</p>}
        </div>
      </div>
      <div className="footer-final">© {new Date().getFullYear()} Veterinaria San Marcos. Proyecto académico DSY1104.</div>
    </footer>
  )
}
