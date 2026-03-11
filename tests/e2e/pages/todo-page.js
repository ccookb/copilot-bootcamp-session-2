const { expect } = require('@playwright/test');

/**
 * Page Object Model for TODO app interactions used in E2E tests.
 */
class TodoPage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance.
   */
  constructor(page) {
    this.page = page;
    this.itemNameInput = page.getByPlaceholder('Enter item name');
    this.prioritySelect = page.getByLabel('Priority');
    this.addButton = page.getByRole('button', { name: 'Add Item' });
  }

  /**
   * Navigate to the app home route.
   *
   * @returns {Promise<void>}
   */
  async goto() {
    await this.page.goto('/');
  }

  /**
   * Create a task with a provided name and priority.
   *
   * @param {string} name - Task name to create.
   * @param {'high'|'medium'|'minor'} priority - Priority value to assign.
   * @returns {Promise<void>}
   */
  async createTask(name, priority) {
    await this.itemNameInput.fill(name);
    await this.prioritySelect.click();
    await this.page.getByRole('option', { name: new RegExp(`^${priority}$`, 'i') }).click();
    await this.addButton.click();
    await expect(this.rowByName(name)).toBeVisible();
  }

  /**
   * Resolve the list row containing the task name.
   *
   * @param {string} name - Task name to search for.
   * @returns {import('@playwright/test').Locator} Row-like locator.
   */
  rowByName(name) {
    return this.page.locator('li', { hasText: name });
  }
}

module.exports = { TodoPage };
