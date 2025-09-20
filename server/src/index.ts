import "dotenv/config";
import app from "./app";
import sequelize from "./config/database";
import { initModels } from "./models";

const port = Number(process.env.PORT || 4000);

async function start() {
  try {
    await initModels();

    const shouldSync = process.env.DB_SYNC !== "false";
    const shouldAlter = process.env.DB_ALTER === "true";

    if (shouldSync) {
      await sequelize.sync({ alter: shouldAlter });
    }

    app.listen(port, () => {
      console.log(`Halal Munchies API listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

void start();
