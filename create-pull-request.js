#!/usr/bin/env node
const gitRemoteOriginUrl = require("git-remote-origin-url");
const branchName = require('current-git-branch');
const open = require("open");
const chalk = require('chalk');
const warning = chalk.keyword('orange');

(async () => {
  const remoteOriginUrl = await gitRemoteOriginUrl();
  const transformedUrl = remoteOriginUrl
    .replace(":", "/")
    .replace(/^git@/, "https://")
    .replace(/\.git$/, "");

  const newPullRequestUrl = `${transformedUrl}/pull/new/${branchName()}`;
  await open(newPullRequestUrl, { app: getBrowser() });
})();

function getBrowser() {
  const browsers = {
    "chrome": "chrome",
    "firefox": "firefox",
    "edge": "msedge",
    "safari": "safari",
    "ie": "iexplore",
    "opera": "opera"
  }

  const [, , userInput] = process.argv;
  const browser = browsers[userInput];

  if (userInput && !browser) {
    console.log(warning(`Browser "${userInput}" was not found, we will use your default browser.`));
  }

  return browser || "";
}