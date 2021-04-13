import "./process_polyfill";
import chalk from "ansi-colors";

import XtermJSShell from "@bbbottle/xterm-js-shell";
import { BUILT_IN_COMMANDS } from "./commands";

const buildHelpInfo = (commandsMap) => {
  const cmdListStr = Array.from(commandsMap.keys())
    .map((command) => ` - ${command}`)
    .join("\n");

  return `Try running one of these commands:\n${cmdListStr}\n`;
};

export class Shell extends XtermJSShell {
  constructor(props) {
    super(props);
    this.chalk = chalk;
    this.prompt = async () => "🍼  ";
    this.addBuiltInCommands();
  }

  addBuiltInCommands() {
    BUILT_IN_COMMANDS.forEach(({ name, handler }) => {
      this.command(name, handler, true);
    });
  }

  async printHelpInfo() {
    await this.printLine(buildHelpInfo(this.commands));
    await this.printLine("");
  }

  async run(command, args, flags) {
    if (command === undefined) {
      return;
    }
    try {
      await super.run(command, args, flags);
    } catch (e) {
      await this.printLine(this.chalk.red(e.message));
      await this.printLine("");
      if (e instanceof TypeError) {
        await this.printHelpInfo();
      }
    }
  }

  clear() {
    this.term.clear();
  }
}
