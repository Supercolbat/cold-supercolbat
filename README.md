# A new website?
A website that depends on absolutely **NO Javascript**! (as in javascript on the browser)

Although using React is the standard for websites, I want to support people who don't enable Javascript in their browsers for privacy/security reasons. *im also not using react because react is hard but im just bad*

## ✨ What's special?
1. As stated earlier, absolutely no Javascript is used on the website itself, but that's only the beginning.

2. Any time a link can be avoided, a link will be avoided. In other words, CSS is directly injected into the HTML rather than linking to an external CSS file.

    An exception to this are fonts. While including the raw data into the CSS as a base64 url would work, it would make developing because I have word wrap enabled and... I think you know what that means.

3. All files are minified. Yes, even the HTML. And yes, even the [fonts](https://www.fontsquirrel.com/tools/webfont-generator). While full-blown optimizations aren't done as of right now, this could be the case in the future.

    In addition, the files can be sent in gzip format for further compression. Most browsers automatically do this.

## 🚀 Technologies used
### [Pug](https://github.com/pugjs/pug)
Pug is a template engine for **HTML** which offers a much easier to use syntax over HTML. However, Pug code still needs to be compiled down to HTML for it to be usable.
> Pug is a high-performance template engine heavily influenced by [Haml](http://haml.info/)
> and implemented with JavaScript for [Node.js](http://nodejs.org) and browsers. For bug reports,
> feature requests and questions, [open an issue](https://github.com/pugjs/pug/issues/new).
> For discussion join the [chat room](https://gitter.im/pugjs/pug).

Source: [Pug README](https://github.com/pugjs/pug#readme)

### [Sass](https://github.com/sass/sass)
Like Pug, Sass is a language that compiles to **CSS** that offers a much cleaner syntax. The one used here is [Dart Sass](https://github.com/sass/dart-sass) which is an official implementation of Sass written in [Dart](https://www.dartlang.org). However, they offer a Node.js library which works on top of Dart Sass.
> **Sass makes CSS fun again**. Sass is an extension of CSS, adding nested rules,
> variables, mixins, selector inheritance, and more. It's translated to
> well-formatted, standard CSS using the command line tool or a plugin for your
> build system.

Source: [Sass README](https://github.com/sass/sass#readme)

### [Node.js](https://github.com/nodejs/node)
Ironically, although I've avoiding all Javascript on the website, Javascript is used to build the website. Both Sass and Pug, as well as `compile.js`, run with Node.js.
> Node.js is an open-source, cross-platform, JavaScript runtime environment.

Source: [Node.js README](https://github.com/nodejs/node#readme)

## 📝 Additional Notes
### Minifying
Sass doesn't compile to a minifed CSS. The way I get around this is by using [html-minifed](https://www.npmjs.com/package/html-minifier) and [clean-css](https://www.npmjs.com/package/clean-css) to minify both the CSS and the HTML in one go. The reason this works is because the CSS contents are [directly inserted](https://pugjs.org/language/includes.html) into HTML document by Pug. Since Pug's goal is not to generate minified HTML, that job is passed onto html-minified, which also uses clean-css to minify the CSS in the HTML.