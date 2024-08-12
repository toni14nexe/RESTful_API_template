const express = require("express");
const router = express.Router();
const authCheck = require("../middleware/authCheck");
const debtsController = require("../controllers/debts");

router.get("/", debtsController.get_debts);

router.get("/:debtId", debtsController.get_one_debt);

router.post("/", authCheck, debtsController.post_debt);

router.patch("/:debtId", authCheck, debtsController.patch_debt);

router.delete("/:debtId", authCheck, debtsController.delete_debt);

module.exports = router;
