const elasticHelper = require("../helpers/elasticSearch.helper")


const messageSchema = {
    mappings: {
        properties: {
            user_email: { type: 'keyword' },
            sender: { type: 'keyword' },
            recipient: { type: 'keyword' },
            subject: { type: 'text' },
            body: { type: 'text' },
            sent_date: { type: 'date' },
            received_date: { type: 'date' }
        }
    }
}

exports.createEmailMessageIndex = async () => {
    let resultObject = await elasticHelper.createIndex("messages", messageSchema)
    return resultObject
}