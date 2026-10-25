import { useState } from 'react';

export default function Informacion() {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  async function consultarInformacion() {
    setCargando(true);
    setError('');
    setDatos(null);

    try {
      const response = await fetch('/informacion');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || `La API respondió con estado ${response.status}.`
        );
      }

      setDatos(data);
    } catch (err) {
      setError(
        err.message === 'Error al obtener'
          ? 'No fue posible conectar con Express. Verifica que el servidor esté encendido en el puerto 3000.'
          : err.message
      );
    } finally {
      setCargando(false);
    }
  }

  return (
    <article className="card">
      <div className="card-icon" aria-hidden="true">02</div>

      <h2>Consultar información</h2>

      <p className="card-description">
        Realiza una petición GET a <code>/informacion</code>.
      </p>

      <button
        type="button"
        onClick={consultarInformacion}
        disabled={cargando}
      >
        {cargando ? 'Consultando...' : 'Consultar /informacion'}
      </button>

      {datos && (
        <div className="result success" role="status">
          <strong>Respuesta de Express</strong>

          {Object.entries(datos).map(([clave, valor]) => (
            <p key={clave}>
              <b>{clave}:</b> {String(valor)}
            </p>
          ))}
        </div>
      )}

      {error && (
        <div className="result failure" role="alert">
          <strong>No se pudo completar</strong>
          <p>{error}</p>
        </div>
      )}
    </article>
  );
}