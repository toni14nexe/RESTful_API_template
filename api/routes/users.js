const express = require('express')
const router = express.Router()
const authCheck = require("../middleware/authCheck")
const usersController = require("../controllers/users")

router.get('/', authCheck, usersController.get_all_users)

router.get('/:userId', authCheck, usersController.get_one_user)

router.post('/signup', usersController.user_signup)

router.post('/login', usersController.user_login)

router.delete('/:userId', authCheck, usersController.delete_user)

module.exports = router