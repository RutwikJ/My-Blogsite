import express from 'express';
import { verifyToken } from '../Utils/verifyUser.js';
import { createPost, getPosts } from '../Controllers/post.controller.js';

const router= express.Router()

router.post('/create',verifyToken,createPost)
router.get('/getposts',getPosts)

export default router