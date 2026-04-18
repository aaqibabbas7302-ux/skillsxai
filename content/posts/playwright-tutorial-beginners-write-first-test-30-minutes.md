---
title: "Playwright Tutorial for Beginners: Write Your First Test in 30 Minutes"
date: "2026-04-14"
excerpt: "A hands-on Playwright tutorial for complete beginners. Set up your environment, write your first E2E test, use locators, handle assertions, and run tests — all in 30 minutes."
tags: ["Playwright", "Testing", "Tutorial", "Automation"]
---

# Playwright Tutorial for Beginners: Write Your First Test in 30 Minutes

This hands-on tutorial will take you from zero to running your first Playwright test. No prior testing experience needed — just basic familiarity with JavaScript or TypeScript.

By the end of this tutorial, you'll be able to:
- Set up a Playwright project from scratch
- Write and run E2E tests
- Use Playwright's powerful locator strategies
- Debug tests with UI mode and trace viewer
- Run tests in CI with GitHub Actions

## Prerequisites

- **Node.js 18+** installed ([download here](https://nodejs.org))
- A code editor (VS Code recommended)
- Basic JavaScript/TypeScript knowledge

## Step 1: Set Up Your Project (2 minutes)

Open your terminal and run:

```bash
mkdir playwright-demo
cd playwright-demo
npm init playwright@latest
```

When prompted:
- Choose **TypeScript** (recommended)
- Name your tests folder: **tests**
- Add a **GitHub Actions workflow**: Yes
- Install **Playwright browsers**: Yes

This creates a complete project with example tests, config, and CI setup.

## Step 2: Understand the Project Structure

```
playwright-demo/
├── tests/
│   └── example.spec.ts     # Example test
├── playwright.config.ts     # Configuration
├── package.json
└── .github/
    └── workflows/
        └── playwright.yml   # CI config
```

## Step 3: Write Your First Test (5 minutes)

Create a new file `tests/my-first-test.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('Google search works', async ({ page }) => {
  // Navigate to Google
  await page.goto('https://www.google.com');

  // Accept cookies if the dialog appears
  const acceptButton = page.getByRole('button', { name: /Accept/i });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Verify the search box is visible
  const searchBox = page.getByRole('combobox', { name: /Search/i });
  await expect(searchBox).toBeVisible();

  // Type a search query
  await searchBox.fill('Playwright testing tutorial');
  await searchBox.press('Enter');

  // Verify results loaded
  await expect(page).toHaveURL(/search/);
});
```

## Step 4: Run Your Test (1 minute)

```bash
npx playwright test tests/my-first-test.spec.ts
```

You'll see output like:

```
Running 1 test using 1 worker
✓ my-first-test.spec.ts:3:5 › Google search works (3.2s)
1 passed (4.1s)
```

### Run in headed mode (see the browser)

```bash
npx playwright test tests/my-first-test.spec.ts --headed
```

### Run in UI mode (interactive debugging)

```bash
npx playwright test --ui
```

UI mode is incredible for development — you can see each step, inspect the DOM, and re-run tests instantly.

## Step 5: Learn Playwright Locators (10 minutes)

Locators are how you find elements on the page. Playwright recommends **user-facing locators** that match how real users interact with your app:

```typescript
// By role — the most recommended approach
page.getByRole('button', { name: 'Submit' });
page.getByRole('link', { name: 'Sign up' });
page.getByRole('textbox', { name: 'Email' });
page.getByRole('heading', { level: 1 });

// By label — for form fields
page.getByLabel('Email address');
page.getByLabel('Password');

// By placeholder
page.getByPlaceholder('Enter your name');

// By text — for static content
page.getByText('Welcome to our platform');

// By test ID — when no accessible locator works
page.getByTestId('submit-button');
```

### Why not use CSS selectors?

CSS selectors like `.btn-primary` or `#login-form` are fragile — they break when designers rename classes. User-facing locators are resilient because they match what users see, not implementation details.

## Step 6: Assertions (5 minutes)

Playwright uses `expect` for assertions. Here are the most common ones:

```typescript
// Page assertions
await expect(page).toHaveTitle('My App');
await expect(page).toHaveURL(/dashboard/);

// Element assertions
await expect(page.getByText('Success')).toBeVisible();
await expect(page.getByRole('button')).toBeEnabled();
await expect(page.getByLabel('Name')).toHaveValue('John');
await expect(page.getByRole('list')).toHaveCount(5);

// Text content
await expect(page.getByTestId('status')).toHaveText('Active');
await expect(page.getByTestId('status')).toContainText('Act');
```

All assertions auto-wait up to 5 seconds (configurable) for the condition to be true.

## Step 7: A Real-World Test (5 minutes)

Let's write a more realistic test — a login flow:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Login flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('successful login redirects to dashboard', async ({ page }) => {
    await page.getByLabel('Email').fill('user@example.com');
    await page.getByLabel('Password').fill('securepassword');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Welcome back')).toBeVisible();
  });

  test('shows error for invalid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill('wrong@example.com');
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.getByText('Invalid email or password')).toBeVisible();
  });
});
```

## Step 8: Debugging Tests

### Trace Viewer

When a test fails in CI, the trace viewer is your best friend. Enable it in `playwright.config.ts`:

```typescript
export default defineConfig({
  use: {
    trace: 'on-first-retry',
  },
});
```

View the trace:

```bash
npx playwright show-trace trace.zip
```

### VS Code Extension

Install the official [Playwright VS Code extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) for:
- Running tests from the editor
- Setting breakpoints
- Live debugging with browser

## What's Next?

You've written your first Playwright test — congratulations! Here are your next steps:

1. **Page Object Model** — organize tests with reusable page classes
2. **API testing** — test your backend directly
3. **Visual testing** — catch UI regressions with screenshots
4. **CI/CD** — run tests automatically on every commit

Want to master Playwright with hands-on projects and career support? Our [QA Automation Course](/professionals/courses/qa-automation) covers all of this and more in 8 weeks, with 100% placement assistance.

---

*Found this tutorial helpful? Share it with a friend who's learning automation testing!*
