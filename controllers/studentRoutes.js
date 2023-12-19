import { Router } from "express";
import { postSignup, postLogin, getLogout, postChangeTaskStatus } from '../helpers/studentHelper.js'
import  auth  from '../middleware/auth.js'
import updateTaskStatus from "../middleware/taskStatusCheck.js";

const studentRouter = Router()

studentRouter.post('/signup', postSignup)
studentRouter.post('/login', postLogin)
studentRouter.get('/logout', auth, getLogout)
studentRouter.post('/changeTaskStatus', auth, updateTaskStatus, postChangeTaskStatus)

export default studentRouter  