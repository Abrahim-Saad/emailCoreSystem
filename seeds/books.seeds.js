const { elasticClient } = require("../configs/database")

const dataset = [
    { "name": "Snow Crash", "author": "Neal Stephenson", "release_date": "1992-06-01", "page_count": 470 },
    { "name": "Revelation Space", "author": "Alastair Reynolds", "release_date": "2000-03-15", "page_count": 585 },
    { "name": "1984", "author": "George Orwell", "release_date": "1985-06-01", "page_count": 328 },
    { "name": "Fahrenheit 451", "author": "Ray Bradbury", "release_date": "1953-10-15", "page_count": 227 },
    { "name": "Brave New World", "author": "Aldous Huxley", "release_date": "1932-06-01", "page_count": 268 },
    { "name": "The Handmaid's Tale", "author": "Margaret Atwood", "release_date": "1985-06-01", "page_count": 311 },
];

// Index with the bulk helper
const insertBulk = async () => {
    const insertionResult = await elasticClient.helpers.bulk({
        datasource: dataset,
        onDocument: (doc) => ({ index: { _index: 'index_name' } }),
    });
    console.log(insertionResult);
}


const search = async () => {
    const searchResult = await elasticClient.search({
        index: 'index_name',
        q: 'snow'
    });
    console.log(searchResult.hits.hits)

}

insertBulk().then(() => search())