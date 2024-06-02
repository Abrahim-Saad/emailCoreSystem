
exports.sendResponse = (req, res, resultData, page, redirectUrl) => {
    if (redirectUrl) return res.redirect(redirectUrl)
    if (req.accepts('html')) return res.render(`${page}`, resultData);
    return res.status(resultData.code).json(resultData);
}