import mongoose from 'mongoose';
import app from './app';
import 'dotenv/config';
import config from './config';
import { errorLogger, logger } from './shared/logger';

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('💻Database connected successfully ');

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(error);
  }
}

bootstrap();
