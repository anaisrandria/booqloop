import { test, expect } from '../fixtures';

const communesMock = [{ nom: 'Paris', codesPostaux: ['75001'] }];

test('inscription réussie redirige vers /home', async ({ page }) => {
  await page.route('**/geo.api.gouv.fr/communes**', async (route) => {
    await route.fulfill({ json: communesMock });
  });

  await page.goto('/register');

  await page.getByLabel("Nom d'utilisateur").fill('nouveau_user');
  await page.getByLabel('Email').fill('nouveau@test.com');
  await page.getByLabel('Mot de passe').fill('password123');
  await page.getByLabel('Ville').fill('Paris');
  await page.getByRole('option', { name: 'Paris (75001)' }).waitFor();
  await page.getByRole('option', { name: 'Paris (75001)' }).click();
  await page.getByRole('button', { name: 'Créer un compte' }).click();

  await expect(page).toHaveURL('/home');
});

test('inscription échouée si email déjà utilisé', async ({ page }) => {
  await page.route('**/geo.api.gouv.fr/communes**', async (route) => {
    await route.fulfill({ json: communesMock });
  });

  await page.goto('/register');

  await page.getByLabel("Nom d'utilisateur").fill('doublon');
  await page.getByLabel('Email').fill('owner@test.com');
  await page.getByLabel('Mot de passe').fill('password123');
  await page.getByLabel('Ville').fill('Paris');
  await page.getByRole('option', { name: 'Paris (75001)' }).waitFor();
  await page.getByRole('option', { name: 'Paris (75001)' }).click();
  await page.getByRole('button', { name: 'Créer un compte' }).click();

  await expect(page.getByRole('alert').filter({ hasText: 'User already exists' })).toBeVisible();
});