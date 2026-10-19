// Solo acepta correos de DUOC o Gmail para que la regla sea igual en toda la página.
const formatoCorreoPermitido = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i

export function correoValido(correo) {
  return formatoCorreoPermitido.test(correo.trim())
}
