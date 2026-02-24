/**
 * Calculate extra long factorial using BigInt
 * Handles numbers that exceed JavaScript's MAX_SAFE_INTEGER
 */

function extraLongFactorial(n) {
    let result = BigInt(1);

    for (let i = 2; i <= n; i++) {
        result *= BigInt(i);
    }

    return result.toString();
}

// Recursive version (for smaller inputs)
function extraLongFactorialRecursive(n) {
    if (n <= 1) return BigInt(1);
    return BigInt(n) * extraLongFactorialRecursive(n - 1);
}

// Test examples
console.log("Factorial of 25:", extraLongFactorial(25));
console.log("Factorial of 50:", extraLongFactorial(50));
console.log("Factorial of 100:", extraLongFactorial(100));

// For HackerRank-style input
function processInput() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', (line) => {
        const n = parseInt(line.trim(), 10);
        console.log(extraLongFactorial(n));
        rl.close();
    });
}

// Uncomment to use with stdin:
// processInput();

module.exports = { extraLongFactorial, extraLongFactorialRecursive };
