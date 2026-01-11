const BasePage = require('./basePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Sélecteurs de la page checkout
    this.nameInput = page.locator('#name');
    this.countryInput = page.locator('#country');
    this.cityInput = page.locator('#city');
    this.creditCardInput = page.locator('#card');
    this.monthInput = page.locator('#month');
    this.yearInput = page.locator('#year');
    this.purchaseButton = page.locator('button:has-text("Purchase")');
    this.closeButton = page.locator('button:has-text("Close")');
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/cart.html');
    await this.page.waitForLoadState('networkidle');
  }

  async fillCheckoutForm(data) {
    const { name, country, city, creditCard, month, year } = data;
    
    await this.nameInput.fill(name);
    await this.countryInput.fill(country);
    await this.cityInput.fill(city);
    await this.creditCardInput.fill(creditCard);
    await this.monthInput.fill(month);
    await this.yearInput.fill(year);
  }

  async purchase() {
    await this.purchaseButton.click();
    await this.page.waitForTimeout(2000);
  }

  async getConfirmationMessage() {
    const message = this.page.locator('.sweet-alert h2');
    return await message.textContent();
  }

  async closeModal() {
    await this.closeButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = CheckoutPage;
