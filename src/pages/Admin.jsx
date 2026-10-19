import { useState } from 'react'
import { useStore } from '../hooks/useStore.js'
import { formatearPrecio } from '../data/productos.js'
import { imagenes } from '../data/imagenes.js'
import Imagen from '../components/Imagen.jsx'
import './Admin.css'

const productoVacio = {
  id: '',
  nombre: '',
  categoria: '',
  imagen: '',
  precio: '',
  stock: '',
  descripcion: '',
}

export default function Admin() {
  const { productos, guardarProductos } = useStore()
  const [autorizado, setAutorizado] = useState(
    () => sessionStorage.getItem('vsm-admin-demo') === 'si',
  )
  const [credenciales, setCredenciales] = useState({
    usuario: '',
    clave: '',
  })
  const [formulario, setFormulario] = useState(productoVacio)
  const [mensaje, setMensaje] = useState('')
  const [mostrarErrores, setMostrarErrores] = useState(false)

  function ingresar(evento) {
    evento.preventDefault()
    setMostrarErrores(true)
    // Revisa usuario y clave sin activar el aviso flotante del navegador.
    const formularioValido = Array.from(evento.currentTarget.elements).every(
      (elemento) => elemento.validity.valid,
    )
    if (!formularioValido) return

    // Solo permite el acceso de demostración con estas credenciales.
    const credencialesCorrectas =
      credenciales.usuario === 'admin' && credenciales.clave === 'admin123'

    if (!credencialesCorrectas) {
      setMensaje('Usuario o contraseña incorrectos.')
      return
    }

    sessionStorage.setItem('vsm-admin-demo', 'si')
    setAutorizado(true)
  }

  function guardarProducto(evento) {
    evento.preventDefault()
    setMostrarErrores(true)
    // required, min y step revisan los datos sin mostrar avisos flotantes.
    const formularioValido = Array.from(evento.currentTarget.elements).every(
      (elemento) => elemento.validity.valid,
    )
    if (!formularioValido) return

    // Evita guardar un código que ya pertenece a otro producto.
    const codigoDuplicado = productos.some(
      (producto) =>
        producto.id === formulario.id &&
        producto.id !== formulario.idOriginal,
    )

    if (codigoDuplicado) {
      setMensaje('Ese código ya está en uso.')
      return
    }

    const { idOriginal, ...campos } = formulario
    const nuevoProducto = {
      ...campos,
      id: formulario.id.trim(),
      categoria: formulario.categoria.trim().toUpperCase(),
      precio: Number(formulario.precio),
      stock: Number(formulario.stock),
      stockCritico: 5,
    }

    const catalogoActualizado = idOriginal
      ? productos.map((producto) =>
          producto.id === idOriginal ? nuevoProducto : producto,
        )
      : [...productos, nuevoProducto]

    guardarProductos(catalogoActualizado)
    setFormulario(productoVacio)
    setMostrarErrores(false)
    setMensaje('Producto guardado en este navegador.')
  }

  function editarProducto(producto) {
    setFormulario({
      ...producto,
      categoria: producto.categoria.toUpperCase(),
      imagen: producto.imagen || '',
      idOriginal: producto.id,
    })
    setMensaje('')
    setMostrarErrores(false)
  }

  function eliminarProducto(id) {
    const confirmar = window.confirm('¿Eliminar este producto del catálogo?')
    if (!confirmar) return

    guardarProductos(productos.filter((producto) => producto.id !== id))
    setMensaje('Producto eliminado del catálogo local.')
  }

  function cerrarSesion() {
    sessionStorage.removeItem('vsm-admin-demo')
    setAutorizado(false)
  }

  if (!autorizado) {
    return (
      <div className="v-pagina">
        <section className="form-tarjeta">
          <h1>Administración</h1>
          <p className="form-ayuda">Acceso académico de demostración.</p>
          <form noValidate onSubmit={ingresar}>
            <label>
              Usuario
              <input
                name="usuario"
                required
                value={credenciales.usuario}
                onChange={(evento) =>
                  setCredenciales({
                    ...credenciales,
                    usuario: evento.target.value,
                  })
                }
              />
              {mostrarErrores && !credenciales.usuario && (
                <small className="form-error">Este campo es obligatorio.</small>
              )}
            </label>
            <label>
              Contraseña
              <input
                name="clave"
                required
                type="password"
                value={credenciales.clave}
                onChange={(evento) =>
                  setCredenciales({
                    ...credenciales,
                    clave: evento.target.value,
                  })
                }
              />
              {mostrarErrores && !credenciales.clave && (
                <small className="form-error">Este campo es obligatorio.</small>
              )}
            </label>
            {mensaje && <p role="alert">{mensaje}</p>}
            <button className="v-boton" type="submit">
              Ingresar
            </button>
          </form>
          <p className="form-ayuda">Usuario: admin · Clave: admin123</p>
        </section>
      </div>
    )
  }

  return (
    <div className="v-pagina admin-pagina">
      <header className="admin-cabecera">
        <div>
          <h1>Administrar productos</h1>
          <p>Los cambios se guardan localmente en este navegador.</p>
        </div>
        <button
          className="v-boton v-boton-secundario"
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </button>
      </header>

      <form className="admin-form" noValidate onSubmit={guardarProducto}>
        <h2>{formulario.idOriginal ? 'Editar producto' : 'Agregar producto'}</h2>
        {/* Cada campo obligatorio muestra su error justo debajo del control. */}
        <div className="admin-campos">
          <label>
            Código
            {/* El código se exige al crear un producto. */}
            <input
              required
              disabled={Boolean(formulario.idOriginal)}
              value={formulario.id}
              onChange={(evento) =>
                setFormulario({
                  ...formulario,
                  id: evento.target.value.toUpperCase(),
                })
              }
            />
            {mostrarErrores && !formulario.id && (
              <small className="form-error">Este campo es obligatorio.</small>
            )}
          </label>
          <label>
            Nombre
            {/* El nombre es obligatorio y tiene un máximo de 100 caracteres. */}
            <input
              required
              maxLength="100"
              value={formulario.nombre}
              onChange={(evento) =>
                setFormulario({ ...formulario, nombre: evento.target.value })
              }
            />
            {mostrarErrores && !formulario.nombre && (
              <small className="form-error">Este campo es obligatorio.</small>
            )}
          </label>
          <label>
            Categoría
            {/* La categoría se convierte a mayúsculas al escribirla. */}
            <input
              required
              value={formulario.categoria}
              onChange={(evento) =>
                setFormulario({
                  ...formulario,
                  categoria: evento.target.value.toUpperCase(),
                })
              }
            />
            <small className="form-ayuda">
              La categoría se guardará en mayúsculas.
            </small>
            {mostrarErrores && !formulario.categoria && (
              <small className="form-error">Este campo es obligatorio.</small>
            )}
          </label>
          <label>
            Precio (CLP)
            {/* El precio debe ser un número entero mayor que cero. */}
            <input
              required
              type="number"
              step="1"
              min="1"
              value={formulario.precio}
              onChange={(evento) =>
                setFormulario({ ...formulario, precio: evento.target.value })
              }
            />
            {mostrarErrores && (!formulario.precio || Number(formulario.precio) < 1 || !Number.isInteger(Number(formulario.precio))) && (
              <small className="form-error">Escribe un precio mayor que 0.</small>
            )}
          </label>
          <label>
            Stock
            {/* El stock debe ser un número entero desde cero. */}
            <input
              required
              type="number"
              step="1"
              min="0"
              value={formulario.stock}
              onChange={(evento) =>
                setFormulario({ ...formulario, stock: evento.target.value })
              }
            />
            {mostrarErrores && (!formulario.stock || Number(formulario.stock) < 0 || !Number.isInteger(Number(formulario.stock))) && (
              <small className="form-error">Escribe un stock válido.</small>
            )}
          </label>
          <label className="admin-descripcion">
            Descripción
            {/* La descripción es obligatoria y permite hasta 300 caracteres. */}
            <textarea
              required
              maxLength="300"
              value={formulario.descripcion}
              onChange={(evento) =>
                setFormulario({
                  ...formulario,
                  descripcion: evento.target.value,
                })
              }
            />
            {mostrarErrores && !formulario.descripcion && (
              <small className="form-error">Este campo es obligatorio.</small>
            )}
          </label>
          <div className="admin-imagen-campo">
            <label htmlFor="imagen-producto">Dirección de la imagen (opcional)</label>
            {/* La dirección puede ser una ruta local o un enlace a una imagen. */}
            <input
              id="imagen-producto"
              type="text"
              maxLength="500"
              placeholder="/imagenes/producto.png"
              value={formulario.imagen}
              onChange={(evento) =>
                setFormulario({ ...formulario, imagen: evento.target.value })
              }
            />
            <small className="form-ayuda">
              Escribe una ruta como /imagenes/producto.png o un enlace https://.
            </small>
            {formulario.imagen && (
              <div className="admin-imagen-previa">
                <img src={formulario.imagen} alt="Vista previa del producto" />
                <button
                  className="v-boton v-boton-secundario"
                  type="button"
                  onClick={() =>
                    setFormulario((actual) => ({ ...actual, imagen: '' }))
                  }
                >
                  Quitar imagen
                </button>
              </div>
            )}
          </div>
        </div>
        {mensaje && <p role="status">{mensaje}</p>}
        <button className="v-boton" type="submit">
          Guardar producto
        </button>
        {formulario.idOriginal && (
          <button
            className="v-boton v-boton-secundario ms-2"
            type="button"
            onClick={() => setFormulario(productoVacio)}
          >
            Cancelar
          </button>
        )}
      </form>

      <h2>Catálogo ({productos.length})</h2>
      <div className="admin-lista">
        {productos.map((producto) => (
          <article className="admin-producto" key={producto.id}>
            <div className="admin-producto-info">
              <Imagen
                src={producto.imagen || imagenes.productos[producto.id]}
                alt={producto.nombre}
                className="admin-producto-imagen"
              />
              <div>
                <strong>{producto.nombre}</strong>
                <p>
                  {producto.id} · {producto.categoria} ·{' '}
                  {formatearPrecio(producto.precio)} · Stock {producto.stock}
                </p>
              </div>
            </div>
            <div className="admin-acciones">
              <button
                className="v-boton v-boton-secundario"
                onClick={() => editarProducto(producto)}
              >
                Editar
              </button>
              <button
                className="v-boton v-boton-secundario"
                onClick={() => eliminarProducto(producto.id)}
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>
      <p className="form-ayuda">
        Este acceso es solo demostrativo y no usa autenticación de servidor.
      </p>
    </div>
  )
}
