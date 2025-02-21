import express from 'express'
import { verifyToken } from '../Utils/verifyUser.js'
import { createComment, getPostComment, likeComment } from '../Controllers/comment.controller.js'

const router = express.Router()

router.post('/create',verifyToken,createComment)
router.get('/getPostComment/:postId',getPostComment)
router.put('/likeComment/:commentId',verifyToken,likeComment)
export default router;