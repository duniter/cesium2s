#!/usr/bin/env node

(async () => {

  const path = require('path');
  const stdio = require('stdio');
  const utils = require('./utils');
  const {Gitlab} = await import('@gitbeaker/rest');

  const LOG_PREFIX = `[${path.basename(__filename)}]`;

  const GITLAB_HOST_NAME = 'git.duniter.org';
  const GITLAB_PROJECT_ID = 'clients/cesium-grp/cesium2s';

  const OPTIONS = stdio.getopt({
    milestone: {
      key: 'm',
      description: "Milestone related to the release",
      default: false,
      args: 1,
      required: true,
    },
    token: {
      key: 't',
      description: "Gitlab private token",
      default: false,
      args: 1,
      required: true,
    },
    description: {
      key: 'd',
      description: "Generate release description corresponding to the milestone and print it to stdout",
      default: false,
      args: 0,
      required: false,
    },
  });

  const GITLAB = new Gitlab({
    host: `https://${GITLAB_HOST_NAME}`,
    token: OPTIONS.token,
  });

  async function checkArgs() {
    utils.logMessage('I', LOG_PREFIX, 'check args...');
    await checkToken();
    await checkMilestone();
  }

  async function checkToken() {
    utils.logMessage('I', LOG_PREFIX, 'check gitlab private token...');
    if (! OPTIONS.token || typeof OPTIONS.token !== 'string') {
      utils.logMessage('E', LOG_PREFIX, 'Gitlab access token not provided');
      process.exit(1);
    };
  }

  async function checkMilestone() {
    utils.logMessage('I', LOG_PREFIX, 'check milestone...');
    if (! OPTIONS.milestone || typeof OPTIONS.milestone !== 'string') {
      utils.logMessage('E', LOG_PREFIX, 'Milestone is not provided');
      process.exit(1);
    }
    let milestone;
    try {
      milestone = await GITLAB.ProjectMilestones.all(GITLAB_PROJECT_ID, {title: OPTIONS.milestone});
    } catch(e) {
      utils.logMessage('E', LOG_PREFIX, e);
      process.exit(1);
    }
    if (milestone.length === 0) {
      utils.logMessage('E', LOG_PREFIX, `Can not find milestone '${OPTIONS.milestone}' on gitlab`);
      process.exit(1);
    }
  }

  async function genReleaseDescription() {
    utils.logMessage('I', LOG_PREFIX, 'get release description...');
    const issues = await genIssuesDescription();
    const changes = await genChangesDescription();
    return '\n# Changes\n\n'  +
            changes +
           '\n# Issues\n\n' +
           issues;
  }

  async function genChangesDescription() {
    utils.logMessage('I', LOG_PREFIX, 'gen changes for release description...');
    try {
      const items = await GITLAB.MergeRequests.all({
        projectId: GITLAB_PROJECT_ID,
        milestone: OPTIONS.milestone,
        state: 'merged',
      });
      if (items.length === 0) return '* no changes\n';
      return items
        .map((i) => `* ${i.title} ([!${i.iid}](${i.web_url}))`)
        .join('\n') + '\n';
    } catch(e) {
      utils.logMessage('E', LOG_PREFIX, e);
      process.exit(1);
    }
  }

  async function genIssuesDescription() {
    utils.logMessage('I', LOG_PREFIX, 'gen issues for release description...');
    try {
      const items = await GITLAB.Issues.all({
        projectId: GITLAB_PROJECT_ID,
        milestone: OPTIONS.milestone,
        state: 'closed',
      });
      if (items.length === 0) return '* no issues fixed\n';
      return items
        .map((i) => `* ${i.title} ([#${i.iid}](${i.web_url}) - ${i.state})`)
        .join('\n') + '\n';
    } catch(e) {
      utils.logMessage('E', LOG_PREFIX, e);
      process.exit(1);
    }
  }

  async function main() {
    await checkArgs();
    if (OPTIONS.description) {
      const releaseDescription = await genReleaseDescription();
      process.stdout.write(releaseDescription);
    }
  };

  await main();
})().catch(err => console.log(err));
