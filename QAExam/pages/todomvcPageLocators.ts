import { Page, Locator, expect } from '@playwright/test';

export class TodomvcPage {
  readonly page: Page;
  
  // Locators
  readonly todoInput: Locator;
  readonly todoList: Locator;
  readonly todoItems: Locator;
  readonly toggleAllCheckbox: Locator;
  readonly clearCompletedButton: Locator;
  readonly todoCount: Locator;
  readonly filterAll: Locator;
  readonly filterActive: Locator;
  readonly filterCompleted: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Main input field
    this.todoInput = page.locator('.new-todo');
    
    // Todo list and items
    this.todoList = page.locator('.todo-list');
    this.todoItems = page.locator('.todo-list li');
    
    // Controls
    this.toggleAllCheckbox = page.locator('.toggle-all');
    this.clearCompletedButton = page.locator('.clear-completed');
    
    // Footer elements
    this.todoCount = page.locator('.todo-count');
    this.filterAll = page.locator('a[href="#/"]');
    this.filterActive = page.locator('a[href="#/active"]');
    this.filterCompleted = page.locator('a[href="#/completed"]');
    
    // Header
    this.heading = page.locator('h1');
  }

  // Navigation
  async goto() {
    await this.page.goto('https://todomvc.com/examples/typescript-react/#/');
  }

  // Todo item actions
  async addTodo(text: string) {
    await this.todoInput.fill(text);
    await this.todoInput.press('Enter');
  }

  async addMultipleTodos(todos: string[]) {
    for (const todo of todos) {
      await this.addTodo(todo);
    }
  }

  // Get specific todo item by text
  getTodoByText(text: string): Locator {
    return this.page.locator(`li:has-text("${text}")`);
  }

  // Get todo checkbox by text
  getTodoCheckboxByText(text: string): Locator {
    return this.page.locator(`li:has-text("${text}") .toggle`);
  }

  // Get todo delete button by text
  getTodoDeleteButtonByText(text: string): Locator {
    return this.page.locator(`li:has-text("${text}") .destroy`);
  }

  // Get todo edit input by text
  getTodoEditInputByText(text: string): Locator {
    return this.page.locator(`li:has-text("${text}") .edit`);
  }

  // Todo item interactions
  async completeTodo(text: string) {
    await this.getTodoCheckboxByText(text).check();
  }

  async uncompleteTodo(text: string) {
    await this.getTodoCheckboxByText(text).uncheck();
  }

  async deleteTodo(text: string) {
    const todoItem = this.getTodoByText(text);
    await todoItem.hover();
    await this.getTodoDeleteButtonByText(text).click();
  }

  async editTodo(oldText: string, newText: string) {
    const todoItem = this.getTodoByText(oldText);
    await todoItem.dblclick();
    const editInput = this.getTodoEditInputByText(oldText);
    await editInput.fill(newText);
    await editInput.press('Enter');
  }

  // Bulk actions
  async toggleAllTodos() {
    await this.toggleAllCheckbox.check();
  }

  async clearCompleted() {
    await this.clearCompletedButton.click();
  }

  // Filter actions
  async filterByAll() {
    await this.filterAll.click();
  }

  async filterByActive() {
    await this.filterActive.click();
  }

  async filterByCompleted() {
    await this.filterCompleted.click();
  }

  // Verification methods
  async verifyTodoExists(text: string) {
    await expect(this.getTodoByText(text)).toBeVisible();
  }

  async verifyTodoNotExists(text: string) {
    await expect(this.getTodoByText(text)).not.toBeVisible();
  }

  async verifyTodoCompleted(text: string) {
    await expect(this.getTodoByText(text)).toHaveClass(/completed/);
  }

  async verifyTodoActive(text: string) {
    await expect(this.getTodoByText(text)).not.toHaveClass(/completed/);
  }

  async verifyTodoCount(count: number) {
    if (count === 0) {
      await expect(this.todoCount).not.toBeVisible();
    } else if (count === 1) {
      await expect(this.todoCount).toContainText('1 item left');
    } else {
      await expect(this.todoCount).toContainText(`${count} items left`);
    }
  }

  async verifyNoTodosVisible() {
    await expect(this.todoItems).toHaveCount(0);
  }

  async verifyTodoCountVisible(count: number) {
    await expect(this.todoItems).toHaveCount(count);
  }

  // Helper methods
  async getTodoTexts(): Promise<string[]> {
    const todoLabels = this.page.locator('.todo-list li label');
    return await todoLabels.allTextContents();
  }

  async getActiveTodoCount(): Promise<number> {
    const activeTodos = this.page.locator('.todo-list li:not(.completed)');
    return await activeTodos.count();
  }

  async getCompletedTodoCount(): Promise<number> {
    const completedTodos = this.page.locator('.todo-list li.completed');
    return await completedTodos.count();
  }

  async getTotalTodoCount(): Promise<number> {
    return await this.todoItems.count();
  }
}