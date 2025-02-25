function handleCredentialResponse(response) {
    const token = response.credential;
    fetch('/login-registro/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token }),
    })
    .then(response => {
        if (response.ok) {
            console.log('Antwort vom Backend: Erfolg');
            window.location.href = '/';
        } else {
            console.error('Antwort vom Backend: Fehler', response.status);
            if (response.status === 409) {
                alert("Usuario ya registrado, inicie sesión");
                window.location.reload();
            } else {
                response.text().then(errorMessage => {
                    alert(`Error en el inicio de sesión/registro: ${errorMessage}`);
                });

            }
        }
    })
    .catch(error => {
        console.error('Fehler:', error);
        alert(`Error de red: ${error.message}`);
    });
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: '373625912308-vta7u184ddp43119ngm4950b6jfq41og.apps.googleusercontent.com',
        callback: handleCredentialResponse,
    });
    const buttonDiv = document.getElementById('google-sign-in-button');
    if (buttonDiv) {
        google.accounts.id.renderButton(
            buttonDiv,
            { theme: 'outline', size: 'large' }
        );
        google.accounts.id.prompt();
    } else {
        console.error('Elemento "google-sign-in-button" no encontrado.');
    }
};