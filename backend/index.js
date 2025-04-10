const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const dbConfig = require('./config/config.json').development;
require('dotenv').config();
const transporter = require('./config/mail');

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;
const origin = process.env.ORIGIN;
// Configurar CORS para permitir solicitudes desde tu frontend
app.use(cors({
  origin: [`${origin}`], // Orígenes permitidos
  credentials: true, // Permitir cookies en solicitudes cross-origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
}));

// Configurar para servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Resto de tu configuración...

// Middlewares
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
// Configuración de Sequelize
const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect
    }
);

// Importar modelos
const User = require('./models/user')(sequelize, DataTypes);
const Documents = require('./models/documents')(sequelize, DataTypes);
const Service = require('./models/service')(sequelize, DataTypes);
const Subscription = require('./models/subscription')(sequelize, DataTypes);

// Establecer asociaciones
User.hasOne(Documents, { foreignKey: 'userId' });
Documents.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Subscription, { foreignKey: 'userId' });
Subscription.belongsTo(User, { foreignKey: 'userId' });

Service.hasMany(Subscription, { foreignKey: 'serviceId' });
Subscription.belongsTo(Service, { foreignKey: 'serviceId' });

// Sincronizar modelos con la base de datos
sequelize.sync().then(() => {
    console.log('Tablas creadas y sincronizadas');
}).catch((error) => {
    console.error('Error al sincronizar las tablas:', error);
});

// ... (configuraciones previas iguales)

// Importar rutas
const userRoutes = require("./controllers/user")
const documentsRoutes = require("./controllers/documents")
const serviceRoutes = require("./controllers/services")
const subscriptionRoutes = require("./controllers/subscriptions") // Nombre correcto
const adminRoutes = require("./controllers/admin") // Nuevo controlador para administración

// Registrar rutas
app.use("/api/auth", userRoutes)
app.use("/api/users", userRoutes)
app.use("/api/documents", documentsRoutes)
app.use("/api/services", serviceRoutes)
app.use("/api/subscriptions", subscriptionRoutes)
app.use("/api/admin", adminRoutes) // Ruta para funciones de administración

app.get('/send-mail', async (request, response) => {
    const mailOption = {
        from: 'caracas.flight.services.email@gmail.com',
        to: 'gleybertmartinez0702@gmail.com',
        subject: 'Correo de prueba',
        text: 'Este es un correo de prueba.'
    }
    try {
        await transporter.sendMail(mailOption);
        response.status(200).send({ message: 'Correo enviado' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        response.status(500).send({ message: 'Error al enviar el correo' });
    }
})

// Asociaciones
Service.hasMany(Subscription, { foreignKey: "serviceId" });
Subscription.belongsTo(Service, { foreignKey: "serviceId" });

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de Caracas Flight Services!');
});

// En tu archivo app.js o index.js, después de inicializar Sequelize

// Sincronizar solo los cambios (no borra datos existentes)
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });


// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://${host}:${port}`);
});