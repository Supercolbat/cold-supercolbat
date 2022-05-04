/*
  Script that compiles a file using it's respective tool.
  Used with the 'Run on Save' extension for VS Code.
  Configuration for that is found in .vscode/settings.json under 'emeraldwalk.runonsave'.
*/
'use strict';

// Imports
const { spawn } = require('child_process');
const fs = require('fs');
const Path = require('path');

// Compilers
const sass = require('sass-embedded');
const pug = require('pug');

// Formatters
const pretty = require('pretty');
const { minify } = require('html-minifier');
const CleanCSS = require('clean-css');

const HTML_MINIFY_OPTIONS = {
  collapseBooleanAttributes: true,
  removeAttributeQuotes: true,
  removeRedundantAttributes: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  removeOptionalTags: true, // optional
  removeComments: true,
  minifyCSS: new CleanCSS(),
  // minifyURLs: true, // npm install relateurl
};

// Find files
const targets = [
  "styles/index.scss",
  "index.pug"
];

// Compile each file
targets.forEach((file) => {
  console.log('[+] Compiling', file);
  let parts = file.split('.');
  let filename = Path.basename(parts[0]);
  let extension = parts.pop();

  switch (extension) {
    case 'scss':
      // Write CSS
      const result = sass.compile(file);

      fs.writeFileSync(`build/${filename}.css`, result.css, {flag: 'w+'});

      break;

    case 'pug':
      let html = pug.compileFile(file)();
      
      // Write formatted HTML
      fs.writeFileSync(
        `build/${filename}.html`,
        pretty(html, {ocd: true}),
        {flag: 'w+'}
      );
      
      // Write default, minified HTML
      fs.writeFileSync(
        `build/${filename}.min.html`,
        minify(html, HTML_MINIFY_OPTIONS),
        {flag: 'w+'}
      );

      break;

    default:
      console.error('Unsupported language: ' + extension);
  }
});