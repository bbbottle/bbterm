import { Shell } from "./shell";
import { xtermConfig as baseConfig } from "./config";
import { BBTerminal } from "./terminal";

import "./style/index.module.scss";

export const startShell = async (
  $dom,
  commands = [],
  options = { xtermConfig: {} }
) => {
  const tml = new BBTerminal({
    ...baseConfig,
    ...options.xtermConfig,
  });
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

  tml.open($dom);

  await shell.repl();
};
