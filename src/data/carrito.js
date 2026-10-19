export function agregarArticulo(carrito, producto) {
  const existente = carrito.find((item) => item.id === producto.id)
  if (existente) return carrito.map((item) => item.id === producto.id
    ? {
        ...item,
        // Si el mismo producto entra en oferta, aplica el menor precio al carrito.
        precio: Math.min(item.precio, producto.precio),
        precioOriginal: producto.precioOriginal ?? item.precioOriginal,
        cantidad: Math.min(item.cantidad + 1, item.stock),
      }
    : item)
  return [...carrito, { ...producto, cantidad: 1 }]
}

export function cambiarCantidadArticulo(carrito, id, cantidad) {
  return carrito.map((item) => item.id === id
    ? { ...item, cantidad: Math.max(1, Math.min(item.stock, Number(cantidad) || 1)) }
    : item)
}

export function calcularSubtotal(carrito) {
  return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0)
}
