import express from 'express';
import { signIn, signUp,google,signOut } from '../Controllers/auth.controller.js';
 

const router = express.Router()

router.post('/signup',signUp)
router.post('/signin',signIn)
router.post('/google',google)
router.post('/signout',signOut)

export default router;