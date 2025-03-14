const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConfig = require('./config/config.json').development;
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

// Middlewares
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.ORIGIN,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type'],
    credentials: true
}));
app.use(cookieParser());

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

// Importar controladores (routers)
const userRoutes = require('./controllers/user');
const documentsRoutes = require('./controllers/documents');
const serviceRoutes = require('./controllers/services');
const subscriptionRoutes = require('./controllers/subscription');

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de Caracas Flight Services!');
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://${host}:${port}`);
});