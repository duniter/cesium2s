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
    token: {
      key: 't',
      description: "Gitlab private token",
      default: false,
      args: 1,
      required: true,
    },
    description: {
      key: 'd',
      description: "Get release description for the given milestone",
      default: false,
      args: 1,
      required: false,
    },
    link: {
      key: 'l',
      description: 'Create assets link. Take 4 positional arguments'
        + 'First 3 are required : "release tag name" ; "asset name" ; "assets url"'
        + 'Last is optional :  "link type", it can be one of "other", "runbook", "image", "package", "other" by default',
      default: false,
      args: '*',
      required: false,
    },
  });

  const GITLAB = new Gitlab({
    host: `https://${GITLAB_HOST_NAME}`,
    token: OPTIONS.token,
  });

  async function checkToken() {
    utils.logMessage('I', LOG_PREFIX, 'check gitlab private token...');
    if (! OPTIONS.token || typeof OPTIONS.token !== 'string') {
      utils.logMessage('E', LOG_PREFIX, 'Gitlab access token not provided');
      process.exit(1);
    };
  }

  async function checkDescription() {
    utils.logMessage('I', LOG_PREFIX, 'check if milestone exists...');
    // Milestone is given as argument for description
    const milestoneTag = OPTIONS.description;
    if (! milestoneTag || typeof milestoneTag !== 'string') {
      utils.logMessage('E', LOG_PREFIX, 'Milestone is not provided');
      process.exit(1);
    }
    try {
      const milestone = await GITLAB.ProjectMilestones.all(GITLAB_PROJECT_ID, {title: milestoneTag});
      if (milestone.length === 0)
        throw new Error(`Can not find milestone '${milestoneTag}' on gitlab`);
    } catch(e) {
      utils.logMessage('E', LOG_PREFIX, e);
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

  async function createAssetsLink() {
    console.debug(typeof OPTIONS.link, OPTIONS.link.length)
    if (typeof OPTIONS.link !== 'object' || OPTIONS.link.length < 3) {
      utils.logMessage('E', LOG_PREFIX, 'Bad link arguments');
      process.exit(1);
    }
    const tag = OPTIONS.link[0];
    const name = OPTIONS.link[1];
    const url = OPTIONS.link[1];
    const type = OPTIONS.link[3] || 'other';
    try {
      utils.logMessage('I', LOG_PREFIX,
        `Create assets_link : tag=${tag}, name=${name}, url=${url}, type=${type}`);
      await GITLAB.ReleaseLinks.create(GITLAB_PROJECT_ID, tag, name, url, {linkType: type});
    } catch(e) {
      utils.logMessage('E', LOG_PREFIX, e);
      process.exit(1);
    }
  }

  async function main() {
    await checkToken();

    if (OPTIONS.description) {
      await checkDescription();
      const releaseDescription = await genReleaseDescription();
      process.stdout.write(releaseDescription);
    }

    if (OPTIONS.link) {
      await createAssetsLink();
    }
  };

  await main();
})().catch(err => console.log(err));
