const router = require('express').Router();

const {
  getAllUsers, getCertainUser, createNewUser, updateProfile, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getCertainUser);
router.post('/', createNewUser);
router.patch('/users/me', updateProfile);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
