import { execSync } from 'child_process';

export default async function globalSetup() {
  console.log('🔄 Migrations sur la DB de test...');
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
  console.log('✅ Migrations terminées');
}