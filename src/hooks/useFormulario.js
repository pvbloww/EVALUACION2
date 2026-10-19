import { useState } from 'react'
import { correoValido } from '../utils/correo.js'

// Reutiliza valores, campos tocados y el estado de envío de los formularios.
export default function useFormulario(iniciales) {
  const [valores, setValores] = useState(iniciales)
  const [validado, setValidado] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [tocados, setTocados] = useState({})

  function cambiarCampo(evento) {
    const { name, value } = evento.target
    const comunaVacia = name === 'region' ? { comuna: '' } : {}

    setValores((anteriores) => ({
      ...anteriores,
      [name]: value,
      ...comunaVacia,
    }))
    setValidado(false)
  }

  function salirDelCampo(evento) {
    // Muestra la validación cuando la persona sale del campo.
    setTocados((anteriores) => ({
      ...anteriores,
      [evento.target.name]: true,
    }))
  }

  function enviar(evento) {
    evento.preventDefault()
    setEnviado(true)

    // Revisa los campos sin llamar a checkValidity ni mostrar avisos del navegador.
    const formularioValido = Array.from(evento.currentTarget.elements).every(
      (elemento) => elemento.validity.valid,
    )
    // También revisa el dominio permitido de cada correo.
    const correosValidos = Array.from(
      evento.currentTarget.querySelectorAll('input[type="email"]'),
    ).every((campoCorreo) => correoValido(campoCorreo.value))

    if (formularioValido && correosValidos) {
      setValidado(true)
    }
  }

  function campo(nombre) {
    return {
      name: nombre,
      value: valores[nombre],
      onChange: cambiarCampo,
      onBlur: salirDelCampo,
      mostrarError: enviado || tocados[nombre],
    }
  }

  return { valores, validado, enviar, campo }
}
