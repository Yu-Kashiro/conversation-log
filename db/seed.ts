import "dotenv/config";
import { seed } from "drizzle-seed";
import { db } from ".";
import { users } from "./schemas/auth";
import { conversations } from "./schemas/conversation";

async function main() {
  await seed(db, { users, conversations }).refine(f => ({
    conversations: {
      count: 100,
    },
    users: {
      count: 100,
    },
  }));

  process.exit(0);
}

main();
