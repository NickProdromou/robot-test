'use strict'

// an object to hold the state of the robot
let robotState = {
  placed: false, // placed is set to false by default, when placed is true the robot will be placed
  xCoordinates: 0,
  yCoordinates: 0,
  orientation: ""
}

module.exports.robotState = robotState
