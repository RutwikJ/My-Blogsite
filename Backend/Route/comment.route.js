import express from 'express'
import { verifyToken } from '../Utils/verifyUser.js'
import { createComment, getPostComment } from '../Controllers/comment.controller.js'

const router = express.Router()

router.post('/create',verifyToken,createComment)
router.get('/getPostComment/:postId',getPostComment)
export default router;