import express from 'express';
import {deleteUser, updateUser } from '../Controllers/user.controller.js';
import {verifyToken} from '../Utils/verifyUser.js';
const router = express.Router();

router.put('/update/:userId',verifyToken,updateUser)


router.delete('/delete/:userId',verifyToken,deleteUser)
export default router;