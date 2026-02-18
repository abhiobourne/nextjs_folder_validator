const fs = require("fs");
const path = require("path");

const standards = require("../project-standards.json");

const SRC_PATH = path.join(__dirname, "..", "src");

// Validate src folders
function checkSrcFolders() {
  const folders = fs.readdirSync(SRC_PATH);
  const invalid = folders.filter(
    f => !standards.srcFolders.includes(f)
  );

  if (invalid.length) {
    console.error("❌ Invalid folders in src/:", invalid);
    process.exit(1);
  }
}

// Validate components subfolders
function checkComponentsSubfolders() {
  const componentsPath = path.join(SRC_PATH, "components");

  if (!fs.existsSync(componentsPath)) return;

  const subfolders = fs
    .readdirSync(componentsPath)
    .filter(f => fs.statSync(path.join(componentsPath, f)).isDirectory());

  const allowed = [
    ...standards.componentsSubfolders,
    ...subfolders.filter(f => f.endsWith("-page"))
  ];

  const invalid = subfolders.filter(f => !allowed.includes(f));

  if (invalid.length) {
    console.error("❌ Invalid subfolders in components/:", invalid);
    process.exit(1);
  }
}

checkSrcFolders();
checkComponentsSubfolders();

console.log("✅ Folder structure is valid");
