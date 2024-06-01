const { elasticClient } = require("../configs/database")


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
        console.log(`Index ${index} deleted successfully:`, result);
        return {
            success: true,
            code: 200,
            result
        };
    } catch (err) {
        console.error(`Error deleting index ${indexName} =>`, err.message);
        return {
            success: false,
            code: err.statusCode || 500,
            error: err.message
        };
    }
};


exports.createDocument = async (index, body) => {
    try {
        const result = await elasticClient.index({ index, body });
        return {
            success: true,
            code: 201,
            result
        };
    } catch (err) {
        console.log("Error in createDocument =>", err.message)
        return {
            success: false,
            code: 500,
            error: err.message
        };
    }
};


exports.searchDocuments = async (index, body) => {
    try {
        const result = await elasticClient.search({ index, body });
        return {
            success: true,
            code: 200,
            result
        };
    } catch (err) {
        console.log("Error in searchDocument =>", err.message)
        return {
            success: false,
            code: 500,
            error: err.message
        };
    }
};


exports.updateDocument = async (index, id, body) => {
    try {
        const result = await elasticClient.update({
            index, id,
            body: {
                doc: body
            }
        });
        return {
            success: true,
            code: 200,
            result
        };
    } catch (err) {
        console.log("Error in updateDocument =>", err.message)
        return {
            success: false,
            code: 500,
            error: err.message
        };
    }
};


exports.deleteDocument = async (index, id) => {
    try {
        const result = await elasticClient.delete({ index, id });
        return {
            success: true,
            code: 200,
            result
        };
    } catch (err) {
        console.log("Error in deleteDocument =>", err.message)
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