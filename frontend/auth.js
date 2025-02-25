function handleCredentialResponse(response, isRegistro = false) {
    const token = response.credential;
    const endpoint = isRegistro ? '/registro/google' : '/login/google';

    fetch(endpoint, {
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
            console.error('Antwort vom Backend: Fehler');
            if(response.status === 409){
                alert("Usuario ya registrado, inicie sesión")
                window.location.href = '/login';
            }
        }
    })
    .catch(error => {
        console.error('Fehler:', error);
    });
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: '373625912308-vta7u184ddp43119ngm4950b6jfq41og.apps.googleusercontent.com',
        callback: (response) => handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
        document.getElementById('google-sign-in-button'),
        { theme: 'outline', size: 'large' }
    );
    google.accounts.id.prompt();
};