<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# API Super Flights

## Descripción

API Super Flights cuenta con 4 modulos:
  1. Passenger: CRUD de pasajeros
  2. Flight: CRUD de vuelos y agregar pasajeros a un vuelo
  3. User: CRUD de usuarios
  4. Auth: SignIn y SignUp para la autenticación del usuario

## Crear el archivo ".env.development"

```txt
# Database connection
URI_MONGODB=
# JWT
JWT_SECRET=
EXPIRES_IN=12h
# API
APP_URL=
PORT=
```

## Iniciar la Base de Datos

```bash
$ docker compose up -d
```

## Instalación

```bash
$ yarn install
```

## Running the app

```bash
$ yarn start:dev
```
## Documentación de endpoint

- http://localhost:3000/api/docs
