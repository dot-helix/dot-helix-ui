/* eslint-disable no-console */
import CleanCSS from "clean-css";
import glob from "fast-glob";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { minify } from "terser";

const packagePath = process.cwd();

const distPath = path.join(packagePath, "./dist");

const minifyJS = async () => {
  const files = await glob(path.join(distPath, "**/*.js"));

  for (const file of files) {
    const isESModule = path.relative(distPath, file).split("/")[0] === "esm";
    const isIndex = path.basename(file) === "index.js";

    if (isIndex) continue;

    const source = await fs.readFile(file, { encoding: "utf8" });

    const result = await minify(
      source,
      isESModule
        ? {
            module: isESModule,
            compress: { module: isESModule },
            mangle: { module: isESModule },
          }
        : undefined,
    );

    if (result.code) await fs.writeFile(file, result.code);
  }
};

const minifyCSS = async () => {
  const files = await glob(path.join(distPath, "**/*.css"));

  const cssCleaner = new CleanCSS();

  for (const file of files) {
    const source = await fs.readFile(file, { encoding: "utf8" });

    const result = cssCleaner.minify(source);

    if (result.warnings.length > 0) {
      console.warn(result.warnings.join("\n"));
    }

    if (result.errors.length > 0) {
      console.error(result.errors.join("\n"));

      process.exit(1);
    }

    await fs.writeFile(file, result.styles);
  }
};

void (async () => {
  await Promise.all([minifyJS(), minifyCSS()]);
})();
