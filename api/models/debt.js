const mongoose = require("mongoose")

const debtSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    done: { type: Boolean, default: false },
    date: { type: String, required: true },
    description: { type: String, required: true }
})

module.exports = mongoose.model('Debt', debtSchema)