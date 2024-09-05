"use client";
import React, { useState } from 'react';
import BlogEditor from '../components/blogEditor';

export default function CreateBlogPage() {
  const [editorContent, setEditorContent] = useState('');

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const handleSubmit = () => {
    console.log('Blog content:', editorContent);
    // You can now send `editorContent` to your Firebase database or API for saving
  };

  return (
    <div className='md:w-3/5 p-8 sm:p-12 lg:p-16'>
      <h1 className="font-poppins font-semibold text-2xl md:text-xl lg:text-3xl xl:text-4xl 2xl:text-[45px] 3xl:text-[50px] leading-[35px] md:leading-[30px] lg:leading-[40px] mb-2 xl:leading-[45px] 2xl:leading-[60px] 3xl:leading-[69px] tracking-[1.5%]">
        Create Blog
      </h1>

      
      <BlogEditor value={editorContent} onChange={handleEditorChange} />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-16 md:mt-12"
      >
        Submit Blog
      </button>
    </div>
  );
}