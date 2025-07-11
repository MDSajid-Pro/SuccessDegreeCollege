import express from 'express'
import { adminLogin, approveSubscriberById } from '../controllers/adminController.js';
import adminAuth from '../middleware/adminAuth.js'

const adminRouter = express.Router()

adminRouter.post("/login", adminLogin)
adminRouter.post("/approve-comment", adminAuth, approveSubscriberById)

export default adminRouter;