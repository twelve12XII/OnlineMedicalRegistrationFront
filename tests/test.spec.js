import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByPlaceholder('passport number').click();
  await page.getByPlaceholder('passport number').fill('123213');
  await page.getByPlaceholder('password').click();
  await page.getByPlaceholder('password').fill('31928948941');
  await page.getByRole('link', { name: 'Create a new account' }).click();
  await page.getByPlaceholder('passport data').click();
  await page.getByPlaceholder('passport data').fill('123');
  await page.getByPlaceholder('MHI policy number').click();
  await page.getByPlaceholder('MHI policy number').fill('412412fsd');
  await page.getByPlaceholder('password').click();
  await page.getByPlaceholder('password').fill('213123');
  await page.getByRole('button', { name: 'Signup' }).click();
  await page.getByRole('button', { name: 'History of visits' }).click();
  await page.getByRole('heading', { name: 'History visits' }).click();
  await page.getByRole('button', { name: 'Search for a doctor' }).click();
  await page.getByPlaceholder('Search by name').click();
  await page.getByRole('button', { name: 'Ivan Ivanov Semenov' }).click();
  await page.getByRole('heading', { name: 'Doctor info' }).click();
  await page.getByRole('button', { name: 'Make an appointment with this doctor' }).click();
  await page.getByRole('button', { name: 'Cancel an appointment with this doctor' }).click();
  await page.getByText('Name: Ivan', { exact: true }).click();
  await page.getByText('Surname: Ivanov').click();
  await page.getByText('Patronymic: Semenov').click();
  await page.getByRole('button', { name: 'Petr Ivanov Romanovich' }).click();
  await page.getByRole('heading', { name: 'Doctor info' }).click();
  await page.getByRole('button', { name: 'Sergey Petrov Nikolaev' }).click();
  await page.getByRole('button', { name: 'Sergey Petrov Nikolaev' }).click();
});