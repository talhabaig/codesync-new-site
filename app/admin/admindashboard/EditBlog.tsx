"use client";
import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '@/app/firebase/config';
import BlogEditor from '@/app/components/blogEditor';

interface EditBlogProps {
  blog: { title: string; author: string; date: string; coverImage: string; content: string };
  setBlog: React.Dispatch<React.SetStateAction<{ title: string; author: string; date: string; coverImage: string; content: string }>>;
  handleEditBlog: (blog: { title: string; author: string; date: string; coverImage: string; content: string }) => void;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditBlog: React.FC<EditBlogProps> = ({ blog, setBlog, handleEditBlog }) => {
  const [editorContent, setEditorContent] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setEditorContent(blog.content);
  }, [blog]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverImage(file);
    }
  };

  const uploadImageToFirebase = async () => {
    if (!coverImage) return;
    setIsUploading(true);
    const storageRef = ref(storage, `blog_covers/${coverImage.name}`);
    const snapshot = await uploadBytes(storageRef, coverImage);
    const downloadURL = await getDownloadURL(snapshot.ref);
    setBlog((prev) => ({ ...prev, coverImage: downloadURL }));
    setIsUploading(false);
  };

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    setBlog((prev) => ({ ...prev, content }));
  };

  const handleSubmit = async () => {
    if (!blog.title || !blog.author || !editorContent) {
      alert("All fields are required.");
      return;
    }
    if (coverImage) {
      await uploadImageToFirebase();
    }
    handleEditBlog(blog);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        value={blog.title}
        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Author"
        value={blog.author}
        onChange={(e) => setBlog({ ...blog, author: e.target.value })}
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <div className="mb-4">
        <label className="block mb-2">Upload Cover Image: </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full p-2 border border-gray-300 rounded"
        />
        {coverImage && <p className="mt-2 text-sm text-gray-600">{`Selected image: ${coverImage.name}`}</p>}
      </div>
      <div className='mb-20 md:mb-12'>
        <BlogEditor value={editorContent} onChange={handleEditorChange} />
      </div>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 my-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Save Changes'}
      </button>
    </div>
  );
};

export default EditBlog;
