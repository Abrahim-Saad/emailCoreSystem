const elasticHelper = require("../helpers/elasticSearch.helper")
const indexName = "users"


exports.create = async (body) => {
    try {
        const result = await elasticHelper.createDocument(indexName, body);
        return result;
    } catch (err) {
        console.log("Error in create message =>", err.message)
        return {
            success: false,
            code: 500,
            error: err.message
        };
    }
}


exports.get = async (key, value) => {
    try {
        const result = await elasticHelper.getDocument(indexName, key || "_id", value);
        return result;
    } catch (err) {
        console.log("Error in get message =>", err.message)
        return {
            success: false,
            code: 500,
            error: err.message
        };
    }
}


exports.list = async (query) => {
    try {
        const result = await elasticHelper.searchDocuments(indexName, query);
        return result;
    } catch (err) {
        console.log("Error in list message =>", err.message)
        return {
            success: false,
            code: 500,
            error: err.message
        };
    }
}


exports.update = async (query, body) => {
    try {
        const result = await elasticHelper.updateDocument(indexName, query, body);
        return result;
    } catch (err) {
        console.log("Error in create message =>", err.message)
        return {
            success: false,
            code: 500,
            error: err.message
        };
    }
}


exports.delete = async (query) => {
    try {
        const result = await elasticHelper.deleteDocument(indexName, query);
        return result;
    } catch (err) {
        console.log("Error in create message =>", err.message)
        return {
            success: false,
            code: 500,
            error: err.message
        };
    }
}