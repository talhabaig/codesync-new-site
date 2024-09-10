"use client";
import React, { useState } from 'react';
import BlogEditor from '@/app/components/blogEditor';

interface AddBlogProps {
  newBlog: { title: string; author: string; date: string; coverImage: string };
  setNewBlog: React.Dispatch<React.SetStateAction<{ title: string; author: string; date: string; coverImage: string }>>;
  handleAddBlog: () => void;
}

const AddBlog: React.FC<AddBlogProps> = ({ newBlog, setNewBlog, handleAddBlog }) => {
  const [editorContent, setEditorContent] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBlog((prev) => ({ ...prev, coverImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        value={newBlog.title}
        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Author"
        value={newBlog.author}
        onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Date (YYYY-MM-DD)"
        value={newBlog.date}
        onChange={(e) => setNewBlog({ ...newBlog, date: e.target.value })}
        className="block w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="mb-4">
        <label className="block mb-2">Upload Cover Image: </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full p-2 border border-gray-300 rounded"
        />
        {coverImage && (
          <p className="mt-2 text-sm text-gray-600">
            {`Selected image: ${coverImage.name}`}
          </p>
        )}
      </div>
      <div className='mb-20 md:mb-12'>
        <BlogEditor value={editorContent} onChange={handleEditorChange}/>
      </div>
      <button
        onClick={handleAddBlog}
        className="px-4 py-2 my-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Submit
      </button>
    </div>
  );
};

export default AddBlog;
