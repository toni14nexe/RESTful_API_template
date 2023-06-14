const Debt = require("../models/debt")
const mongoose = require("mongoose")

exports.get_all_debts = (req, res, next) => {
    Debt.find()
        .select('_id name done date description')
        .exec()
        .then(docs => {
            res.status(200).json({
                total: docs.length,
                debts: docs
            })
        })
        .catch(error => res.status(500).json({ error: error }))
}

exports.get_one_debt = (req, res, next) => {
    Debt.findById(req.params.debtId)
        .select('_id name done date description')
        .exec()
        .then(doc => {
            if(doc) res.status(200).json(doc)
            else res.status(404).json({ Message: 'No valid entry found for provided ID' })
        })
        .catch(error => res.status(500).json({ error: error }))
}

exports.post_debt = (req, res, next) => {
    const debt = new Debt({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        done: req.body.done,
        date: req.body.date,
        description: req.body.description
    })
    debt.save()
        .then(result => {
            res.status(200).json({
                message: 'Debt created successfully',
                debt: {
                    _id: result._id,
                    name: result.name,
                    done: result.done,
                    date: result.date,
                    description:result.description
                }
            })
        })
        .catch(error => res.status(500).json({ error: error }))
}

exports.patch_debt = (req, res, next) => {
    Debt.findById(req.params.debtId)
        .select('_id name done date description')
        .exec()
        .then(doc => {
            if(doc) {
                Debt.updateOne({ _id: req.params.debtId }, { $set: { done: !doc.done } })
                    .exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'Done status changed successfully',
                            debt: { ...doc._doc, done: !doc.done }
                        })
                    })
                    .catch(error => res.status(500).json({ error: error }))
            }
            else res.status(404).json({ Message: 'No valid entry found for provided ID' })
        })
}

exports.delete_debt = (req, res, next) => {
    Debt.deleteOne({ _id: req.params.debtId })
        .exec()
        .then(result => res.status(200).json({
            message: 'Debt was deleted successfully'
        }))
        .catch(error => res.status(500).json({ error: error }))
}