//The readline module provides an interface for reading data from a Readable stream
//(such as process.stdin) one line at a time. It can be accessed using:

'use strict'

let robot = require('./robot')

const readline = require('readline');

console.log(robot.robotControl.place(2,4,'east'))

//console.log(robot.robotControl.report())
//process.stdin property returns a readable stream equivalent or associated with stdin (fd 0)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.dir(`welcome to the thing, here is robot`)
rl.on('line', (input) => {
  console.log(`Received: ${input}`);

  if (input === "PLACE") {
    console.log("ROBOT HAS BEEN PLACED")
  }

  if (input === "TURN") {
    console.log("ROBOT TURN")
  }

  if (input === 'close') {
    rl.close();
  }

});

// rl.question('What do you think of Node.js? ', (answer) => {
//   // TODO: Log the answer in a database
//   console.log('Thank you for your valuable feedback:', answer);
//
//   rl.close();
// });
