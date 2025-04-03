import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import User from "../models/model.js"

export const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) return res.status(400).json({ message: "Please provide all fields" });
        if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });
        
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({ fullName, email, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "Please provide email and password" });

        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, "66206dec5eb399ed3c4a860a02043ce72014abac52c5677dcefea5f09356c2491f1d56106298ed4004e6214da690a65e9e051d12bb5da3cd9cb5e8054664a9b9", { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};