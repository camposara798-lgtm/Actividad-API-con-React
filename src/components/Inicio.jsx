import {useState} from 'react';
export default function Inicio() {
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  async function consultarInicio() {
    setCargando(true);
    setError('');
    setMensaje('');

    try {
      const response = await fetch('/inicio');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || `La API respondió con estado ${response.status}.`
        );
      }

      setMensaje(
        data.mensaje ||
          'La API respondió, pero no envió la propiedad mensaje.'
      );
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
      <div className="card-icon" aria-hidden="true">01</div>

      <h2>Consultar inicio</h2>

      <p className="card-description">
        Realiza una petición GET a <code>/inicio</code>.
      </p>

      <button
        type="button"
        onClick={consultarInicio}
        disabled={cargando}
      >
        {cargando ? 'Consultando...' : 'Consultar /inicio'}
      </button>

      {mensaje && (
        <div className="result success" role="status">
          <strong>Respuesta de Express</strong>
          <p>{mensaje}</p>
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