import { execSync } from 'child_process';

export default async function globalSetup() {
  execSync(
    'docker compose exec -T web alembic upgrade head',
    {
      env: {
        ...process.env,
        DATABASE_URL: 'postgresql+psycopg2://booqloop:booqloop@db:5432/booqloop_test',
      },
      stdio: 'inherit',
    }
  );
}