const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    role: { type: String, default: 'user' },
    username: { type: String, required: true },
    password: { type: String, required: true }

    // EXAMPLE of using 'unique' and 'match':
    // email: { type: String, required: true, unique: true, match: /<SOME_REGEX_CODE>/ }
})

module.exports = mongoose.model('User', userSchema)