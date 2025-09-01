import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate("/chat");
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, pw);
      } else {
        await signInWithEmailAndPassword(auth, email, pw);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleGoogle() {
    setError("");
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50">
      <form className="bg-white p-8 rounded-xl shadow max-w-sm w-full" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">{isRegister ? "Sign Up" : "Sign In"}</h2>
        <input
          className="border rounded-md p-2 w-full mb-2"
          type="email" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)}
        />
        <input
          className="border rounded-md p-2 w-full mb-2"
          type="password" placeholder="Password"
          value={pw} onChange={e => setPw(e.target.value)}
        />
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <button className="bg-emerald-600 text-white py-2 w-full rounded-md mb-2" type="submit">
          {isRegister ? "Create Account" : "Sign In"}
        </button>
        <button
          type="button"
          className="bg-red-500 text-white w-full rounded-md py-2 mb-2"
          onClick={handleGoogle}
        >
          Sign in with Google
        </button>
        <div className="text-sm text-center mt-2">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <button type="button" className="underline" onClick={() => setIsRegister(false)}>Sign In</button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button type="button" className="underline" onClick={() => setIsRegister(true)}>Sign Up</button>
            </>
          )}
        </div>
        <div className="text-center mt-4">
          <Link to="/" className="text-emerald-600 underline text-sm">Back to Home</Link>
        </div>
      </form>
    </div>
  );
}