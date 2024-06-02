const elasticHelper = require("../helpers/elasticSearch.helper")


const userSchema = {
    mappings: {
        properties: {
            userId: { type: 'keyword' },
            outlookId: { type: 'keyword' },
            user_email: { type: 'keyword' },
            name: { type: 'keyword' },
            password: { type: 'keyword', index: false },
            accessToken: { type: 'keyword' },
            refreshToken: { type: 'keyword' },
        }
    }
}


exports.createUserIndex = async () => {
    let resultObject = await elasticHelper.createIndex("users", userSchema)
    return resultObject
}