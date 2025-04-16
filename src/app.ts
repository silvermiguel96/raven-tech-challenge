import { corsOptions } from "./config/cors";
import { json } from "body-parser";
import routes from './routers';
import express from 'express';
import helmet from "helmet";

const app = express();

app.use(corsOptions);
app.use(helmet());
app.use(json());
app.use(routes);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Raven API funcionando 🎯');
});

export default app;
