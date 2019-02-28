# Guess the Number

Written for [@shackbarth](https://github.com/shackbarth)'s Sharpen Your Saw VI exercise from [@norfolkjs](https://github.com/norfolkjs)

For a quick start, run `node numberme.js`.

You'll be prompted for your guess at a decimal number of a specified number of digits. When you enter your response you'll receive a number of perfect, good, or bad digits. A perfect digit is a right digit in the right spot, a good digit exists in the number but is in the wrong spot, a bad number isn't in the number. You'll be prompted for a new guess until you get the answer or, you can enter `ctrl+c` to end the game early.

If you're nuts, you can get a hexadecimal number using the `-h` flag and you can get a longer number, up to nine digits with `-d <int>`.

_Validation is limited and you may break things if you give weird input._
