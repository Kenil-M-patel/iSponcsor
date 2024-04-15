const router = require('express').Router()
const bodyParser = require('body-parser')
const {handleLogin , handleSignin } = require('../controllers/loginAuth')


router.post('/login' , handleLogin)
router.post('/signin' ,  handleSignin)


module.exports = router