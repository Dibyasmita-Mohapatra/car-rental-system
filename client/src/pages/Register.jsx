import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Account created successfully 🚗");

      setName("");
      setEmail("");
      setPassword("");

      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-800">

          <h1 className="text-4xl font-bold text-center mb-2">
            Create Account
          </h1>

          <p className="text-center text-gray-400 mb-8">
            Join our premium car rental platform
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-400 text-black py-3 rounded-xl font-bold disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

          </form>

          <p className="text-center mt-6 text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-amber-400">
              Login
            </Link>
          </p>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Register;