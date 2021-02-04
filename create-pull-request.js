#!/usr/bin/env node
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const gitRemoteOriginUrl = require("git-remote-origin-url");
const open = require("open");

function getBrowser() {
  const browsers = [
    { id: "chrome", value: "chrome" },
    { id: "firefox", value: "firefox" },
    { id: "edge", value: "msedge" },
    { id: "safari", value: "safari" },
    { id: "ie", value: "iexplore" },
    { id: "opera", value: "opera" }
  ];

  let [, , browser = ""] = process.argv;

  if (browser) {
    browser = browsers.find(({ id }) => id == browser.toLowerCase());
    browser = browser ? browser.value : "";
  }

  return browser;
}

(async () => {
  try {
    const { stdout, stderr } = await exec("git rev-parse --abbrev-ref HEAD");
    if (stderr) {
      throw stderr;
    }
    const branchName = stdout.trim();
    const remoteOriginUrl = await gitRemoteOriginUrl();
    const newPullRequestUrl = `https://${remoteOriginUrl.replace("git@", "").replace(":", "/").replace(/\.git$/, "")}/pull/new/${branchName}`;
    const browser = getBrowser();

    await open(newPullRequestUrl, { app: browser });
  } catch (error) {
    throw error;
  }
})();