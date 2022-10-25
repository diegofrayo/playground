const watch = require("node-watch");
const path = require("path");

const files = {};
let lastPlaygroundFileUpdated = "";

watch(
  "./",
  {
    recursive: true,
    filter(f, skip) {
      if (/\/node_modules/.test(f) || /\.git/.test(f) || /\scripts/.test(f)) {
        return skip;
      }

      return /\.js$/.test(f);
    },
  },
  function (evt, name) {
    try {
      console.log(name, evt, new Date());

      if (isPlaygroundFile(name)) {
        lastPlaygroundFileUpdated = name;
      } else {
        files[name] = loadFile(name);

        if (lastPlaygroundFileUpdated) {
          files[lastPlaygroundFileUpdated] = loadFile(
            lastPlaygroundFileUpdated
          );
        }
      }

      files[name] = loadFile(name);
    } catch (error) {
      console.log(error);
    }
  }
);

// --- Utils ---

function loadFile(fileName) {
  const fileNamePath = path.resolve(fileName);

  delete require.cache[require.resolve(fileNamePath)];

  return require(fileNamePath);
}

function isPlaygroundFile(fileName) {
  return fileName.includes("playground");
}
