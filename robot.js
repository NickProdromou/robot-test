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

    // function to increment Y, called when facing NORTH
    function incrementY() {
      //prevent any movements beyond the max height of the plane
      if (yAxis === planeHeight) {
        return;
      } else {
        state.robotState.yCoordinates += 1;
      }
    }
    // function to increment X, called when facing EAST
    function incrementX() {
      //prevent any movements beyond the max width of the plane
      if (xAxis === planeWidth) {
        return;
      } else {
        state.robotState.xCoordinates += 1;
      }
    }
    // function to increment Y, called when facing SOUTH
    function decrementY() {
      //prevent any movements beyond the edge of the plane (0 in this case)
      if (yAxis === planeStart) {
        return
      } else {
        state.robotState.yCoordinates -= 1;
      }
    }
    // function to increment X, called when facing WEST
    function decrementX() {
      //prevent any movements beyond the edge of the plane (0 in this case)
      if (xAxis === planeStart) {
        return;
      } else {
        state.robotState.xCoordinates -= 1;
      }
    }

    //conditionally check orientation and call relevant function (increment or decrement each axis)

    if (face === "NORTH") {
      incrementY();
    }

    if (face === "EAST") {
      incrementX();
    }

    if (face === "SOUTH") {
      decrementY();
    }

    if (face === "WEST") {
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


// export the robot controller function to make avaiable globally
module.exports.robotControl = robotControl
