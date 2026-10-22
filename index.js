import prompts from 'prompts';
import chalk from 'chalk';
import { randomInt } from 'crypto'

const log = console.log;

log(chalk.magenta('GUESS THE NUMBER!'));
log(chalk.blue('─').repeat(40));

log(chalk.white('Guess a number between 1 and 10'));
log(chalk.yellow('You have 3 attempts!'));
log('')

const max_attempts = 3
const secret_number = randomInt(1, 11);

async function playGame() {
    const response = await prompts({
        type: 'text',
        name: 'guess',
        message: 'Attempt 1/3: Enter your guess'
    })
}