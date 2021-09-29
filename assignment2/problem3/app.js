const child_process = require("child_process");

console.log("Program Started");

const newProcess = child_process.spawn("node", ["fibonacci/index.js"], { stdio: "inherit" });

console.log("Program Ended");