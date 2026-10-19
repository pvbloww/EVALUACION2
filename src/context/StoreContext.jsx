import { useState } from 'react'
import { productos as productosIniciales } from '../data/productos.js'
import { agregarArticulo, cambiarCantidadArticulo, calcularSubtotal } from '../data/carrito.js'
import { StoreContext } from './store.js'

const leer = (clave, respaldo) => {
  try {
    return JSON.parse(localStorage.getItem(clave)) ?? respaldo
  } catch {
    return respaldo
  }
}

export function StoreProvider({ children }) {
  const [productos, setProductos] = useState(() => leer('vsm-productos', productosIniciales))
  const [carrito, setCarrito] = useState(() => leer('vsm-carrito', []))

  const guardarProductos = (actualizados) => {
    setProductos(actualizados)
    localStorage.setItem('vsm-productos', JSON.stringify(actualizados))
  }

  const guardarCarrito = (actualizado) => {
    setCarrito(actualizado)
    localStorage.setItem('vsm-carrito', JSON.stringify(actualizado))
  }

  const agregar = (producto) => {
    guardarCarrito(agregarArticulo(carrito, producto))
  }

  const cambiarCantidad = (id, cantidad) => {
    guardarCarrito(cambiarCantidadArticulo(carrito, id, cantidad))
  }

  const quitar = (id) => {
    guardarCarrito(carrito.filter((item) => item.id !== id))
  }

  const vaciar = () => guardarCarrito([])
  const cantidad = carrito.reduce((total, item) => total + item.cantidad, 0)
  const subtotal = calcularSubtotal(carrito)
  const valor = {
    productos,
    guardarProductos,
    carrito,
    agregar,
    cambiarCantidad,
    quitar,
    vaciar,
    cantidad,
    subtotal,
  }

  return <StoreContext.Provider value={valor}>{children}</StoreContext.Provider>
}
