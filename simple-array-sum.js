/**
 * Simple Array Sum
 * Constraints: 1 <= n <= 10, 0 <= ar[i] <= 10^10
 *
 * Note: 10^10 exceeds 32-bit integer max (2,147,483,647)
 * Use BigInt to handle large values safely
 */

// Solution using BigInt (safest for large numbers)
function simpleArraySum(ar) {
    return ar.reduce((sum, num) => sum + BigInt(num), BigInt(0)).toString();
}

// Alternative: Regular JS numbers (safe up to 2^53 - 1 ≈ 9 * 10^15)
// Max possible sum here: 10 * 10^10 = 10^11, still within safe range
function simpleArraySumNumber(ar) {
    return ar.reduce((sum, num) => sum + num, 0);
}

// Test cases
console.log("Using BigInt:");
console.log(simpleArraySum([1, 2, 3, 4, 10, 11])); // 31

console.log("\nWith large numbers (10^10):");
const largeArr = [10000000000, 10000000000, 10000000000];
console.log(simpleArraySum(largeArr)); // 30000000000

console.log("\nMax possible case (10 elements, each 10^10):");
const maxArr = Array(10).fill(10000000000);
console.log(simpleArraySum(maxArr)); // 100000000000

module.exports = { simpleArraySum };
