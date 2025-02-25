const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const session = require('express-session');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'Jaleo313',
    database: process.env.DB_DATABASE || 'Bartenders_Wiki_DB'
});

async function getUser(googleId) {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE googleId = ?', [googleId]);
        return rows[0];
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        throw error;
    }
}

async function createUser(googleId, email, name) {
    try {
        await pool.query('INSERT INTO users (googleId, email, name) VALUES (?, ?, ?)', [googleId, email, name]);
        return getUser(googleId);
    } catch (error) {
        console.error("Error al crear usuario:", error);
        throw error;
    }
}

async function verifyGoogleToken(token) {
    const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    return ticket.getPayload();
}

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    }
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend funcionando!');
});

app.post('/login-registro/google', async (req, res) => {
    const token = req.body.token;
    try {
        const payload = await verifyGoogleToken(token);
        const userid = payload['sub'];

        let user = await getUser(userid);

        if (!user) {
            user = await createUser(userid, payload.email, payload.name);
            if (!user) {
                return res.status(500).send("Error al crear usuario");
            }
            req.session.userId = user.id;
            return res.status(201).send('Registro exitoso');
        }

        req.session.userId = user.id;
        res.send('Inicio de sesión exitoso');
    } catch (error) {
        console.error('Autenticación fallida:', error);
        res.status(401).send('Autenticación fallida');
    }
});

function verificarAutenticacion(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        return res.status(401).send('No autorizado');
    }
}

app.get('/ruta-protegida', verificarAutenticacion, (req, res) => {
    res.send('Contenido protegido');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});