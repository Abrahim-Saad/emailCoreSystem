const elasticHelper = require("../helpers/elasticSearch.helper")


const mailboxSchema = {
    mappings: {
        properties: {
            user_email: { type: 'keyword' },
            mailbox_settings: { type: 'object' },
            folders: {
                type: 'nested',
                properties: {
                    name: { type: 'keyword' },
                    path: { type: 'keyword' },
                    unread_count: { type: 'integer' }
                }
            }
        }
    }
}


exports.createMailboxIndex = async () => {
    let resultObject = await elasticHelper.createIndex("mailboxes", mailboxSchema)
    return resultObject
}