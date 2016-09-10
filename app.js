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
  //test to see if input pattern matches
  let result = patternToMatch.test(input);
  //if input pattern matches, deconstruct string
  if (result) {
    //turn the string into an array of params
    let patternAsArray = input.split(/\s/);
    //Remove the first index in the array, in this case [PLACE] it's not needed.
    let arrayOfParams = patternAsArray.pop();
    // split the remainder on commas, to make available to pass as parameters to place function
    let params = arrayOfParams.split(",")
    //store orientation in a variable, this will always be passed if it's up to this point.
    let f = params[2];
    let x;
    let y;
    //Check to see if x value is valid (not greater than plane width, or less than 0)
    if (parseInt(params[0]) <= plane.planeConfig.planeWidth && parseInt(params[0]) >= plane.planeConfig.planeStart) {
      x = params[0];
    } else {
      return;
    }

    //Check to see if y value is valid (not greater than plane height, or less than 0)
    if (parseInt(params[1]) <= plane.planeConfig.planeHeight && parseInt(params[1]) >= plane.planeConfig.planeStart) {
      y = params[1];
    } else {
      return
    }
    //pass deconstructed string pieces as arguments for place function
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
