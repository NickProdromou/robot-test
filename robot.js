'use strict'

//Require the module holding the robot state
let state = require('./robot-state')

//require the module containing the rules for the plane
let plane = require('./plane-config')

//Create empty object literal for robot, to contain robot specific methods
let robotControl = {

  place: function(x,y,f) {
    //method to place the robot, creates a new plane
    //check to see if X,Y and F are valid
    console.log(x,y,f)
    state.robotState.xCoordinates = x;
    state.robotState.YCoordinates = y;
    state.robotState.orientation = f;
    state.robotState.placed = true;
    console.log(state.robotState)
  },
  move : function() {

    //Make the reference to robot orientation into a less verbose variable
    let face = state.robotState.orientation;

    //Put reference to X and Y into less verbose variable
    let xAxis = state.robotState.xCoordinates;
    let yAxis = state.robotState.YCoordinates;

    let planeWidth = plane.planeConfig.planeWidth;

    let planeHeight = plane.planeConfig.planeHeight;

    let planeStart = plane.planeConfig.planeStart

    //increment or decrement X or Y axis based on orientation and coordinates of robot
    if (face === "EAST" && xAxis <= planeWidth) {
      xAxis ++;
    } else {
      // early return if robot can't proceed
      console.log("The robot cannot move in that direction")
    }

    if (face === "NORTH" && yAxis <= planeHeight) {
      yAxis ++;
    } else {
      console.log("The robot cannot move in that direction")
    }

    if (face === "SOUTH" && yAxis >= 0) {
      xAxis --;
    } else {
      console.log("The robot cannot move in that direction")
    }

  },
  left: function() {
    //Rotate the robot counter clockwise
  },
  right: function() {
    //Rotate the robot clockwise
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
