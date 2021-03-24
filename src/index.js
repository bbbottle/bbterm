import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit'
import XtermJSShell from "xterm-js-shell";

export const startTerm = () => {
  const terminal = new Terminal();
  const fitAddon = new FitAddon();
  terminal.loadAddon(fitAddon);
  fitAddon.fit();

  const shell = new XtermJSShell(terminal);
  shell.command('hello', async (shell) => {
    shell.printLine('Hello world');
  })
  shell.repl();

  terminal.open(document.getElementById('term-wrapper'));
}
