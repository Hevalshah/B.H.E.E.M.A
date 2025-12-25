import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/api/health", (req, res) => {
  res.json({ status: "B.H.E.E.M.A backend running" })
})

export default app
