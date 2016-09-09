'use strict'

//Require the module holding the robot state
let state = require('./robot-state')

//require the module containing the rules for the plane
let planeConfig = require('./plane-config')

//Create empty object literal for robot, to contain robot specific methods
let robotControl = {

  place: function(x,y,f) {
    //method to place the robot, creates a new plane
    //check to see if X,Y and F are valid
    console.log(x,y,f)
    state.robotState.xCoordinates = x,
    state.robotState.YCoordinates = y,
    state.robotState.orientation = f
    console.log(state.robotState)
  },
  move : function() {

    //Make put the reference to robot orientation into a less verbose variable
    let face = state.robotState.orientation;

    //Put reference to X and Y into less verbose variable
    let xAxis = state.robotState.xCoordinates;
    let yAxis = state.robotState.YCoordinates;

    //increment or decrement X or Y axis based on orientation and coordinates of robot
    if (face === "EAST" && xAxis <= planeWidth) {
      xAxis ++;
    } else {
      console.log("The robot cannot move in that direction")
    }
  },
  left: function() {
    //Rotate the robot counter clockwise
  },
  report: function() {
    //check robot state and return X Y and Orientation
    console.log(
      `The current coordinates of the robot are
       X: ${state.robotState.xCoordinates}
       Y: ${state.robotState.xCoordinates}
       Orientation: ${state.robotState.orientation}
      `
    )
  }

}



module.exports.robotControl = robotControl
