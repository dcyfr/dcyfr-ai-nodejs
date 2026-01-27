# DCYFR AI Node.js & TypeScript Starter Template

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D24.13.0-brightgreen)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**A production-ready starter template for building Node.js applications with TypeScript and DCYFR AI framework.**

This template provides a solid foundation for building modern Node.js applications with integrated AI capabilities, strict TypeScript configuration, comprehensive testing setup, and best practices baked in.

## ✨ Features

- 🤖 **DCYFR AI Integration** - Built-in AI framework with plugins, validation, and telemetry
- 📘 **TypeScript Strict Mode** - Full type safety with strict compiler options
- ⚡ **Modern Node.js** - ESM modules, Node.js 24+, latest features
- 🧪 **Vitest Testing** - Fast unit testing with coverage reporting
- 🔧 **Developer Experience** - Hot reload, source maps, path aliases
- 📊 **Structured Logging** - JSON-based logging with multiple levels
- 🔌 **Plugin System** - Extensible architecture with custom plugins
- ✅ **Code Quality** - ESLint, Prettier, strict validation
- 📦 **Ready to Deploy** - Production build configuration included

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 24.13.0
- **npm** ≥ 11.6.2

### Installation

```bash
# Clone or use this template
git clone <your-repo-url> my-project
cd my-project

# Install dependencies
npm install

# Start development
npm run dev
```

### Development

```bash
# Run in development mode with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Type check
npm run type-check

# Lint code
npm run lint
```

## 📁 Project Structure

```
dcyfr-ai-nodejs/
├── src/
│   ├── index.ts              # Main entry point
│   ├── lib/
│   │   ├── logger.ts         # Structured logging utility
│   │   └── config.ts         # Configuration loader
│   └── types/
│       └── index.ts          # TypeScript type definitions
├── examples/
│   ├── basic-usage.ts        # Basic framework usage
│   ├── plugin-system.ts      # Custom plugin examples
│   └── telemetry.ts          # Advanced telemetry
├── tests/
│   └── unit/
│       ├── logger.test.ts    # Logger tests
│       └── config.test.ts    # Config tests
├── .dcyfr.yaml               # DCYFR AI configuration
├── tsconfig.json             # TypeScript configuration
├── vitest.config.ts          # Test configuration
└── package.json              # Project metadata
```

## 🎯 Usage Examples

### Basic Framework Usage

```typescript
import { DCYFRFramework } from '@dcyfr/ai';

const framework = new DCYFRFramework({
  telemetry: { enabled: true },
  validation: { enabled: true, strict: true }
});

await framework.initialize();

const result = await framework.validate({
  type: 'user-input',
  data: { email: 'user@example.com' }
});

if (result.valid) {
  console.log('Validation passed!');
}
```

### Custom Plugin

```typescript
import type { Plugin } from './src/types';

class MyPlugin implements Plugin {
  name = 'my-plugin';
  version = '1.0.0';
  
  async initialize() {
    console.log('Plugin initialized');
  }
  
  async shutdown() {
    console.log('Plugin shutdown');
  }
}
```

### Structured Logging

```typescript
import { createLogger } from './src/lib/logger';

const logger = createLogger('app');

logger.info('Application started', { 
  version: '1.0.0',
  environment: 'production'
});

logger.error('Operation failed', {
  error: error.message,
  stack: error.stack
});
```

## 🔧 Configuration

### DCYFR AI Configuration (`.dcyfr.yaml`)

```yaml
version: "1.0"
project:
  name: my-project
  type: application

features:
  telemetry: true
  validation: true
  plugins: true

validation:
  rules:
    require-esm: error
    require-strict-types: error
```

### Application Configuration

Create a `config.json` in the project root to override defaults:

```json
{
  "telemetry": {
    "enabled": true,
    "level": "debug"
  },
  "validation": {
    "enabled": true,
    "strict": true
  },
  "server": {
    "port": 8080,
    "host": "0.0.0.0"
  }
}
```

## 🧪 Testing

The template includes comprehensive testing setup with Vitest:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

Coverage thresholds are configured at 80% for lines, functions, and statements.

## 📦 Building for Production

```bash
# Clean previous builds
npm run clean

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start
```

The build outputs to the `dist/` directory with:
- Compiled JavaScript (ES2022)
- Type declarations (.d.ts)
- Source maps

## 🛠️ Customization

### Adding New Features

1. Create feature files in `src/`
2. Add types to `src/types/`
3. Write tests in `tests/unit/`
4. Update exports in `src/index.ts`

### Creating Plugins

1. Implement the `Plugin` interface
2. Add plugin configuration to `.dcyfr.yaml`
3. Initialize in your application code

### Path Aliases

TypeScript path aliases are configured:

```typescript
import { logger } from '@/lib/logger';      // src/lib/logger.ts
import { MyTest } from '@tests/helpers';    // tests/helpers.ts
```

## 📚 Documentation

- **Getting Started**: [GETTING_STARTED.md](./GETTING_STARTED.md)
- **Contributing**: [CONTRIBUTING.md](./CONTRIBUTING.md)
- **DCYFR AI Docs**: [@dcyfr/ai documentation](../dcyfr-ai/README.md)

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🔗 Related Projects

- [@dcyfr/ai](../dcyfr-ai) - Core DCYFR AI framework
- [@dcyfr/agents](../dcyfr-agents) - DCYFR validation agents
- [dcyfr-labs](../dcyfr-labs) - Reference implementation

## 💬 Support

- **Issues**: [GitHub Issues](https://github.com/dcyfr/dcyfr-ai-nodejs/issues)
- **Discussions**: [GitHub Discussions](https://github.com/dcyfr/dcyfr-ai-nodejs/discussions)
- **Documentation**: [DCYFR AI Docs](https://github.com/dcyfr/dcyfr-ai)

---

**Built with ❤️ by DCYFR** | [Website](https://dcyfr.com) | [GitHub](https://github.com/dcyfr)
