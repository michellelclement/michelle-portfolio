# Eleventy Starter

This is a statically built front-end, based on [eleventy-webpack](https://github.com/clenemt/eleventy-webpack). As you'd expect, it uses [eleventy](https://www.11ty.dev/) and [webpack](https://webpack.js.org/).

## Features

- Barebone [11ty](https://www.11ty.dev/)
- Fast build with per env configs ([babel-env](https://babeljs.io/docs/en/babel-preset-env), [postcss-preset-env](https://github.com/csstools/postcss-preset-env), [webpack](https://webpack.js.org/configuration/#use-different-configuration-file))
- `.js` (ES6, Babel, Polyfills)
- `.css` (Sass, PostCSS, Autoprefixer)
- Optimized for production (source maps, headers, minified code)
- SEO metadata and Open Graph tags
- Safe external links (`noopener` and `noreferrer`)
- Neat error overlay ([eleventy-plugin-error-overlay](https://github.com/stevenpetryk/eleventy-plugin-error-overlay))
- [Prettier](https://prettier.io/) for formatting

## Usage

First install the dependencies:

```sh
npm install
```

Then you can:

| Command               | Description                                   |
| --------------------- | --------------------------------------------- |
| **`npm run start`**   | Run your website on http://localhost:8080     |
| **`npm run build`**   | Build your production website inside `/_site` |
| **`npm run format`**  | Run prettier on all filles except `/_site`    |
| **`npm run analyze`** | Output info on your bundle size               |

Make sure you use the correct node.js version:

```sh
# with bash nvm 
nvm use `cat .nvmrc`
# with windows nvm
nvm use $(cat .nvmrc)
# or just install the version specified inside `.nvmrc`
```
