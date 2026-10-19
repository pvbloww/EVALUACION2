// El navegador revisa campos obligatorios, formato de correo y longitudes.
// Estas funciones contienen solo las reglas especiales del proyecto.

export function validarCorreo(correo) {
  const valor = correo.trim().toLowerCase()
  const dominiosPermitidos = [
    '@duoc.cl',
    '@profesor.duoc.cl',
    '@gmail.com',
  ]
  const dominioPermitido = dominiosPermitidos.some((dominio) =>
    valor.endsWith(dominio),
  )

  if (!dominioPermitido) {
    return 'Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.'
  }

  return ''
}

export function validarRun(run) {
  const valor = run.trim().toUpperCase()

  if (valor.length < 7 || valor.length > 9) {
    return 'El RUN debe tener entre 7 y 9 caracteres.'
  }

  const numero = valor.slice(0, -1)
  const verificador = valor.at(-1)
  const numerosValidos = numero
    .split('')
    .every((caracter) => caracter >= '0' && caracter <= '9')
  const verificadorValido =
    (verificador >= '0' && verificador <= '9') || verificador === 'K'

  if (!numerosValidos || !verificadorValido) {
    return 'Escribe el RUN sin puntos ni guion y con K al final si corresponde.'
  }

  return ''
}

export function validarContacto(valores) {
  return {
    correo: validarCorreo(valores.correo),
  }
}

export function validarLogin(valores) {
  return {
    correo: validarCorreo(valores.correo),
  }
}

export function validarRegistro(valores) {
  let errorConfirmar = ''

  if (valores.confirmar !== valores.contrasena) {
    errorConfirmar = 'Las contraseñas no coinciden.'
  }

  return {
    correo: validarCorreo(valores.correo),
    run: validarRun(valores.run),
    confirmar: errorConfirmar,
  }
}
