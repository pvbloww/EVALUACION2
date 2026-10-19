import { describe, expect, it } from 'vitest'
import { obtenerOferta } from '../src/data/ofertas.js'
import { agregarArticulo } from '../src/data/carrito.js'

describe('ofertas de productos', () => {
  it('calcula el 15% de descuento y conserva el precio original', () => {
    const producto = { id: 'VA001', precio: 12000 }

    expect(obtenerOferta(producto)).toMatchObject({
      precioOriginal: 12000,
      precio: 10200,
    })
  })

  it('no aplica descuento a productos que no están en la oferta', () => {
    const producto = { id: 'VA003', precio: 15000 }

    expect(obtenerOferta(producto)).toBeNull()
  })

  it('aplica el precio de oferta si el producto ya estaba en el carrito', () => {
    const producto = { id: 'VA001', precio: 12000, stock: 4 }
    const carrito = [{ ...producto, cantidad: 1 }]
    const productoEnOferta = obtenerOferta(producto)

    expect(agregarArticulo(carrito, productoEnOferta)[0]).toMatchObject({
      precio: 10200,
      cantidad: 2,
    })
  })
})
