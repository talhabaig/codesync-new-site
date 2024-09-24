"use client";
import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '@/app/firebase/config';
import BlogEditor from '@/app/components/blogEditor';

interface EditBlogProps {
  blogData: { id:string; title: string; author: string; date: string; coverImage: string; content: string;createdAt: string; };
  handleUpdateBlog: (updatedBlog: { id:string; title: string; author: string; date: string; coverImage: string; content: string;createdAt: string; }) => void;
}

const EditBlog: React.FC<EditBlogProps> = ({ blogData, handleUpdateBlog }) => {
  const [editorContent, setEditorContent] = useState(blogData.content);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [updatedBlog, setUpdatedBlog] = useState(blogData);

  useEffect(() => {
    setUpdatedBlog(blogData);
    setCoverImage(null); // Reset coverImage state when blogData changes
  }, [blogData]);

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
    if (downloadURL) {
      setUpdatedBlog((prev) => ({ ...prev, coverImage: downloadURL }));
    } else {
      console.error("Failed to get download URL.");
    }
    setIsUploading(false);
    return downloadURL;
  };

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    setUpdatedBlog((prev) => ({ ...prev, content }));
  };

  const handleSubmit = async () => {
    if (!updatedBlog.title || !updatedBlog.author || !editorContent) {
      alert("All fields are required.");
      return;
    }
      
    let newCoverImageURL = updatedBlog.coverImage || '';
    
    if (coverImage) {
      newCoverImageURL = await uploadImageToFirebase() || '';
    }
    handleUpdateBlog({ ...updatedBlog, coverImage: newCoverImageURL });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setUpdatedBlog({ ...updatedBlog, title: value });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Title (max 50 characters)"
        value={updatedBlog.title}
        onChange={handleTitleChange}
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <p className="text-sm text-gray-500">
        {updatedBlog.title.length}/50 characters
      </p>
      <input
        type="text"
        placeholder="Author"
        value={updatedBlog.author}
        onChange={(e) => setUpdatedBlog({ ...updatedBlog, author: e.target.value })}
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <div className="mb-4">
        <label className="block mb-2">Upload Cover Image: </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="coverImageInput"
        />
        <div
          onClick={() => document.getElementById('coverImageInput')?.click()}
          className="cursor-pointer border border-gray-300 rounded p-2 mb-2"
        >
          {coverImage ? (
            <img
              src={URL.createObjectURL(coverImage)} // Show the selected image
              alt="Cover Preview"
              className="w-full h-auto rounded"
            />
          ) : (
            updatedBlog.coverImage && (
              <img
                src={updatedBlog.coverImage}
                alt="Current Cover"
                className="w-full h-auto rounded"
              />
            )
          )}
        </div>
      </div>
      <div className='mb-20 md:mb-12'>
        <BlogEditor value={editorContent} onChange={handleEditorChange} />
      </div>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 my-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Update'}
      </button>
    </div>
  );
};

export default EditBlog;
