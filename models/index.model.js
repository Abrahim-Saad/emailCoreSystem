const elasticHelper = require("../helpers/elasticSearch.helper")

const messageModel = require("./message.model")
const mailboxModel = require("./mailbox.model")
const userModel = require("./user.model")

exports.setupIndicies = async () => {
    if (!(await isIndexCreated("messages"))) await messageModel.createEmailMessageIndex();
    if (!(await isIndexCreated("mailboxes"))) await mailboxModel.createMailboxIndex();
    if (!(await isIndexCreated("users"))) await userModel.createUserIndex();
}


const isIndexCreated = async (indexName) => {
    let indexCheck = await elasticHelper.checkIndex(indexName)
    // console.log(indexName, "created:", indexCheck.result)
    return indexCheck.result
}