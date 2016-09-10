'use strict'

//Require the module holding the robot state
let state = require('./robot-state')

//require the module containing the rules for the plane
let plane = require('./plane-config')

//Create empty object literal for robot, to contain robot specific methods
let robotControl = {

  move : function() {

    //Make the reference to robot orientation into a less verbose variable
    let face = state.robotState.orientation;

    //Put reference to X and Y into less verbose variable
    let xAxis = state.robotState.xCoordinates;
    let yAxis = state.robotState.yCoordinates;

    // Put reference to default plane width and height and plane start into less verbose variable
    let planeWidth = plane.planeConfig.planeWidth;
    let planeHeight = plane.planeConfig.planeHeight;
    let planeStart = plane.planeConfig.planeStart


    function incrementY() {
      if (yAxis === planeHeight) {
        return;
      } else {
        state.robotState.yCoordinates += 1;
      }
    }

    function incrementX() {
      if (xAxis === planeWidth) {
        return;
      } else {
        state.robotState.xCoordinates += 1;
      }
    }

    function decrementY() {
      if (yAxis === planeStart) {
        return
      } else {
        state.robotState.yCoordinates -= 1;
      }
    }

    function decrementX() {
      if (xAxis === planeStart) {
        return;
      } else {
        state.robotState.xCoordinates -= 1;
      }
    }



    //increment or decrement X or Y axis based on orientation and coordinates of robot

    if (face === "NORTH") {
      console.log("moving north?")
      incrementY();
    }

    if (face === "EAST") {
      console.log("moving east?")
      incrementX();
    }

    if (face === "SOUTH") {
      console.log("moving south?")
      decrementY();
    }

    if (face === "WEST") {
      console.log("moving west?")
      decrementX();
    }

  },
  left: function() {
    //Rotate robot counter-clockwise
    //Make the reference to robot orientation into a less verbose variable
    let orientation = state.robotState.orientation;

    if (orientation === "NORTH") {
      state.robotState.orientation = "WEST";
    }

    if (orientation === "EAST") {
      state.robotState.orientation = "NORTH";
    }

    if (orientation === "SOUTH") {
      state.robotState.orientation = "EAST";
    }

    if (orientation === "WEST") {
      state.robotState.orientation = "NORTH";
    }

  },
  right: function() {
    //Rotate the robot clockwise

    //Make the reference to robot orientation into a less verbose variable
    let orientation = state.robotState.orientation;

    if (orientation === "NORTH") {
      state.robotState.orientation = "EAST";
    }

    if (orientation === "EAST") {
      state.robotState.orientation = "SOUTH";
    }

    if (orientation === "SOUTH") {
      state.robotState.orientation = "WEST";
    }

    if (orientation === "WEST") {
      state.robotState.orientation = "NORTH";
    }

  },
  report: function() {
    //check robot state and return X Y and Orientation
    console.log(
      `The current coordinates of the robot are
       X: ${state.robotState.xCoordinates}
       Y: ${state.robotState.yCoordinates}
       Orientation: ${state.robotState.orientation}
      `
    )
  }

}



module.exports.robotControl = robotControl
