const router = require('express').Router()
const controller = require('./../controllers')

router.post('/authenticate', controller.authenticate)
router.get('/logout', controller.logout)
router.post('/change-password', controller.changepassword)
router.post('/email-forget-password', controller.emailForgetPassword)

module.exports = router
