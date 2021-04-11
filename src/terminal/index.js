import { Terminal } from "@bbbottle/xterm/dist/es6/xterm";
import { FitAddon } from "@bbbottle/xterm/dist/es6/addons/FitAddon";

export class BBTerminal extends Terminal {
  constructor(config) {
    super(config);
    this._config = config;
    this.fitAddon = new FitAddon();
    this.loadAddon(this.fitAddon);
  }

  open($dom) {
    const $wrapper = this.prepareWrapper();
    $dom.appendChild($wrapper);
    super.open($wrapper);
    this.focus();
    this.fitAddon.fit();
    this.fitWrapper($wrapper);
  }

  getTermHeight() {
    return this.rows * this._core._renderService.dimensions.actualCellHeight;
  }

  getTermPadding(wrapperHeight) {
    return (wrapperHeight - this.getTermHeight()) / 2;
  }

  prepareWrapper() {
    const $terminalWrapper = document.createElement("div");

    $terminalWrapper.style.height = "100%";
    $terminalWrapper.style.width = "100%";
    $terminalWrapper.style.paddingLeft = "10px";
    $terminalWrapper.style.paddingRight = "10px";
    $terminalWrapper.style.boxSizing = "border-box";
    $terminalWrapper.style.background = this._config.theme
      ? this._config.theme.background || "#000"
      : "#000";

    return $terminalWrapper;
  }

  fitWrapper = ($wrapper) => {
    while (this.getTermPadding($wrapper.offsetHeight) < 10) {
      this.resize(this.cols, this.rows - 1);
    }
    const finalPd = this.getTermPadding($wrapper.offsetHeight);
    $wrapper.style.paddingTop = `${finalPd}px`;
    $wrapper.style.paddingBottom = `${finalPd}px`;
  };
}
