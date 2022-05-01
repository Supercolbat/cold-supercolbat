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

const pug = require('pug');
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
}

// Find files
const paths = ['styles', 'styles/src', '.'];
let files = [];
paths.forEach((path) => {
    let newPath = Path.join(__dirname, path);
    fs.readdirSync(newPath).forEach((filename) => {
        // Check if the file is of a valid type
        // Also check if the file isn't the one passed in argv
        if (filename.match(/\.(scss|pug)$/g)) {
            files.push(Path.join(newPath, filename));
        }
    });
})

// Compile each file
files.forEach((file) => {
    console.log('[+] Compiling', file);
    let parts = file.split('.')
    let filename = parts[0];
    let extension = parts.pop();

    switch (extension) {
        case 'scss':
            // Requires `sass` to be installed and accessible through the terminal
            // TODO: check for sass

            // Write CSS
            let child_process = spawn('sass', [file, filename + '.css', '--no-source-map']);
            
            child_process.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
            });

            break;
        
        case 'pug':
            let html = pug.compileFile(file)();
            
            // Write formatted HTML
            fs.writeFile(filename + '.html', pretty(html, {ocd: true}), {flag: 'w+'}, err => {
                if (err) console.log(err);
            });
            
            // Write default, minified HTML
            fs.writeFile(filename + '.min.html', minify(html, HTML_MINIFY_OPTIONS), {flag: 'w+'}, err => {
                if (err) console.log(err);
            });

            break;

        default:
            console.error('Unsupported language: ' + extension)
    }
});