const { _electron: electron } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const BSS_EXECUTABLE =
  "/Applications/Bootstrap Studio.app/Contents/MacOS/Bootstrap Studio";
const OUTPUT_DIR = path.join(ROOT, "bootstrap-studio");

const PROJECTS = [
  { locale: "en", outputName: "HolyLens-English.bsdesign" },
  { locale: "zh", outputName: "HolyLens-Chinese.bsdesign" },
];

function prepareImportBundle(locale) {
  const bundleRoot = path.resolve(
    "/private/tmp/holylens-bootstrap-studio",
    locale,
  );
  fs.rmSync(bundleRoot, { recursive: true, force: true });
  fs.mkdirSync(bundleRoot, { recursive: true });
  fs.cpSync(path.join(ROOT, "public/assets"), path.join(bundleRoot, "assets"), {
    recursive: true,
  });
  fs.copyFileSync(
    path.join(ROOT, "public/holylens-bilingual.css"),
    path.join(bundleRoot, "holylens-bilingual.css"),
  );

  const sourceDir = path.join(ROOT, "public/_pages", locale);
  const files = fs
    .readdirSync(sourceDir)
    .filter((file) => file.endsWith(".html"))
    .sort();

  for (const file of files) {
    const html = fs
      .readFileSync(path.join(sourceDir, file), "utf8")
      .replaceAll('="/assets/', '="assets/')
      .replaceAll('="/holylens-bilingual.css', '="holylens-bilingual.css')
      .replaceAll(`="/${locale}/`, '="');
    fs.writeFileSync(path.join(bundleRoot, file), html);
  }

  const stylesPath = path.join(bundleRoot, "assets/css/styles.min.css");
  const styles = fs
    .readFileSync(stylesPath, "utf8")
    .replaceAll("url(/assets/fonts/", "url(../fonts/")
    .replaceAll("url(/assets/img/", "url(../img/");
  fs.writeFileSync(stylesPath, styles);

  return files.map((file) => path.join(bundleRoot, file));
}

async function launchBlankDesign() {
  const electronApp = await electron.launch({
    executablePath: BSS_EXECUTABLE,
    args: ["--enable-logging"],
    timeout: 30000,
  });
  const windows = electronApp.windows();
  const win = windows[0] || (await electronApp.waitForEvent("window"));
  await win.waitForLoadState("domcontentloaded", { timeout: 30000 });
  await win.locator("#welcome-view .button.create").click({ timeout: 30000 });
  await win.locator("#new-design-dialog .button.primary.ok").click();
  await win.waitForFunction(
    () => typeof app !== "undefined" && Boolean(app.context),
    null,
    { timeout: 30000 },
  );

  // Avoid a filename collision so the imported homepage keeps index.html.
  await win.evaluate(() => {
    const placeholder = app.context.pages
      .getAll()
      .find((page) => page.name === "index.html");
    if (!placeholder) throw new Error("Default index.html was not created");
    app.getPanel("design").saveAction(
      placeholder,
      "__bootstrap-placeholder.html",
    );
    if (placeholder.name !== "__bootstrap-placeholder.html") {
      throw new Error("Could not rename Bootstrap Studio placeholder page");
    }
  });

  return { electronApp, win };
}

async function importPages(win, importFiles) {
  await win.evaluate((filePaths) => {
    const remote = window.require("@electron/remote");
    const dialog = remote.dialog;
    dialog.showOpenDialog = async () => ({ canceled: false, filePaths });
    dialog.showOpenDialogSync = () => filePaths;

    // Always show the page import options so parsing and asset scanning can be
    // enabled explicitly, regardless of the user's remembered app preference.
    app.settings.pageImportSettings.remember = false;

    const findItem = (menu, label) => {
      for (const item of menu.items || []) {
        if (item.label === label) return item;
        const nested = item.submenu && findItem(item.submenu, label);
        if (nested) return nested;
      }
      return null;
    };
    const menuItem = findItem(remote.Menu.getApplicationMenu(), "Import HTML");
    if (!menuItem) throw new Error("Import HTML menu item not found");
    menuItem.click({}, remote.getCurrentWindow(), {});
  }, importFiles);

  const importDialog = win.locator("#import-dialog");
  await importDialog.waitFor({ state: "visible", timeout: 30000 });
  const importOptions = importDialog.locator('input[type="checkbox"]');
  for (let index = 0; index < (await importOptions.count()); index += 1) {
    await importOptions.nth(index).check({ force: true });
  }
  await importDialog.locator(".button.primary.ok").click();

  const assetDialog = win.locator("#custom-import-dialog");
  await assetDialog.waitFor({ state: "visible", timeout: 90000 });
  const selectableAssets = assetDialog.locator(
    '.item label:not(.has-warning) input[type="checkbox"]',
  );
  await selectableAssets.first().waitFor({ state: "attached", timeout: 90000 });
  const selectableAssetCount = await selectableAssets.count();
  console.log(`Selectable asset groups: ${selectableAssetCount}`);
  for (let index = 0; index < selectableAssetCount; index += 1) {
    await selectableAssets.nth(index).check({ force: true });
  }
  await assetDialog.locator(".button.import.primary").click();

  await win.waitForFunction(
    (expectedPageCount) =>
      app.context.pages.getAll().length >= expectedPageCount,
    importFiles.length + 1,
    { timeout: 120000 },
  );
  await win.waitForTimeout(15000);
  const resourceCounts = await win.evaluate(() => ({
    pages: app.context.pages.getAll().length,
    images: app.context.assets.images.getAll().length,
    fonts: app.context.assets.fonts.getAll().length,
    css: app.context.assets.css.getAllCSSResources().length,
    js: app.context.assets.js.getAll().length,
  }));
  console.log(`Imported resources: ${JSON.stringify(resourceCounts)}`);
  if (resourceCounts.images < 100 || resourceCounts.fonts < 7) {
    throw new Error(
      `Incomplete asset import: ${JSON.stringify(resourceCounts)}`,
    );
  }
}

