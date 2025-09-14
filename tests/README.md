# FeedFlow Tests

This directory contains all test files for the FeedFlow application.

## Structure

```
tests/
├── __tests__/              # Jest test files
│   ├── components/         # Component tests
│   ├── pages/             # Page tests
│   ├── api/               # API route tests
│   └── lib/               # Utility and service tests
├── __mocks__/             # Mock files
├── fixtures/              # Test data and fixtures
└── setup/                 # Test setup and configuration
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## Testing Strategy

- **Unit Tests**: Test individual components and utilities
- **Integration Tests**: Test API endpoints and service integrations
- **End-to-End Tests**: Test complete user workflows
- **Component Tests**: Test React components in isolation

## Test Files

Test files should follow the naming convention:
- `*.test.ts` for unit tests
- `*.test.tsx` for React component tests
- `*.e2e.test.ts` for end-to-end tests