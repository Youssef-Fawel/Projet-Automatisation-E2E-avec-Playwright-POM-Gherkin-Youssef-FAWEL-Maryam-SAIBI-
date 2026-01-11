const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');
const ProductDetailPage = require('../pages/productDetailPage');

test('Consulter les détails d\'un produit Phone', async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetailPage = new ProductDetailPage(page);
  
  // Aller à l'accueil
  await homePage.goto();
  
  // Cliquer sur Phone
  await homePage.clickPhoneCategory();
  
  // Cliquer sur le premier produit
  await homePage.clickOnProduct(0);
  
  // Vérifier le nom
  const name = await productDetailPage.getProductName();
  expect(name).toBeTruthy();
  
  // Vérifier le prix
  const price = await productDetailPage.getProductPrice();
  expect(price).toBeTruthy();
});

test('Consulter les détails d\'un produit Laptop', async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetailPage = new ProductDetailPage(page);
  
  // Aller à l'accueil
  await homePage.goto();
  
  // Cliquer sur Laptop
  await homePage.clickLaptopCategory();
  
  // Cliquer sur le premier produit
  await homePage.clickOnProduct(0);
  
  // Vérifier le nom
  const name = await productDetailPage.getProductName();
  expect(name).toBeTruthy();
  
  // Vérifier la description
  const description = await productDetailPage.getProductDescription();
  expect(description).toBeTruthy();
});

test('Consulter les détails d\'un produit Monitor', async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetailPage = new ProductDetailPage(page);
  
  // Aller à l'accueil
  await homePage.goto();
  
  // Cliquer sur Monitor
  await homePage.clickMonitorCategory();
  
  // Cliquer sur le premier produit
  await homePage.clickOnProduct(0);
  
  // Vérifier le nom et le prix
  const name = await productDetailPage.getProductName();
  const price = await productDetailPage.getProductPrice();
  
  expect(name).toBeTruthy();
  expect(price).toBeTruthy();
});

test('Ajouter un produit à partir de la page détail', async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetailPage = new ProductDetailPage(page);
  const cartPage = require('../pages/cartPage');
  
  // Aller à l'accueil
  await homePage.goto();
  
  // Cliquer sur Laptop
  await homePage.clickLaptopCategory();
  
  // Cliquer sur le premier produit
  await homePage.clickOnProduct(0);
  
  // Ajouter au panier
  await productDetailPage.addToCart();
  
  // Aller au panier
  await homePage.goToCart();
  
  // Vérifier qu'il y a 1 article
  const CartPage = require('../pages/cartPage');
  const cp = new CartPage(page);
  const count = await cp.getCartItemCount();
  expect(count).toBe(1);
});


