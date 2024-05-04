import glob from "fast-glob";
import * as fs from "node:fs/promises";
import * as path from "node:path";

const packagePath = process.cwd();

const distPath = path.join(packagePath, "dist");
const srcPath = path.join(packagePath, "lib");

void (async () => {
  const cssPaths = glob
    .sync(path.join(srcPath, "**/*.css"))
    .map(p => p.replace(srcPath, ""));

  for (const cssPath of cssPaths) {
    const srcCSSPath = path.join(srcPath, cssPath);
    const cjsPath = path.join(distPath, cssPath);
    const esmPath = path.join(distPath, "esm", cssPath);

    await Promise.all([
      fs.copyFile(srcCSSPath, cjsPath),
      fs.copyFile(srcCSSPath, esmPath),
    ]);
  }
})();
