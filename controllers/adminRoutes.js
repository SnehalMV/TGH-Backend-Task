import { Router } from "express";
import auth from "../middleware/auth.js";
import { postAdminLogin, postCreateStudent, getAdminLogout, postAssignTask } from "../helpers/adminHelper.js";

const adminRouter = Router()

adminRouter.post('/', postAdminLogin)
adminRouter.get('/logout', getAdminLogout)
adminRouter.post('/createStudent', auth, postCreateStudent)
adminRouter.post('/assignTask', auth, postAssignTask)

export default adminRouter