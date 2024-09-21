import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { addTodo, deleteTodo, getCurrentUser, signin, signup, updateTodo } from "../controllers/user.controller.js";

const router = Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/current-user',getCurrentUser);
router.post('/todos', verifyJWT, addTodo);
router.delete('/todos', verifyJWT, deleteTodo);
router.put('/todos', verifyJWT, updateTodo);

export default router;