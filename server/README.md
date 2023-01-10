# Primeros pasos con el módulo json-server

1 . Crear un archivo 'package.json' ejecutando el siguiente comando:

    npm init --yes

2 . Una vez creado el archivo 'package.json' editaremos la seción de 'scripts' de esta manera:

    "scripts": {
        "test": "json-server --watch db.json -p 9000"
    },

3 . Despúes crear el archivo JSON en donde se almacenará la base de datos:

    db.json 

4 . Abrir esta carpeta en un terminal y ejecutar el siguiente comando:

    npm install json-server

5 . Y para iniciar el servidor JSON abrir la terminal a nivel de la carpeta 'server' y ejecutar el siguiente comando:

    npm start