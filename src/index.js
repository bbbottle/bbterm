import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { Shell } from "./shell";
import { xtermConfig } from "./config";

import "xterm/css/xterm.css";
import "./style/xterm_style_reset.css";

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
  shell
    .command(
      "hello",
      async (shell) => {
        await shell.printLine("Hello world");
      },
      true
    )
    .command(
      "help",
      async () => {
        await shell.printHelpInfo();
      },
      true
    )
    .command(
      "clear",
      async () => {
        await shell.clear();
      },
      true
    );
  await shell.repl();
  return shell;
};
