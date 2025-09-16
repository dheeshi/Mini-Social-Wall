// src/pages/create-post/CreatePost.tsx
import React from "react";
import { CreateForm } from "./CreateForm";

export const CreatePost: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tl from-green-400 to-indigo-900 py-8">
      <CreateForm />
    </div>
  );
};
