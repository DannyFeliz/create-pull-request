# Contributing to create-pull-request

Thank you for your interest in contributing to create-pull-request! This document provides guidelines and information about the development workflow.

## Development Setup

### Prerequisites

- Node.js >= 20
- npm (comes with Node.js)

### Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/create-pull-request.git
   cd create-pull-request
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run tests**
   ```bash
   npm test
   ```

4. **Test the CLI**
   ```bash
   node create-pull-request.js --help
   ```

## Testing

We use [Vitest](https://vitest.dev/) for testing. The test suite includes:

- **Unit tests** for all core functions
- **Integration tests** for complete workflows
- **Edge case testing** for error handling
- **Mocked dependencies** for isolated testing

### Running Tests

```bash
# Run tests in watch mode (recommended during development)
npm test

# Run tests once
npm run test:run

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode with coverage
npm run test:watch
```

### Coverage Thresholds

The project maintains the following coverage thresholds:

- **Statements**: 70%
- **Branches**: 85%
- **Functions**: 85%
- **Lines**: 70%

## Continuous Integration (CI)

The project uses GitHub Actions for CI/CD. The workflow runs:

### Test Matrix

- **Node.js versions**: 20.x, 22.x, latest
- **Operating systems**: Ubuntu, macOS, Windows
- **Total combinations**: 9 different environments

### CI Jobs

1. **Test Job**
   - Runs all tests on the matrix combinations
   - Generates coverage reports
   - Uploads coverage to Codecov (Ubuntu + Node 20.x only)

2. **Lint Job**
   - Validates package.json
   - Tests CLI functionality
   - Performs basic sanity checks

### Workflow Triggers

The CI runs on:
- Push to `main` and `develop` branches
- Pull requests targeting `main` and `develop`

## Code Quality

### Coverage Requirements

All new code should maintain or improve test coverage. The CI will fail if coverage drops below the thresholds.

### Browser Support

When adding new browser support, ensure:

1. **Add browser to `SUPPORTED_BROWSERS`** in `create-pull-request.js`
2. **Update tests** in `create-pull-request.test.js`
3. **Update README** with new browser information
4. **Test manually** that the browser opens correctly

### Platform Support

When adding new platform support:

1. **Add platform handler** to `SUPPORTED_PLATFORMS`
2. **Add comprehensive tests** for URL generation
3. **Update documentation** in README
4. **Test with real repositories** from that platform

## Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write code following existing patterns
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**
   ```bash
   npm run test:coverage
   ```

4. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing new feature"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Wait for CI**
   - All tests must pass
   - Coverage must meet thresholds
   - CLI functionality must work

## Development Tips

### Testing Strategy

- **Test the happy path**: Ensure normal usage works
- **Test edge cases**: Invalid inputs, network errors, etc.
- **Test integration**: Complete workflows from start to finish
- **Mock external dependencies**: Keep tests fast and reliable

### Debugging Tests

```bash
# Run a specific test file
npx vitest create-pull-request.test.js

# Run tests with specific pattern
npx vitest --grep "normalizeGitUrl"

# Run tests with debug output
npx vitest --reporter=verbose
```

### Local Development

```bash
# Link the package locally for testing
npm link

# Now you can test the CLI globally
create-pull-request --help

# Unlink when done
npm unlink
```

## Release Process

1. **Ensure all tests pass**
2. **Update version** in `package.json`
3. **Create release notes**
4. **Tag the release**
5. **Publish to npm**

## Getting Help

- **Issues**: [GitHub Issues](https://github.com/DannyFeliz/create-pull-request/issues)
- **Discussions**: [GitHub Discussions](https://github.com/DannyFeliz/create-pull-request/discussions)

## Code of Conduct

Please be respectful and professional in all interactions. We want to maintain a welcoming environment for all contributors.

---

Thank you for contributing! 🎉 