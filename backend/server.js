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
    ```

* **Python (Flask):**
    * Crea un archivo llamado `app.py` dentro del directorio `backend`.
    * Abre el archivo y agrega el código básico de Flask:

```python
    from flask import Flask, jsonify, request

    app = Flask(__name__)

    @app.route('/', methods=['GET'])
    def index():
    return jsonify({'message': 'Backend funcionando!'})

    if __name__ == '__main__':
    app.run(debug=True, port=3000)
    ```

**4. Ejecución del Backend:**

* **Node.js (Express.js):**
    * En la terminal, dentro del directorio `backend`, ejecuta: `node index.js`
* **Python (Flask):**
    * Asegurate de que esta activado el entorno virtual.
    * En la terminal, dentro del directorio `backend`, ejecuta: `python app.py`

**5. Prueba del Backend:**

* Abre un navegador y ve a `http://localhost:3000`. Deberías ver el mensaje "Backend funcionando!".
* Si estas usando Codespaces, codespaces te va a dar la opcion de abrir el puerto 3000 en el navegador.

**6. Control de Versiones (Git):**

* Asegúrate de que tus cambios estén bajo control de versiones.
* Realiza commits regulares para guardar tu progreso.

**Próximos Pasos:**

* Una vez que tengas el backend básico funcionando, puedes comenzar a implementar las rutas para el inicio de sesión con Google y Apple.
* Configura la base de datos.
* Implementa la logica para verificar los tokens de google y apple.

Recuerda que este es solo el inicio. A medida que avances, irás añadiendo más funcionalidades y complejidad a tu backend.