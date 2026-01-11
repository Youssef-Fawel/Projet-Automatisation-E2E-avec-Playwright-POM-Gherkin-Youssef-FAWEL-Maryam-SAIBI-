class BasePage {
  constructor(page) {
    this.page = page;
    this.baseURL = 'https://www.demoblaze.com';
  }

  async click(selector) {
    await this.page.locator(selector).click();
  }

  async fill(selector, text) {
    await this.page.locator(selector).fill(text);
  }

  async getText(selector) {
    return await this.page.locator(selector).textContent();
  }

  async getCount(selector) {
    return await this.page.locator(selector).count();
  }

  async isVisible(selector) {
    return await this.page.locator(selector).isVisible();
  }

  async waitFor(selector) {
    await this.page.locator(selector).waitFor();
  }

  async goto(path = '/') {
    await this.page.goto(this.baseURL + path);
  }

  async waitForURL(url) {
    await this.page.waitForURL(url);
  }
}

module.exports = BasePage;


