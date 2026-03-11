# Testing Guidelines

These guidelines define testing standards for this repository.

## Unit Tests

- Use Jest to test individual functions and React components in isolation.
- Unit test files must use the naming convention `*.test.js` or `*.test.ts`.
- Backend unit tests must be placed in `packages/backend/__tests__/`.
- Frontend unit tests must be placed in `packages/frontend/src/__tests__/`.
- Name unit test files to match what they are testing (example: `app.test.js` for `app.js`).

## Integration Tests

- Use Jest + Supertest to test backend API endpoints with real HTTP requests.
- Integration tests must be placed in `packages/backend/__tests__/integration/`.
- Integration test files must use the naming convention `*.test.js` or `*.test.ts`.
- Name integration test files based on what they test (example: `todos-api.test.js`).

## End-to-End (E2E) Tests

- Use Playwright as the required framework for complete UI workflow testing through browser automation.
- E2E tests must be placed in `tests/e2e/`.
- E2E test files must use the naming convention `*.spec.js` or `*.spec.ts`.
- Name E2E test files by the user journey they test (example: `todo-workflow.spec.js`).
- Playwright tests must use one browser only.
- Playwright tests must use the Page Object Model (POM) pattern for maintainability.
- Limit E2E coverage to 5-8 critical user journeys, focusing on happy paths and key edge cases.

## Port Configuration

- Always use environment variables with sensible defaults for port configuration.
- Backend must use: `const PORT = process.env.PORT || 3030;`
- Frontend runs on React's default port 3000 and can be overridden with the `PORT` environment variable.
- This enables CI/CD workflows to dynamically detect and assign ports.

## Reliability and Maintainability

- All tests must be isolated and independent.
- Each test must set up its own data and must not rely on other tests.
- Setup and teardown hooks are required so tests succeed on multiple runs.
- All new features must include appropriate tests.
- Tests must remain maintainable and follow best practices.