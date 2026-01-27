# Getting Started with DCYFR AI Node.js Template

This guide will help you get up and running with the DCYFR AI Node.js & TypeScript starter template.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** version 24.13.0 or higher
- **npm** version 11.6.2 or higher

Check your versions:

```bash
node --version  # Should be v24.13.0 or higher
npm --version   # Should be 11.6.2 or higher
```

## Step 1: Create Your Project

### Option A: Use as Template (Recommended)

If this is a GitHub template repository:

```bash
# Click "Use this template" on GitHub, then:
git clone https://github.com/YOUR_USERNAME/YOUR_PROJECT.git
cd YOUR_PROJECT
```

### Option B: Clone Directly

```bash
git clone https://github.com/dcyfr/dcyfr-ai-nodejs.git my-project
cd my-project
rm -rf .git  # Remove template git history
git init     # Start fresh
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install:
- **@dcyfr/ai** - Core DCYFR AI framework
- **TypeScript** - Type-safe development
- **Vitest** - Fast testing framework
- **ESLint & Prettier** - Code quality tools

## Step 3: Configure Your Project

### Update package.json

Edit `package.json` to customize:

```json
{
  "name": "your-project-name",
  "version": "1.0.0",
  "description": "Your project description",
  "author": "Your Name"
}
```

### Configure DCYFR AI

Edit `.dcyfr.yaml` to match your needs:

```yaml
project:
  name: your-project-name
  type: application  # or 'service', 'cli', 'library'

features:
  telemetry: true    # Enable/disable telemetry
  validation: true   # Enable/disable validation
  plugins: true      # Enable/disable plugins
```

## Step 4: Run Your First Example

### Start the Development Server

```bash
npm run dev
```

You should see output indicating the DCYFR AI framework has initialized:

```
{"timestamp":"2026-01-27T...","level":"info","namespace":"main","message":"Starting DCYFR AI-powered Node.js application..."}
{"timestamp":"2026-01-27T...","level":"info","namespace":"main","message":"DCYFR AI Framework initialized successfully"}
```

### Try the Examples

The template includes several examples:

```bash
# Basic framework usage
npx tsx examples/basic-usage.ts

# Plugin system demonstration
npx tsx examples/plugin-system.ts

# Advanced telemetry features
npx tsx examples/telemetry.ts
```

## Step 5: Write Your First Code

### Create a New Module

Create a new file `src/lib/hello.ts`:

```typescript
import { createLogger } from './logger.js';

const logger = createLogger('hello');

export function greet(name: string): string {
  logger.info('Greeting user', { name });
  return `Hello, ${name}! Welcome to DCYFR AI.`;
}
```

### Add a Test

Create `tests/unit/hello.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { greet } from '@/lib/hello';

describe('greet', () => {
  it('should greet user', () => {
    const result = greet('Alice');
    expect(result).toBe('Hello, Alice! Welcome to DCYFR AI.');
  });
});
```

### Run Your Test

```bash
npm test
```

## Step 6: Build for Production

### Compile TypeScript

```bash
npm run build
```

This creates a `dist/` directory with:
- Compiled JavaScript files
- Type declaration files (.d.ts)
- Source maps for debugging

### Run the Production Build

```bash
npm start
```

## Common Tasks

### Type Checking

Check for TypeScript errors without building:

```bash
npm run type-check
```

### Linting

Check code style and potential issues:

```bash
npm run lint

# Auto-fix issues
npm run lint:fix
```

### Code Formatting

Format code with Prettier:

```bash
npm run format
```

### Testing with Coverage

See how much of your code is tested:

```bash
npm run test:coverage
```

Open `coverage/index.html` in your browser to see the detailed report.

## Project Structure Overview

```
your-project/
├── src/                    # Source code
│   ├── index.ts           # Main entry point
│   ├── lib/               # Utilities and libraries
│   │   ├── logger.ts      # Logging utility
│   │   └── config.ts      # Configuration loader
│   └── types/             # TypeScript type definitions
│       └── index.ts
├── tests/                 # Test files
│   └── unit/             # Unit tests
├── examples/             # Example code
├── dist/                 # Compiled output (generated)
└── coverage/             # Test coverage (generated)
```

## Next Steps

Now that you have the basics down, you can:

1. **Explore the Framework**: Read the [@dcyfr/ai documentation](../dcyfr-ai/README.md)
2. **Add Features**: Build your application logic in `src/`
3. **Write Tests**: Add tests in `tests/unit/` and `tests/integration/`
4. **Create Plugins**: Extend functionality with custom plugins
5. **Configure Deployment**: Set up your deployment pipeline

## Troubleshooting

### Module Resolution Issues

If you see import errors, make sure:
- `"type": "module"` is in package.json
- File extensions include `.js` in imports (even for .ts files)
- Path aliases are configured in both `tsconfig.json` and `vitest.config.ts`

### TypeScript Errors

The template uses strict TypeScript settings. If you need to relax them:

Edit `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,              // Set to false for looser checking
    "noUnusedLocals": false,     // Allow unused variables
    "noUnusedParameters": false  // Allow unused parameters
  }
}
```

### Test Failures

Make sure you're using the correct test command:

```bash
# ✅ Correct
npm test
npm run test:run

# ❌ Avoid (may hang in CI)
npm run test:watch
```

## Getting Help

- **Documentation**: Check the [README.md](./README.md)
- **Examples**: Browse the `examples/` directory
- **Issues**: [Open an issue](https://github.com/dcyfr/dcyfr-ai-nodejs/issues)

---

**Happy Coding! 🚀**
