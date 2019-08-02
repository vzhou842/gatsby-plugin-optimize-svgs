# gatsby-plugin-optimize-svgs

[![Build Status](https://travis-ci.com/vzhou842/gatsby-plugin-optimize-svgs.svg?branch=master)](https://travis-ci.com/vzhou842/gatsby-plugin-optimize-svgs)

A [Gatsby](https://www.gatsbyjs.org/) Plugin to minify SVGs output to the filesystem during the build. Uses [svgo](https://github.com/svg/svgo) under the hood to minify SVGs.

Read the [blog post](https://victorzhou.com/blog/minify-svgs/) on minifying SVGs for some more context.

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

## Example Output

```
59 SVGs minified, reducing the total size from 447780 bytes to 208237 bytes, a reduction of 53.5%!
```
