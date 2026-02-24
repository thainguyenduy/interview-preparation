/**
 * Find the TV series with the highest IMDB rating for a given genre
 * If there's a tie, return the alphabetically lower name
 */

async function getHighestRatedSeries(genre) {
    const baseUrl = 'https://jsonmock.hackerrank.com/api/tvseries?page=';
    let allSeries = [];
    let currentPage = 1;
    let totalPages = 1;

    // Fetch all pages
    while (currentPage <= totalPages) {
        const response = await fetch(`${baseUrl}${currentPage}`);
        const data = await response.json();

        totalPages = data.total_pages;
        allSeries = allSeries.concat(data.data);
        currentPage++;
    }

    // Filter by genre
    const filteredSeries = allSeries.filter((series) =>
        series.genre.toLowerCase().includes(genre.toLowerCase())
    );

    if (filteredSeries.length === 0) {
        return null;
    }

    // Find highest rated (tie-breaker: alphabetically lower name)
    const highestRated = filteredSeries.reduce((best, current) => {
        const currentRating = parseFloat(current.imdb_rating);
        const bestRating = parseFloat(best.imdb_rating);

        if (currentRating > bestRating) {
            return current;
        } else if (currentRating === bestRating) {
            // Tie-breaker: alphabetically lower name
            return current.name.toLowerCase() < best.name.toLowerCase()
                ? current
                : best;
        }
        return best;
    });

    return highestRated.name;
}

// Test the function
async function main() {
    try {
        const genres = ['Drama', 'Comedy', 'Action'];

        for (const genre of genres) {
            const result = await getHighestRatedSeries(genre);
            console.log(`Highest rated ${genre} series: ${result}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();

module.exports = { getHighestRatedSeries };
