const messageModel = require("./message.model")
const mailboxModel = require("./mailbox.model")


exports.setupIndicies = async () => {
    messageModel.createEmailMessageIndex();
    mailboxModel.createMailboxIndex()
}