'use strict'

//Require the module holding the robot state
let state = require('./robot-state').robotState;

//require the module containing the rules for the plane
let plane = require('./plane-config').planeConfig;

//Create empty object literal for robot, to contain robot specific methods
let robotControl = {

  move : function() {

    //Make the reference to robot orientation into a less verbose variable
    let face = state.orientation;

    //Put reference to X and Y into less verbose variable
    let xAxis = state.xCoordinates;
    let yAxis = state.yCoordinates;

    // Put reference to default plane width and height and plane start into less verbose variable
    let planeWidth = plane.planeWidth;
    let planeHeight = plane.planeHeight;
    let planeStart = plane.planeStart

    // function to increment Y, called when facing NORTH
    function incrementY() {
      //prevent any movements beyond the max height of the plane
      if (yAxis === planeHeight) {
        return;
      } else {
        state.yCoordinates += 1;
      }
    }
    // function to increment X, called when facing EAST
    function incrementX() {
      //prevent any movements beyond the max width of the plane
      if (xAxis === planeWidth) {
        return;
      } else {
        state.xCoordinates += 1;
      }
    }
    // function to increment Y, called when facing SOUTH
    function decrementY() {
      //prevent any movements beyond the edge of the plane (0 in this case)
      if (yAxis === planeStart) {
        return
      } else {
        state.yCoordinates -= 1;
      }
    }
    // function to increment X, called when facing WEST
    function decrementX() {
      //prevent any movements beyond the edge of the plane (0 in this case)
      if (xAxis === planeStart) {
        return;
      } else {
        state.xCoordinates -= 1;
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
    let orientation = state.orientation;

    if (orientation === "NORTH") {
      state.orientation = "WEST";
    }

    if (orientation === "EAST") {
      state.orientation = "NORTH";
    }

    if (orientation === "SOUTH") {
      state.orientation = "EAST";
    }

    if (orientation === "WEST") {
      state.orientation = "NORTH";
    }

  },
  right: function() {
    //Rotate the robot clockwise

    //Make the reference to robot orientation into a less verbose variable
    let orientation = state.orientation;

    if (orientation === "NORTH") {
      state.orientation = "EAST";
    }

    if (orientation === "EAST") {
      state.orientation = "SOUTH";
    }

    if (orientation === "SOUTH") {
      state.orientation = "WEST";
    }

    if (orientation === "WEST") {
      state.orientation = "NORTH";
    }

  },
  report: function() {
    //check robot state and return X Y and Orientation
    console.log(`
  The current coordinates of the robot are
  X:${state.xCoordinates}, Y:${state.yCoordinates}
  Orientation: ${state.orientation}
      `
    )
  }

}


// export the robot controller function to make avaiable globally
module.exports.robotControl = robotControl
