const Game = require("./src/game");
const program = require("commander");

program
  .version("0.0.1", "-v, --version")
  .option(
    "-x, --hex",
    "Select Hexadecimal game mode, default is decimal integers"
  )
  .option(
    "-d, --digits <integer>",
    "Number of digits from 3 to 9 (default: 'random')"
  )
  .parse(process.argv);

const match = new Game(program);
