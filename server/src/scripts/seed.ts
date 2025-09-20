import "dotenv/config";
import { initModels } from "../models";
import { seedDatabase } from "../services/seed.service";

async function run() {
  try {
    await initModels();
    await seedDatabase();
    console.log("Seed data inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed database", error);
    process.exit(1);
  }
}

void run();
