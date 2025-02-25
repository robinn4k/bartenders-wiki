const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

app.post('/login/google', async (req, res) => {
    const token = req.body.token;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: 373625912308-vta7u184ddp43119ngm4950b6jfq41og.apps.googleusercontent.com,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        //... die restliche Logik kommt hierher
    } catch (error) {
        console.error('Google-Anmeldung fehlgeschlagen:', error);
        res.status(401).send('Authentifizierung fehlgeschlagen');
    }
});

app.post('/login/google', async (req, res) => {
    const token = req.body.token;
    console.log('Empfangenes Google-Token:', token);
    // ... restlicher Code
});