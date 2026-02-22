# AGENTS.md - @dcyfr/ai-nodejs-starter

**AI-Powered Node.js & TypeScript Starter Template**

Version: 1.0.0  
Type: Starter template  
License: MIT

---

## 🎯 Project Overview

This is a **production-ready starter template** for building:
- AI-powered Node.js applications
- TypeScript-first backends
- API servers with LLM capabilities

> **Looking for CLI tooling?** See [@dcyfr/ai-cli](../dcyfr-ai-cli) — the standalone command-line interface for the DCYFR AI framework.

**Batteries Included:**
- Pre-configured TypeScript setup
- @dcyfr/ai framework integration
- Testing with Vitest
- Linting with ESLint
- Docker support
- GitHub Actions CI/CD

---

## 🏗️ Architecture Patterns

### 1. Project Structure

```
src/
├── server.ts           # Main application entry point
├── agents/             # Custom AI agents
│   ├── my-agent.ts
│   └── index.ts
├── services/           # Business logic
│   ├── ai-service.ts
│   └── data-service.ts
├── routes/             # API routes (if building API)
│   ├── api.ts
│   └── health.ts
├── utils/              # Shared utilities
│   ├── logger.ts
│   └── config.ts
└── types/              # TypeScript type definitions
    └── index.ts
```

### 2. Server Pattern

```typescript
// src/server.ts
import express from 'express';
import { AgentFramework } from '@dcyfr/ai';
import { myAgent } from './agents';

const app = express();
const framework = new AgentFramework();

// Register agents
framework.registerAgent(myAgent);

// API routes
app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;
  
  const result = await framework.execute('my-agent', {
    input: prompt,
  });
  
  res.json(result);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

### 3. Custom Agent Pattern

```typescript
// src/agents/my-agent.ts
import { BaseAgent, AgentConfig } from '@dcyfr/ai';

export class MyCustomAgent extends BaseAgent {
  constructor(config?: AgentConfig) {
    super({
      name: 'my-custom-agent',
      version: '1.0.0',
      description: 'My custom AI agent',
      ...config,
    });
  }

  async execute(input: string): Promise<string> {
    // Implement your agent logic
    const prompt = this.buildPrompt(input);
    const response = await this.llm.complete(prompt);
    
    return this.processResponse(response);
  }

  private buildPrompt(input: string): string {
    return `You are a helpful assistant. ${input}`;
  }

  private processResponse(response: any): string {
    return response.text;
  }
}
```

---

## 🚀 Getting Started

### Installation

```bash
# Clone the template
git clone https://github.com/dcyfr/dcyfr-ai-nodejs-starter.git my-app
cd my-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Edit .env with your API keys
# OPENAI_API_KEY=sk-...
# ANTHROPIC_API_KEY=...
```

### Development

```bash
# Run in development mode
npm run dev

# Run tests
npm run test

# Type checking
npm run typecheck

# Lint
npm run lint
```

### Production Build

```bash
# Build
npm run build

# Run production server
npm start

# Or use PM2
pm2 start dist/server.js --name my-app
```

---

## 🧪 Testing

### Unit Tests

```typescript
// tests/agents/my-agent.test.ts
import { describe, it, expect } from 'vitest';
import { MyCustomAgent } from '../../src/agents/my-agent';

describe('MyCustomAgent', () => {
  it('should execute successfully', async () => {
    const agent = new MyCustomAgent({
      provider: 'mock',  // Use mock provider in tests
    });
    
    const result = await agent.execute('test input');
    
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });
});
```

### Integration Tests

```typescript
// tests/integration/api.test.ts
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../src/server';

describe('API Integration', () => {
  it('POST /api/generate should return result', async () => {
    const response = await request(app)
      .post('/api/generate')
      .send({ prompt: 'Hello' });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('result');
  });
});
```

---

## 🐳 Docker Support

### Dockerfile

```dockerfile
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

EXPOSE 3000

CMD ["node", "dist/server.js"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    volumes:
      - ./data:/app/data
```

**Usage:**
```bash
# Build and run
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f
```

---

## 🔧 Configuration

### Environment Variables

```bash
# .env
NODE_ENV=development
PORT=3000

# LLM Providers
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
OLLAMA_BASE_URL=http://localhost:11434

# Application
LOG_LEVEL=info
DATABASE_URL=postgresql://...
```

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

---

## 📦 Dependencies

### Core Dependencies
- `@dcyfr/ai` - AI agent framework
- `express` - Web framework (optional)
- `dotenv` - Environment variable management

### Dev Dependencies
- `typescript` - TypeScript compiler
- `vitest` - Testing framework
- `eslint` - Code linting
- `tsx` - TypeScript execution
- `@types/node` - Node.js type definitions

---

## 🚢 Deployment

### Vercel (Serverless)

```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server.js"
    }
  ]
}
```

### Railway

```toml
# railway.toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm start"
restartPolicyType = "ON_FAILURE"
```

### Fly.io

```toml
# fly.toml
app = "my-ai-app"

[build]
  builder = "heroku/buildpacks:20"

[[services]]
  internal_port = 3000
  protocol = "tcp"

  [[services.ports]]
    port = 80
    handlers = ["http"]

  [[services.ports]]
    port = 443
    handlers = ["tls", "http"]
```

---

## 🔒 Security Best Practices

1. **Never commit secrets** - Use environment variables
2. **Validate all inputs** - Especially user-provided prompts
3. **Rate limiting** - Implement rate limiting for API endpoints
4. **Error handling** - Don't expose sensitive error details
5. **HTTPS only** - Always use HTTPS in production
6. **Dependency scanning** - Regularly update dependencies

---

## 📚 Examples

See [examples/](examples/) directory for:
- Basic server setup
- Custom agent examples
- Integration patterns
- Testing examples

---

## 🔗 Related Resources

- [@dcyfr/ai Documentation](https://github.com/dcyfr/dcyfr-ai)
- [Proof of Concept](PROOF_OF_CONCEPT.md)
- [Integration Notes](INTEGRATION_NOTES.md)
- [Getting Started Guide](GETTING_STARTED.md)

---

**Last Updated:** February 1, 2026  
**Template Type:** Starter/Boilerplate  
**Recommended For:** AI-powered Node.js backends

## Quality Gates
- TypeScript: 0 errors (`npm run typecheck`)
- Tests: ≥99% pass rate (`npm run test`)
- Lint: 0 errors (`npm run lint`)
