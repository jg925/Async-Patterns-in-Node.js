const EventEmitter = require("events");

let myEventEmitter = new EventEmitter();

myEventEmitter.on("wroteCode", (language) => {
  console.log(`somebody wrote ${language} code`);
});

myEventEmitter.on("wroteCode", () => {
  console.log("busy building node apps");
});

myEventEmitter.emit("wroteCode", "Javascript");

// Results
// somebody wrote code
// busy building node apps
