const mailboxRepo = require("../repositories/mailbox.repo")


exports.createMailbox = async (req, res) => {
    try {
        const result = await mailboxRepo.create(req.body)
        return res.status(result.code).json(result)
    } catch (err) {
        console.log("Error in createMailbox =>", err.message)
        return res.status(500).json({ success: false, code: 500, error: "Internal Server Error" })
    }
}


exports.getMailbox = async (req, res) => {
    try {
        const result = await mailboxRepo.get(req.query.key, req.query.value)
        return res.status(result.code).json(result)
    } catch (err) {
        console.log("Error in getMailbox =>", err.message)
        return res.status(500).json({ success: false, code: 500, error: "Internal Server Error" })
    }
}


exports.listMailboxs = async (req, res) => {
    try {
        const queryParams = {
            match: {
                [req.query.key]: req.query.value
            },
            size: req.query.size || 10,
            from: req.query.page || 0
        };
        const result = await mailboxRepo.list(queryParams)
        return res.status(result.code).json(result)
    } catch (err) {
        console.log("Error in getMailbox =>", err.message)
        return res.status(500).json({ success: false, code: 500, error: "Internal Server Error" })
    }
}


exports.updateMailbox = async (req, res) => {
    try {
        const result = await mailboxRepo.update(req.query._id, req.body)
        return res.status(result.code).json(result)
    } catch (err) {
        console.log("Error in getMailbox =>", err.message)
        return res.status(500).json({ success: false, code: 500, error: "Internal Server Error" })
    }
}


exports.deleteMailbox = async (req, res) => {
    try {
        const result = await mailboxRepo.delete(req.query._id)
        return res.status(result.code).json(result)
    } catch (err) {
        console.log("Error in getMailbox =>", err.message)
        return res.status(500).json({ success: false, code: 500, error: "Internal Server Error" })
    }
}