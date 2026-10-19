import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../hooks/useStore.js'
import { formatearPrecio } from '../data/productos.js'
import { correoValido } from '../utils/correo.js'
import { imagenes } from '../data/imagenes.js'
import Imagen from '../components/Imagen.jsx'
import './Carrito.css'

export default function Carrito() {
  const navigate = useNavigate()
  const { carrito, cambiarCantidad, quitar, vaciar, subtotal } = useStore()
  const [entrega, setEntrega] = useState('retiro')
  const [cliente, setCliente] = useState({
    nombre: '',
    correo: '',
    direccion: '',
  })
  const [intentoPedido, setIntentoPedido] = useState(false)
  const costoDespacho = entrega === 'despacho' ? 2990 : 0

  function cambiarDato(evento) {
    const { name, value } = evento.target
    setCliente({ ...cliente, [name]: value })
  }

  function confirmarPedido(evento) {
    evento.preventDefault()
    setIntentoPedido(true)
    // Revisa nombre, correo y dirección sin disparar avisos del navegador.
    const camposValidos = Array.from(evento.currentTarget.elements).every(
      (elemento) => elemento.validity.valid,
    )
    // El pedido usa el mismo dominio permitido que los otros formularios.
    const correoAceptado = correoValido(cliente.correo)
    if (!camposValidos || !correoAceptado) return

    const totalPedido = subtotal + costoDespacho
    vaciar()
    navigate('/compra/exitosa', {
      state: {
        nombre: cliente.nombre,
        correo: cliente.correo,
        entrega,
        total: totalPedido,
      },
    })
  }

  if (carrito.length === 0) {
    return (
      <div className="v-pagina">
        <h1>Mi carrito de compras</h1>
        <section className="carrito-vacio" aria-label="Carrito vacío">
          <span className="carrito-icono" aria-hidden="true">🛒</span>
          <p>Tu carrito está vacío.</p>
          <Link className="v-boton" to="/productos">
            Ir a productos
          </Link>
        </section>
      </div>
    )
  }

  return (
    <div className="v-pagina">
      <h1>Mi carrito de compras</h1>
      <div className="carrito-layout">
        <section className="carrito-lista" aria-label="Productos en el carrito">
          {carrito.map((item) => (
            <article className="carrito-item" key={item.id}>
              <Imagen
                src={item.imagen || imagenes.productos[item.id]}
                alt={item.nombre}
                className="carrito-imagen"
              />
              <div className="carrito-detalle">
                <h2>{item.nombre}</h2>
                <p>{formatearPrecio(item.precio)} cada uno</p>
                <label>
                  Cantidad
                  {/* min y max limitan la cantidad al stock disponible. */}
                  <input
                    type="number"
                    min="1"
                    max={item.stock}
                    value={item.cantidad}
                    onChange={(evento) =>
                      cambiarCantidad(
                        item.id,
                        Math.min(item.stock, evento.target.value),
                      )
                    }
                  />
                </label>
                <strong>
                  {formatearPrecio(item.precio * item.cantidad)}
                </strong>
              </div>
              <button
                type="button"
                className="v-boton v-boton-secundario"
                onClick={() => quitar(item.id)}
              >
                Quitar
              </button>
            </article>
          ))}
          <button
            type="button"
            className="v-enlace carrito-vaciar"
            onClick={vaciar}
          >
            Vaciar carrito
          </button>
        </section>

        <form className="carrito-resumen" noValidate onSubmit={confirmarPedido}>
          <h2>Datos del pedido</h2>
          <label>
            Nombre completo
            {/* El nombre es obligatorio para identificar el pedido. */}
            <input
              required
              name="nombre"
              maxLength="100"
              value={cliente.nombre}
              onChange={cambiarDato}
            />
            {intentoPedido && !cliente.nombre && (
              <small className="form-error">Este campo es obligatorio.</small>
            )}
          </label>
          <label>
            Correo electrónico
            {/* El correo es obligatorio y usa los dominios permitidos comunes. */}
            <input
              required
              name="correo"
              type="email"
              maxLength="100"
              value={cliente.correo}
              onChange={cambiarDato}
            />
            {intentoPedido && !cliente.correo && (
              <small className="form-error">Este campo es obligatorio.</small>
            )}
            {intentoPedido && cliente.correo && !correoValido(cliente.correo) && (
              <small className="form-error">Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.</small>
            )}
          </label>
          <label>
            Forma de entrega
            <select
              value={entrega}
              onChange={(evento) => setEntrega(evento.target.value)}
            >
              <option value="retiro">Retiro en tienda (gratis)</option>
              <option value="despacho">Despacho ($2.990)</option>
            </select>
          </label>
          {entrega === 'despacho' && (
            <label>
              Dirección
              {/* La dirección solo es obligatoria si se elige despacho. */}
              <input
                required
                name="direccion"
                maxLength="200"
                value={cliente.direccion}
                onChange={cambiarDato}
              />
              {intentoPedido && !cliente.direccion && (
                <small className="form-error">Este campo es obligatorio.</small>
              )}
            </label>
          )}

          <div className="resumen-fila">
            <span>Subtotal</span>
            <strong>{formatearPrecio(subtotal)}</strong>
          </div>
          <div className="resumen-fila">
            <span>Entrega</span>
            <strong>{formatearPrecio(costoDespacho)}</strong>
          </div>
          <div className="resumen-fila resumen-total">
            <span>Total</span>
            <strong>{formatearPrecio(subtotal + costoDespacho)}</strong>
          </div>
          <button className="v-boton" type="submit">
            Confirmar pedido de demostración
          </button>
          <button
            className="v-boton v-boton-secundario"
            type="button"
            onClick={() => navigate('/compra/fallida')}
          >
            Mostrar resultado fallido
          </button>
          <p className="form-ayuda">El pago y la compra son simulados.</p>
        </form>
      </div>
    </div>
  )
}
