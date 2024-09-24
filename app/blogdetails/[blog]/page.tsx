"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import "react-quill/dist/quill.bubble.css"; // Import Quill's CSS
import dynamic from 'next/dynamic';

// Dynamically import the Quill editor to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Blog {
  id: string;
  title: string;
  coverImage: string;
  author: string;
  date: string;
  content: string;
}

interface Props {
  params: {
    blog: string;
  };
}

const BlogDetailPage: React.FC<Props> = ({ params }) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const blogId = params.blog; 

  useEffect(() => {
    const fetchBlogDetails = async () => {
      const blogRef = doc(db, "blogs", blogId); 
      const blogSnap = await getDoc(blogRef);

      if (blogSnap.exists()) {
        setBlog(blogSnap.data() as Blog);
      } else {
        console.error("No such blog found!");
      }
    };

    fetchBlogDetails();
  }, [blogId]);

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
      <div className="p-8 md:px-24">
        <div className="flex justify-center md:my-4">
          <div className="lg:basis-[80%] 2xl:basis-[60%] 3xl:basis-[57%]">
            <div className="mb-4 px-[15px]">
              <h1 className="font-poppins font-bold text-[18px] md:text-[22px] lg:text-[26px] leading-[22px] md:leading-[25px] lg:leading-[31.46px] mb-4">
                {blog.title}
              </h1>
              <div className="h-[420px] w-full rounded-lg">
                <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover object-top rounded-lg" />
              </div>
            </div>
            <div className="px-[15px]">
              <div className="mb-1">
                <span className="font-semibold font-poppins">Author: </span>
                {blog.author}
              </div>
              <div>
                <span className="font-semibold font-poppins">Published Date: </span>
                {blog.date}
              </div>
            </div>
            <div>
              <div className="font-poppins">
                <ReactQuill value={blog.content} readOnly theme="bubble" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
