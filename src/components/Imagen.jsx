import { useState } from 'react'
import './Imagen.css'

export default function Imagen({ src, alt, texto, className = '', style }) {
  const [fallida, setFallida] = useState(null)

  // Sin archivo de imagen, muestra el texto o emoji dentro del círculo decorativo.
  if (src && fallida !== src) {
    return <img src={src} alt={alt} className={`imagen-contenido ${className}`} style={style} loading="lazy" onError={() => setFallida(src)} />
  }

  return <div className={`imagen-pendiente ${className}`} style={style} role="img" aria-label={alt}>{texto || alt}</div>
}
