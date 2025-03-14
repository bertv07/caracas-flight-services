import img901 from '../assets/img/IMG_9010.png'
import img323 from '../assets/img/IMG_3236.png'
import imgCYL from '../assets/img/CYLW6487.png'

export default function SeccionNosotros() {
  return (
    <section className="fondo-sn">
      <div className="subti">
        <h2>Sobre nosotros</h2>
      </div>
      <div className="sobre-nosotros">
        <div className="img-s">
          <div className="img-s1">
            <img className="img-s1" src={img901} alt="" />
          </div>
          <div className="img-s2">
            <img className="img-s2" src={img323} alt="" />
          </div>
          <div className="img-s3">
            <img className="img-s3" src={imgCYL} alt="" />
          </div>
        </div>
        <div className="text-s">
          <p>
            Somos una compañía de servicio aeronáutico especializado comprometida con la aviación civil y la cultura de
            la seguridad operacional. Nuestra misión es garantizar que cada operación aérea se lleve a cabo en óptimas
            condiciones y en el menor tiempo posible. Nuestro equipo está capacitado para procesar el plan de vuelo,
            verificar el sistema meteorológico de la ruta, revisar NOTAMs, manejar equipaje, tramitar permisos de
            sobrevuelo y aterrizaje, monitorear vuelos en ruta y mucho más.
          </p>
        </div>
        <div className="text-s-responsive">
          <p>
            Somos una compañía especializada en servicios aeronáuticos comprometida con la aviación civil y la seguridad
            operacional. Nuestra misión es garantizar operaciones aéreas óptimas y rápidas. Ofrecemos servicios como
            procesamiento de planes de vuelo, verificación meteorológica, revisión de NOTAMs, manejo de equipaje,
            tramitación de permisos y monitoreo de vuelos.
          </p>
        </div>
        <div className="text-s-responsive-tablet">
          <p>
            Somos una empresa dedicada a la aviación civil y la seguridad operacional. Ofrecemos servicios de
            procesamiento de planes de vuelo, verificación meteorológica, revisión de NOTAMs, manejo de equipaje,
            tramitación de permisos y monitoreo de vuelos.
          </p>
        </div>
      </div>
    </section>
  )
}

