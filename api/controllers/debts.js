const Debt = require("../models/debt");
const mongoose = require("mongoose");

exports.get_debts = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const sort = req.query.sort || "desc";
  const sortBy = req.query.sortBy || "relevant";
  const search = req.query.search || "";

  // Constructing sort object
  let sortObj = {};
  if (sortBy === "relevant") sortObj = { done: 1, _id: -1 };
  else if (sortBy) sortObj[sortBy] = sort === "asc" ? 1 : -1;

  // Constructing search criteria
  let searchCriteria = {};
  if (search) searchCriteria = { name: new RegExp(search, "i") };

  Debt.find(searchCriteria)
    .select("_id name done date description")
    .sort(sortObj)
    .skip((page - 1) * perPage)
    .limit(perPage)
    .exec()
    .then((docs) => {
      Debt.countDocuments(searchCriteria).then((count) => {
        res.status(200).json({
          total: count,
          page,
          perPage,
          totalPages: Math.ceil(count / perPage),
          debts: docs,
        });
      });
    })
    .catch((error) => res.status(500).json({ error: error }));
};

exports.get_one_debt = (req, res, next) => {
  Debt.findById(req.params.debtId)
    .select("_id name done date description")
    .exec()
    .then((doc) => {
      if (doc) res.status(200).json(doc);
      else
        res
          .status(404)
          .json({ Message: "No valid entry found for provided ID" });
    })
    .catch((error) => res.status(500).json({ error: error }));
};

exports.post_debt = (req, res, next) => {
  const debt = new Debt({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    done: req.body.done,
    date: req.body.date,
    description: req.body.description,
  });
  debt
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Debt created successfully",
        debt: {
          _id: result._id,
          name: result.name,
          done: result.done,
          date: result.date,
          description: result.description,
        },
      });
    })
    .catch((error) => res.status(500).json({ error: error }));
};

exports.patch_debt = (req, res, next) => {
  Debt.findById(req.params.debtId)
    .select("_id name done date description")
    .exec()
    .then((doc) => {
      if (doc) {
        Debt.updateOne(
          { _id: req.params.debtId },
          { $set: { done: !doc.done } }
        )
          .exec()
          .then((result) => {
            res.status(200).json({
              message: "Done status changed successfully",
              debt: { ...doc._doc, done: !doc.done },
            });
          })
          .catch((error) => res.status(500).json({ error: error }));
      } else
        res
          .status(404)
          .json({ Message: "No valid entry found for provided ID" });
    });
};

exports.delete_debt = (req, res, next) => {
  Debt.deleteOne({ _id: req.params.debtId })
    .exec()
    .then((result) =>
      res.status(200).json({
        message: "Debt was deleted successfully",
      })
    )
    .catch((error) => res.status(500).json({ error: error }));
};
