const { v4: uuidv4 } = require('uuid');
const userRepo = require("../repositories/user.repo")
const bcryptHelper = require("../helpers/bcrypt.helper")
const { sendResponse } = require("../helpers/response.helper")

exports.createUser = async (req, res) => {
    try {
        let existant = await userRepo.get("user_email", req.body.user_email)
        if (existant.success) {
            let errorData = { success: false, code: 409, error: "Email Already Exists!" };
            return sendResponse(req, res, errorData, "error", null);
        }

        req.body.userId = uuidv4();
        req.body.password = await bcryptHelper.hash(req.body.password);
        const result = await userRepo.create(req.body);
        return sendResponse(req, res, result, "home", null);
    } catch (err) {
        console.log("Error in createUser =>", err.message);
        let errorData = { success: false, code: 500, error: "Internal Server Error" };
        return sendResponse(req, res, errorData, "error", null);
    }
};



exports.getUser = async (req, res) => {
    try {
        const result = await userRepo.get(req.query.key, req.query.value)
        return res.status(result.code).json(result)
    } catch (err) {
        console.log("Error in getUser =>", err.message)
        return res.status(500).json({ success: false, code: 500, error: "Internal Server Error" })
    }
}


exports.listUsers = async (req, res) => {
    try {
        const queryParams = {
            size: req.query.size || 10,
            from: req.query.page || 0
        };
        const result = await userRepo.list(queryParams)
        return res.status(result.code).json(result)
    } catch (err) {
        console.log("Error in getUser =>", err.message)
        return res.status(500).json({ success: false, code: 500, error: "Internal Server Error" })
    }
}


exports.updateUser = async (req, res) => {
    try {
        if (req.body.user_email) {
            let existant = await userRepo.get("user_email", req.body.user_email)
            if (req.query._id !== existant.result._id) return res.status(409).json({ success: false, code: 409, error: "Email Already Exists!" })

        }
        const result = await userRepo.update(req.query._id, req.body)
        return res.status(result.code).json(result)
    } catch (err) {
        console.log("Error in getUser =>", err.message)
        return res.status(500).json({ success: false, code: 500, error: "Internal Server Error" })
    }
}


exports.deleteUser = async (req, res) => {
    try {
        const result = await userRepo.delete(req.query._id)
        return res.status(result.code).json(result)
    } catch (err) {
        console.log("Error in getUser =>", err.message)
        return res.status(500).json({ success: false, code: 500, error: "Internal Server Error" })
    }
}
