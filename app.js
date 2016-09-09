//The readline module provides an interface for reading data from a Readable stream
//(such as process.stdin) one line at a time. It can be accessed using:
let Robot = require('robot')

const readline = require('readline');


//process.stdin property returns a readable stream equivalent or associated with stdin (fd 0)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  console.log('Thank you for your valuable feedback:', answer);

  rl.close();
});
