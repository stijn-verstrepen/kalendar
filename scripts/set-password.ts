import bcrypt from "bcryptjs";
import readline from "node:readline";

async function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  const password = await prompt("Enter new admin password: ");
  if (password.length < 12) {
    console.error("Password must be at least 12 characters.");
    process.exit(1);
  }
  const hash = await bcrypt.hash(password, 12);
  console.log("\n=== Add this line to .env.local ===");
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
  console.log("====================================\n");
}

main();
