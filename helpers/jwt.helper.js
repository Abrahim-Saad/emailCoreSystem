let jwt = require("jsonwebtoken")


exports.generateToken = (payloadObject, expiryTimeString) => {
    try {
        let expiresIn = expiryTimeString ? expiryTimeString : "1d"
        return jwt.sign(payloadObject, process.env.ACCESS_TOKEN_SECRET, { expiresIn })

    } catch (err) {
        console.log(`err.message`, err.message);
        return err.message
    }

}


exports.verifyToken = () => {
    return (req, res, next) => {
        try {
            let authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(" ")[1]
            if (!token) return res.status(401).json({ success: false, error: "Unauthorized", code: 401 })

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, tokenData) => {
                if (err) return res.status(403).json({ success: false, error: "Invalid Token", code: 403 })
                req.tokenData = tokenData;
                return next();
            })

        } catch (err) {
            console.log(`err.message`, err.message);
            return res.status(500).json({ success: false, error: "Internal Server Error", code: 401 })
        }
    }

}