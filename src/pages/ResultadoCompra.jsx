import { Link, useLocation } from 'react-router-dom'
import { formatearPrecio } from '../data/productos.js'
import './ResultadoCompra.css'

export default function ResultadoCompra({ resultado }) {
  const { state } = useLocation()
  const compraExitosa = resultado === 'exitosa'

  return (
    <section className="v-pagina compra-resultado">
      <div className="compra-resultado-icono" aria-hidden="true">
        {compraExitosa ? '✓' : '×'}
      </div>
      <h1>{compraExitosa ? '¡Pedido confirmado!' : 'No se pudo confirmar el pedido'}</h1>
      <p role="status">
        {compraExitosa
          ? 'La demostración terminó correctamente. No se realizó un pago ni se envió un pedido real.'
          : 'Esta es una pantalla de demostración. El carrito sigue guardado para que puedas intentarlo nuevamente.'}
      </p>
      {compraExitosa && state && (
        <dl className="compra-resultado-resumen">
          <div><dt>Cliente</dt><dd>{state.nombre}</dd></div>
          <div><dt>Correo</dt><dd>{state.correo}</dd></div>
          <div><dt>Entrega</dt><dd>{state.entrega === 'retiro' ? 'Retiro en tienda' : 'Despacho'}</dd></div>
          <div><dt>Total del pedido</dt><dd>{formatearPrecio(state.total)}</dd></div>
        </dl>
      )}
      <div className="compra-resultado-acciones">
        {compraExitosa ? (
          <Link className="v-boton" to="/">Volver al inicio</Link>
        ) : (
          <>
            <Link className="v-boton" to="/carrito">Volver al carrito</Link>
            <Link className="v-boton v-boton-secundario" to="/productos">Seguir comprando</Link>
          </>
        )}
      </div>
    </section>
  )
}
