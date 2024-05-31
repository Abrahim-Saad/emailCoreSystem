const { elasticClient } = require("../configs/database")

exports.createIndex = async (indexName) => {
    try {
        const result = await elasticClient.indices.create({ index: indexName });
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


exports.checkIndex = async (indexName) => {
    try {
        const result = await elasticClient.indices.exists({ index: indexName });
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


exports.createDocument = async (indexName, id, docType, payload) => {
    try {
        const result = await elasticClient.create({
            index: indexName,
            type: docType,
            id: id,
            body: payload
        });

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


exports.searchDocument = async (indexName, payload) => {
    try {
        const result = await elasticClient.search({
            index: indexName,
            body: {
                query: {
                    match: payload
                }
            }
        });
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


exports.updateDocument = async (indexName, id, docType, payload) => {
    try {
        const result = await elasticClient.update({
            index: indexName,
            type: docType,
            id: id,
            body: {
                doc: payload
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


exports.deleteDocument = async (indexName, id, docType) => {
    try {
        const result = await elasticClient.delete({
            index: indexName,
            type: docType,
            id: id
        });
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