async function cleanAndSave(win, outputPath, expectedPageCount) {
  return win.evaluate(
    async ({ destination, pageCount }) => {
      const panel = app.getPanel("design");
      const placeholder = app.context.pages
        .getAll()
        .find((page) => page.name === "__bootstrap-placeholder.html");
      if (!placeholder) throw new Error("Placeholder page is missing");
      panel.pageDeleteAction(placeholder);

      const emptyDefaultCSS = app.context.assets.css
        .getAllCSSResources()
        .find((asset) => asset.name === "styles.css");
      if (emptyDefaultCSS) panel.cssDeleteAction(emptyDefaultCSS);

      const indexPage = app.context.pages
        .getAll()
        .find((page) => page.name === "index.html");
      if (!indexPage) throw new Error("Imported index.html is missing");
      app.activatePage(indexPage);

      const pageStats = app.context.pages.getAll().map((page) => ({
        name: page.name,
        componentCount: page.getFlatTree().length,
        bodyChildCount: page.html?.children?.[0]?.children?.length || 0,
      }));
      if (pageStats.length !== pageCount) {
        throw new Error(
          `Expected ${pageCount} pages after cleanup, found ${pageStats.length}`,
        );
      }
      const emptyPages = pageStats.filter(
        (page) => page.componentCount < 2 || page.bodyChildCount === 0,
      );
      if (emptyPages.length) {
        throw new Error(
          `Imported pages without component trees: ${emptyPages
            .map((page) => page.name)
            .join(", ")}`,
        );
      }

      await app.writeContextToDisk(app.context, destination);
      return {
        name: app.context.name,
        path: app.context.path,
        pages: pageStats,
        imageCount: app.context.assets.images.getAll().length,
        fontCount: app.context.assets.fonts.getAll().length,
        css: app.context.assets.css
          .getAllCSSResources()
          .map((asset) => asset.name),
        js: app.context.assets.js.getAll().map((asset) => asset.name),
      };
    },
    { destination: outputPath, pageCount: expectedPageCount },
  );
}

async function verifySavedDesign(win, outputPath) {
  return win.evaluate(async (destination) => {
    const loaded = await app.readDesign(destination, "Verifying native design");
    if (!loaded) throw new Error("Bootstrap Studio could not reopen the design");
    return {
      name: loaded.name,
      path: loaded.path,
      pages: loaded.pages.getAll().map((page) => ({
        name: page.name,
        componentCount: page.getFlatTree().length,
      })),
      imageCount: loaded.assets.images.getAll().length,
      fontCount: loaded.assets.fonts.getAll().length,
      css: loaded.assets.css.getAllCSSResources().map((asset) => asset.name),
      js: loaded.assets.js.getAll().map((asset) => asset.name),
    };
  }, outputPath);
}

async function convertProject({ locale, outputName }) {
  const importFiles = prepareImportBundle(locale);
  const outputPath = path.join(OUTPUT_DIR, outputName);
  fs.rmSync(outputPath, { force: true });
  console.log(`Converting ${locale}: ${importFiles.length} pages`);

  const { electronApp, win } = await launchBlankDesign();
  try {
    await importPages(win, importFiles);
    const saved = await cleanAndSave(win, outputPath, importFiles.length);
    await win.waitForTimeout(1000);
    const verified = await verifySavedDesign(win, outputPath);
    return {
      locale,
      outputPath,
      fileSize: fs.statSync(outputPath).size,
      saved,
      verified,
    };
  } finally {
    electronApp.process().kill("SIGKILL");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const results = [];
  for (const project of PROJECTS) {
    results.push(await convertProject(project));
  }
  console.log(JSON.stringify(results, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
