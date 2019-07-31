const SVGO = require('svgo');
const fs = require('fs');
const walk = require('walk');
const process = require('process');
const path = require('path');

const svgo = new SVGO();
const cwd = process.cwd();

async function optimizeSVG(svgPath) {
  return new Promise((resolve, reject) => {
    const fullPath = path.join(cwd, svgPath);
    fs.readFile(fullPath, 'utf8', (readErr, data) => {
      if (readErr) {
        reject(readErr);
        return;
      }

      svgo.optimize(data)
        .then(({ data: result }) => {
          fs.writeFile(fullPath, result, 'utf8', writeErr => {
            if (writeErr) {
              reject(writeErr);
            } else {
              resolve();
            }
          });
        })
        .catch(reject);
    });
  });
}

exports.onPostBuild = async () => (
  new Promise((resolve, reject) => {
    const walker = walk.walk('public');

    let allSVGs = [];

    walker.on('names', (root, names) => {
      allSVGs = allSVGs.concat(
        names.filter(name => name.substring(name.length - 4) === '.svg')
          .map(name => path.join(root, name)),
      );
    });

    walker.on('errors', reject);

    walker.on('end', async () => {
      await Promise.all(allSVGs.map(optimizeSVG));
      resolve();
    });
  })
);
