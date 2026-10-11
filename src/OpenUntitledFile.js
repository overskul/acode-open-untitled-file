import style from "@/style";
const C      = acode.require("config");

const EVENTS = [
  "switch-file",
  "rename-file",
  "remove-file",
  "save-file",
  "new-file",

  "add-folder",
  "remove-folder",
  "update-folder",

  "init-open-file-list"
];

const STYLE_ID  = "__outf_style";
const $STYLE    = <style id={STYLE_ID}>{style}</style>;

const BUTTON_ID = "open-untitled-file";
const $BUTTON   = <span id={BUTTON_ID} className="icon add disable"></span>;

const COMMANDS  = [
  {
    name: "outf:toggle",
    description: "Toggle OpenUntitledFile button visibility",
    exec: () => document.querySelector(`#${BUTTON_ID}`).classList.toggle("hidden")
  },
  {
    name: "outf:open",
    description: "Open new UntitledFile",
    exec: () => acode.newEditorFile()
  }
];

export default class OpenUntitledFile {
  async onInit(baseUrl, $page, { ctx, firstInit, cacheFileUrl, cacheFile }) {
    for (const event of EVENTS) {
      editorManager.on(event, this.onCheckState);
    }

    const { commands } = editorManager.editor;
    for (const cmd of COMMANDS) commands.addCommand(cmd);

    await this.checkState();
    this.$button.addEventListener("click", this.openUntitledFile);
  }

  async onDestroy() {
    await this.onDisable();
  }

  async onDisable() {
    for (const event of EVENTS) {
      editorManager.off(event, this.onCheckState);
    }

    const { commands } = editorManager.editor;
    for (const cmd of COMMANDS) commands.removeCommand(cmd.name);

    this.$style?.remove();
    this.$button?.remove();
  }

  get $style() {
    return document.querySelector(`#${STYLE_ID}`);
  }

  get $button() {
    return document.querySelector(`#${BUTTON_ID}`);
  }

  openUntitledFile = this.createUntitledFile.bind(this);
  createUntitledFile() {
    acode.newEditorFile();
  }

  onCheckState = this.checkState.bind(this);
  async checkState() {
    this.checkInDom();
    this.checkTogglity();
  }

  checkInDom() {
    if (!this.$style) document.head.append($STYLE);

    const { openFileList } = editorManager;
    if (!this.$button) {
      const $firstTile = openFileList.querySelector(".tile");
      openFileList.insertBefore($BUTTON, $firstTile);
    }
  }

  checkTogglity() {
    const hasUntitledFile = editorManager.files.some(f => f.id === C.DEFAULT_FILE_SESSION);
    if (hasUntitledFile)
      this.$button.classList.add("disable");
    else
      this.$button.classList.remove("disable");
  }

  get pageSettings() {
    return;
  }
}
