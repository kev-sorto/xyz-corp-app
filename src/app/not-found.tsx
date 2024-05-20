import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>Oppps!</h2>
      <p>El recurso que buscas no existe</p>
      <Link href="/">Regresar al inicio</Link>
    </div>
  )
}