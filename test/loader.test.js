import compiler from "./compiler";

it("should keep string if no query", async () => {
  const sourceFileName = "./fixtures/name.js";
  const status = await compiler(sourceFileName);
  expect(status.toJson().modules[0].source).toMatch(/{{name}}/);
});

it("should interpolate query with `name`", async () => {
  const sourceFileName = "./fixtures/name.js";
  const status = await compiler(sourceFileName, "?name=foo");
  expect(status.toJson().modules[0].source).toMatch(/foo/);
});

it("should interpolate query with `name` and `age`", async () => {
  const sourceFileName = "./fixtures/name-and-age.js";
  const status = await compiler(sourceFileName, "?name=foo&age=1");
  expect(status.toJson().modules[0].source).toMatch(/foo-1/);
});

it("should interpolate with non-default parentheses", async () => {
  const sourceFileName = "./fixtures/non-default-parentheses.js";
  const status = await compiler(sourceFileName, "?placeholder=1234", { prefix: "/*%", postfix: "%*/" });
  expect(status.toJson().modules[0].source).toMatch(/1234/);
});
