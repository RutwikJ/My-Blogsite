import express from 'express';
import { verifyToken } from '../Utils/verifyUser.js';
import { createPost } from '../Controllers/post.controller.js';

const router= express.Router()

router.post('/create',verifyToken,createPost)

export default router