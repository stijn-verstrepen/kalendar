import { z } from "zod";

const schema = z.object({
  MONGODB_URI: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.url(),
  ADMIN_EMAIL: z.email(),
  ADMIN_PASSWORD: z.string().min(1),
  APP_URL: z.url(),
  COMPOSIO_API_KEY: z.string().min(1),
});

let parsed: z.infer<typeof schema> | null = null;

export function env() {
  if (parsed) return parsed;
  const result = schema.safeParse(process.env);
  if (!result.success) {
    const missing = result.error.issues.map((i) => i.path.join(".")).join(", ");
    throw new Error(`Missing/invalid env vars: ${missing}`);
  }
  parsed = result.data;
  return parsed;
}
