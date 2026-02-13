# Migration Guide: v1.x → v2.x

**Breaking Change:** CLI functionality has been extracted to standalone `@dcyfr/ai-cli` package.

## What Changed

### CLI Extraction

The CLI functionality previously bundled in `@dcyfr/ai-nodejs-starter` has been extracted into a separate, reusable package: **`@dcyfr/ai-cli`**.

**Rationale:**
- **Single Source of Truth** - One CLI codebase used across all DCYFR projects
- **Lighter Starter Template** - Reduced package size and dependencies
- **Global Installation** - CLI can be installed globally: `npm install -g @dcyfr/ai-cli`
- **Reusability** - Same CLI available to all DCYFR ecosystem packages

### What Was Removed

- `src/cli/` directory and all CLI implementation code
- CLI-specific dependencies bundled in the starter template

### What Was Added

- `@dcyfr/ai-cli` as an external dependency
- `npm run cli` script that delegates to `@dcyfr/ai-cli`

## Migration Steps

### For Existing Projects (v1.x → v2.x)

#### 1. Install `@dcyfr/ai-cli`

```bash
npm install @dcyfr/ai-cli
```

#### 2. Remove Old CLI Code (if you have customizations)

If you've customized the CLI in your project:

```bash
# Backup your customizations first!
cp -r src/cli src/cli.backup

# Remove the old CLI directory
rm -rf src/cli
```

#### 3. Update package.json Scripts

Add or update the `cli` script in your `package.json`:

```json
{
  "scripts": {
    "cli": "dcyfr-cli"
  }
}
```

#### 4. Update CLI Usage

**Before (v1.x):**
```bash
npm run cli -- status
```

**After (v2.x):**
```bash
npm run cli -- status   # Works the same!
# OR use globally:
npx dcyfr-cli status
# OR install globally:
npm install -g @dcyfr/ai-cli
dcyfr-cli status
```

### For New Projects

Just use the latest `@dcyfr/ai-nodejs-starter` template - it comes with `@dcyfr/ai-cli` preconfigured.

```bash
npx degit dcyfr/dcyfr-ai-nodejs my-project
cd my-project
npm install
npm run cli -- --help
```

## CLI Customization

### If You Had Custom CLI Commands

If you customized the CLI in your v1.x project:

**Option 1: Contribute to @dcyfr/ai-cli**
Submit a PR to add generic CLI features to the shared package: https://github.com/dcyfr/dcyfr-ai-cli

**Option 2: Create Project-Specific Scripts**
Move custom logic into npm scripts or separate utility scripts:

```json
{
  "scripts": {
    "my-custom-command": "tsx scripts/my-command.ts"
  }
}
```

**Option 3: Use CLI Library Mode**
Import and extend the CLI programmatically:

```typescript
import { runCLI } from '@dcyfr/ai-cli';

async function myCustomCommand() {
  // Your custom logic
  const result = await runCLI(['status']);
  console.log('Status:', result.stdout);
}
```

## FAQs

### Why was the CLI extracted?

**Benefits:**
- Reduces starter template complexity
- Makes CLI available to all DCYFR packages (not just dcyfr-ai-nodejs)
- Enables global installation for developer convenience
- Single source of truth for CLI codebase (easier maintenance)

### Will my existing scripts break?

No! The `npm run cli` script works exactly the same way. It now just delegates to the external `@dcyfr/ai-cli` package instead of bundled code.

### Can I still use the CLI without global install?

Yes! You can use `npx dcyfr-cli` or `npm run cli` without installing globally.

### What if I need features not in @dcyfr/ai-cli?

1. **Contribute:** Submit a feature request or PR to `@dcyfr/ai-cli`
2. **Wrap:** Create wrapper scripts in your project that call `runCLI()` from `@dcyfr/ai-cli`
3. **Separate:** Build a completely separate CLI for project-specific needs

## Support

- **Issues:** https://github.com/dcyfr/dcyfr-ai-cli/issues
- **Discussions:** https://github.com/dcyfr/dcyfr-ai-cli/discussions
- **Email:** hello@dcyfr.ai

## Version Compatibility

| Starter Template Version | CLI Package Version | Compatible |
|--------------------------|---------------------|------------|
| v1.x                    | N/A (bundled)       | ✅         |
| v2.x                    | `@dcyfr/ai-cli` ^1.0.0 | ✅         |

---

**Last Updated:** February 12, 2026  
**Affects:** @dcyfr/ai-nodejs-starter v2.0.0+
