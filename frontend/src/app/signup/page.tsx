"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/outline";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signup(username, password);
      router.push("/posts");
    } catch {
      setError("Erreur d’inscription");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">Inscription</h1>
        <p className="text-center text-gray-600 mb-8">Créez votre compte pour partager vos photos !</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <UserIcon className="absolute w-6 h-6 text-gray-400 left-4 top-4" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nom d’utilisateur"
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>
          <div className="relative">
            <LockClosedIcon className="absolute w-6 h-6 text-gray-400 left-4 top-4" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>
          {error && (
            <p className="text-base text-red-500 text-center animate-pulse bg-red-50 py-2 rounded-lg">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
          >
            S’inscrire
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Déjà un compte ?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-blue-500 hover:underline font-semibold"
          >
            Se connecter
          </button>
        </p>
      </div>
    </div>
  );
}