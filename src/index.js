import { Terminal } from "@bbbottle/xterm/dist/es6/xterm";
import { FitAddon } from "@bbbottle/xterm/dist/es6/addons/FitAddon";
import { Shell } from "./shell";
import { xtermConfig } from "./config";

import "./style/index.module.scss";

const initTerm = ($dom) => {
  const terminal = new Terminal(xtermConfig);
  const fitAddon = new FitAddon();
  terminal.loadAddon(fitAddon);
  terminal.open($dom);
  terminal.focus();
  fitAddon.fit();

  return terminal;
};

export const startShell = async ($dom, commands = [], options = {}) => {
  const tml = initTerm($dom);
  const shell = new Shell(tml);
  const { onBeforeRepl = () => null } = options;

  // add commands
  commands.forEach((cmd = {}) => {
    const { name, handler, complete } = cmd;
    if (typeof name !== "string" || typeof handler !== "function") {
      return;
    }
    shell.command(name, handler, !!complete);
  });

  onBeforeRepl(shell, tml);

  // start repl
  await shell.repl();
  return shell;
};
