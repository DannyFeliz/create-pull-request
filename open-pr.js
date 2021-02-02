#!/usr/bin/env node
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const gitRemoteOriginUrl = require('git-remote-origin-url');
const open = require('open');

async function generateLink() {
  try {
    const { stdout, stderr } = await exec('git rev-parse --abbrev-ref HEAD');
    if (stderr) {
      throw stderr;
    }

    const branchName = stdout.trim();
    const remoteOriginUrl = await gitRemoteOriginUrl();
    const newPullRequestUrl = `https://${remoteOriginUrl.replace("git@", "").replace(":", "/").replace(/\.git$/, "")}/pull/new/${branchName}`;

    await open(newPullRequestUrl);
  } catch (error) {
    throw error;
  }
}

generateLink();