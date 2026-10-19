import { useContext } from 'react'
import { StoreContext } from '../context/store.js'

export function useStore() {
  const contexto = useContext(StoreContext)
  if (!contexto) throw new Error('useStore debe usarse dentro de StoreProvider')
  return contexto
}
