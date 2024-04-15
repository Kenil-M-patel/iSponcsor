const router = require('express').Router()
const {
    handleGetAllUsers,
    handleGetUserbyId,
    handleUpdateUserbyID,
    handleDelet,
    handleCreateUser

} = require('../controllers/user')

router.route('/').get(handleGetAllUsers).post(handleCreateUser)
router.route('/:id')
                        .get(handleGetUserbyId)
                        .patch(handleUpdateUserbyID)
                        .delete(handleDelet) 
module.exports = router
