"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
// import useCustomClipboard from './customclipboard';

// Dynamically import the Quill editor to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface BlogEditorProps {
  onChange: (content: string) => void;
  value: string;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ onChange, value }) => {
  // Load custom clipboard on the client side
  // useCustomClipboard();
  return (
    <ReactQuill 
      value={value} 
      onChange={onChange} 
      theme="snow" 
      placeholder="Write your blog here..." 
      className="h-[200px] mb-4 "
    />
  );
}

export default BlogEditor;