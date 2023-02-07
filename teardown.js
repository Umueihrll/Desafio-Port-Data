const fs = require('fs').promises;
const os = require('os');
const path = require('path');

const DIR = path.join(".", 'jest_puppeteer_global_setup');
module.exports = async function () {
  // close the browser instance
  await globalThis.__BROWSER_GLOBAL__.close();

  // clean-up the wsEndpoint file
  await fs.rm(DIR, {recursive: true, force: true});
};  