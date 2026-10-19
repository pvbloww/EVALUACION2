// Códigos de los productos que participan en la oferta de demostración.
const codigosEnOferta = ['VA001', 'DE005', 'ME021']

// Aplica un descuento sencillo del 15% a los productos seleccionados.
export function obtenerOferta(producto) {
  if (!codigosEnOferta.includes(producto.id)) return null

  const precioOriginal = producto.precioOriginal ?? producto.precio

  return {
    ...producto,
    precioOriginal,
    precio: Math.round(precioOriginal * 0.85),
  }
}
