const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');
const ProductDetailPage = require('../pages/productDetailPage');
const CartPage = require('../pages/cartPage');
const CheckoutPage = require('../pages/checkoutPage');

test('Accéder à la page de checkout', async ({ page }) => {
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
  
  // Cliquer sur Place Order
  await cartPage.checkout();
  
  // Vérifier que le formulaire s'affiche
  const nameInput = page.locator('#name');
  await expect(nameInput).toBeVisible();
});

test('Remplir le formulaire de checkout', async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetailPage = new ProductDetailPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  
  // Ajouter un produit
  await homePage.goto();
  await homePage.clickPhoneCategory();
  await homePage.clickOnProduct(0);
  await productDetailPage.addToCart();
  
  // Aller au panier
  await homePage.goToCart();
  
  // Cliquer sur Place Order
  await cartPage.checkout();
  
  // Remplir le formulaire
  const checkoutData = {
    name: 'John Doe',
    country: 'USA',
    city: 'New York',
    creditCard: '4111111111111111',
    month: '12',
    year: '2025'
  };
  
  await checkoutPage.fillCheckoutForm(checkoutData);
  
  // Vérifier que le nom est rempli
  const nameValue = await page.locator('#name').inputValue();
  expect(nameValue).toBe('John Doe');
});

test('Compléter un achat complet', async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetailPage = new ProductDetailPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  
  // Ajouter un produit
  await homePage.goto();
  await homePage.clickPhoneCategory();
  await homePage.clickOnProduct(0);
  await productDetailPage.addToCart();
  
  // Aller au panier
  await homePage.goToCart();
  
  // Cliquer sur Place Order
  await cartPage.checkout();
  
  // Remplir le formulaire
  const checkoutData = {
    name: 'Jane Smith',
    country: 'USA',
    city: 'Los Angeles',
    creditCard: '4111111111111111',
    month: '11',
    year: '2026'
  };
  
  await checkoutPage.fillCheckoutForm(checkoutData);
  
  // Cliquer sur Purchase
  await checkoutPage.purchase();
  
  // Vérifier le message de confirmation
  const confirmationMessage = await checkoutPage.getConfirmationMessage();
  expect(confirmationMessage).toBeTruthy();
});

test('Vérifier les informations de paiement', async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetailPage = new ProductDetailPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  
  // Ajouter un produit
  await homePage.goto();
  await homePage.clickLaptopCategory();
  await homePage.clickOnProduct(0);
  await productDetailPage.addToCart();
  
  // Aller au panier
  await homePage.goToCart();
  
  // Cliquer sur Place Order
  await cartPage.checkout();
  
  // Vérifier que les champs de paiement existent
  const cardInput = page.locator('#card');
  const monthInput = page.locator('#month');
  const yearInput = page.locator('#year');
  
  await expect(cardInput).toBeVisible();
  await expect(monthInput).toBeVisible();
  await expect(yearInput).toBeVisible();
});
