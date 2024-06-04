const { elasticClient } = require("../configs/database")
const queryHelper = require("./query.helper")

exports.createIndex = async (index, body) => {
    try {
        console.log("Index", index, "created"); // Debug log
        const result = await elasticClient.indices.create({ index, body });
        return {
            success: true,
            code: 201,
            result
        };
    } catch (err) {
        console.log("Error in createIndex =>", err.message)
        return {
            success: false,
            code: 500,
            error: err.message
        };
    }
};


exports.createBulkIndex = async (index, data) => {
    try {
        let bulkBody = [];

        data.forEach(item => {
            bulkBody.push({
                index: { _index: index, _id: item.id }
            });
            bulkBody.push(item);
        });


        const result = await elasticClient.bulk({ body: bulkBody });
        let errorCount = 0;

        result.items.forEach(item => {
            if (item.index && item.index.error) {
                console.log(++errorCount, item.index.error);
            }
        });
        console.log(`Successfully indexed ${data.length - errorCount} out of ${data.length} items`);
        return {
            success: true,
            code: 201,
            result
        };

    } catch (err) {
        console.log("Error in createBulkIndex =>", err.message)
        return {
            success: false,
            code: 500,
            error: err.message
        };
    }
};


exports.checkIndex = async (index) => {
    try {
        const result = await elasticClient.indices.exists({ index });
        return {
            success: true,
            code: 200,
            result
        };
    } catch (err) {
        console.log("Error in checkIndex =>", err.message)
        return {
            success: false,
            code: 500,
            error: err.message
        };
    }
};


exports.listIndicies = async () => {
    try {
        // Get indices information using the cat API
        const result = await elasticClient.cat.indices({ format: 'json' });
        return {
            success: true,
            code: 200,
            result
        };
    } catch (err) {
        console.error('Error in getAllIndices =>', err.message);
        return {
            success: false,
            code: 500,
            error: err.message
        };
    }
};


exports.deleteIndex = async (index) => {
    try {
        const result = await elasticClient.indices.delete({ index });
        return {
            success: true,
            code: 200,
            message: `Index ${index} deleted successfully`,
            result
        };
    } catch (err) {
        console.log("Error in deleteIndex =>", err.message);
        return {
            success: false,
            code: 500,
            error: err.message
        };
    }
};


exports.createDocument = async (index, body) => {
    try {
        let result;

        if (Array.isArray(body)) {
            // Bulk create documents
            const bulkBody = body.flatMap(doc => [{ index: { _index: index } }, doc]);
            result = await elasticClient.bulk({ body: bulkBody });

            // Handle errors in bulk response
            let errorCount = 0;
            result.items.forEach(item => {
                if (item.index && item.index.error) console.log(++errorCount, item.index.error);
            });

            return {
                success: errorCount === 0,
                code: errorCount === 0 ? 201 : 207, // 207 indicates multi-status
                result
            };

        }

        // Single document create
        result = await elasticClient.index({ index, body });
        return {
            success: true,
            code: 201,
            result
        };

    } catch (err) {
        console.log("Error in createDocument =>", err.message);
        return {
            success: false,
            code: 500,
            error: err.message
        };
    }
};


exports.getDocument = async (index, key, value) => {
    try {
        let result;

        if (key === '_id') result = await elasticClient.get({ index, id: value });
        else {

            let body = {
                query: {
                    match: {
                        [key]: value
                    }
                }
            };
            let match = await this.searchDocuments(index, body)
            if (match.count > 0) result = match.result[0];
            else result = null;

        }

        console.log("get document result", result)
        if (!result) return {
            success: false,
            code: 404,
            error: "Not Found."
        }
        return {
            success: true,
            code: 200,
            result
        };
    } catch (err) {
        console.error("Error in getDocument:", err.message);
        return {
            success: false,
            code: 500,
            error: err.message
        };
    }
};


exports.searchDocuments = async (index, query = {}) => {
    try {
        // let body = queryHelper.buildQueryObject(query);
        let body = query;

        const result = await elasticClient.search({ index, body });
        // console.log("searchDocuments result", result)

        const count = result.hits.total.value;
        const hits = result.hits.hits;

        return {
            success: true,
            code: 200,
            result: hits,
            count
        };
    } catch (err) {
        console.log("Error in searchDocuments =>", err.message);
        return {
            success: false,
            code: 500,
            error: err.message
        };
    }
};


exports.updateDocument = async (index, queryParams, body) => {
    try {
        if (typeof queryParams === 'string' || (typeof queryParams === 'object' && queryParams._id)) {
            // Update by ID
            const id = typeof queryParams === 'string' ? queryParams : queryParams._id;
            const result = await elasticClient.update({ index, id, body: { doc: body } });
            return {
                success: true,
                code: 200,
                result
            };
        }

        // Update by Query
        const queryObject = queryHelper.buildQueryObject(queryParams);
        const result = await elasticClient.updateByQuery({
            index,
            body: {
                query: queryObject.query,
                script: {
                    source: Object.keys(body).map(key => `ctx._source.${key} = params.${key}`).join('; '),
                    params: body
                }
            }
        });
        return {
            success: true,
            code: 200,
            result
        };

    } catch (err) {
        console.log("Error in updateDocument =>", err.message);
        return {
            success: false,
            code: 500,
            error: err.message
        };
    }
};


exports.deleteDocument = async (index, queryParams) => {
    try {
        let result;

        if (Array.isArray(queryParams)) {
            // Bulk delete documents by IDs
            const bulkBody = queryParams.map(id => ({ delete: { _index: index, _id: id } }));
            result = await elasticClient.bulk({ body: bulkBody });

            // Handle errors in bulk response
            let errorCount = 0;
            result.items.forEach(item => {
                if (item.delete && item.delete.error) console.log(++errorCount, item.delete.error);
            });

            return {
                success: errorCount === 0,
                code: errorCount === 0 ? 200 : 207, // 207 indicates multi-status
                result
            };

        } else if (typeof queryParams === 'object' && !queryParams._id) {
            // Delete documents by query
            const queryObject = queryHelper.buildQueryObject(queryParams);
            result = await elasticClient.deleteByQuery({
                index,
                body: {
                    query: queryObject
                }
            });

            return {
                success: true,
                code: 200,
                result
            };

        } else if (typeof queryParams === 'string' || (typeof queryParams === 'object' && queryParams._id)) {
            // Single document delete by ID
            const id = typeof queryParams === 'string' ? queryParams : queryParams._id;
            result = await elasticClient.delete({ index, id });
            return {
                success: true,
                code: 200,
                result
            };
        }

        else throw new Error('Invalid queryParams for deleting documents');

    } catch (err) {
        console.log("Error in deleteDocument =>", err.message);
        return {
            success: false,
            code: 500,
            error: err.message
        };
    }
};


exports.closeConnection = () => {
    console.log('\nAll connections of elasticsearch database have ended');
    elasticClient.close();
}