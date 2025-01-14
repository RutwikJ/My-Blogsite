import express from 'express'
import { verifyToken } from '../Utils/verifyUser.js'
import { createComment } from '../Controllers/comment.controller.js'

const router = express.Router()

router.post('/create',verifyToken,createComment)
export default router;