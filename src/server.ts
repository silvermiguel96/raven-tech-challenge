import { AppDataSource } from './config/data-source';
import app from './app';
import { config } from './config';

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Database connected');
    app.listen(config.app.port, () => {
      console.log(`🚀 Server running on http://localhost:${config.app.port}`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection failed', error);
  });
