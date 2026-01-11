const BasePage = require('./basePage');

class CategoryPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Sélecteurs de la page catégorie
    this.productItems = page.locator('.hrefch');
    this.categoryTitle = page.locator('h1');
    this.nextButton = page.locator('button:has-text("next")');
    this.previousButton = page.locator('button:has-text("previous")');
  }

  async goto(categoryName) {
    if (categoryName === 'phones') {
      await this.page.goto('https://www.demoblaze.com/index.html');
    } else if (categoryName === 'laptops') {
      await this.page.goto('https://www.demoblaze.com/index.html');
    } else if (categoryName === 'monitors') {
      await this.page.goto('https://www.demoblaze.com/index.html');
    }
    await this.page.waitForLoadState('networkidle');
  }

  async getProductCount() {
    return await this.productItems.count();
  }

  async clickOnProduct(index) {
    const products = this.page.locator('.hrefch');
    await products.nth(index).click();
    await this.page.waitForLoadState('networkidle');
  }

  async getProductNames() {
    const products = this.page.locator('.card-title a');
    const names = [];
    const count = await products.count();
    
    for (let i = 0; i < count; i++) {
      const name = await products.nth(i).textContent();
      names.push(name);
    }
    
    return names;
  }

  async goToNextPage() {
    await this.nextButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async goToPreviousPage() {
    await this.previousButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = CategoryPage;
