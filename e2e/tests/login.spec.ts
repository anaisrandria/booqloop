import { test, expect } from '../fixtures';

test('login réussi redirige vers /home', async ({ page }) => {
  await page.goto('/login');

  await page.getByLabel('Email').fill('owner@test.com');
  await page.getByLabel('Mot de passe').fill('password123');
  await page.getByRole('button', { name: 'Se connecter' }).click();

  await expect(page).toHaveURL('/home');
});

test('login échoué affiche une erreur', async ({ page }) => {
  await page.goto('/login');

  await page.getByLabel('Email').fill('owner@test.com');
  await page.getByLabel('Mot de passe').fill('mauvais_mot_de_passe');
  await page.getByRole('button', { name: 'Se connecter' }).click();

await expect(page.getByRole('alert').filter({ hasText: 'Invalid email and/or password' })).toBeVisible();
});