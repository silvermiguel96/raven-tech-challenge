# 🐦 Raven Tech Challenge

Bienvenido al **Raven Tech Challenge**, una API desarrollada en Node.js + TypeScript con autenticación JWT, operaciones matemáticas y gestión de historial.

---

## 📦 Requisitos

- Node.js `>= 20.x`
- Docker y Docker Compose
- NPM `>= 10.x`

---

## 🚀 Instalación

1. Clonar el repositorio:

```
git clone https://github.com/tu_usuario/raven-tech-challenge.git
cd raven-tech-challenge
```

2. Instalar dependencias:

```
npm install
```

---

## 🐳 Levantar la Base de Datos

Asegúrate de tener Docker y Docker Compose instalados.

1. Levanta los servicios:

```
docker compose up -d
```

2. Comprueba que la base de datos está corriendo:

```
docker ps
```

---

## ⚙️ Configuración del Entorno

Crea un archivo `.env` basado en el ejemplo:

```
cp .env.example .env
```

Configura tus variables de entorno de acuerdo a tus credenciales y entorno local.

---

## 🤠 Migraciones

Una vez levantada la base de datos, corre las migraciones que ya vienen en el proyecto:

```
npm run migration:run
```

Esto creará todas las tablas necesarias.

---

## 💡 Correr en Modo Desarrollo

Con la base de datos lista y migraciones aplicadas:

```
npm run dev
```

El servidor estará disponible en:

```
http://localhost:3000
```

---

## 🔐 Autenticación

La API utiliza autenticación JWT.
Primero deberás registrarte o loguearte para obtener un token, el cual debe ser enviado en las siguientes peticiones como:

```
Authorization: Bearer <tu_token>
```

---

## 🦾 Documentación Swagger

Una vez el servidor esté corriendo, accede a la documentación interactiva:

```
http://localhost:3000/api-docs
```

Aquí podrás probar todos los endpoints y entender sus estructuras.

---

## 🦪 Ejecución de Tests

El proyecto incluye pruebas automatizadas usando **Jest**.

Para ejecutarlas:

```
npm run test
```

---

## 💾 Estructura del Proyecto

```
src/
├── config/
├── controllers/
├── dto/
├── entities/
├── mappers/
├── middlewares/
├── migrations/
├── repositories/
├── routers/
├── schemas/
├── services/
├── test/
├── utils/
├── app.ts
├── sever.ts
└── types.ts
```

## 📌 Autor

Desarrollado por: **Miguelangel Rendón Cuartas**

---