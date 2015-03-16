browserify-seed
===============

One more seed for web applications based on browserify module loader.

Included:
 * basic structure of directories
 * basic Gulp configuration with dev plan (no dist plan, assuming that module is used as part of external bundle on production)
 * basic testing infractructure
 * basic demo webpage
 * package.json, .jshintrc and .gitignore files
 * some useful and commonly used Browserify transforms (brfs, aliasify)
 * optional ES6 support (through Babelify)
 * SCSS and Autoprefixer for easing CSS development

Feel free to fork and adapt it to your own needs!


## After you clone it... ##
 * remove .git folder and init new repository
 * run "Find & Replace" function in your IDE/text editor and change "browserify-seed" string to your library name in all project files
 * run mass rename on project files and change "browserify-seed" string to your library name
 * analogously, change names of "Example" module and example.* files to name of the first component you want to include in your library (or remove `src/js/lib` directory if you want to do it in another way)
 * in package.json fill repository fields properly
 * remove this README and write your own :)
