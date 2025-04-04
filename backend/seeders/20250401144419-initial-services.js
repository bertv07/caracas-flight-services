"use strict";

module.exports = {
  async up(queryInterface) {
    const services = [
      {
        name: "Servicio Básico: Asistencia Esencial",
        description: "Incluye abastecimiento de combustible, estacionamiento en rampa para aeronaves, acceso a sala VIP básica para pasajeros, y servicios de agua potable y limpieza básica de aeronaves.",
        price: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Servicio Intermedio: Experiencia Mejorada",
        description: "Incluye todo lo del servicio básico, hangaraje para protección de aeronaves, catering estándar para pasajeros y tripulación, coordinación de permisos de vuelo y planificación básica, y transporte terrestre (limusina o taxi) para pasajeros.",
        price: 700,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Servicio Premium: Lujo Integral",
        description: "Incluye todo lo del servicio intermedio, sala VIP de lujo con servicios personalizados, catering gourmet y bebidas premium, asistencia completa para tripulación, servicios de mantenimiento preventivo para aeronaves, y gestión de vuelos internacionales (aduanas y migración).",
        price: 1500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Servicio Ejecutivo: Solución Corporativa",
        description: "Diseñado específicamente para viajes de negocios. Incluye todo lo del servicio premium, más sala de conferencias privada, servicios de secretariado y traducción, conectividad de alta velocidad, coordinación de reuniones en destino y transporte ejecutivo para todo el equipo.",
        price: 2200,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert("Services", services, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Services", null, {});
  }
};