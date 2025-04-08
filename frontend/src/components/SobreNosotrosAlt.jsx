"use client"
import React, { useEffect } from "react";
import { useState } from "react"
import "../styles/sobre-nosotros-alt.css"
import img from "../assets/img/historia.png"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const sobre = document.getElementsByClassName("sobre-nosotros-alt")
gsap.registerPlugin(ScrollTrigger);

export default function SobreNosotrosAlt() {

  useEffect(() => {
    gsap.to(".sobre-nosotros-alt", {
      opacity: 1,
      yPercent: -10,
      markers: false,
    });
  }, []);

  return (
    <section className="sobre-nosotros-alt">
      <div className="sobre-nosotros-container">
        <div className="sobre-nosotros-header">
          <h2 className="sobre-nosotros-title">Conozca Nuestra Empresa</h2>
          <p className="sobre-nosotros-subtitle">Más de una década de excelencia en servicios aeronáuticos</p>
        </div>

        <div className="sobre-nosotros-content">
          <div className="tab-content-container">
              <div className="tab-content historia-content">
                <div className="historia-image">
                  <img src={img} alt="Historia de la empresa" />
                </div>
                <div className="historia-text">
                  <h3>Nuestra Trayectoria</h3>
                  <p>
                    Fundada en 2010 por un grupo de profesionales apasionados por la aviación, nuestra empresa nació con
                    la misión de transformar los servicios aeronáuticos en Venezuela. Lo que comenzó como una pequeña
                    operación con apenas 5 empleados, ha crecido hasta convertirse en el proveedor líder de servicios
                    aeronáuticos del país.
                  </p>
                  <p>
                    En 2012, nos convertimos en el primer FBO certificado en Venezuela, estableciendo un nuevo estándar
                    en la industria. A lo largo de los años, hemos ampliado constantemente nuestra cartera de servicios
                    y mejorado nuestras instalaciones para satisfacer las crecientes demandas de nuestros clientes.
                  </p>
                  <p>
                    Cada paso en nuestra historia ha estado guiado por nuestro compromiso inquebrantable con la
                    seguridad, la calidad y la satisfacción del cliente. Hoy, miramos hacia atrás con orgullo por lo que
                    hemos logrado y hacia adelante con entusiasmo por lo que está por venir.
                  </p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}

