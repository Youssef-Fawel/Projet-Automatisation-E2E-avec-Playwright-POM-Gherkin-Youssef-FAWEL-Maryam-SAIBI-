module.exports = {
  testDir: './tests',
  
  use: {
    baseURL: 'https://www.demoblaze.com',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    channel: 'msedge',
    launchOptions: {
      slowMo: 500,  // Slow down actions by 500ms
    },
  },

  timeout: 30000,
  expect: { timeout: 5000 },

  fullyParallel: false,
  workers: 1,
  retries: 0,
};
