import { Terminal } from "@bbbottle/xterm/dist/es6/xterm";
import { FitAddon } from "@bbbottle/xterm/dist/es6/addons/FitAddon";
import { Shell } from "./shell";
import { xtermConfig } from "./config";

import "./style/index.module.scss";

const getTermHeight = (terminal) => {
  return (
    terminal.rows * terminal._core._renderService.dimensions.actualCellHeight
  );
};

const getTermPadding = (wrapperHeight, terminal) => {
  return (wrapperHeight - getTermHeight(terminal)) / 2;
};

const fitWrapper = ($wrapper, terminal) => {
  while (getTermPadding($wrapper.offsetHeight, terminal) < 10) {
    terminal.resize(terminal.cols, terminal.rows - 1);
  }
  const finalPd = getTermPadding($wrapper.offsetHeight, terminal);
  $wrapper.style.paddingTop = `${finalPd}px`;
  $wrapper.style.paddingBottom = `${finalPd}px`;
};

const prepareWrapper = () => {
  const $terminalWrapper = document.createElement("div");

  $terminalWrapper.style.height = "100%";
  $terminalWrapper.style.width = "100%";
  $terminalWrapper.style.paddingLeft = "10px";
  $terminalWrapper.style.paddingRight = "10px";
  $terminalWrapper.style.boxSizing = "border-box";
  $terminalWrapper.style.background = "#000";

  return $terminalWrapper;
};

const initTerm = ($dom) => {
  const $terminalWrapper = prepareWrapper();

  $dom.appendChild($terminalWrapper);

  const terminal = new Terminal(xtermConfig);
  const fitAddon = new FitAddon();
  terminal.loadAddon(fitAddon);
  terminal.open($terminalWrapper);
  terminal.focus();
  fitAddon.fit();

  fitWrapper($terminalWrapper, terminal);

  return terminal;
};

export const startShell = async ($dom, commands = [], options = {}) => {
  const tml = initTerm($dom);
  const shell = new Shell(tml);
  const { onBeforeRepl = () => null } = options;

  const clear = () => {
    tml.clear();
  };

  // add user commands
  commands.forEach((cmd = {}) => {
    const { name, handler, complete } = cmd;
    if (typeof name !== "string" || typeof handler !== "function") {
      return;
    }
    shell.command(name, handler, !!complete);
  });

  // add special clear command
  shell.command(
    "clear",
    async () => {
      clear();
      // clear 'clear prompt';
      setTimeout(clear, 0);
    },
    true
  );

  onBeforeRepl(shell, tml);

  // start repl
  await shell.repl();
  return shell;
};
