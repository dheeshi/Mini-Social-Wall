// src/pages/post/post.tsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface PostProps {
  post: {
    id: string;
    userId: string;
    title: string;
    username?: string;
    description: string;
    imageUrl?: string | null;
    likes?: string[];
    createdAt?: any;
  };
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const currentUid = auth.currentUser?.uid;
  const [likes, setLikes] = useState<string[]>(post.likes ?? []);
  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState("");

  // Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editDesc, setEditDesc] = useState(post.description);

  // 🔹 Realtime comments listener
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "posts", post.id, "comments"),
      (snap) => {
        setComments(
          snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
        );
      }
    );
    return () => unsub();
  }, [post.id]);

  useEffect(() => {
    setLikes(post.likes ?? []);
  }, [post.likes]);

  // 🔹 Toggle like
  const toggleLike = async () => {
    if (!auth.currentUser) {
      alert("Login to like");
      return;
    }
    const uid = auth.currentUser.uid;
    const postRef = doc(db, "posts", post.id);

    if (likes.includes(uid)) {
      await updateDoc(postRef, { likes: arrayRemove(uid) });
    } else {
      await updateDoc(postRef, { likes: arrayUnion(uid) });
    }
  };

  // 🔹 Add comment
  const addComment = async () => {
    if (!auth.currentUser) return alert("Login to comment");
    if (!text.trim()) return;

    await addDoc(collection(db, "posts", post.id, "comments"), {
      userId: auth.currentUser.uid,
      text: text.trim(),
      createdAt: serverTimestamp(),
    });
    setText("");
  };

  // 🔹 Delete post
  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    await deleteDoc(doc(db, "posts", post.id));
  };

  // 🔹 Save edit
  const saveEdit = async () => {
    try {
      await updateDoc(doc(db, "posts", post.id), {
        title: editTitle,
        description: editDesc,
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Edit failed:", err);
      alert("Could not update post.");
    }
  };

  const when = post.createdAt?.toDate
    ? (dayjs(post.createdAt.toDate()) as any).fromNow()
    : "";

  return (
    <article className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow p-4 mb-6 border">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 bg-indigo-500 rounded-full text-white flex items-center justify-center font-semibold">
          {post.username?.charAt(0).toUpperCase() ?? "U"}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white">
                {post.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                @{post.username} • {when}
              </p>
            </div>
            {currentUid === post.userId && (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
                <button
                  onClick={handleDelete}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Editable fields */}
          {isEditing ? (
            <div className="mt-3 space-y-2">
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full p-2 rounded border"
              />
              <textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                className="w-full p-2 rounded border"
              />
              <button
                onClick={saveEdit}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <>
              <p className="mt-3 text-slate-700 dark:text-slate-200 whitespace-pre-line">
                {post.description}
              </p>

              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="post"
                  className="mt-3 rounded-md max-h-96 w-full object-cover"
                />
              )}
            </>
          )}

          {/* Actions */}
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={toggleLike}
              className="flex items-center gap-2 px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <span className="text-red-500">
                {likes.includes(currentUid ?? "") ? "❤️" : "🤍"}
              </span>
              <span className="text-sm">{likes.length}</span>
            </button>
            <div className="text-sm text-slate-500">
              {comments.length} comments
            </div>
          </div>

          {/* Comments */}
          <div className="mt-3">
            <div className="space-y-2 mb-3">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="text-sm border rounded p-2 bg-slate-50 dark:bg-slate-700"
                >
                  <div className="text-xs text-slate-500">
                    @{(c.userId ?? "").slice(0, 6)} •{" "}
                    {c.createdAt?.toDate
                      ? (dayjs(c.createdAt.toDate()) as any).fromNow()
                      : ""}
                  </div>
                  <div>{c.text}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 p-2 rounded border dark:bg-slate-700"
              />
              <button
                onClick={addComment}
                className="px-3 py-1 bg-indigo-600 text-white rounded"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
