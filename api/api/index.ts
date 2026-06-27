// Vercel serverless entry. Wraps the Express app so the API can run on
// Vercel's free tier as a single catch-all function. Uses the in-memory driver
// (the DataStore is seeded at construction), so no external DB is required for
// the live demo. Note: in serverless, the rate-limit/cache state and the
// trending cron are per-instance and reset on cold start — for a single
// always-on host (Render/Railway) those behave globally; see api/README.md.
import { createApp } from '../src/app';

const app = createApp();

export default app;
