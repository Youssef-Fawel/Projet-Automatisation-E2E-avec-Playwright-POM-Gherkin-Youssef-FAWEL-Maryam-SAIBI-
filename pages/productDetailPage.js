const BasePage = require('./basePage');

class ProductDetailPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Sélecteurs de la page produit
    this.productName = page.locator('.name');
    this.productPrice = page.locator('.price-container');
    this.productDescription = page.locator('#more-information');
    this.quantityInput = page.locator('input#number');
    this.addToCartButton = page.locator('button:has-text("Add to cart")');
    this.addToWishlistButton = page.locator('a.hrefch:has-text("Add to favorites")');
  }

  async goto(productId) {
    await this.page.goto(`https://www.demoblaze.com/prod.html?idp_=${productId}`);
    await this.page.waitForLoadState('networkidle');
  }

  async getProductName() {
    return await this.productName.textContent();
  }

  async getProductPrice() {
    return await this.productPrice.textContent();
  }

  async getProductDescription() {
    return await this.productDescription.textContent();
  }

  async setQuantity(quantity) {
    await this.quantityInput.clear();
    await this.quantityInput.fill(quantity.toString());
  }

  async addToCart() {
    await this.addToCartButton.click();
    await this.page.waitForTimeout(1000);
  }

  async addToWishlist() {
    await this.addToWishlistButton.click();
  }
}

module.exports = ProductDetailPage;
