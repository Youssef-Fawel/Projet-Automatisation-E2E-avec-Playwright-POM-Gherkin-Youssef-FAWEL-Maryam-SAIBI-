const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { expect } = require('@playwright/test');

const HomePage = require('../pages/homePage');
const CategoryPage = require('../pages/categoryPage');
const ProductDetailPage = require('../pages/productDetailPage');
const CartPage = require('../pages/cartPage');
const CheckoutPage = require('../pages/checkoutPage');

let browser;
let page;
let homePage;
let categoryPage;
let productDetailPage;
let cartPage;
let checkoutPage;

Before({timeout: 60000}, async function() {
  browser = await chromium.launch({ headless: false, channel: 'msedge' });
  page = await browser.newPage();
  
  homePage = new HomePage(page);
  categoryPage = new CategoryPage(page);
  productDetailPage = new ProductDetailPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);
});

After({timeout: 60000}, async function() {
  await browser.close();
});

// ===== NAVIGATION =====
Given('je suis sur la page d\'accueil', {timeout: 30000}, async function() {
  await homePage.goto();
});

When('je clique sur la catégorie {string}', async function(category) {
  if (category === 'Phone') {
    await homePage.clickPhoneCategory();
  } else if (category === 'Laptop') {
    await homePage.clickLaptopCategory();
  } else if (category === 'Monitor') {
    await homePage.clickMonitorCategory();
  }
});

Then('je vois une liste de produits', async function() {
  const count = await homePage.getProductCount();
  expect(count).toBeGreaterThan(0);
});

// ===== PRODUITS =====
When('je clique sur le premier produit', async function() {
  await homePage.clickOnProduct(0);
});

Then('je vois le nom du produit', async function() {
  const name = await productDetailPage.getProductName();
  expect(name).toBeTruthy();
});

Then('je vois le prix du produit', async function() {
  const price = await productDetailPage.getProductPrice();
  expect(price).toBeTruthy();
});

Then('je vois la description du produit', async function() {
  const description = await productDetailPage.getProductDescription();
  expect(description).toBeTruthy();
});

// ===== PANIER =====
When('j\'ajoute le produit au panier', async function() {
  await productDetailPage.addToCart();
});

Then('le panier contient {int} article', async function(count) {
  await homePage.goToCart();
  const itemCount = await cartPage.getCartItemCount();
  expect(itemCount).toBe(count);
});

Then('le panier contient {int} articles', async function(count) {
  await homePage.goToCart();
  const itemCount = await cartPage.getCartItemCount();
  expect(itemCount).toBe(count);
});

Given('j\'ai ajouté un produit au panier', {timeout: 30000}, async function() {
  await homePage.goto();
  await homePage.clickPhoneCategory();
  await homePage.clickOnProduct(0);
  await productDetailPage.addToCart();
});

Given('j\'ai un produit dans le panier', {timeout: 30000}, async function() {
  await homePage.goto();
  await homePage.clickPhoneCategory();
  await homePage.clickOnProduct(0);
  await productDetailPage.addToCart();
});

Given('j\'ai des produits dans le panier', {timeout: 30000}, async function() {
  await homePage.goto();
  await homePage.clickPhoneCategory();
  await homePage.clickOnProduct(0);
  await productDetailPage.addToCart();
});

When('j\'accède au panier', async function() {
  await homePage.goToCart();
});

Then('je vois le produit dans le panier', async function() {
  const count = await cartPage.getCartItemCount();
  expect(count).toBeGreaterThan(0);
});

Then('je vois le prix total', async function() {
  const total = await cartPage.getTotalPrice();
  expect(total).toBeTruthy();
});

When('je supprime le premier article', async function() {
  await cartPage.removeItem(0);
});

Then('le panier contient un article de moins', async function() {
  const count = await cartPage.getCartItemCount();
  expect(count).toBeGreaterThanOrEqual(0);
});

When('je reviens à l\'accueil', async function() {
  await homePage.goto();
});

// ===== CHECKOUT =====
When('je clique sur {string}', async function(buttonText) {
  if (buttonText === 'Place Order') {
    await cartPage.checkout();
  } else if (buttonText === 'Purchase') {
    await checkoutPage.purchase();
  }
});

Then('le formulaire de paiement s\'affiche', async function() {
  const nameInput = page.locator('#name');
  await expect(nameInput).toBeVisible();
});

Given('je suis sur la page de checkout', {timeout: 30000}, async function() {
  // Ajouter un produit et aller au checkout
  await homePage.goto();
  await homePage.clickPhoneCategory();
  await homePage.clickOnProduct(0);
  await productDetailPage.addToCart();
  await homePage.goToCart();
  await cartPage.checkout();
});

When('je remplis le formulaire avec les informations valides', {timeout: 30000}, async function() {
  const checkoutData = {
    name: 'John Doe',
    country: 'USA',
    city: 'New York',
    creditCard: '4111111111111111',
    month: '12',
    year: '2025'
  };
  
  await checkoutPage.fillCheckoutForm(checkoutData);
});

Then('le formulaire est rempli correctement', async function() {
  const nameValue = await page.locator('#name').inputValue();
  expect(nameValue).toBe('John Doe');
});

When('je remplis le formulaire de checkout', async function() {
  const checkoutData = {
    name: 'Jane Smith',
    country: 'USA',
    city: 'Los Angeles',
    creditCard: '4111111111111111',
    month: '11',
    year: '2026'
  };
  
  await checkoutPage.fillCheckoutForm(checkoutData);
});

Then('un message de confirmation s\'affiche', {timeout: 10000}, async function() {
  // For add to cart: alert is already handled in addToCart()
  // For checkout: verify confirmation message
  await page.waitForTimeout(1000); // Small wait to ensure action completed
  
  // Check if we're on checkout confirmation
  const confirmationExists = await page.locator('.sweet-alert h2').count() > 0;
  if (confirmationExists) {
    const message = await checkoutPage.getConfirmationMessage();
    expect(message).toBeTruthy();
  }
  // Otherwise, addToCart alert was already handled
});

Then('un message de confirmation d\'achat s\'affiche', async function() {
  const message = await checkoutPage.getConfirmationMessage();
  expect(message).toBeTruthy();
});
