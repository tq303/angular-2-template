# Angular 2 Template

This is a basic angular 2 template.

## Prerequisites

*Node.js* server is written with *ES6* modules so *node.js* `4.2.3` or higher is required.
*Angular* application is written in *TypeScript* and was designed for *Atom*.

## Install
```bash

npm install

```

## Gulp

Has build or watch options.

```bash

gulp build:development
gulp watch

```

## Server

Default port is set at `8888`. To start run command.

```bash

node .

```

Files are currently served from `./dist` which is created after the build step.

## TypeScript

TypeScript is compiled using `webpack` and `ts-loader`. The `webpack.config.js` controls all of the Javascript compilation and is run as a `gulp` task. This eliminates the need for using the `tsd` module.

## Notes

This has been designed to work with *TypeScript* and *Atom*, however it is so simple that any flavour could easily be used with `webpack`.

The `tsconfig.json` contains *Atom Editor* specific flags `buildOnSave` and `compileOnSave`. **PLEASE DON'T REMOVE THESE.**
