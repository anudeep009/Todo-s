// import Todo from '../models/todos.model.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from '../../src/models/user.model.js';
import Todo from '../../src/models/todos.model.js';


async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}


export const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            const hashedpw = await hashPassword(password);
            await User.create({ email, password: hashedpw });
            return res.status(200).json({ message: "User signed up successfully" });
        } else {
            return res.status(400).json({ message: "User already exists. Please login." });
        }
    } catch (error) {
        console.error("Error while signing up", error);
        return res.status(500).json({ message: "Server error" });
    }
};


export const signin = async (req, res) => {
    const { email, password } = req.body;
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
        console.error("Error while signing in", error);
        return res.status(500).json({ message: "Server error" });
    }
};


export const getCurrentUser = async (req, res) => {
    const { _id } = req.params;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found, please login" });
        }
        return res.status(200).json({ email: user.email });
    } catch (error) {
        console.error("Error while fetching current user", error);
        return res.status(500).json({ message: "Server error" });
    }
};


export const addTodo = async (req, res) => {
    const { userid, todo, isCompleted } = req.body;
    try {
        const newTodo = await Todo.create({ userid, todo, isCompleted });
        return res.status(200).json({ message: "Todo added successfully", todo: newTodo });
    } catch (error) {
        console.error("Error while adding todo", error);
        return res.status(500).json({ message: "Failed to add todo" });
    }
};


export const deleteTodo = async (req, res) => {
    const { todoid } = req.body;
    try {
        const result = await Todo.findByIdAndDelete(todoid);
        if (!result) {
            return res.status(404).json({ message: "Todo not found" });
        }
        return res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error("Error while deleting todo", error);
        return res.status(500).json({ message: "Failed to delete todo" });
    }
};


export const updateTodo = async (req, res) => {
    const { todoid, todo, isCompleted } = req.body;
    try {
        // Update a specific todo by its ID
        const updatedTodo = await Todo.findByIdAndUpdate(
            todoid,
            { todo, isCompleted },
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        return res.status(200).json({ message: "Todo updated successfully", todo: updatedTodo });
    } catch (error) {
        console.error("Error while updating todo", error);
        return res.status(500).json({ message: "Failed to update todo" });
    }
};