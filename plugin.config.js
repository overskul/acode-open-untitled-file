export const config = {
  build: {
    entryFile: "src/main.js",
    outputFile: "dist/main.js",
    bundle: "{id}.{version}.acodeplugin",
    ignoreExtension: [],
    alias: {},
    clean: true,
    port: 3030,
    plugins: ["JSX"],
    define: {}
  },

  plugin: {
    id: "x.util.o.u.t.f",
    name: "Open Untitled File",
    version: "0.3.0",
    license: "MIT",
    icon: "assets/plugin-icon.png",
    readme: "readme.md",
    changelog: "changelog.md",
    files: ["./assets/"],
    keywords: ["utility","untitled"],
    // dependencies: [],
    price: 0,
    minVersionCode: 1010,
    repository: "https://github.com/overskul/acode-open-untitled-file",
    author: {
      name: "overskul",
      github: "overskul"                 
    },
    contributors: []
  }
}
