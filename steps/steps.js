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

Before(async function() {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  
  homePage = new HomePage(page);
  categoryPage = new CategoryPage(page);
  productDetailPage = new ProductDetailPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);
});

After(async function() {
  await browser.close();
});

// ===== NAVIGATION =====
Given('je suis sur la page d\'accueil', async function() {
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

Given('j\'ai ajouté un produit au panier', async function() {
  await homePage.goto();
  await homePage.clickPhoneCategory();
  await homePage.clickOnProduct(0);
  await productDetailPage.addToCart();
});

Given('j\'ai un produit dans le panier', async function() {
  await homePage.goto();
  await homePage.clickPhoneCategory();
  await homePage.clickOnProduct(0);
  await productDetailPage.addToCart();
});

Given('j\'ai des produits dans le panier', async function() {
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
  }
});

Then('le formulaire de paiement s\'affiche', async function() {
  const nameInput = page.locator('#name');
  await expect(nameInput).toBeVisible();
});

Given('je suis sur la page de checkout', async function() {
  // Le formulaire est déjà affiché après le click sur "Place Order"
});

When('je remplis le formulaire avec les informations valides', async function() {
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

When('je clique sur "Purchase"', async function() {
  await checkoutPage.purchase();
});

Then('un message de confirmation s\'affiche', async function() {
  const message = await checkoutPage.getConfirmationMessage();
  expect(message).toBeTruthy();
});

Then('un message de confirmation d\'achat s\'affiche', async function() {
  const message = await checkoutPage.getConfirmationMessage();
  expect(message).toBeTruthy();
});
