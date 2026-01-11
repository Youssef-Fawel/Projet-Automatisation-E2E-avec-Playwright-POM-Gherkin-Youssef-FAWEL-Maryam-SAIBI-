const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');
const CategoryPage = require('../pages/categoryPage');

test('Naviguer vers la catégorie Phone', async ({ page }) => {
  const homePage = new HomePage(page);
  
  await homePage.goto();
  await homePage.clickPhoneCategory();
  
  const productCount = await homePage.getProductCount();
  expect(productCount).toBeGreaterThan(0);
});

test('Naviguer vers la catégorie Laptop', async ({ page }) => {
  const homePage = new HomePage(page);
  
  await homePage.goto();
  await homePage.clickLaptopCategory();
  
  const productCount = await homePage.getProductCount();
  expect(productCount).toBeGreaterThan(0);
});

test('Naviguer vers la catégorie Monitor', async ({ page }) => {
  const homePage = new HomePage(page);
  
  await homePage.goto();
  await homePage.clickMonitorCategory();
  
  const productCount = await homePage.getProductCount();
  expect(productCount).toBeGreaterThan(0);
});
