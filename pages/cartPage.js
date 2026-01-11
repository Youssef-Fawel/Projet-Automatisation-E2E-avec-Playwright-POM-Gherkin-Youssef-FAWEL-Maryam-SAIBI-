const BasePage = require('./basePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Sélecteurs de la page panier
    this.cartItems = page.locator('tbody tr');
    this.removeButtons = page.locator('a:has-text("Delete")');
    this.totalPrice = page.locator('#totalp');  // Fixed selector
    this.checkoutButton = page.locator('button:has-text("Place Order")');
    this.continueShopping = page.locator('button:has-text("Continue Shopping")');
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/cart.html', { waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(1000);
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async removeItem(index) {
    await this.removeButtons.nth(index).click();
    await this.page.waitForTimeout(1000);
  }

  async getTotalPrice() {
    return await this.totalPrice.textContent();
  }

  async checkout() {
    await this.checkoutButton.click();
    await this.page.waitForTimeout(1000);
  }

  async continueShopping() {
    await this.continueShopping.click();
    await this.page.waitForTimeout(1000);
  }
}

module.exports = CartPage;
