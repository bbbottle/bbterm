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
      await this.printLine(e.message);
      await this.printLine("");
      await this.printHelpInfo();
    }
  }

  clear() {
    this.term.clear();
  }
}
