import { correoValido } from '../utils/correo.js'

export default function Campo({
  name,
  etiqueta,
  ayuda,
  mostrarError = false,
  tipo = 'text',
  children,
  ...props
}) {
  const valor = props.value ?? ''
  let error = ''

  // required muestra el mensaje si el campo está vacío.
  if (mostrarError && props.required && !valor) {
    error = 'Este campo es obligatorio.'
  // correoValido aplica la misma regla de dominio en todos los formularios.
  } else if (
    mostrarError &&
    tipo === 'email' &&
    valor &&
    !correoValido(valor)
  ) {
    error = 'Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.'
  // minLength limita la cantidad mínima de caracteres.
  } else if (mostrarError && props.minLength && valor.length < props.minLength) {
    error = `Escribe al menos ${props.minLength} caracteres.`
  // maxLength limita la cantidad máxima de caracteres.
  } else if (mostrarError && props.maxLength && valor.length > props.maxLength) {
    error = `Escribe como máximo ${props.maxLength} caracteres.`
  // min evita números menores al valor indicado en el campo.
  } else if (
    mostrarError &&
    props.min !== undefined &&
    Number(valor) < Number(props.min)
  ) {
    error = `El valor mínimo es ${props.min}.`
  }

  const atributos = {
    id: name,
    name,
    'aria-describedby': [ayuda && `${name}-ayuda`, error && `${name}-error`]
      .filter(Boolean)
      .join(' ') || undefined,
    ...props,
  }
  let control

  if (tipo === 'select') {
    control = <select {...atributos}>{children}</select>
  } else if (tipo === 'textarea') {
    control = <textarea {...atributos} />
  } else {
    control = <input type={tipo} {...atributos} />
  }

  return (
    <div className="form-campo">
      <label htmlFor={name}>{etiqueta}</label>
      {control}
      {ayuda && (
        <small id={`${name}-ayuda`} className="form-ayuda">
          {ayuda}
        </small>
      )}
      {error && (
        <small id={`${name}-error`} className="form-error" role="alert">
          {error}
        </small>
      )}
    </div>
  )
}
