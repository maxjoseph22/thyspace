function emailValidator(req, res, next) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
    const {email} = req.body

    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: "Please use a valid email"})
    }

    next()

}

module.exports = emailValidator;