const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');
const ProductDetailPage = require('../pages/productDetailPage');
const CartPage = require('../pages/cartPage');

test('Ajouter un produit au panier', async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetailPage = new ProductDetailPage(page);
  const cartPage = new CartPage(page);
  
  // Aller à l'accueil
  await homePage.goto();
  
  // Cliquer sur Phone
  await homePage.clickPhoneCategory();
  
  // Cliquer sur le premier produit
  await homePage.clickOnProduct(0);
  
  // Ajouter au panier
  await productDetailPage.addToCart();
  
  // Aller au panier
  await homePage.goToCart();
  
  // Vérifier qu'il y a 1 article
  const count = await cartPage.getCartItemCount();
  expect(count).toBe(1);
});

test('Ajouter plusieurs produits au panier', async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetailPage = new ProductDetailPage(page);
  const cartPage = new CartPage(page);
  
  // Ajouter un produit Phone
  await homePage.goto();
  await homePage.clickPhoneCategory();
  await homePage.clickOnProduct(0);
  await productDetailPage.addToCart();
  
  // Revenir et ajouter un produit Laptop
  await homePage.goto();
  await homePage.clickLaptopCategory();
  await homePage.clickOnProduct(0);
  await productDetailPage.addToCart();
  
  // Aller au panier
  await homePage.goToCart();
  
  // Vérifier qu'il y a 2 articles
  const count = await cartPage.getCartItemCount();
  expect(count).toBe(2);
});

test('Supprimer un produit du panier', async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetailPage = new ProductDetailPage(page);
  const cartPage = new CartPage(page);
  
  // Ajouter un produit
  await homePage.goto();
  await homePage.clickPhoneCategory();
  await homePage.clickOnProduct(0);
  await productDetailPage.addToCart();
  
  // Aller au panier
  await homePage.goToCart();
  
  // Vérifier qu'il y a 1 article
  let count = await cartPage.getCartItemCount();
  expect(count).toBe(1);
  
  // Supprimer le produit
  await cartPage.removeItem(0);
  
  // Vérifier qu'il y a 0 articles
  count = await cartPage.getCartItemCount();
  expect(count).toBe(0);
});

test('Vérifier le prix total du panier', async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetailPage = new ProductDetailPage(page);
  const cartPage = new CartPage(page);
  
  // Ajouter un produit
  await homePage.goto();
  await homePage.clickPhoneCategory();
  await homePage.clickOnProduct(0);
  await productDetailPage.addToCart();
  
  // Aller au panier
  await homePage.goToCart();
  
  // Vérifier le prix total
  const total = await cartPage.getTotalPrice();
  expect(total).toBeTruthy();
});

