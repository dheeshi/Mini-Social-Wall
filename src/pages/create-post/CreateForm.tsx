// src/pages/create-post/CreateForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  imageUrl: yup.string().url("Must be a valid image URL").notRequired().nullable()
}).required();

// derive the form type directly from the schema
type FormData = yup.InferType<typeof schema>;

export const CreateForm: React.FC = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const postRef = collection(db, "posts");

  const onCreatePost = async (data: FormData) => {
    if (!user) return alert("Login required");

    await addDoc(postRef, {
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl ?? null,
      userId: user.uid,
      username: user.displayName ?? user.email?.split("@")[0] ?? "Anonymous",
      likes: [],
      createdAt: serverTimestamp()
    });

    reset();
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit(onCreatePost)} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Create a Post</h2>

        <input {...register("title")} placeholder="Title" className="w-full p-3 rounded border mb-2 dark:bg-slate-700" />
        {errors.title && <p className="text-sm text-red-500 mb-2">{errors.title.message}</p>}

        <textarea {...register("description")} placeholder="Write something..." rows={6} className="w-full p-3 rounded border mb-2 dark:bg-slate-700" />
        {errors.description && <p className="text-sm text-red-500 mb-2">{errors.description.message}</p>}

        <input {...register("imageUrl")} placeholder="Image URL (optional)" className="w-full p-3 rounded border mb-4 dark:bg-slate-700" />
        {errors.imageUrl && <p className="text-sm text-red-500 mb-2">{errors.imageUrl.message}</p>}

        <div className="flex justify-end">
          <button disabled={isSubmitting} className="px-4 py-2 bg-indigo-600 text-white rounded">
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};
