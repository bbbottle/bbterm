import { startShell } from "../src";
startShell(document.getElementById("term-wrapper")).then(() => {
  console.log("Shell is running...");
});
