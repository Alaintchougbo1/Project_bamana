"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Bienvenue sur MyPicture</h1>
        <p className="text-gray-600 mb-8">Partagez vos photos préférées avec le monde !</p>
        <div className="flex flex-col gap-4">
          {user ? (
            <button
              onClick={() => router.push("/posts/create")}
              className="py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
            >
              Créer un post
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
            >
              Se connecter
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
