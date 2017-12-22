// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  mongooseDebug: process.env.MONGOOSE_DEBUG || true,
  jwtSecret: process.env.JWT_SECRET || '',
  mongoUri: process.env.MONGO_URI || '',
  mollieKey: process.env.MOLLIE_KEY || ''
};

module.exports = config;
