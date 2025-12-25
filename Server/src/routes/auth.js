import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

const router = express.Router()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const USERS_FILE = path.join(__dirname, "../../users.json")

const getUsers = async () => {
    const data = await fs.readFile(USERS_FILE, "utf-8")
    return JSON.parse(data)
}

const saveUsers = async (users) => {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2))
}

// Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Missing required fields" })
        }

        const users = await getUsers()
        if (users.find(u => u.email === email)) {
            return res.status(400).json({ error: "Email already registered" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = { id: Date.now(), name, email, password: hashedPassword }
        users.push(newUser)
        await saveUsers(users)

        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.status(201).json({ token, user: { id: newUser.id, name, email } })
    } catch (err) {
        res.status(500).json({ error: "Signup failed" })
    }
})

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const users = await getUsers()
        const user = users.find(u => u.email === email)

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
    } catch (err) {
        res.status(500).json({ error: "Login failed" })
    }
})

export default router
