exports.buildQueryObject = (queryParams) => {
    const {
        match, multi_match, term, terms, range, exists, prefix, wildcard, regexp,
        sort, size, from, aggs, must_not, should, filter, suggest
    } = queryParams;

    // Check if no query parameters are provided
    if (Object.keys(queryParams).length === 0) return { query: { match_all: {} } };

    let query = {
        bool: {
            must: [],
            filter: [],
            should: [],
            must_not: []
        }
    };

    // Handling 'match' queries
    if (match) {
        for (const [field, value] of Object.entries(match)) {
            query.bool.must.push({ match: { [field]: value } });
        }
    }

    // Handling 'multi_match' queries
    if (multi_match) {
        for (const { query: mq, fields } of multi_match) {
            query.bool.must.push({ multi_match: { query: mq, fields } });
        }
    }

    // Handling 'term' queries
    if (term) {
        for (const [field, value] of Object.entries(term)) {
            query.bool.filter.push({ term: { [field]: value } });
        }
    }

    // Handling 'terms' queries
    if (terms) {
        for (const [field, values] of Object.entries(terms)) {
            query.bool.filter.push({ terms: { [field]: values } });
        }
    }

    // Handling 'range' queries
    if (range) {
        for (const [field, value] of Object.entries(range)) {
            query.bool.filter.push({ range: { [field]: value } });
        }
    }

    // Handling 'exists' queries
    if (exists) {
        for (const field of exists) {
            query.bool.filter.push({ exists: { field } });
        }
    }

    // Handling 'prefix' queries
    if (prefix) {
        for (const [field, value] of Object.entries(prefix)) {
            query.bool.must.push({ prefix: { [field]: value } });
        }
    }

    // Handling 'wildcard' queries
    if (wildcard) {
        for (const [field, value] of Object.entries(wildcard)) {
            query.bool.must.push({ wildcard: { [field]: value } });
        }
    }

    // Handling 'regexp' queries
    if (regexp) {
        for (const [field, value] of Object.entries(regexp)) {
            query.bool.must.push({ regexp: { [field]: value } });
        }
    }

    // Handling 'must_not' queries
    if (must_not) {
        for (const condition of must_not) {
            query.bool.must_not.push(condition);
        }
    }

    // Handling 'should' queries
    if (should) {
        for (const condition of should) {
            query.bool.should.push(condition);
        }
    }

    // Handling 'filter' queries
    if (filter) {
        for (const condition of filter) {
            query.bool.filter.push(condition);
        }
    }

    // Constructing the final query object
    let queryObject = { query };

    // Adding sorting if present
    if (sort) {
        queryObject.sort = sort;
    }

    // Adding pagination parameters if present
    if (size) {
        queryObject.size = size;
    }

    if (from) {
        queryObject.from = from;
    }

    // Adding aggregations if present
    if (aggs) {
        queryObject.aggs = aggs;
    }

    // Adding suggestions if present
    if (suggest) {
        queryObject.suggest = suggest;
    }

    return queryObject;
};
