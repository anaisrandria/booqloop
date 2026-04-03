import { test, expect } from '../fixtures';

test('inscription réussie redirige vers /home', async ({ page }) => {
  await page.goto('/register');

  await page.getByLabel("Nom d'utilisateur").fill('nouveau_user');
  await page.getByLabel('Email').fill('nouveau@test.com');
  await page.getByLabel('Mot de passe').fill('password123');
  await page.getByLabel('Ville').fill('Paris');
  await page.getByLabel('Code postal').fill('75001');
  await page.getByLabel('Pays').fill('France');
  await page.getByRole('button', { name: 'Créer un compte' }).click();

  await expect(page).toHaveURL('/home');
});

test('inscription échouée si email déjà utilisé', async ({ page }) => {
  await page.goto('/register');

  // owner@test.com est déjà seedé
  await page.getByLabel("Nom d'utilisateur").fill('doublon');
  await page.getByLabel('Email').fill('owner@test.com');
  await page.getByLabel('Mot de passe').fill('password123');
  await page.getByLabel('Ville').fill('Paris');
  await page.getByLabel('Code postal').fill('75001');
  await page.getByLabel('Pays').fill('France');
  await page.getByRole('button', { name: 'Créer un compte' }).click();

await expect(page.getByRole('alert').filter({ hasText: 'User already exists' })).toBeVisible();
});