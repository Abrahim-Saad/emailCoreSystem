const elasticHelper = require("../helpers/elasticSearch.helper")
const indexName = "messages"

exports.create = async (bodyObject) => {
    try {
        const result = await elasticHelper.createDocument(indexName, bodyObject);
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
}