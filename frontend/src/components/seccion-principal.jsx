import principal from '../assets/img/principal.jpg';

export default function SeccionPrincipal() {
  return (
    <section>
      <div
        className="fondo-1"
        style={{ backgroundImage: `url(${principal})` }} // Aquí está la corrección
      >
        <div className="fondo-black"></div>
        <div className="text-1">
          <div className="h1">
            <h1>Servicio aeronáutico especializado</h1>
            <p>
              comprometidos en la <span>aviación civil</span>
            </p>
          </div>
          <div className="boton-1">
            <button>Contáctanos</button>
          </div>
        </div>
      </div>
    </section>
  );
}
