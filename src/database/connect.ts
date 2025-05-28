import { Sequelize } from "sequelize";
import config from "../config/config";
const sequelize = new Sequelize(config.db as string, config.db_user as string, config.db_password as string, {
    host: config.db_host,
    dialect: 'postgres',
    dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Set to `true` if you have a valid CA cert
    },
  },
});
export default sequelize;