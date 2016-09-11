# The robot test
____

#### The process

I started with working out what methods the robot should have, initially I had the PLACE method as part of the robot. I re-thought this decision because logically a robot wouldn't be able to place itself.

The assessment required the robot to have 4 main functions:

- MOVE: Move one unit in the direction the robot faces.
- LEFT: Rotate the counter-clockwise
- RIGHT: Rotate the robot clockwise
- REPORT: Output the robots current coordinates

This was simple enough, the challenge came when I had to create a table for the robot to  be placed... I started out like I usually do, by drawing the solution on paper, I drew a 5x5 grid in my note book, and noted where the X axis, the Y axis, and where North South East and West were. initially I thought I would have to create a new table each time the robot was placed, by initialising some sort of table object, that would visually display the robots position in the command prompt... but the solution only requires the robot to be able to report once placed: it's current position on the X axis, the Y axis and its orientation.

#### solution

What had at stumped me at first became obvious. There doesn't NEED to be a table, just the idea of the table, represented by the robots x and y coordinates. I created a state object associated for the robot, it would hold information on:

- Whether the robot was placed
- The robot's current position on the X axis
- The robot's current position on the Y axis
- The robot's current orientation

Once I worked out how to create an interface with node's create readline module, I was able to pass commands into the program... So I wrote the necessary validation to make sure that the robot would only listen for:

- PLACE X,Y,F

Placing the robot would set the robot states placed key to be true.

Once the robot was placed, and the program knew it, I let the robot respond to the other commands:

- MOVE
- LEFT
- RIGHT
- REPORT

and also to respond to any additional PLACE commands.

At this point, I had my robot moving, reporting it's current location, and turning in the directions it needed to. The next problem came when the robot wouldn't stay on the table.

I decided that instead of hard coding the values for the max-width and max-height of the table, the table needed to have rules. using these rules I could make sure that the PLACE function would only place the robot in a valid position. I created another file, this time for the configuration of the table (or plane) instead of being restricted to a grid of 5x5, it could be 9x9 (any more than that, and the pattern to match in the validateInput function would have to be adjusted ever so slightly.

Using the rules I set for the table/plane, I was able to make sure the robot wasn't able to move off of the table. by making the plane-config.js accessible via the module pattern, I could validate at all steps of the application, this allowed me to ignore any PLACE commands with X and Y coordinates that don't match the rules for the table, as well as make sure that if the robot is facing any edge, make sure the X or Y can't be above or below the given range.

## How to use

***This application requires you to have node.js installed on your machine.***

To play with this toy robot simulator, download this repo, cd into the directory and run
```bash
node app.js
```
The robot accepts the following commands:

```bash
PLACE X,Y,F
```
Where X is coordinate on the X axis,
Y = coordinate on the Y axis
F = oriention. (only in the following format: NORTH, SOUTH, EAST, WEST)

Once the robot has been placed, the following commands become available.

```bash
MOVE
```
Will move the robot 1 unit in the direction it faces.
if the robot is one unit away from any edge, the robot will ignore this command.

```bash
LEFT
```

This will rotate the robot counter-clockwise.

```bash
RIGHT
```

This will rotate the robot clockwise.

```bash
REPORT
```

This will output onto the console, the robot's current X coordinates, Y coordinates and orientation.
