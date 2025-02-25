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
    .then(response => response.text())
    .then(data => {
        console.log('Antwort vom Backend:', data);
    })
    .catch(error => {
        console.error('Fehler beim Senden des Tokens:', error);
    });
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: '373625912308-vta7u184ddp43119ngm4950b6jfq41og.apps.googleusercontent.com', // Ersetze durch deine Client-ID
        callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
        document.getElementById('google-sign-in-button'),
        { theme: 'outline', size: 'large' } // Anpassung des Buttons
    );
    google.accounts.id.prompt(); // Optional: Automatische Anzeige des Anmeldefensters
}