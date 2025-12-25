import express from "express"
import jwt from "jsonwebtoken"
import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

const router = express.Router()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const USERS_FILE = path.join(__dirname, "../../users.json")

// Auth Middleware
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(401).json({ error: "Unauthorized" })

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" })
        req.userId = user.id
        next()
    })
}

// Protected Profile Route
router.get("/profile", authenticateToken, async (req, res) => {
    try {
        const data = await fs.readFile(USERS_FILE, "utf-8")
        const users = JSON.parse(data)
        const user = users.find(u => u.id === req.userId)

        if (!user) return res.status(404).json({ error: "User not found" })

        const { password, ...userData } = user
        res.json(userData)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch profile" })
    }
})

export default router
