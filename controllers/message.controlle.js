const messageRepo = require("../repositories/message.repo")


exports.createEmailMessage = async (req, res) => {
    try {
        const result = await messageRepo.create(req.body)
        return res.status(result.code).json(result)
    } catch (err) {
        console.log("Error in createDocument =>", err.message)
        return res.status(500).json({ success: false, code: 500, error: "Internal Server Error" })
    }
}