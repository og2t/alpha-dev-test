# End-to-End Tests

This directory contains end-to-end tests for the Word Reverser application using Playwright.

## Test Files

- **word-reverser.spec.ts** - Tests for the word reversal functionality and UI interactions
- **history.spec.ts** - Tests for the reversed text history and auto-refresh functionality
- **api.spec.ts** - Tests for the API endpoints

## Running Tests

### Run all tests (headless mode)

```bash
yarn test:e2e
```

### Run tests with UI (interactive mode)

```bash
yarn test:e2e:ui
```

### Run tests in headed mode (see browser)

```bash
yarn test:e2e:headed
```

### Debug tests

```bash
yarn test:e2e:debug
```

### View test report

```bash
yarn test:report
```

## Configuration

The Playwright configuration is located in `playwright.config.ts` at the project root.

Key settings:

- Base URL: http://localhost:3001
- Browser: Chromium (Desktop Chrome)
- Retries: 2 on CI, 0 locally
- Timeout: 120 seconds for web server startup

## Notes

- Tests will automatically start the dev server if it's not running
- The history tests create actual database records, so they may accumulate over time
