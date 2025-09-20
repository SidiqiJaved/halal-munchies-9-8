import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
const logging = process.env.DB_LOGGING === "true" ? console.log : false;

const poolMax = process.env.DB_POOL_MAX ? Number(process.env.DB_POOL_MAX) : 10;
const poolMin = process.env.DB_POOL_MIN ? Number(process.env.DB_POOL_MIN) : 0;
const poolIdle = process.env.DB_POOL_IDLE ? Number(process.env.DB_POOL_IDLE) : 10000;
const poolAcquire = process.env.DB_POOL_ACQUIRE ? Number(process.env.DB_POOL_ACQUIRE) : 30000;

const baseOptions = {
  dialect: "postgres" as Dialect,
  logging,
  pool: {
    max: poolMax,
    min: poolMin,
    idle: poolIdle,
    acquire: poolAcquire,
  },
};

let sequelize: Sequelize;

if (databaseUrl) {
  sequelize = new Sequelize(databaseUrl, {
    ...baseOptions,
    dialectOptions: {
      ssl:
        process.env.DB_SSL === "true"
          ? {
              require: true,
              rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== "false",
            }
          : undefined,
    },
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || "halal_munchies",
    process.env.DB_USER || "postgres",
    process.env.DB_PASSWORD || "postgres",
    {
      ...baseOptions,
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    }
  );
}

export default sequelize;
