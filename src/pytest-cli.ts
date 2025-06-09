#!/usr/bin/env node

import PytestMarkdownGenerator from './pytest-markdown-generator.js';

interface CommandLineOptions {
  source: string | undefined;
  output: string | undefined;
  githubUrl: string | undefined;
  githubBranch: string | undefined;
  repositoryRoot: string | undefined;
  verbose: boolean;
}

function parseArgs(): CommandLineOptions {
  const args = process.argv.slice(2);
  const options: CommandLineOptions = {
    source: undefined,
    output: undefined,
    githubUrl: undefined,
    githubBranch: undefined,
    repositoryRoot: undefined,
    verbose: false
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--source' && i + 1 < args.length) {
      options.source = args[i + 1];
      i++;
    } else if (args[i] === '--output' && i + 1 < args.length) {
      options.output = args[i + 1];
      i++;
    } else if (args[i] === '--github-url' && i + 1 < args.length) {
      options.githubUrl = args[i + 1];
      i++;
    } else if (args[i] === '--github-branch' && i + 1 < args.length) {
      options.githubBranch = args[i + 1];
      i++;
    } else if (args[i] === '--repository-root' && i + 1 < args.length) {
      options.repositoryRoot = args[i + 1];
      i++;
    } else if (args[i] === '--verbose' || args[i] === '-v') {
      options.verbose = true;
    } else if (args[i] === '--help' || args[i] === '-h') {
      printUsage();
      process.exit(0);
    }
  }

  return options;
}

function printUsage(): void {
  console.log(`
Usage: pytest-cli.ts [options]

Options:
  --source <path>          Specify custom source directory (default: ./tests)
  --output <path>          Specify custom output directory (default: ./docs/tests)
  --github-url <url>       GitHub repository URL (e.g., 'https://github.com/username/repo')
  --github-branch <branch> GitHub branch name (default: 'main')
  --repository-root <path> Repository root directory (default: current working directory)
  --verbose, -v            Enable verbose logging (shows extraction details)
  --help, -h               Show this help message

Examples:
  tsx pytest-cli.ts --source ./test --output ./pytest-docs
  
  tsx pytest-cli.ts --github-url https://github.com/username/repo --github-branch main
  
  tsx pytest-cli.ts --source ./tests --github-url https://github.com/username/repo --repository-root ./ --verbose

Supported Test File Patterns:
  - test_*.py (pytest convention)
  - *_test.py (alternative pytest convention)

Supported Documentation Formats:
  - Triple-quoted docstrings with Given/When/Then format
  - Pytest markers (@pytest.mark.*)
  - Class-based and function-based tests
  - Parametrized tests (@pytest.mark.parametrize)
`);
}

async function main(): Promise<void> {
  console.log('🐍 Pytest Test Documentation Generator CLI');
  
  const options = parseArgs();
  
  console.log('📋 Configuration:');
  console.log(`   Source: ${options.source || 'default (./tests)'}`);
  console.log(`   Output: ${options.output || 'default (./docs/tests)'}`);
  console.log(`   GitHub URL: ${options.githubUrl || 'none'}`);
  console.log(`   GitHub Branch: ${options.githubBranch || 'main'}`);
  console.log(`   Repository Root: ${options.repositoryRoot || 'current directory'}`);
  console.log(`   Verbose: ${options.verbose}`);
  console.log('');

  const generator = new PytestMarkdownGenerator({
    sourceDir: options.source,
    outputDir: options.output,
    githubUrl: options.githubUrl,
    githubBranch: options.githubBranch,
    repositoryRoot: options.repositoryRoot,
    verbose: options.verbose
  });

  try {
    await generator.generate();
    console.log('✅ CLI execution completed successfully!');
  } catch (error) {
    console.error('❌ CLI execution failed:', error);
    process.exit(1);
  }
}

// Run the CLI
main();