import express from 'express';
import { userTest } from '../Controllers/user.controller.js';
const router = express.Router();

router.get('/test',userTest)

export default router;