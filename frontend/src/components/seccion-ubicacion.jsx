export default function SeccionUbicacion() {
  return (
    <section>
      <div className="h4-ubi">
        <h4 className="h4-u">
          <span>Ubicados</span> en el Aeropuerto Internacional Caracas 'Oscar Machado Zuloaga''
        </h4>
      </div>
      <div className="maps">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2334.2161312263843!2d-66.8172901130242!3d10.288315250934646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2af005b313696b%3A0xed0851993de6ea1c!2sAeropuerto%20Internacional%20Caracas%20&#39;Oscar%20Machado%20Zuloaga&#39;&#39;!5e0!3m2!1ses!2sve!4v1735154274798!5m2!1ses!2sve"
          width="1100"
          height="600"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  )
}

