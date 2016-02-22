# webpack-typescript clean source demo

WebPack with TypeScript is a bit tricky to get working properly. There are two immediate issues that need to be solved fist:

1. In addition to TypeScript imports, WebPack needs extra `require` statements for every import to build the dependency tree for bundling. Otherwise, a module won't be packaged if the export is not used directly (for example if you only used a type reference during compile time)
2. TypeScript won't understand `require` statements that are needed for webpack to build the dependency tree for bundling

This example project is a proof of concept that solves this problem using the [preprocessor loader](https://github.com/artificialtrends/preprocess-loader), so that you don't have to change your code at all to make this work properly.

## For the demo to work, clone this repo, then:
```
npm install
npm install -g webpack
webpack
```

Then open `index.html` and check that both ClassA and ClassB are packaged properly (they log a message in the browser console and are included in the bundle.js).

Verify that the `.ts` sources don't include the workaround scripts.

## What is happening

These imports exist in the code `entry.ts`:

```
import ClassA = require('ClassA');
import ClassB = require('ClassB');
```

**First**, this is not enough for WebPack to understand it needs to always bundle `ClassA.ts` and `ClassB.ts`, even if the exports are not directly used, but only referenced. To fix this, we need to add extra WebPack-only imports:

```
require('ClassA'); 
import ClassA = require('ClassA');
require('ClassB'); 
import ClassB = require('ClassB');
```

**second**, to prevent TypeScript from throwing an error because it doesn't recognize `require` statements, we need to add an extra line on top:

```
declare var require: any;

require('ClassA'); 
import ClassA = require('ClassA');
require('ClassB'); 
import ClassB = require('ClassB');
```

Now everything will work. 

These steps are automated in this example project: it prepends every `.ts` source with a `require` shim and it modifies every line that contains an import using a regular expression.

## Caveat

The regular expression to add require statements is very rudimentary (crude). The current version only works for the demo project where statements are `import something = require('module');`:

```
return line.replace(/^(import.*(require\\(.*?\\)))/g, '$2;$1');
// import ClassA = require('ClassA');
// becomes:
// require('ClassA'); import ClassA = require('ClassA');
```
