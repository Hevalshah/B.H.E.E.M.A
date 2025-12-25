import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import bheemaLogo from "../assets/logos/bheema-logo.png"

export default function LoginPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            const data = await res.json()

            if (res.ok) {
                localStorage.setItem("token", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                navigate("/app")
            } else {
                setError(data.error || "Login failed")
            }
        } catch (err) {
            setError("Server connection error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#05070A] text-white flex flex-col justify-center items-center px-6 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -top-1/4 -left-1/4" />
            <div className="absolute w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full -bottom-1/4 -right-1/4" />

            <div className="relative z-10 w-full max-w-md">
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center gap-3 mb-8 hover:opacity-80 transition">
                        <img src={bheemaLogo} className="w-10" alt="Logo" />
                        <span className="tracking-widest font-bold text-xl text-white">B.H.E.E.M.A</span>
                    </Link>
                    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Access your heuristic engine workspace</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl">
                    {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl text-center">{error}</div>}

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-sm"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-sm"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm transition-all shadow-[0_10px_30px_-10px_rgba(37,99,235,0.5)] active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? "LOGGING IN..." : "LOGIN"}
                    </button>

                    <p className="text-center text-sm text-gray-500 px-1">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-bold">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
