//The readline module provides an interface for reading data from a Readable stream
//(such as process.stdin) one line at a time. It can be accessed using:

'use strict'

let robot = require('./robot')
let state = require ('./robot-state')
const readline = require('readline');


//require the module containing the rules for the plane
let plane = require('./plane-config')

function runCommands(input) {
  if (input === "LEFT" ) {
    robot.robotControl.left();
  } else if (input === "RIGHT") {
    robot.robotControl.right();
  } else if (input === "MOVE") {
    robot.robotControl.move();
  } else if (input === "REPORT") {
    robot.robotControl.report();
  } else {
    parseInput(input)
  }
}

function parseCommands(input){
  if (state.robotState.placed) {
    runCommands(input)
  }
}

function parseInput(input) {
  //Regular expression pattern for matching exact input format
  let patternToMatch = /PLACE\s\d\D\d\D(NORTH|SOUTH|EAST|WEST)/g;

  let result = patternToMatch.test(input);
  if (result) {
    let patternAsArray = input.split(/\s/);

    let arrayOfParams = patternAsArray.pop();

    let params = arrayOfParams.split(",")


    let x = params[0];

    let y = params[1];

    let f = params[2];


    place(x,y,f)

  }
}

function place(x,y,f) {
  //method to place the robot, creates a new plane
  //check to see if X,Y and F are valid
  state.robotState.xCoordinates = parseInt(x);
  console.log(x)
  state.robotState.yCoordinates = parseInt(y);
  console.log(y)
  state.robotState.orientation = f;
  console.log(f)
  state.robotState.placed = true;
}

console.log(`Type PLACE X,Y,F to place the robot`)


const rl = readline.createInterface({
  input: process.stdin, //process.stdin property returns a readable stream equivalent or associated with stdin (fd 0)
  output: process.stdout
});

rl.on('line', (input) => {



  if (state.robotState.placed === false) {
    parseInput(input);
  } else if (state.robotState.placed) {
    parseCommands(input)
  }


if (input === "close" ) {
  rl.close();
}

});
