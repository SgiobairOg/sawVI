const random = require("random");
const pick = require("pick-random");
const prompt = require("prompt");
const chars = {
  hexadecimal: [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0"
  ],
  decimal: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
};

class Game {
  constructor(program) {
    this.program = program;
    this.mode = this.program.hex ? "hexadecimal" : "decimal";
    this.digitCount = parseInt(this.program.digits) || random.int(3, 9);
    if (this.digitCount < 3 || this.digitCount > 9) {
      console.log("Your digit count must be between 3 and 9 inclusive.\n");
      this.program.help();
    }
    this.startGame();
  }

  startGame() {
    this.secretNumber = pick(chars[this.mode], { count: this.digitCount });
    console.log(`Let's play!`);
    console.log(
      `I'm thinking of a ${this.digitCount}-digit ${this.mode} number.`
    );
    console.log(
      `In your response, a good number exists in the string of numbers. A perfect number exists in the exact right place. The goal is to get ${
        this.digitCount
      } perfect numbers.`
    );
    this.tryGuess();
  }

  tryGuess(reprompt = false) {
    const pattern = `(${chars[this.mode].join("|")}){${this.digitCount}}`;
    const regex = new RegExp(pattern, "i");
    const schema = {
      properties: {
        guess: {
          pattern: regex,
          description: `${this.digitCount} ${this.mode} characters: `,
          message: `Your guess must be ${this.digitCount} ${
            this.mode
          } characters`,
          required: true
        }
      }
    };

    prompt.message = reprompt ? "Try again." : "What's your guess?";
    prompt.delimiter = " ";

    prompt.start();

    prompt.get(schema, (err, result) => this.checkGuess(err, result));
  }

  newGamePrompt() {
    console.log("Want to play again? At the moment you need to restart...");
  }

  checkGuess(err, result) {
    if (err) console.log(err);

    const score = {
      good: 0,
      perfect: 0,
      bad: 0
    };

    result.guess = result.guess.toUpperCase();

    for (let i = 0; i < result.guess.length; i++) {
      if (result.guess[i] === this.secretNumber[i]) {
        score.perfect += 1;
      } else if (this.secretNumber.includes(result.guess[i])) {
        score.good += 1;
      } else {
        score.bad += 1;
      }
    }

    if (score.perfect === this.digitCount) {
      console.log(
        `Good guess! You got it! The number was ${this.secretNumber}`
      );
      this.newGamePrompt();
    } else {
      console.log(
        `You got ${score.perfect} perfect, ${score.good} good, and ${
          score.bad
        } bad.`
      );
      this.tryGuess(true);
    }
  }
}

module.exports = Game;
