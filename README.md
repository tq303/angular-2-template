# Angular 2 Template

This is a basic angular 2 template.

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

## TypeScript

TypeScript is compiled using `webpack` and `ts-loader`. The `webpack.config.js` controls all of the Javascript compilation and is run as a `gulp` task. This eliminates the need for using the `tsd` module.

## Notes

This has been designed to work with *TypeScript* and *Atom*, however it is so simple that any flavour could easily be used with `webpack`.

The `tsconfig.json` contains *Atom Editor* specific flags `buildOnSave` and `compileOnSave`. **PLEASE DON'T REMOVE THESE.**

The `tsconfig.json` contains `gulp` specific flag `filesGlod`, this dynamically build the files array and is used by the `typescript` validator. **PLEASE DON'T REMOVE THESE.**
