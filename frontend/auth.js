function handleCredentialResponse(response) {
    const token = response.credential;
    console.log("Google-ID-Token:", token);

    fetch('/login/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token }),
    })
    .then(response => {
        if (response.ok) {
            // Autenticación exitosa
            console.log('Antwort vom Backend: Anmeldung erfolgreich');
            // Redirigir a la pagina principal, o a donde se desee.
            window.location.href = '/';
        } else if (response.status === 401) {
            // No autorizado (usuario no autenticado)
            console.log('Antwort vom Backend: Authentifizierung fehlgeschlagen');
            // Redirigir a la pagina de login.
            window.location.href = '/login'; // Asegúrate de tener una página /login
        } else {
            // Otro error
            console.error('Antwort vom Backend: Fehler beim Senden des Tokens');
        }
    })
    .catch(error => {
        console.error('Fehler beim Senden des Tokens:', error);
    });
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: '373625912308-vta7u184ddp43119ngm4950b6jfq41og.apps.googleusercontent.com', // Reemplaza con tu Client ID
        callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
        document.getElementById('google-sign-in-button'),
        { theme: 'outline', size: 'large' }
    );
    google.accounts.id.prompt();
}

function handleCredentialResponse(response) {
    const token = response.credential;
    console.log("Google-ID-Token:", token);

    fetch('/registro/google', { // Cambia la ruta a /registro/google
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token }),
    })
    .then(response => {
        if (response.ok) {
            // Registro exitoso
            console.log('Antwort vom Backend: Registro erfolgreich');
            window.location.href = '/'; // Redirigir a la pagina principal.
        } else {
            // Error en el registro
            console.error('Antwort vom Backend: Fehler beim Registro');
        }
    })
    .catch(error => {
        console.error('Fehler beim Senden des Tokens:', error);
    });
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: '373625912308-vta7u184ddp43119ngm4950b6jfq41og.apps.googleusercontent.com', // Reemplaza con tu Client ID
        callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
        document.getElementById('google-sign-in-button'),
        { theme: 'outline', size: 'large' }
    );
    google.accounts.id.prompt();
}