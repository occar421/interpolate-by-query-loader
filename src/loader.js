const getOptions = require("loader-utils").getOptions;
const validateOptions = require("schema-utils");
const qs = require("querystring");

const schema = {
  type: "object",
  properties: {
    prefix: {
      type: "string",
      minLength: 2
    },
    postfix: {
      type: "string",
      minLength: 2
    }
  }
};

module.exports = function loader(source) {
  this.cacheable();

  const options = getOptions(this) || {};
  if (!("prefix" in options)) {
    options.prefix = "{{";
  }
  if (!("postfix" in options)) {
    options.postfix = "}}";
  }

  validateOptions(schema, options, "Option is invalid");

  const query = qs.parse(this.resourceQuery.slice(1));

  for (const k of Object.keys(query)) {
    const searchStr = options.prefix + k + options.postfix;
    const target = searchStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    source = source.replace(new RegExp(target, "g"), query[k]);
  }

  return source;
};
