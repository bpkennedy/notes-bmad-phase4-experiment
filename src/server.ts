import { PrismaClient } from "@prisma/client";
import { createApp } from "./api/index.js";

const PORT = process.env.PORT || 3000;

async function main() {
  const prisma = new PrismaClient();

  try {
    const app = createApp(prisma);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    process.on("SIGINT", async () => {
      console.log("Shutting down...");
      await prisma.$disconnect();
      process.exit(0);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

main();
