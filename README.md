# DCYFR AI Node.js & TypeScript Starter Template

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D24.13.0-brightgreen)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**A production-ready starter template for building Node.js applications with TypeScript and DCYFR AI framework.**

This template provides a solid foundation for building modern web applications and CLI tools with integrated AI capabilities, strict TypeScript configuration, comprehensive testing setup, and best practices baked in.

**Includes both Web Server (Express) and CLI (Commander) for comprehensive development.**

## ✨ Features

- 🌐 **Express Web Server** - Production-ready HTTP server with middleware
- 🖥️ **Commander CLI** - Full-featured command-line interface
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
# Web Server
npm run serve           # Start development web server
npm start               # Start production web server

# CLI Commands
npm run cli serve       # Start server via CLI
npm run cli status      # Show framework status
npm run cli validate    # Run validation checks
npm run cli telemetry   # Show telemetry info
npm run cli init        # Show getting started info

# Development
npm run dev             # Run in watch mode
npm run build           # Build for production
npm test                # Run tests
npm run test:coverage   # Run tests with coverage
npm run type-check      # Type check only
npm run lint            # Lint code
```

## 📁 Project Structure

```
dcyfr-ai-nodejs/
├── src/
│   ├── index.ts              # Main entry point (router)
│   ├── server.ts             # Express web server
│   ├── cli.ts                # Commander CLI
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

### Web Server

Start the Express web server with DCYFR AI integration:

```bash
npm run serve
```

The server will start on `http://localhost:3000` with the following endpoints:

- `GET /health` - Health check endpoint
- `GET /api/status` - Service status and metrics
- `POST /api/validate` - Validation endpoint
- `GET /api/telemetry/stats` - Telemetry statistics

Example request:

```bash
# Health check
curl http://localhost:3000/health

# Validate data
curl -X POST http://localhost:3000/api/validate \
  -H "Content-Type: application/json" \
  -d '{"data": {"email": "user@example.com"}}'
```

### CLI Commands

Use the command-line interface for various operations:

```bash
# Show framework status
npm run cli status

# Run validation checks
npm run cli validate

# Show telemetry info
npm run cli telemetry

# Start web server via CLI
npm run cli serve --port 3000

# Get help
npm run cli -- --help
```

### Basic Framework Usage

```typescript
import { ValidationFramework, TelemetryEngine } from '@dcyfr/ai';

const telemetry = new TelemetryEngine({
  enabled: true,
  storage: 'file',
  basePath: '.dcyfr/telemetry'
});

const validation = new ValidationFramework({
  failureMode: 'error',
  parallel: true
});

// Use in your application
const result = await validation.validate({
  projectRoot: process.cwd(),
  files: ['src/**/*.ts']
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

## 📦 Versioning

This package uses [Changesets](https://github.com/changesets/changesets) for automated versioning and releases.

### For Contributors

When making changes that affect the public API or user experience:

```bash
npm run changeset
```

This will prompt you to:
1. Select the type of change (patch, minor, major)
2. Provide a brief summary

The changeset will be committed with your code changes. When merged to `main`, an automated "Version Packages" PR will be created.

### Installing Specific Versions

```bash
# Latest version
npm install @dcyfr/ai-nodejs-starter

# Specific version
npm install @dcyfr/ai-nodejs-starter@1.2.3
```

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
