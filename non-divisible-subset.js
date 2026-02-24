/**
 * Find the size of maximal subset where no two elements sum to a multiple of k
 *
 * Key insight: Two numbers sum to a multiple of k if (a % k) + (b % k) = k or 0
 *
 * Strategy:
 * 1. Group numbers by their remainder when divided by k
 * 2. For remainder 0: can only pick 1 (since 0 + 0 = 0, divisible by k)
 * 3. For remainder k/2 (if k is even): can only pick 1
 * 4. For other remainders r: pick max(count[r], count[k-r]) since r + (k-r) = k
 */

function nonDivisibleSubset(k, s) {
    // Count occurrences of each remainder
    const remainderCount = new Array(k).fill(0);

    for (const num of s) {
        remainderCount[num % k]++;
    }

    let maxSize = 0;

    // Handle remainder 0: can include at most 1
    if (remainderCount[0] > 0) {
        maxSize += 1;
    }

    // Handle pairs of remainders (r, k-r)
    // Loop from 1 to k/2 exclusive to avoid double counting
    for (let r = 1; r < k / 2; r++) {
        // Take the group with more elements (can't pick from both since r + (k-r) = k)
        maxSize += Math.max(remainderCount[r], remainderCount[k - r]);
    }

    // Handle remainder k/2 if k is even: can include at most 1 (since k/2 + k/2 = k)
    if (k % 2 === 0 && remainderCount[k / 2] > 0) {
        maxSize += 1;
    }

    return maxSize;
}

// Test with the example
const S = [19, 10, 12, 10, 24, 25, 22];
const k = 4;

// Remove duplicates since problem says "distinct integers"
const distinctS = [...new Set(S)];

console.log("Input S:", S);
console.log("Distinct S:", distinctS);
console.log("k:", k);
console.log("\nRemainders:");
distinctS.forEach(num => console.log(`  ${num} % ${k} = ${num % k}`));

const result = nonDivisibleSubset(k, distinctS);
console.log("\nMaximal subset size:", result);

// Visualize the remainder groups
console.log("\n--- Remainder Groups ---");
const groups = {};
distinctS.forEach(num => {
    const r = num % k;
    if (!groups[r]) groups[r] = [];
    groups[r].push(num);
});
Object.entries(groups).sort((a, b) => a[0] - b[0]).forEach(([r, nums]) => {
    console.log(`Remainder ${r}: [${nums.join(', ')}]`);
});

console.log("\n--- Selection Logic ---");
console.log("• Remainder 0: pick at most 1");
console.log("• Remainder 2 (k/2): pick at most 1 (since 2+2=4, divisible by k)");
console.log("• Remainders 1 & 3: pick max of either group (1+3=4, divisible by k)");

// Additional test cases
console.log("\n--- More Examples ---");
console.log("nonDivisibleSubset(3, [1,7,2,4]):", nonDivisibleSubset(3, [1, 7, 2, 4]));
console.log("nonDivisibleSubset(7, [278,576,496,727,410,124,338,149,209,702,282,718,771,575,436]):",
    nonDivisibleSubset(7, [278, 576, 496, 727, 410, 124, 338, 149, 209, 702, 282, 718, 771, 575, 436]));

module.exports = { nonDivisibleSubset };
