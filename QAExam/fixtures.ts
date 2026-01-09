import { test as base, Page } from '@playwright/test';
import { TodomvcPage } from './pages/todomvcPageLocators.js';

type TestFixtures = {
  todoPage: TodomvcPage;
  setupPage: Page;
};

export const test = base.extend<TestFixtures>({
  // Setup page fixture with common browser configurations
  setupPage: async ({ page }, use) => {
    // Configure page settings
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Set default timeout for actions
    page.setDefaultTimeout(10000);
    
    // Add any global page setup here (e.g., authentication, cookies, etc.)
    
    // Use the configured page
    await use(page);
    
    // Cleanup after test (if needed)
    // await page.close(); // Not needed as Playwright handles this
  },

  // TodoMVC page object fixture
  todoPage: async ({ setupPage }, use) => {
    // Initialize the page object with the configured page
    const todoPage = new TodomvcPage(setupPage);
    
    // Navigate to TodoMVC application
    await todoPage.goto();
    
    // Wait for the page to be fully loaded
    await todoPage.heading.waitFor({ state: 'visible' });
    
    // Use the initialized page object
    await use(todoPage);
    
    // Cleanup after test (if needed)
    // Any cleanup logic can go here
  },
});

export { expect } from '@playwright/test';