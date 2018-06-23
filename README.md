# interpolate-by-query-loader

Webpack loader to interpolate file by query value. It may be useful to create entry point file only with one file from the boilerplate.

## Usage

Make 'src/template.js' like

```javascript
module.exports = "{{name}}";
```

then

```javascript
const path = require("path");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "src/template.js?name=index"),
    detail: path.resolve(__dirname, "src/template.js?name=detail")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      },
      {
        test: /template\.js$/,
        loader: "interpolate-by-query-loader"
      }
    ]
  }
};
```

It generates `module.exports = "index";` as 'index.js' and `module.exports = "detail";` as 'detail.js' in the target directory.

## Options

- `prefix` & `postfix`

```javascript
{
  test: /template\.js$/,
  loader: "interpolate-by-query-loader",
  options: {
    prefix: "/*%"
    postfix: "%*/"
  }
}
```

```javascript
module.exports = /*%id%*/ +0; // a technique for numbers
```
