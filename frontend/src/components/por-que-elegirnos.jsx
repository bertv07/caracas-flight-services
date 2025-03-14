import imgCYL from '../assets/img/CYLW6487.png';
import img150 from '../assets/img/IMG_1550.png';
import img194 from '../assets/img/IMG_1943.png';


export default function PorQueElegirnos() {
  return (
    <section>
      <div className="pq-elegirnos">
        <div className="subti fff">
          <h2>¿Por qué elegirnos?</h2>
        </div>
        <div className="fondo">
          <div className="cards">
            <div className="card c1">
              <div className="img">
                 <img src={imgCYL} alt="img"/>
                <div className="text">
                  <h5>Primer FBO certificado en venezuela.</h5>
                  <div className="boton-pq">
                    <button>Leer más</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card c2">
              <div className="img">
                <img src={img194} alt="" width="400" height="458" />
                <div className="text">
                  <h5>Eficiencia y rapidez con nosotros.</h5>
                  <div className="boton-pq">
                    <button>Leer más</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card c3">
              <div className="img">
                <img src={img150} alt="" width="400" height="458" />
                <div className="text">
                  <h5>Cumplimos con todas las normativas de seguridad aeroportuaria.</h5>
                  <div className="boton-pq">
                    <button>Leer más</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cards-tlf">
          <div className="card-tlf c1-tlf">
            <div className="img-tlf-1" style={{ backgroundImage: "url(assets/img/certificado.jpg)" }}>
              <div className="text-tlf-1 text-tlf">
                <h5>Primer FBO certificado en venezuela.</h5>
                <div className="boton-pq-tlf">
                  <button>Leer más</button>
                </div>
              </div>
            </div>
          </div>
          <div className="card-tlf c2-tlf">
            <div className="img-tlf-2" style={{ backgroundImage: "url(assets/img/IMG_1943.JPG)" }}>
              <div className="text-tlf-2 text-tlf">
                <h5>Eficiencia y rapidez con nosotros.</h5>
                <div className="boton-pq-tlf">
                  <button>Leer más</button>
                </div>
              </div>
            </div>
          </div>
          <div className="card-tlf c3-tlf">
            <div className="img-tlf-3" style={{ backgroundImage: "url(assets/img/IMG_1550.JPG)" }}>
              <div className="text-tlf-3 text-tlf">
                <h5>Cumplimos con todas las normativas de seguridad aeroportuaria.</h5>
                <div className="boton-pq-tlf">
                  <button>Leer más</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

