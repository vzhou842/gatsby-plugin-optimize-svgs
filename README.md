# gatsby-plugin-optimize-svgs

[![Build Status](https://travis-ci.com/vzhou842/gatsby-plugin-optimize-svgs.svg?branch=master)](https://travis-ci.com/vzhou842/gatsby-plugin-optimize-svgs)

A [Gatsby](https://www.gatsbyjs.org/) Plugin to minify SVGs at the end of the build.

Uses [svgo](https://github.com/svg/svgo) under the hood to minify SVGs.

## Usage

Install:

```
$ npm install gatsby-plugin-optimize-svgs
```

Add to `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    'gatsby-plugin-optimize-svgs',
  ],
};
```
