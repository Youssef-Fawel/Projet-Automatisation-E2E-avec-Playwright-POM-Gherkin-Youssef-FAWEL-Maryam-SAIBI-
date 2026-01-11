const BasePage = require('./basePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    
    // Sélecteurs de la page d'accueil
    this.phoneCategory = page.locator('a:has-text("Phones")');
    this.laptopCategory = page.locator('a:has-text("Laptops")');
    this.monitorCategory = page.locator('a:has-text("Monitors")');
    this.cartLink = page.locator('#cartur');
    this.productLinks = page.locator('.hrefch');
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/');
    await this.page.waitForLoadState('networkidle');
  }

  async clickPhoneCategory() {
    await this.phoneCategory.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickLaptopCategory() {
    await this.laptopCategory.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickMonitorCategory() {
    await this.monitorCategory.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickOnProduct(index) {
    const products = this.page.locator('.hrefch');
    await products.nth(index).click();
    await this.page.waitForLoadState('networkidle');
  }

  async goToCart() {
    await this.cartLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getProductCount() {
    return await this.productLinks.count();
  }
}

module.exports = HomePage;
