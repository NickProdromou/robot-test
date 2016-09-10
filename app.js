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

  //Regular expression pattern for matching exact input format
  let patternToMatch = /PLACE\s\d\D\d\D(NORTH|SOUTH|EAST|WEST)/g;

  let result = patternToMatch.test(input);
    if (result) {
      let patternAsArray = input.split(/\s/);
      console.log(patternAsArray);
      let arrayOfParams = patternAsArray.pop();
      console.log(arrayOfParams);
      let params = arrayOfParams.split(",")
      console.log(params)
    }



  //
  // if (input === /(NORTH|SOUTH|EAST|WEST)/i ) {
  //       console.log(`Received: ${input}`);
  // }
  //


});

// rl.question('What do you think of Node.js? ', (answer) => {
//   // TODO: Log the answer in a database
//   console.log('Thank you for your valuable feedback:', answer);
//
//   rl.close();
// });
