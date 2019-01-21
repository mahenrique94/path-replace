# path-replace

By default it's not possible use `path` attribute in `tsconfig.json` with NodeJS applications. When TypeScriipt compile to JavaScript files, these path's will be not replace by your phisic path.

So with this lib it's possible replace these symbolic paths by with physic each one.

### Install:

Using `npm`:

```
npm i -D @mahenrique94/path-replace
```

Using `yarn`:

```
yarn add --dev @mahenrique94/path-replace
```

### Set up:

Add a new script commando at your `package.json` in `scripts`:

```
"path:replace": "path-replace",
```

Now, it will read within `tsconfig.json` file each path setted and search within dist folder for matches and replaces in all `.js` files.

You must run it after `ts` command:

```
"build": "tsc && npm run path:replace"
```

Or, with `npm-run-all`:

```
"ts": "run-s tsc path:replace"
```

Sometimes you'll need run it after each change, this is possible using `tsc-watch`:

```
"ts:w": "tsc-watch --onSuccess \"npm run path:replace\"",
```

Thanks.
