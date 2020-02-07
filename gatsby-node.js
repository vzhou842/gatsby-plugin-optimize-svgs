const SVGO = require('svgo');
const fs = require('fs');
const walk = require('walk');
const process = require('process');
const path = require('path');

const svgo = new SVGO({
  plugins: [{ removeViewBox: false }],
});
const cwd = process.cwd();

// Resolves with [beforeSize, afterSize]
const optimizeSVG = async svgPath => new Promise((resolve, reject) => {
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
            resolve([data.length, result.length]);
          }
        });
      })
      .catch(reject);
  });
});

exports.onPostBuild = async () => new Promise((resolve, reject) => {
  const walker = walk.walk('public');

  let allSVGs = [];

  walker.on('names', (root, names) => {
    // Add any SVG filepaths found to allSVGs
    allSVGs = allSVGs.concat(
      names.filter(n => n.substring(n.length - 4) === '.svg')
        .map(n => path.join(root, n)),
    );
  });

  walker.on('errors', reject);

  walker.on('end', async () => {
    if (allSVGs.length === 0) {
      // Print a warning if no SVGs were found
      // eslint-disable-next-line no-console
      console.warn('gatsby-plugin-optimize-svgs: No SVGs found to optimize!');
    } else {
      // Calculate and print some stats
      const stats = await Promise.all(allSVGs.map(optimizeSVG));
      const [beforeSize, afterSize] = stats.reduce(([a, b], [c, d]) => [a + c, b + d], [0, 0]);

      // eslint-disable-next-line no-console
      console.log(
        `${stats.length} SVGs minified, reducing the total size from ${beforeSize} bytes to ${afterSize} bytes, a reduction of ${(100 * (beforeSize - afterSize) / beforeSize).toFixed(1)}%!`,
      );
    }
    resolve();
  });
});
