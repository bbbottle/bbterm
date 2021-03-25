import XtermJSShell from "@bbbottle/xterm-js-shell";

const buildHelpInfo = (commandsMap) => {
  const cmdListStr = Array.from(commandsMap.keys())
    .map((command) => ` - ${command}`)
    .join("\n");

  return `\nTry running one of these commands:\n${cmdListStr}\n`;
};

export class Shell extends XtermJSShell {
  constructor(props) {
    super(props);
    this.prompt = async () => "🍼  ";

    this.printHelpInfo = this.printHelpInfo.bind(this);
  }

  async printHelpInfo() {
    await this.printLine(buildHelpInfo(this.commands));
  }

  async run(command, args, flags) {
    if (command === undefined) {
      return;
    }
    try {
      await super.run(command, args, flags);
    } catch (e) {
      await this.printLine(e.message);
      await this.printHelpInfo();
      await this.printLine("\n");
    }
  }

  clear() {
    this.term.clear();
  }
}
