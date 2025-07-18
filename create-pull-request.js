#!/usr/bin/env node
import gitRemoteOriginUrl from "git-remote-origin-url";
import branchName from "current-git-branch";
import open from "open";
import chalk from "chalk";

const warning = chalk.hex("#FFA500");
const error = chalk.red;

(async () => {
  try {
    let remoteOriginUrl = await gitRemoteOriginUrl();

    if (remoteOriginUrl.startsWith("git@")) {
      remoteOriginUrl = remoteOriginUrl
        .replace(/^git@/, "https://")
        .replace(/(com|org):/, "$1/");
    }

    remoteOriginUrl = remoteOriginUrl.replace(/\.git$/, "");
    const pullRequestURL = getPullRequestUrl(remoteOriginUrl);
    if (!pullRequestURL) {
      return;
    }

    await open(pullRequestURL, { app: getBrowser() });
  } catch (err) {
    console.log(
      error(err.message.charAt(0).toUpperCase() + err.message.slice(1))
    );
  }
})();

/**
 * @param {string} repoUrl
 * @returns {string}
 */
function getPullRequestUrl(repoUrl) {
  const url = new URL(repoUrl);
  if (url.host === "github.com") {
    return `${url}/pull/new/${branchName()}`;
  } else if (url.host === "bitbucket.org") {
    return `${url}/pull-requests/new?source=${branchName()}&t=1#diff`;
  }

  return "";
}

/**
 * @returns {string}
 */
function getBrowser() {
  const browsers = {
    chrome: "chrome",
    firefox: "firefox",
    edge: "msedge",
    safari: "safari",
    ie: "iexplore",
    opera: "opera",
  };

  const [, , userInput] = process.argv;
  const browser = browsers[userInput];

  if (userInput && !browser) {
    console.log(
      warning(
        `Browser "${userInput}" was not found, we will use your default browser.`
      )
    );
  }

  return browser || "";
}
