import { createApp } from './app';
import { config } from './config';
import { db } from './db';
import { startRerankCron } from './jobs/rerankTrending';

async function main() {
  await db.init();
  const app = createApp();
  startRerankCron();

  const server = app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(
      `\n  GraphOne API listening on http://localhost:${config.port}` +
        `\n  driver=${config.dbDriver}  env=${config.nodeEnv}` +
        `\n  try: curl http://localhost:${config.port}/stats\n`,
    );
  });

  const shutdown = () => {
    server.close(() => process.exit(0));
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Fatal startup error:', err);
  process.exit(1);
});
