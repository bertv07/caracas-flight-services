module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Crear los servicios
    return queryInterface.bulkInsert("Services", [
      {
        titulo: "Servicio Básico: Asistencia Esencial",
        descripcion:
          "Incluye abastecimiento de combustible, estacionamiento en rampa para aeronaves, acceso a sala VIP básica para pasajeros, y servicios de agua potable y limpieza básica de aeronaves.",
        categoria: "basico",
        precio: "USD $300 por aeronave",
        price: 300,
        imagen: "/placeholder.svg?height=200&width=300",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: "Servicio Intermedio: Experiencia Mejorada",
        descripcion:
          "Incluye todo lo del servicio básico, hangaraje para protección de aeronaves, catering estándar para pasajeros y tripulación, coordinación de permisos de vuelo y planificación básica, y transporte terrestre (limusina o taxi) para pasajeros.",
        categoria: "intermedio",
        precio: "USD $700 por aeronave",
        price: 700,
        imagen: "/placeholder.svg?height=200&width=300",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: "Servicio Premium: Lujo Integral",
        descripcion:
          "Incluye todo lo del servicio intermedio, sala VIP de lujo con servicios personalizados, catering gourmet y bebidas premium, asistencia completa para tripulación, servicios de mantenimiento preventivo para aeronaves, y gestión de vuelos internacionales (aduanas y migración).",
        categoria: "premium",
        precio: "USD $1,500 por aeronave",
        price: 1500,
        imagen: "/placeholder.svg?height=200&width=300",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: "Servicio Ejecutivo: Solución Corporativa",
        descripcion:
          "Diseñado específicamente para viajes de negocios. Incluye todo lo del servicio premium, más sala de conferencias privada, servicios de secretariado y traducción, conectividad de alta velocidad, coordinación de reuniones en destino y transporte ejecutivo para todo el equipo.",
        categoria: "ejecutivo",
        precio: "USD $2,200 por aeronave",
        price: 2200,
        imagen: "/placeholder.svg?height=200&width=300",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar los servicios
    return queryInterface.bulkDelete("Services", null, {})
  },
}

