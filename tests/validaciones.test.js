import { describe, expect, it } from 'vitest'
import { validarCorreo, validarRun, validarRegistro } from '../src/utils/validaciones.js'

describe('validaciones simples', () => {
  it('acepta solo los dominios de correo establecidos', () => {
    expect(validarCorreo('alumna@gmail.com')).toBe('')
    expect(validarCorreo('alumna@ejemplo.com')).toContain('Solo se aceptan')
  })

  it('revisa el formato del RUN sin calcular su dígito verificador', () => {
    expect(validarRun('19011022K')).toBe('')
    expect(validarRun('19.011K')).toContain('sin puntos ni guion')
  })

  it('comprueba que la confirmación de contraseña coincida', () => {
    const errores = validarRegistro({
      correo: 'alumna@gmail.com',
      run: '19011022K',
      contrasena: 'perro123',
      confirmar: 'gato123',
    })

    expect(errores.confirmar).toBe('Las contraseñas no coinciden.')
  })
})
