# Playwright TodoMVC Test Suite

A comprehensive test automation suite for TodoMVC application using Playwright and TypeScript, featuring Page Object Model (POM) design pattern.

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd PlaywrightExam01
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright browsers**:
   ```bash
   npx playwright install
   ```

## Running Tests

### Basic Test Execution

**Run all tests:**
```bash
npx playwright test
```

**Run tests in specific browser:**
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Test Execution with Browser Visibility

**Run tests with visible browser (headed mode):**
```bash
npx playwright test --headed
```

**Run tests with specific browser in headed mode:**
```bash
npx playwright test --headed --project=chromium
```

### Interactive Testing

**Run tests with UI mode (interactive debugging):**
```bash
npx playwright test --ui
```

**Run tests in debug mode:**
```bash
npx playwright test --debug
```

### Specific Test Execution

**Run specific test file:**
```bash
npx playwright test QAExam/example.spec.ts
```

**Run specific test by name:**
```bash
npx playwright test --grep "should add a new todo item"
```

## Test Reports

**View the latest HTML test report:**
```bash
npx playwright show-report
```

**Run tests with trace enabled:**
```bash
npx playwright test --trace on
```

## Project Structure

```
PlaywrightExam01/
├── QAExam/
│   ├── pages/
│   │   └── todomvcPageLocators.ts    # Page Object Model
│   ├── fixtures.ts                  # Custom test fixtures
│   └── example.spec.ts               # Test specifications
├── playwright.config.ts             # Playwright configuration
├── package.json                     # Project dependencies
└── README.md                        # This file
```

## Test Scenarios

The test suite includes the following scenarios:

1. **Display Verification** - Verify page heading displays correctly
2. **Add Todo Item** - Verify user can add new todo items
3. **Complete Todo** - Verify user can mark items as completed
4. **Delete Todo** - Verify user can delete/remove items
5. **Edit Todo** - Verify user can modify existing items

## Page Object Model

The tests use a Page Object Model approach with:
- Clear, reliable locators in `todomvcPageLocators.ts`
- Reusable functions and actions for TodoMVC interactions
- Separation of test logic from page interactions

## Fixtures

The project implements custom Playwright fixtures for better test setup:

### Browser Setup (`setupPage` fixture)
- Configures viewport size (1280x720)
- Sets default timeout for actions
- Provides consistent browser configuration across tests

### Page Initialization (`todoPage` fixture)
- Automatically initializes the TodoMVC page object
- Navigates to the TodoMVC application
- Waits for page to be fully loaded
- Ready-to-use page object in every test

**Usage in tests:**
```typescript
test('should add a todo', async ({ todoPage }) => {
  await todoPage.addTodo('My new task');
  // Test continues with fully initialized page
});
```

## Configuration

Test configuration is managed in `playwright.config.ts` with support for:
- Multiple browsers (Chromium, Firefox, WebKit)
- Parallel test execution
- Test retry on failure
- Screenshot and video capture on failure

## Troubleshooting

**If tests fail to find the browser:**
```bash
npx playwright install
```

**If you encounter module import errors:**
- Ensure all dependencies are installed: `npm install`
- Check that the page object file exists in the correct location

**For debugging failing tests:**
```bash
npx playwright test --debug --headed
```

## CI/CD Integration

The project includes GitHub Actions workflow for automated testing in the `.github/workflows/` directory.