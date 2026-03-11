const { test, expect } = require('@playwright/test');
const { TodoPage } = require('./pages/todo-page');

test.describe('TODO priority workflow', () => {
  test.beforeEach(async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('creates tasks with high, medium, and minor priorities and shows correct pills', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.createTask('Priority High Task', 'High');
    await todoPage.createTask('Priority Medium Task', 'Medium');
    await todoPage.createTask('Priority Minor Task', 'Minor');

    const highRow = todoPage.rowByName('Priority High Task');
    await expect(highRow.getByText('High priority')).toBeVisible();

    const mediumRow = todoPage.rowByName('Priority Medium Task');
    await expect(mediumRow.getByText('Medium priority')).toBeVisible();

    const minorRow = todoPage.rowByName('Priority Minor Task');
    await expect(minorRow.getByText('Minor priority')).toBeVisible();
  });
});
