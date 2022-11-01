const fs = require("fs");
const path = require("path");

function insertLine(content, { indent = 0, breakLines = 1 } = {}) {
  return `${generateIndentation(indent)}${content}${createArray(breakLines)
    .map((i) => "\n")
    .join("")}`;
}

function generateIndentation(indent) {
  return createArray(indent * 2)
    .map((i) => " ")
    .join("");
}

function bold(content) {
  return `**${content}**`;
}

function code(content) {
  return `\`${toString(content)}\``;
}

function pre(content, { indent = 0, withoutTemplateLiterals = false } = {}) {
  const templateLiterals = withoutTemplateLiterals ? "" : `\`\`\``;

  return `${templateLiterals}${content
    .trim()
    .split("\n")
    .map(
      (line, index) =>
        `${index === 0 ? "" : generateIndentation(indent)}${line}`
    )
    .join("\n")}${templateLiterals}`;
}

function link(content) {
  return `[${content.text}](${content.url})`;
}

function toString(content) {
  return `${typeof content === "object" ? JSON.stringify(content) : content}`;
}

function createArray(length, start) {
  return Array.from(Array(length).keys()).map(
    (value) => value + (start === undefined ? 1 : start)
  );
}

function consoleLog(input, output) {
  return `console.log(${input}); ${output ? comment(output) : ""}`.trim();
}

function comment(input) {
  return `// ${toString(input)}`;
}

function variable(varName, varValue) {
  return `const ${varName} = ${varValue};`;
}

function writeOutput(fileName, content) {
  fs.writeFileSync(path.resolve("./output", `${fileName}`), toString(content));
}

function parseMethodCall(input) {
  const result = input
    .match(/\.([a-z]{1,15})\((-?\d(, -?\d){0,1}(, ".*"){0,})\)/)
    ?.slice(1, 3);

  if (!result) {
    throw new Error("Error with " + input);
  }

  return {
    methodName: result[0],
    methodParams: result[1].split(",").map((i) => {
      return Number.isInteger(Number(i))
        ? Number(i)
        : replaceAll(i.trim(), '"', "");
    }),
  };
}

function replaceAll(str, toReplace, replacement) {
  if (Array.isArray(toReplace)) {
    return toReplace.reduce(
      (result, item) =>
        result.replace(new RegExp(escapeRegExp(item), "g"), replacement),
      str
    );
  }

  return str.replace(new RegExp(escapeRegExp(toReplace), "g"), replacement);
}

function escapeString(input) {
  return replaceAll(replaceAll(input, "\n", "\\n"), '"', "'");
}

module.exports = {
  bold,
  code,
  comment,
  consoleLog,
  createArray,
  escapeString,
  insertLine,
  link,
  parseMethodCall,
  pre,
  replaceAll,
  toString,
  variable,
  writeOutput,
};

// --- Utils ---

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
