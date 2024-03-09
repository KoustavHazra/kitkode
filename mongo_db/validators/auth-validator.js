const { z } = require('zod');

// creating an object schema for signup
const signupSchema = z.object({
    username: z
            .string({ required_error: "Name is required" })
            .trim()
            .min(3, {message: "Name must be of at least 3 characters"})
            .max(255, {message: "Name cannot be more than 255 characters"}),
    
    email: z
            .string({ required_error: "Email is required" })
            .trim()
            .email({ message: "Invalid email address" })
            .min(3, {message: "Email must be of at least 3 characters"})
            .max(255, {message: "Email cannot be more than 255 characters"}),
    
    password: z
            .string({ required_error: "Password is required" })
            .min(7, {message: "Password must be of at least 7 characters"})
            .max(1024, {message: "Password cannot be more than 1024 characters"})
})

// creating an object schema for login
const loginSchema = z.object({
        email: z
                .string({ required_error: "Email is required" })
                .trim()
                .email({ message: "Invalid email address" }),
        password: z
                .string({ required_error: "Password is required" })
})

module.exports = { signupSchema, loginSchema };