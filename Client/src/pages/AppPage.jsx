import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import bheemaLogo from "../assets/logos/bheema-logo.png"

export default function AppPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        navigate("/login")
        return
      }

      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          headers: { "Authorization": `Bearer ${token}` }
        })
        const data = await res.json()
        if (res.ok) {
          setUser(data)
        } else {
          localStorage.removeItem("token")
          navigate("/login")
        }
      } catch (err) {
        console.error("Failed to fetch profile")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }

  if (loading) {
    return <div className="min-h-screen bg-[#05070A] flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>
  }

  return (
    <div className="min-h-screen bg-[#05070A] text-white p-6 md:p-12 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full -top-1/4 -left-1/4" />

      <div className="max-w-4xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <img src={bheemaLogo} className="w-10" alt="Logo" />
            <span className="tracking-widest font-bold text-xl text-white">B.H.E.E.M.A</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-sm font-bold transition-all"
          >
            LOGOUT
          </button>
        </header>

        <div className="bg-white/5 border border-white/10 p-12 rounded-[40px] backdrop-blur-xl">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-xl">
              {user?.name?.[0].toUpperCase()}
            </div>
            <div>
              <p className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase mb-1">Authenticated Interface</p>
              <h1 className="text-4xl font-bold">{user?.name}</h1>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
            <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
              <p className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-4">Account Integrity</p>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Email Address</span>
                  <span className="font-mono text-blue-300">{user?.email}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Access Level</span>
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-[10px] font-bold">RESEARCHER</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-black/40 rounded-3xl border border-white/5 flex flex-col justify-center text-center">
              <p className="text-gray-400 text-sm italic mb-4">"Heuristic engine initialized. Welcome to the workspace."</p>
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
