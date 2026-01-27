# Contributing to DCYFR AI Node.js Starter Template

Thank you for your interest in contributing! This document provides guidelines for contributing to the DCYFR AI Node.js starter template.

## 🤝 How to Contribute

### Reporting Issues

Before creating an issue:

1. **Search existing issues** to avoid duplicates
2. **Use the issue template** if available
3. **Provide detailed information**:
   - Node.js and npm versions
   - Operating system
   - Steps to reproduce
   - Expected vs actual behavior
   - Error messages and stack traces

### Suggesting Enhancements

Enhancement suggestions are welcome! Please:

1. Check if the enhancement has already been suggested
2. Clearly describe the use case and benefits
3. Provide examples of how it would work
4. Consider backward compatibility

### Pull Requests

We actively welcome pull requests:

1. **Fork the repository** and create a branch from `main`
2. **Make your changes** following our coding standards
3. **Add tests** for new functionality
4. **Update documentation** as needed
5. **Ensure tests pass** with `npm test`
6. **Submit a pull request** with a clear description

## 🛠️ Development Setup

### Prerequisites

- Node.js ≥ 24.13.0
- npm ≥ 11.6.2
- Git

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/dcyfr-ai-nodejs.git
cd dcyfr-ai-nodejs

# Install dependencies
npm install

# Create a feature branch
git checkout -b feature/my-feature

# Make changes and test
npm run type-check
npm run lint
npm test
```

## 📝 Coding Standards

### TypeScript Guidelines

- **Use strict TypeScript** - All code must pass strict type checking
- **Explicit types** - Avoid `any`, prefer explicit types or `unknown`
- **Type exports** - Export types separately from values when possible
- **Prefer interfaces** over type aliases for object shapes

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
}

function getUser(id: string): User {
  // ...
}

// ❌ Avoid
function getUser(id: any): any {
  // ...
}
```

### Code Style

We use ESLint and Prettier for code style:

```bash
# Check code style
npm run lint

# Auto-fix issues
npm run lint:fix

# Format code
npm run format
```

**Key Style Points:**

- Use **2 spaces** for indentation
- Use **single quotes** for strings
- Add **trailing commas** in multi-line structures
- Use **ESM imports** with `.js` extensions
- Prefer **const** over let, avoid var
- Use **async/await** over promises when possible

### Naming Conventions

- **Files**: kebab-case (`user-service.ts`)
- **Classes**: PascalCase (`UserService`)
- **Functions**: camelCase (`getUserById`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRIES`)
- **Interfaces**: PascalCase, no `I` prefix (`User`, not `IUser`)
- **Types**: PascalCase (`ValidationResult`)

### Project Structure

```
src/
├── index.ts              # Main entry point, exports public API
├── lib/                  # Internal utilities
│   ├── logger.ts        # Single-purpose modules
│   └── config.ts
└── types/               # Type definitions only
    └── index.ts
```

## ✅ Testing Guidelines

### Test Requirements

- **Unit tests** required for all new functions/classes
- **Coverage threshold**: 80% for lines, functions, statements
- **Test naming**: Descriptive `should` or `when` statements
- **Test organization**: Group related tests with `describe`

### Writing Tests

```typescript
import { describe, it, expect, beforeEach } from 'vitest';

describe('UserService', () => {
  let service: UserService;
  
  beforeEach(() => {
    service = new UserService();
  });

  it('should create a new user', async () => {
    const user = await service.createUser({ name: 'Alice' });
    expect(user.name).toBe('Alice');
  });

  it('should throw error for invalid input', async () => {
    await expect(service.createUser({ name: '' }))
      .rejects.toThrow('Name is required');
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- tests/unit/logger.test.ts

# Watch mode (development)
npm run test:watch
```

## 📚 Documentation

### Code Documentation

- Add **JSDoc comments** for public APIs
- Include **parameter descriptions** and return types
- Provide **usage examples** for complex functions

```typescript
/**
 * Create a structured logger instance
 * 
 * @param namespace - Logger namespace for organizing logs
 * @returns Logger instance with debug, info, warn, error methods
 * 
 * @example
 * ```typescript
 * const logger = createLogger('app');
 * logger.info('Server started', { port: 3000 });
 * ```
 */
export function createLogger(namespace: string): Logger {
  // ...
}
```

### README Updates

When adding features:

1. Update the main README.md
2. Add examples to the examples/ directory
3. Update GETTING_STARTED.md if it affects setup
4. Add inline code comments for complex logic

## 🔄 Commit Guidelines

### Commit Message Format

Use conventional commits:

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```bash
feat(logger): add support for custom log levels

Add ability to define custom log levels beyond the default
debug, info, warn, error levels.

Closes #123
```

```bash
fix(config): handle missing config file gracefully

Previously would throw error if config.json didn't exist.
Now falls back to defaults as documented.
```

### Commit Best Practices

- **Keep commits atomic** - One logical change per commit
- **Write clear messages** - Explain what and why, not how
- **Reference issues** - Include issue numbers when applicable
- **Sign commits** - Use GPG signing if possible

## 🚀 Release Process

(For maintainers)

1. Update version in package.json
2. Update CHANGELOG.md
3. Create a git tag: `git tag -a v1.0.0 -m "Release v1.0.0"`
4. Push tag: `git push origin v1.0.0`
5. Create GitHub release from tag

## 📋 Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code follows style guidelines
- [ ] Tests pass (`npm test`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] Coverage meets threshold (80%)
- [ ] Documentation updated
- [ ] Commit messages follow conventions
- [ ] PR description clearly explains changes
- [ ] Related issues are referenced

## ❓ Questions?

- **General Questions**: [GitHub Discussions](https://github.com/dcyfr/dcyfr-ai-nodejs/discussions)
- **Bug Reports**: [GitHub Issues](https://github.com/dcyfr/dcyfr-ai-nodejs/issues)
- **Security Issues**: Email security@dcyfr.com (do not open public issues)

## 📜 Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to conduct@dcyfr.com.

## 🙏 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort!

---

**Happy Contributing! 🎉**
