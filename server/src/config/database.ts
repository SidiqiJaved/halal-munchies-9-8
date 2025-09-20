import path from "path";
import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
const configuredDialect = process.env.DB_DIALECT as Dialect | undefined;
const dialect: Dialect = configuredDialect || (databaseUrl ? "postgres" : "sqlite");
const logging = process.env.DB_LOGGING === "true" ? console.log : false;

let sequelize: Sequelize;

if (dialect === "sqlite") {
  const storage = process.env.DB_STORAGE || path.join(__dirname, "../../database.sqlite");
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage,
    logging,
  });
} else if (databaseUrl) {
  sequelize = new Sequelize(databaseUrl, {
    dialect,
    logging,
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || "halal_munchies",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "",
    {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
      dialect,
      logging,
    }
  );
}

export default sequelize;
