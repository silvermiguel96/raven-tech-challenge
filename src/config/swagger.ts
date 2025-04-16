import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Raven API',
    version: '1.0.0',
    description: 'Documentación de la API de Raven',
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routers/**/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);

export default function setupSwagger(app: Express): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
