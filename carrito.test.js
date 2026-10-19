import { describe, expect, it } from 'vitest'
import { agregarArticulo, cambiarCantidadArticulo, calcularSubtotal } from '../src/data/carrito.js'

const vacuna = { id: 'VA001', nombre: 'Vacuna', precio: 12000, stock: 3 }

describe('carrito de compras', () => {
  it('agrega el producto y suma cantidades al agregarlo de nuevo', () => {
    const uno = agregarArticulo([], vacuna)
    expect(uno).toEqual([{ ...vacuna, cantidad: 1 }])
    expect(agregarArticulo(uno, vacuna)[0].cantidad).toBe(2)
  })

  it('limita las cantidades entre uno y el stock disponible', () => {
    const lista = [{ ...vacuna, cantidad: 1 }]
    expect(cambiarCantidadArticulo(lista, vacuna.id, 20)[0].cantidad).toBe(3)
    expect(cambiarCantidadArticulo(lista, vacuna.id, 0)[0].cantidad).toBe(1)
  })

  it('calcula el subtotal de todos los artículos', () => {
    expect(calcularSubtotal([{ ...vacuna, cantidad: 2 }, { id: 'ME004', precio: 9500, cantidad: 1 }])).toBe(33500)
  })
})
