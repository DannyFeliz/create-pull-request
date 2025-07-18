#!/usr/bin/env node
import gitRemoteOriginUrl from "git-remote-origin-url";
import branchName from "current-git-branch";
import open from "open";
import chalk from "chalk";

// Constants
const SUPPORTED_BROWSERS = {
  chrome: 'google chrome',
  firefox: 'firefox',
  'firefox-dev': 'firefox developer edition',
  edge: 'microsoft edge',
  safari: 'safari',
  opera: 'opera',
  brave: 'brave browser',
};

const SUPPORTED_PLATFORMS = {
  "github.com": (url, branch) => `${url}/pull/new/${branch}`,
  "bitbucket.org": (url, branch) => `${url}/pull-requests/new?source=${branch}&t=1#diff`,
  "gitlab.com": (url, branch) => `${url}/-/merge_requests/new?merge_request[source_branch]=${branch}`,
};

// Chalk styling
const warning = chalk.hex("#FFA500");
const error = chalk.red;
const success = chalk.green;
const info = chalk.blue;

/**
 * Display help information
 */
function displayHelp() {
  console.log(`
${info('Create Pull Request CLI')}

${chalk.bold('Usage:')}
  create-pull-request [browser]

${chalk.bold('Supported Browsers:')}
  ${Object.keys(SUPPORTED_BROWSERS).join(', ')}

${chalk.bold('Supported Platforms:')}
  ${Object.keys(SUPPORTED_PLATFORMS).join(', ')}

${chalk.bold('Examples:')}
  create-pull-request          # Open in default browser
  create-pull-request chrome   # Open in Chrome
  create-pull-request firefox  # Open in Firefox

${chalk.bold('Options:')}
  --help, -h    Show this help message
`);
}

/**
 * Check if help was requested
 * @returns {boolean}
 */
function isHelpRequested() {
  const args = process.argv.slice(2);
  return args.includes('--help') || args.includes('-h');
}

/**
 * Normalize git URL to HTTPS format
 * @param {string} url - The git remote URL
 * @returns {string} - Normalized HTTPS URL
 */
function normalizeGitUrl(url) {
  let normalizedUrl = url;
  
  // Convert SSH to HTTPS
  if (normalizedUrl.startsWith('git@')) {
    normalizedUrl = normalizedUrl
      .replace(/^git@/, 'https://')
      .replace(/(com|org):/, '$1/');
  }
  
  // Remove .git suffix
  return normalizedUrl.replace(/\.git$/, '');
}

/**
 * Get pull request URL for supported platforms
 * @param {string} repoUrl - Repository URL
 * @returns {string} - Pull request URL or empty string if unsupported
 */
function getPullRequestUrl(repoUrl) {
  try {
    const url = new URL(repoUrl);
    const currentBranch = branchName();
    
    if (!currentBranch) {
      throw new Error('Could not determine current branch name');
    }
    
    const platformHandler = SUPPORTED_PLATFORMS[url.host];
    if (platformHandler) {
      return platformHandler(url.origin + url.pathname, currentBranch);
    }
    
    return '';
  } catch (err) {
    throw new Error(`Invalid repository URL: ${err.message}`);
  }
}

/**
 * Get browser from command line arguments
 * @returns {string|null} - Browser name or null for default
 */
function getBrowser() {
  const [, , userInput] = process.argv;
  
  // Skip help flags
  if (userInput === '--help' || userInput === '-h') {
    return null;
  }
  
  const browserName = SUPPORTED_BROWSERS[userInput];

  if (userInput && !browserName) {
    console.log(
      warning(
        `Browser "${userInput}" is not supported. Using default browser instead.`
      )
    );
    console.log(info(`Supported browsers: ${Object.keys(SUPPORTED_BROWSERS).join(', ')}`));
  }

  return browserName || null;
}

/**
 * Main execution function
 */
async function main() {
  try {
    // Check for help request
    if (isHelpRequested()) {
      displayHelp();
      return;
    }

    // Get remote origin URL
    let remoteOriginUrl;
    try {
      remoteOriginUrl = await gitRemoteOriginUrl();
    } catch (err) {
      throw new Error('Not a git repository or no remote origin configured');
    }

    // Normalize the URL
    const normalizedUrl = normalizeGitUrl(remoteOriginUrl);
    
    // Get pull request URL
    const pullRequestURL = getPullRequestUrl(normalizedUrl);
    
    if (!pullRequestURL) {
      const url = new URL(normalizedUrl);
      throw new Error(
        `Platform "${url.host}" is not supported.\nSupported platforms: ${Object.keys(SUPPORTED_PLATFORMS).join(', ')}`
      );
    }

    // Open the URL
    const browserName = getBrowser();
    
    if (browserName) {
      await open(pullRequestURL, { app: { name: browserName } });
      console.log(success('✓ Pull request URL opened successfully!'));
      console.log(info(`URL: ${pullRequestURL}`));
      console.log(info(`Browser: ${browserName}`));
    } else {
      await open(pullRequestURL);
      console.log(success('✓ Pull request URL opened successfully!'));
      console.log(info(`URL: ${pullRequestURL}`));
      console.log(info('Browser: Default'));
    }
    
  } catch (err) {
    console.log(error('✗ Error: ' + err.message));
    process.exit(1);
  }
}

// Execute main function
main();
