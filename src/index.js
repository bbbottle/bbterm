import { Terminal } from "@bbbottle/xterm/dist/es6/xterm";
import { FitAddon } from "@bbbottle/xterm/dist/es6/addons/FitAddon";
import { Shell } from "./shell";
import { xtermConfig } from "./config";

import './style/index.module.scss';

const initTerm = ($dom) => {
  const terminal = new Terminal(xtermConfig);
  const fitAddon = new FitAddon();
  terminal.loadAddon(fitAddon);
  terminal.open($dom);
  fitAddon.fit();

  return terminal;
};

export const startShell = async ($dom) => {
  const shell = new Shell(initTerm($dom));
  await shell.repl();
  return shell;
};
