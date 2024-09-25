import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from '../models/user.model.js';
import { Todo } from '../models/todos.model.js';


async function hashPassword(password) {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            const hashedpw = await hashPassword(password);
            await User.create({ email, password: hashedpw });
            return res.status(201).json({ message: "User signed up successfully" });
        } else {
            return res.status(400).json({ message: "User already exists. Please login." });
        }
    } catch (error) {
        console.error("Error during signup:", error.message); 
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign(
                    { id: user._id, email: user.email },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '1h' }
                );
                return res.status(200).json({ message: "User signed in successfully", token });
            } else {
                return res.status(400).json({ message: "Invalid credentials" });
            }
        } else {
            return res.status(400).json({ message: "User not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const getCurrentUser = async (req, res) => {
    const { id } = req.user;
    console.log(req.user);

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ email: user.email });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const addTodo = async (req, res) => {
    const { todo, isCompleted } = req.body;
    const userIdFromToken = req.user.id;

    try {
        const newTodo = await Todo.create({ userid: userIdFromToken, todo, isCompleted });
        return res.status(200).json({ message: "Todo added successfully", todo: newTodo });
    } catch (error) {
        return res.status(500).json({ message: "Failed to add todo" });
    }
};

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
        return res.status(500).json({ message: "Failed to delete todo" });
    }
};

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
        return res.status(500).json({ message: "Failed to update todo" });
    }
};

export const getTodos = async (req,res) => {
    
}