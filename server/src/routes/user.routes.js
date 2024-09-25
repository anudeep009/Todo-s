import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { addTodo, deleteTodo, getCurrentUser, signin, signup, updateTodo } from "../controllers/user.controller.js";

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', verifyJWT, getCurrentUser);
router.post('/todos', verifyJWT, addTodo);
router.delete('/todos', verifyJWT, deleteTodo);
router.put('/todos', verifyJWT, updateTodo);

export default router;



// import express from 'express';
// import { signup, signin, getCurrentUser } from './controllers/auth.controller.js';
// import { addTodo, deleteTodo, updateTodo, getTodos } from './controllers/todo.controller.js';
// import { authenticateToken } from './middleware/authenticateToken.js';

// const router = express.Router();

// // Public routes
// router.post('/signup', signup);
// router.post('/signin', signin);

// // Protected routes (requires authentication)
// router.get('/user', authenticateToken, getCurrentUser);
// router.post('/todos', authenticateToken, addTodo);
// router.put('/todos/:id', authenticateToken, updateTodo);
// router.delete('/todos/:id', authenticateToken, deleteTodo);
// router.get('/todos', authenticateToken, getTodos);

// export default router;
