const path = require("path");
const webpack = require("webpack");
const config = require("../webpack.config");
const ReactDOMServer = require("react-dom/server");
const replace = require("replace-in-file");
const pretty = require("pretty");

const toLocation = str => `/${str.replace(/\/?index\.html$/g, "")}`;

const render = ({ compilation }) => {
  const appJSPath = path.resolve(__dirname, "../dist", `app.js`);
  const appJS = require(appJSPath);
  const htmlFiles = Object.keys(compilation.assets).filter(str =>
    str.endsWith(".html")
  );
  let renderedViews = [];
  for (let file of htmlFiles) {
    const staticMarkUp = appJS.renderMarkup({ location: toLocation(file), context: {} })
    const reactDomMarkup = ReactDOMServer.renderToStaticMarkup(staticMarkUp)
    const prettyHTML = pretty(reactDomMarkup)

    const options = {
      files: path.join("dist", file),
      from: "<!-- content -->",
      to: prettyHTML
    };

    try {
      renderedViews = renderedViews.concat(replace.sync(options));
    } catch (error) {
      throw err;
    }
  }
  console.log("Rendered:", renderedViews.join(", "));
};

webpack(config, (err, stats) => {
  if (err) throw err;
  render(stats);
});
