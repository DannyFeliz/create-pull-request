#!/usr/bin/env node
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const gitRemoteOriginUrl = require("git-remote-origin-url");
const open = require("open");

(async () => {
  try {
    const { stdout, stderr } = await exec("git rev-parse --abbrev-ref HEAD");
    if (stderr) {
      throw stderr;
    }
    const branchName = stdout.trim();
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

  const [, , browser = ""] = process.argv;

  return browsers[browser] || "";
}