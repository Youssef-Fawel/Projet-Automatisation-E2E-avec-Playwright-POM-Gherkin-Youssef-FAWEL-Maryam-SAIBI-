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
  
  await page.pause();  // Pause après le test
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
    name: 'Youssef FAWEL',
    country: 'France',
    city: 'Paris',
    creditCard: '445698453698745',
    month: '12',
    year: '2025'
  };
  
  await checkoutPage.fillCheckoutForm(checkoutData);
  
  // Vérifier que le nom est rempli
  const nameValue = await page.locator('#name').inputValue();
  expect(nameValue).toBe('Youssef FAWEL');
  
  await page.pause();  // Pause après le test
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
    name: 'Maryam SAIBI',
    country: 'France',
    city: 'Paris',
    creditCard: '4165265635355235',
    month: '12',
    year: '2026'
  };
  
  await checkoutPage.fillCheckoutForm(checkoutData);
  
  // Cliquer sur Purchase
  await checkoutPage.purchase();
  
  // Vérifier le message de confirmation
  const confirmationMessage = await checkoutPage.getConfirmationMessage();
  expect(confirmationMessage).toBeTruthy();
  
  await page.pause();  // Pause après le test
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
  
  // Remplir les informations de paiement
  const paymentData = {
    name: 'Youssef FAWEL',
    country: 'France',
    city: 'Paris',
    creditCard: '5555555555554444',
    month: '06',
    year: '2027'
  };
  
  await checkoutPage.fillCheckoutForm(paymentData);
  
  // Vérifier que les champs sont correctement remplis
  const cardValue = await page.locator('#card').inputValue();
  const monthValue = await page.locator('#month').inputValue();
  const yearValue = await page.locator('#year').inputValue();
  
  expect(cardValue).toBe('5555555555554444');
  expect(monthValue).toBe('06');
  expect(yearValue).toBe('2027');
  
  await page.pause();  // Pause après le test
});
