#!/usr/bin/env node
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const gitRemoteOriginUrl = require("git-remote-origin-url");
const open = require("open");
const chalk = require('chalk');
const warning = chalk.keyword('orange');

(async () => {
  try {
    const { stdout, stderr } = await exec("git rev-parse --abbrev-ref HEAD");
    if (stderr) {
      throw stderr;
    }
    const branchName = stdout;
    const remoteOriginUrl = await gitRemoteOriginUrl();
    const newPullRequestUrl = `https://${remoteOriginUrl.replace("git@", "").replace(":", "/").replace(/\.git$/, "")}/pull/new/${branchName}`;
    await open(newPullRequestUrl, { app: getBrowser() });
  } catch (error) {
    throw error;
  }
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