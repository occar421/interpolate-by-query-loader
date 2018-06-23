const qs = require("querystring");

module.exports = function loader(source) {
  this.cacheable();

  const query = qs.parse(this.resourceQuery.slice(1));

  for (const k of Object.keys(query)) {
    source = source.replace(new RegExp(`{{${k}}}`, "g"), query[k]);
  }

  return source;
};
