const messageRepo = require("../repositories/message.repo")


exports.createEmailMessage = async (req, res) => {
    try {
        const result = await messageRepo.create(req.body)
        return res.status(result.code).json(result)
    } catch (err) {
        console.log("Error in createEmailMessage =>", err.message)
        return res.status(500).json({ success: false, code: 500, error: "Internal Server Error" })
    }
}


exports.getEmailMessage = async (req, res) => {
    try {
        const result = await messageRepo.get(req.query.key, req.query.value)
        return res.status(result.code).json(result)
    } catch (err) {
        console.log("Error in getEmailMessage =>", err.message)
        return res.status(500).json({ success: false, code: 500, error: "Internal Server Error" })
    }
}


exports.listEmailMessages = async (req, res) => {
    try {
        const queryParams = {
            match: {
                [req.query.key]: req.query.value
            },
            size: req.query.size || 10,
            from: req.query.page || 0
        };
        const result = await messageRepo.list(queryParams)
        return res.status(result.code).json(result)
    } catch (err) {
        console.log("Error in getEmailMessage =>", err.message)
        return res.status(500).json({ success: false, code: 500, error: "Internal Server Error" })
    }
}


exports.updateEmailMessage = async (req, res) => {
    try {
        const result = await messageRepo.update(req.query._id, req.body)
        return res.status(result.code).json(result)
    } catch (err) {
        console.log("Error in getEmailMessage =>", err.message)
        return res.status(500).json({ success: false, code: 500, error: "Internal Server Error" })
    }
}


exports.deleteEmailMessage = async (req, res) => {
    try {
        const result = await messageRepo.delete(req.query._id)
        return res.status(result.code).json(result)
    } catch (err) {
        console.log("Error in getEmailMessage =>", err.message)
        return res.status(500).json({ success: false, code: 500, error: "Internal Server Error" })
    }
}