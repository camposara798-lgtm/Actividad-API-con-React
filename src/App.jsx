import Inicio from './components/Inicio.jsx'
import Informacion from './components/Informacion.jsx'
import Solicitudes from './components/Solicitudes.jsx'

export default function App(){
  return(
    <main className='page'>
      <header className='hero'>
        <p className='eyebrow'>Consumo y Documentacion de
          una API con React
        </p>
        <h1>Consumo de la API</h1>
        <p className='intro'>
          Consulta la informacion del servidor y envia una 
          solicitud desde este formulario
        </p>
        <div className='status-note'>
          <span className='status-dot' aria-hidden="true"/>
          API esperada: <code>http://localhost:3000</code>
        </div>
      </header>
      <section className='cards' aria-label="consultas de la API">
        <Inicio/>
        <Informacion/>
      </section>
      <Solicitudes/>
      <footer>
        <p>Proyecto academico . React, fetch() y Epress</p>
      </footer>
    </main>
  )
}
