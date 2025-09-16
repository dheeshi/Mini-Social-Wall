// src/pages/main/main.tsx
import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Post as PostComponent } from "../post/post";

export interface PostType {
  id: string;
  userId: string;
  title: string;
  username?: string;
  description: string;
  imageUrl?: string | null;
  likes?: string[];
  createdAt?: any;
}

export default function Main() {
  const [postsList, setPostsList] = useState<PostType[]>([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(100));
    const unsub = onSnapshot(q, (snap) => {
      setPostsList(snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })));
    }, err => console.error(err));
    return () => unsub();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-l from-indigo-900 to-violet-500 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <section className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome!</h1>
          <p className="text-xl">Come together and share your mood.</p>
        </section>

        <section className="space-y-6">
          {postsList.length === 0 ? (
            <p className="text-center text-white">No posts yet — be the first!</p>
          ) : (
            postsList.map(p => <PostComponent key={p.id} post={p} />)
          )}
        </section>
      </div>
    </main>
  );
}
