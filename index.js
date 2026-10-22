import prompts from 'prompts';
import chalk from 'chalk';
import { randomInt } from 'crypto';
import fs from 'fs';

const log = console.log;

const gameLogs = [];

function gameLog(message) {
    log(message);
    gameLogs.push(message); 
}

gameLog(chalk.magenta('GUESS THE NUMBER!'));
gameLog(chalk.blue('─').repeat(40));

gameLog(chalk.white('Guess a number between 1 and 10.'));
gameLog(chalk.yellow('You have 3 attempts!'));
gameLog('');

const max_attempts = 3;
const secret_number = randomInt(1, 11);

async function playGame() {
    let attemptsUsed = 0;
    let hasWon = false;

    while (attemptsUsed < max_attempts && !hasWon) {
        const currentAttempt = attemptsUsed + 1;

        const response = await prompts({
            type: 'text',
            name: 'guess',
            message: `Attempt ${currentAttempt}/${max_attempts}: Enter your guess`
        });

        if (response.guess === undefined) {
            gameLog(chalk.red('Game aborted by user.'));
            break;
        }

        try {
            const rawInput = response.guess.trim();

            if (rawInput === '') {
                throw new Error('A guess is required.');
            }

            const parsedNumber = Number(rawInput);

            if (!Number.isInteger(parsedNumber) || isNaN(parsedNumber)) {
                throw new Error('Guess must be a valid whole number.');
            }

            if (parsedNumber < 1) {
                throw new Error('Guess must be at least 1.');
            }

            if (parsedNumber > 10) {
                throw new Error('Guess cannot exceed 10.');
            }

            attemptsUsed++;

            if (parsedNumber === secret_number) {
                hasWon = true;
                gameLog(chalk.green.bold(`Correct! You guessed it!`));
            } else if (parsedNumber < secret_number) {
                gameLog(chalk.yellow('Too low!'));
            } else {
                gameLog(chalk.yellow('Too high!'));
            }

        } catch (error) {
            gameLog(chalk.red(error.message));
        }
    }

    if (!hasWon && attemptsUsed === max_attempts) {
        gameLog(chalk.red.bold('GAME OVER!'));
        gameLog(chalk.white(`The secret number was ${secret_number}.`));
    }

    gameLog(chalk.magenta('Thanks for playing!'));

    try {
        fs.writeFileSync('game_output.txt', gameLogs.join('\n'), 'utf8');
    } catch (err) {
        console.error('Failed to save log file:', err);
    }
}

playGame();
