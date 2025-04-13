"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { TrashIcon, PencilIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface Post {
  id: number;
  title: string;
  content: string;
  file_url?: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const { user, token, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (user && token) {
      fetchPosts();
    }
  }, [user, loading, token, router, search, sortBy, order]);

  const fetchPosts = async () => {
    try {
      const params = { search, sort_by: sortBy, order };
      const res = await axios.get("http://localhost:3000/posts", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setPosts(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError("Erreur chargement posts");
    }
  };

  const deletePost = async (id: number) => {
    if (!confirm("Supprimer ce post ?")) return;
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((post) => post.id !== id));
    } catch {
      setError("Erreur suppression post");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Mes Photos</h1>
          <div className="space-x-4">
            <button
              onClick={() => router.push("/posts/create")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Nouveau Post
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Déconnexion
            </button>
          </div>
        </div>
        <form onSubmit={handleSearch} className="mb-8 bg-white p-4 rounded-xl shadow-lg">
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex items-center flex-1">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher par titre ou contenu"
                className="w-full py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
            <div className="flex space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="created_at">Date</option>
                <option value="title">Titre</option>
              </select>
              <select
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="desc">Décroissant</option>
                <option value="asc">Croissant</option>
              </select>
            </div>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Filtrer
            </button>
          </div>
        </form>
        {error && (
          <p className="text-base text-red-500 text-center animate-pulse bg-red-50 py-2 rounded-lg mb-4">{error}</p>
        )}
        {posts.length === 0 ? (
          <p className="text-gray-600 text-center">Aucun post à afficher.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
                    <p className="text-gray-600 mt-2">{post.content}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => router.push(`/posts/edit/${post.id}`)}
                      className="p-2 text-blue-500 hover:text-blue-700"
                      title="Modifier"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="p-2 text-red-500 hover:text-red-700"
                      title="Supprimer"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                {post.file_url ? (
                  <img src={post.file_url} alt={post.title} className="mt-4 max-w-full rounded-lg" />
                ) : (
                  <p className="text-gray-500 mt-2">Pas d’image</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}