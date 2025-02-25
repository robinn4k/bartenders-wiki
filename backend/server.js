const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const session = require('express-session');
const mysql = require('mysql2/promise'); // Agregado aquí

const app = express();
const port = 3000;

// Configuración de MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: 'Jaleo313',
    database: 'Bartenders_Wiki_DB'
});

async function getUser(googleId) {
    try{
        const [rows] = await pool.query('SELECT * FROM users WHERE googleId = ?', [googleId]);
        return rows[0];
    } catch(error) {
        console.error("Error al obtener usuario:", error);
        return null;
    }
}

// Configuración de sesiones (si las usas)
app.use(session({
    secret: '1e1659f416a63b86ad4d383d9123a14ec9e1eaae77fbc0a6a67e8cedbe42d3cb4e1cab3ad806a54d0e9e307b6ce5450119b7c82d1e29c7a61a8c79e4e8a83b33',
    resave: false,
    saveUninitialized: true,
}));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
    res.send('Backend funcionando!');
});

// Ruta para login con google.
const googleClient = new OAuth2Client('373625912308-vta7u184ddp43119ngm4950b6jfq41og.apps.googleusercontent.com');

app.post('/login/google', async (req, res) => {
    const token = req.body.token;
    console.log('Empfangenes Google-Token:', token);
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: '373625912308-vta7u184ddp43119ngm4950b6jfq41og.apps.googleusercontent.com',
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];

        // Obtener usuario desde MySQL
        let user = await getUser(userid);

        if (!user) {
            // Crear usuario en MySQL
            await pool.query('INSERT INTO users (googleId, email, name) VALUES (?, ?, ?)', [userid, payload.email, payload.name]);
            user = await getUser(userid);
        }

        // Crear sesión
        req.session.userId = user.id; // Suponiendo que 'id' es la clave primaria en tu tabla 'users'

        res.send('Anmeldung erfolgreich');
    } catch (error) {
        console.error('Google-Anmeldung fehlgeschlagen:', error);
        res.status(401).send('Authentifizierung fehlgeschlagen');
    }
});

function verificarAutenticacion(req, res, next) {
    if (req.session && req.session.userId) {
        // Usuario autenticado, continuar
        return next();
    } else {
        // Usuario no autenticado, redirigir a /login
        return res.status(401).send('No autorizado'); // O res.redirect('/login'); si tienes una pagina de login
    }
}

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

