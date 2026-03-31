const app = require('./src/app');
const connectDb = require('./src/config/db');
const env = require('./src/config/env');

const startServer = async () => {
  try {
    await connectDb(env.mongoUri);
    app.listen(env.port, () => {
      console.log(`Server listening at http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('Failed to connect database', error);
    process.exit(1);
  }
};

startServer();
