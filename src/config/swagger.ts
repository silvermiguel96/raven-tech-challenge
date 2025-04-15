import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Calculator API',
    version: '1.0.0',
    description: 'API REST de Calculadora con autenticación JWT y almacenamiento de operaciones',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desarrollo',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['src/routes/*.ts', 'src/controllers/*.ts'],  // <-- aquí irán tus anotaciones
};

export const swaggerSpec = swaggerJSDoc(options);
