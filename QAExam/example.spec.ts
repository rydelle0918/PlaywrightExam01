import { test, expect } from './fixtures.js';

test.describe('TodoMVC Application', () => {

  test('Scenario#1 Verify once user hit enter key on the What need to do field the item will be added below ', async ({ todoPage }) => {
    const todoText = 'First Item test';
    await todoPage.addTodo(todoText);
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.getTodoByText(todoText)).toBeVisible();
    await expect(todoPage.getTodoByText(todoText)).toContainText('First Item test');
  });

  test('Scenario#2 Verify that user can mark the item as completed', async ({ todoPage }) => {
    const todoText = 'Walk the dog';
    await todoPage.addTodo(todoText);
    const todoItem = todoPage.getTodoByText(todoText);
    const toggleCheckbox = todoItem.locator('.toggle');

    await toggleCheckbox.check();
    await expect(todoItem).toHaveClass(/completed/);
  });

  test('Scenario#3 Verify that user can delete or remove an item', async ({ todoPage }) => {
    const todoText = 'Delete Item Test';
    await todoPage.addTodo(todoText);
    
    // Use the page object method which handles the hover and click properly
    await todoPage.deleteTodo(todoText);
    
    await expect(todoPage.todoItems).toHaveCount(0);
  });

    test('Scenario#4 Verify that user can modify any of the existing item when double clicking', async ({ todoPage }) => {
    const todoText = 'Edit Item Test';
    await todoPage.addTodo(todoText);
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.getTodoByText(todoText)).toBeVisible();

    const todoItem = todoPage.getTodoByText(todoText);
    await todoItem.dblclick();

    const editInput = todoItem.locator('.edit');
    const updatedText = 'Updated Item Test';
    await editInput.fill(updatedText);
    await editInput.press('Enter');

    await expect(todoPage.getTodoByText(updatedText)).toBeVisible();
    await expect(todoPage.getTodoByText(todoText)).not.toBeVisible();
  });

  test('Scenario#5 Verify when user toggle the selection of ALL it will display the list of items together with the completed items', async ({ todoPage }) => {
    const todoTexts = ['Item 1', 'Item 2', 'Item 3'];
    for (const text of todoTexts) {
      await todoPage.addTodo(text);
    }
    await expect(todoPage.todoItems).toHaveCount(3);

    await todoPage.toggleAllTodos();

    for (const text of todoTexts) {
      const todoItem = todoPage.getTodoByText(text);
      await expect(todoItem).toHaveClass(/completed/);
    }
  });

});