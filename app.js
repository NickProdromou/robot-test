'use strict'

let robot = require('./robot').robotControl;
let state = require ('./robot-state').robotState;
const readline = require('readline');
let plane = require('./plane-config').planeConfig;

//require the module containing the rules for the plane

// called from the parseCommands function, will only run valid commands
function runCommands(input) {
  if (input === "LEFT" ) {
    robot.left();
  } else if (input === "RIGHT") {
    robot.right();
  } else if (input === "MOVE") {
    robot.move();
  } else if (input === "REPORT") {
    robot.report();
  } else {
    parseInput(input)
  }
}

// function to parse commands, will run commands if robot is placed
function parseCommands(input){
  if (state.placed) {
    runCommands(input)
  }
}

//Function to validate build object to pass as arguments to place function, also to check if X and Y are allowed.
function validateInput(input) {
  let patternAsArray = input.split(/\s/);
  //Remove the first index in the array, in this case [PLACE] it's not needed.
  let arrayOfParams = patternAsArray.pop();
  // split the remainder on commas, to make available to pass as parameters to place function
  let params = arrayOfParams.split(",")

  //Create a new empty object to return parameters
  let outputObject = {};
  //store orientation in a variable, this will always be passed if it's up to this point.
  outputObject.f = params[2];

  //Check to see if x value is valid (not greater than plane width, or less than 0)
  if (parseInt(params[0]) <= plane.planeWidth && parseInt(params[0]) >= plane.planeStart) {
    outputObject.x = params[0];
  } else {
    return;
  }
  //Check to see if y value is valid (not greater than plane height, or less than 0)
  if (parseInt(params[1]) <= plane.planeHeight && parseInt(params[1]) >= plane.planeStart) {
    outputObject.y = params[1];
  } else {
    return;
  }
  if (outputObject.x.length !== 0, outputObject.y.length !== 0) {
    return outputObject;
  } else {
    return;
  }
}

function parseInput(input) {
  //Regular expression pattern for matching exact input format
  let patternToMatch = /PLACE\s\d\D\d\D(NORTH|SOUTH|EAST|WEST)/g;
  //test to see if input pattern matches
  let result = patternToMatch.test(input);
  //if input pattern matches, deconstruct string
  if (result) {
    let placeArgs = validateInput(input)
    if (placeArgs === undefined) {
      return;
    }
    //pass validated X and Y input into place function
    place(placeArgs.x,placeArgs.y,placeArgs.f)
  }
}

// Set the X, Y, and Orientation on the robot state object, also sets robot state to placed.
// this lets the robot listen for other commands.
function place(x,y,f) {
  state.xCoordinates = parseInt(x);
  state.yCoordinates = parseInt(y);
  state.orientation = f;
  state.placed = true;
  console.log(`
  Type MOVE to move the robot in the direction it is facing,
  Type LEFT or RIGHT to change the robot's orientation.
  Type REPORT to see the robot's current position and orientation.
  Type PLACE X,Y,F to place the robot in a different position.
  Type CLOSE to exit the program.`);
}

console.log(`
  Type PLACE X,Y,F to place the robot.
  example: "PLACE 2,3,EAST".
  Type 'CLOSE' to exit the program.`)

const rl = readline.createInterface({
  input: process.stdin, //process.stdin property returns a readable stream equivalent or associated with stdin (fd 0)
  output: process.stdout
});

rl.on('line', (input) => {

  if (state.placed === false) {
    parseInput(input);
  } else if (state.placed) {
    parseCommands(input)
  }

if (input === "CLOSE" ) {
  rl.close();
}

});
