
# React Static site starter development

Basic configuration for developing static site. Assets are bundled by Webpack. React is used for templating.

### Still work in progress, more work and refactor should be done

### TODOs
- update babel
- break webpack config into multiple parts
- setup auto generating links for /src/views/index (currently need to add manually)
- setup auto generating routes in app.js (currently need to add manually)
- setup constants
- setup BH basic Styles settings
- add more documentation and general refactor

### Quickstart
```sh
git clone https://github.com/moudy/static-site-boilerplate
cd react-static-site-starter
yarn install
yarn run dev
open http://localhost:3000/
```

### Building Site
```bash
yarn run build # builds static files into dist/
```

### Files

`scripts/build.js`  
Builds the assets and renders each page of the React app.

`webpack.config.js`  
Asset bundling configuration. Also defines the pages to generate in `const pages =  ...`.

`src/template/main.ejs`  
The template used by HtmlWebpackPlugin which generates the outer HTML for each page.

`src/app.js`  
Stateless React components that will be rendered to static HTML by the build script. Should import all style files which will be extarcted into 1 file with `ExtractTextPlugin` on build.
