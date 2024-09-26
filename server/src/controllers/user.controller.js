import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';
import { Todo } from '../models/todos.model.js';

dotenv.config();

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

// Signup controller
export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            const hashedpw = await hashPassword(password);
            await User.create({ fullname, email, password: hashedpw });
            return res.status(201).json({ message: "User signed up successfully" });
        } else {
            return res.status(400).json({ message: "User already exists. Please login." });
        }
    } catch (error) {
        console.error("Error during signup:", error.message);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Signin controller
export const signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' } // Token expires in 1 day
        );

        // Set the token and userId in HTTP-only cookies
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 24 * 60 * 60 * 1000 // Cookie expires in 1 day
        });

        res.cookie('userId', user._id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 24 * 60 * 60 * 1000 // Cookie expires in 1 day
        });

        return res.status(200).json({ message: "User signed in successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get current user controller
export const getCurrentUser = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: Missing token" });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decoded.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const todosTotal = await Todo.countDocuments({ userid: userId });
        const todosCompleted = await Todo.countDocuments({ userid: userId, isCompleted: true });

        return res.status(200).json({
            fullname: user.fullname,
            email: user.email,
            todos: {
                total: todosTotal,
                completed: todosCompleted
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Add Todo controller
export const addTodo = async (req, res) => {
    const { todo, isCompleted } = req.body;
    const userIdFromToken = req.user.id;

    try {
        const newTodo = await Todo.create({ userid: userIdFromToken, todo, isCompleted });
        return res.status(200).json({ message: "Todo added successfully", todo: newTodo });
    } catch (error) {
        return res.status(500).json({ message: "Failed to add todo", error: error.message });
    }
};

// Delete Todo controller
export const deleteTodo = async (req, res) => {
    const { todoid } = req.body;
    const userIdFromToken = req.user.id;

    try {
        const todo = await Todo.findById(todoid);
        if (!todo || todo.userid.toString() !== userIdFromToken) {
            return res.status(404).json({ message: "Todo not found or unauthorized" });
        }

        await Todo.findByIdAndDelete(todoid);
        return res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete todo", error: error.message });
    }
};

// Update Todo controller
export const updateTodo = async (req, res) => {
    const { todoid, todo, isCompleted } = req.body;
    const userIdFromToken = req.user.id;

    try {
        const existingTodo = await Todo.findById(todoid);
        if (!existingTodo || existingTodo.userid.toString() !== userIdFromToken) {
            return res.status(404).json({ message: "Todo not found or unauthorized" });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            todoid,
            { todo, isCompleted },
            { new: true }
        );
        return res.status(200).json({ message: "Todo updated successfully", todo: updatedTodo });
    } catch (error) {
        return res.status(500).json({ message: "Failed to update todo", error: error.message });
    }
};

// Get Todos controller
export const getTodos = async (req, res) => {
    const userIdFromToken = req.user.id;

    try {
        const todos = await Todo.find({ userid: userIdFromToken });

        if (!todos || todos.length === 0) {
            return res.status(404).json({ message: "No todos found for this user" });
        }

        return res.status(200).json({ todos });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch todos", error: error.message });
    }
};
