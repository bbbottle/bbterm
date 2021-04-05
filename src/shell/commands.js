export const BUILT_IN_COMMANDS = [
  {
    name: "help",
    handler: async ({ shell }) => {
      await shell.printHelpInfo();
    },
  },
];
