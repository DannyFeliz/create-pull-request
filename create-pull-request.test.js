import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  SUPPORTED_BROWSERS,
  SUPPORTED_PLATFORMS,
  isHelpRequested,
  normalizeGitUrl,
  getPullRequestUrl,
  getBrowser,
  displayHelp,
} from './create-pull-request.js';

// Mock the dependencies
vi.mock('current-git-branch', () => ({
  default: vi.fn(() => 'main'),
}));

vi.mock('git-remote-origin-url', () => ({
  default: vi.fn(() => Promise.resolve('https://github.com/user/repo.git')),
}));

vi.mock('open', () => ({
  default: vi.fn(() => Promise.resolve()),
}));

vi.mock('chalk', () => ({
  default: {
    hex: vi.fn(() => vi.fn((text) => text)),
    red: vi.fn((text) => text),
    green: vi.fn((text) => text),
    blue: vi.fn((text) => text),
    bold: vi.fn((text) => text),
  },
}));

describe('create-pull-request CLI', () => {
  let originalArgv;
  let consoleSpy;

  beforeEach(() => {
    // Store original process.argv
    originalArgv = process.argv;
    // Mock console.log to avoid output during tests
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore original process.argv
    process.argv = originalArgv;
    // Restore console.log
    consoleSpy.mockRestore();
    vi.clearAllMocks();
  });

  describe('Constants', () => {
    it('should have correct supported browsers', () => {
      expect(SUPPORTED_BROWSERS).toEqual({
        chrome: 'google chrome',
        firefox: 'firefox',
        'firefox-dev': 'firefox developer edition',
        edge: 'microsoft edge',
        safari: 'safari',
        opera: 'opera',
        brave: 'brave browser',
      });
    });

    it('should have correct supported platforms', () => {
      expect(Object.keys(SUPPORTED_PLATFORMS)).toEqual([
        'github.com',
        'bitbucket.org',
        'gitlab.com',
      ]);
    });

    it('should generate correct GitHub URL', () => {
      const githubHandler = SUPPORTED_PLATFORMS['github.com'];
      expect(githubHandler('https://github.com/user/repo', 'main')).toBe(
        'https://github.com/user/repo/pull/new/main'
      );
    });

    it('should generate correct Bitbucket URL', () => {
      const bitbucketHandler = SUPPORTED_PLATFORMS['bitbucket.org'];
      expect(bitbucketHandler('https://bitbucket.org/user/repo', 'main')).toBe(
        'https://bitbucket.org/user/repo/pull-requests/new?source=main&t=1#diff'
      );
    });

    it('should generate correct GitLab URL', () => {
      const gitlabHandler = SUPPORTED_PLATFORMS['gitlab.com'];
      expect(gitlabHandler('https://gitlab.com/user/repo', 'main')).toBe(
        'https://gitlab.com/user/repo/-/merge_requests/new?merge_request[source_branch]=main'
      );
    });
  });

  describe('isHelpRequested', () => {
    it('should return true for --help flag', () => {
      process.argv = ['node', 'script.js', '--help'];
      expect(isHelpRequested()).toBe(true);
    });

    it('should return true for -h flag', () => {
      process.argv = ['node', 'script.js', '-h'];
      expect(isHelpRequested()).toBe(true);
    });

    it('should return false for no flags', () => {
      process.argv = ['node', 'script.js'];
      expect(isHelpRequested()).toBe(false);
    });

    it('should return false for other flags', () => {
      process.argv = ['node', 'script.js', 'chrome'];
      expect(isHelpRequested()).toBe(false);
    });

    it('should return true when help flag is present with other args', () => {
      process.argv = ['node', 'script.js', 'chrome', '--help'];
      expect(isHelpRequested()).toBe(true);
    });
  });

  describe('normalizeGitUrl', () => {
    it('should convert SSH URL to HTTPS', () => {
      const sshUrl = 'git@github.com:user/repo.git';
      const expected = 'https://github.com/user/repo';
      expect(normalizeGitUrl(sshUrl)).toBe(expected);
    });

    it('should convert SSH URL with .org domain', () => {
      const sshUrl = 'git@bitbucket.org:user/repo.git';
      const expected = 'https://bitbucket.org/user/repo';
      expect(normalizeGitUrl(sshUrl)).toBe(expected);
    });

    it('should remove .git suffix from HTTPS URL', () => {
      const httpsUrl = 'https://github.com/user/repo.git';
      const expected = 'https://github.com/user/repo';
      expect(normalizeGitUrl(httpsUrl)).toBe(expected);
    });

    it('should handle HTTPS URL without .git suffix', () => {
      const httpsUrl = 'https://github.com/user/repo';
      const expected = 'https://github.com/user/repo';
      expect(normalizeGitUrl(httpsUrl)).toBe(expected);
    });

    it('should handle URL with path', () => {
      const url = 'git@gitlab.com:group/subgroup/repo.git';
      const expected = 'https://gitlab.com/group/subgroup/repo';
      expect(normalizeGitUrl(url)).toBe(expected);
    });
  });

  describe('getPullRequestUrl', () => {
    it('should generate GitHub pull request URL', () => {
      const repoUrl = 'https://github.com/user/repo';
      const expected = 'https://github.com/user/repo/pull/new/main';
      expect(getPullRequestUrl(repoUrl)).toBe(expected);
    });

    it('should generate Bitbucket pull request URL', () => {
      const repoUrl = 'https://bitbucket.org/user/repo';
      const expected = 'https://bitbucket.org/user/repo/pull-requests/new?source=main&t=1#diff';
      expect(getPullRequestUrl(repoUrl)).toBe(expected);
    });

    it('should generate GitLab merge request URL', () => {
      const repoUrl = 'https://gitlab.com/user/repo';
      const expected = 'https://gitlab.com/user/repo/-/merge_requests/new?merge_request[source_branch]=main';
      expect(getPullRequestUrl(repoUrl)).toBe(expected);
    });

    it('should return empty string for unsupported platform', () => {
      const repoUrl = 'https://example.com/user/repo';
      expect(getPullRequestUrl(repoUrl)).toBe('');
    });

    it('should throw error for invalid URL', () => {
      const invalidUrl = 'not-a-url';
      expect(() => getPullRequestUrl(invalidUrl)).toThrow('Invalid repository URL');
    });

    it('should handle URLs with paths', () => {
      const repoUrl = 'https://github.com/org/team/repo';
      const expected = 'https://github.com/org/team/repo/pull/new/main';
      expect(getPullRequestUrl(repoUrl)).toBe(expected);
    });
  });

  describe('getBrowser', () => {
    it('should return browser name for valid browser', () => {
      process.argv = ['node', 'script.js', 'chrome'];
      expect(getBrowser()).toBe('google chrome');
    });

    it('should return firefox developer edition for firefox-dev', () => {
      process.argv = ['node', 'script.js', 'firefox-dev'];
      expect(getBrowser()).toBe('firefox developer edition');
    });

    it('should return brave browser for brave', () => {
      process.argv = ['node', 'script.js', 'brave'];
      expect(getBrowser()).toBe('brave browser');
    });

    it('should return null for no browser argument', () => {
      process.argv = ['node', 'script.js'];
      expect(getBrowser()).toBe(null);
    });

    it('should return null for help flag', () => {
      process.argv = ['node', 'script.js', '--help'];
      expect(getBrowser()).toBe(null);
    });

    it('should return null for -h flag', () => {
      process.argv = ['node', 'script.js', '-h'];
      expect(getBrowser()).toBe(null);
    });

    it('should return null and log warning for invalid browser', () => {
      process.argv = ['node', 'script.js', 'invalid-browser'];
      const result = getBrowser();
      
      expect(result).toBe(null);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Browser "invalid-browser" is not supported')
      );
    });

    it('should handle all supported browsers', () => {
      const browserTests = [
        ['chrome', 'google chrome'],
        ['firefox', 'firefox'],
        ['firefox-dev', 'firefox developer edition'],
        ['edge', 'microsoft edge'],
        ['safari', 'safari'],
        ['opera', 'opera'],
        ['brave', 'brave browser'],
      ];

      browserTests.forEach(([input, expected]) => {
        process.argv = ['node', 'script.js', input];
        expect(getBrowser()).toBe(expected);
      });
    });
  });

  describe('displayHelp', () => {
    it('should display help information', () => {
      displayHelp();
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Create Pull Request CLI')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Usage:')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('chrome, firefox, firefox-dev, edge, safari, opera, brave')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('github.com, bitbucket.org, gitlab.com')
      );
    });
  });

  describe('Integration tests', () => {
    it('should handle complete workflow for GitHub repo', () => {
      const sshUrl = 'git@github.com:user/repo.git';
      const normalizedUrl = normalizeGitUrl(sshUrl);
      const pullRequestUrl = getPullRequestUrl(normalizedUrl);
      
      expect(normalizedUrl).toBe('https://github.com/user/repo');
      expect(pullRequestUrl).toBe('https://github.com/user/repo/pull/new/main');
    });

    it('should handle complete workflow for GitLab repo', () => {
      const httpsUrl = 'https://gitlab.com/group/project.git';
      const normalizedUrl = normalizeGitUrl(httpsUrl);
      const pullRequestUrl = getPullRequestUrl(normalizedUrl);
      
      expect(normalizedUrl).toBe('https://gitlab.com/group/project');
      expect(pullRequestUrl).toBe('https://gitlab.com/group/project/-/merge_requests/new?merge_request[source_branch]=main');
    });

    it('should handle browser selection with help flag', () => {
      process.argv = ['node', 'script.js', '--help'];
      
      expect(isHelpRequested()).toBe(true);
      expect(getBrowser()).toBe(null);
    });

    it('should handle browser selection without help flag', () => {
      process.argv = ['node', 'script.js', 'firefox'];
      
      expect(isHelpRequested()).toBe(false);
      expect(getBrowser()).toBe('firefox');
    });
  });
}); 