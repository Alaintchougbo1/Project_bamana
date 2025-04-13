"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { PhotoIcon } from "@heroicons/react/24/outline";

export default function EditPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const { user, token, loading } = useAuth();
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (user && token) {
      fetchPost();
    }
  }, [user, loading, token, router]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTitle(res.data.post.title);
      setContent(res.data.post.content);
    } catch {
      setError("Erreur chargement post");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) formData.append("image", image);
      await axios.patch(`http://localhost:3000/posts/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/posts");
    } catch {
      setError("Erreur mise à jour post");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Modifier Post</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg">
          <div className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre"
              className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Contenu"
              className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              rows={4}
            />
            <div className="flex items-center">
              <PhotoIcon className="w-6 h-6 text-gray-400 mr-2" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="w-full py-3 px-4 rounded-lg border border-gray-300 text-gray-900"
              />
            </div>
            {error && (
              <p className="text-base text-red-500 text-center animate-pulse bg-red-50 py-2 rounded-lg">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Mettre à jour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}