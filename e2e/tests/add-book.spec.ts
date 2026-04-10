import { test, expect } from '../fixtures';

// Ce test nécessite d'être connecté — on se connecte d'abord
test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('owner@test.com');
  await page.getByLabel('Mot de passe').fill('password123');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await expect(page).toHaveURL('/home');
});

test('ajout d\'un livre redirige vers /profile', async ({ page }) => {
  await page.goto('/profile/add-book');

  await page.getByLabel('Titre').fill('Le Seigneur des Anneaux');
  await page.getByLabel('Auteur·ice').fill('J.R.R. Tolkien');
  await page.getByLabel('Description').fill('Un roman fantastique épique.');
  await page.getByLabel('Année de publication').fill('1954');
  await page.getByLabel("URL de l'image").fill('https://example.com/image.jpg');

  await page.getByLabel('Catégorie').click();
  await page.getByRole('option').first().click();

  await page.getByRole('button', { name: 'Ajouter à ma bibliothèque' }).click();

  await expect(page).toHaveURL('/profile');
});

test('ajout d\'un livre échoue sans titre', async ({ page }) => {
  await page.goto('/profile/add-book');

  await page.getByLabel('Auteur·ice').fill('J.R.R. Tolkien');
  await page.getByLabel('Description').fill('Un roman fantastique épique.');

  await page.getByRole('button', { name: 'Ajouter à ma bibliothèque' }).click();

  await expect(page).toHaveURL('/profile/add-book');
});