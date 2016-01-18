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

## TypeScript

TypeScript is compiled using `webpack` and `ts-loader`. The `webpack.config.js` controls all of the Javascript compilation and is run as a `gulp` task. This eliminates the need for using the `tsd` module.

## Notes

The `tsconfig.json` contains *Atom Editor* specific flags `buildOnSave` and `compileOnSave`. **PLEASE DON'T REMOVE THESE.**

The `tsconfig.json` contains `gulp` specific flag `filesGlod`, this dynamically build the files array and is used by the `typescript` validator. **PLEASE DON'T REMOVE THESE.**
