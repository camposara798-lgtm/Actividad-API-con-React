import { useState } from 'react';

const formularioInicial = {
  nombre: '',
  apellido: '',
  correo: ''
};

export default function Solicitudes() {
  const [formulario, setFormulario] = useState(formularioInicial);
  const [cargando, setCargando] = useState(false);
  const [respuesta, setRespuesta] = useState(null);
  const [error, setError] = useState('');

  function cambiarCampo(event) {
    const { name, value } = event.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value
    }));
  }

  async function enviarSolicitud(event) {
    event.preventDefault();
    setError('');
    setRespuesta(null);

    if (
      !formulario.nombre.trim() ||
      !formulario.apellido.trim() ||
      !formulario.correo.trim()
    ) {
      setError('Completa el nombre, el apellido y el correo.');
      return;
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(formulario.correo.trim())) {
      setError('Escribe un correo electrónico válido.');
      return;
    }

    setCargando(true);

    try {
      const response = await fetch('/solicitudes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: formulario.nombre.trim(),
          apellido: formulario.apellido.trim(),
          correo: formulario.correo.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || `La API respondió con estado ${response.status}.`
        );
      }

      setRespuesta(data);
      setFormulario({ ...formularioInicial });
    } catch (err) {
      setError(
        err.message === 'Error al obtener'
          ? 'No fue posible conectar con Express. Comprueba que esté encendido.'
          : err.message
      );
    } finally {
      setCargando(false);
    }
  }

  return (
    <section className="form-card">
      <div className="form-heading">
        <p className="eyebrow">03 · Envio de datos</p>
        <h2>Enviar una solicitud</h2>
        <p>
          Los datos se envían al endpoint <code>POST /solicitudes</code>.
        </p>
      </div>

      <form onSubmit={enviarSolicitud}>
        <div className="field-grid">
          <label>
            Nombre
            <input
              name="nombre"
              value={formulario.nombre}
              onChange={cambiarCampo}
              placeholder="Escribe tu nombre..."
              autoComplete="given-name"
              required
            />
          </label>

          <label>
            Apellido
            <input
              name="apellido"
              value={formulario.apellido}
              onChange={cambiarCampo}
              placeholder="Escribe tu apellido..."
              autoComplete="family-name"
              required
            />
          </label>

          <label className="full-field">
            Correo 
            <input
              name="correo"
              type="email"
              value={formulario.correo}
              onChange={cambiarCampo}
              placeholder="Escribe tu correo..."
              autoComplete="email"
              required
            />
          </label>
        </div>

        <button type="submit" disabled={cargando}>
          {cargando ? 'Enviando...' : 'Enviar solicitud'}
        </button>
      </form>

      {respuesta && (
        <div className="result success" role="status">
          <strong>{respuesta.mensaje || 'Solicitud procesada.'}</strong>

          <p>
            Estado HTTP: {respuesta.ok ? '201 (Created)' : 'Respuesta recibida'}
          </p>

          {respuesta.solicitud && (
            <pre>
              {JSON.stringify(respuesta.solicitud, null, 2)}
            </pre>
          )}
        </div>
      )}

      {error && (
        <div className="result failure" role="alert">
          <strong>No se pudo enviar</strong>
          <p>{error}</p>
        </div>
      )}
    </section>
  );
}