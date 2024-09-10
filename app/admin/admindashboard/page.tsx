"use client";
import React, { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import AddBlog from './AddBlog';
import AddCareer from './AddCareer';
import {
  faEdit, faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AdminDashboard() {
  const [view, setView] = useState<'blog' | 'career' | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'blog' | 'career' | null>(null);
  const [newBlog, setNewBlog] = useState({ title: '', author: '', date: '', coverImage: '' });
  const [newCareer, setNewCareer] = useState({ position: '', department: '', location: '' });

  // Static data for blogs
  const [blogs, setBlogs] = useState([
    { id: 1, title: "How to Start Blogging", author: "John Doe", date: "2024-09-01", coverImage: '/images/blog/blog4.jpg' },
    { id: 2, title: "SEO Tips and Tricks", author: "Jane Smith", date: "2024-08-28", coverImage: '/images/blog/blog4.jpg' },
    { id: 3, title: "Building a Website", author: "Bob Brown", date: "2024-08-15", coverImage: '/images/blog/blog4.jpg' },
    { id: 4, title: "Building a WordPress Website", author: "Ehsan", date: "2024-08-15", coverImage: '/images/blog/blog4.jpg' },
  ]);

  // Static data for careers
  const [careers, setCareers] = useState([
    { id: 1, position: "Frontend Developer", department: "Engineering", location: "Remote" },
    { id: 2, position: "Backend Developer", department: "Engineering", location: "New York" },
    { id: 3, position: "UI/UX Designer", department: "Design", location: "San Francisco" },
  ]);

  // Handle editing blog
  const handleEditBlog = (id: number) => {
    const updatedTitle = prompt("Edit Blog Title:");
    if (updatedTitle) {
      setBlogs(blogs.map(blog => (blog.id === id ? { ...blog, title: updatedTitle } : blog)));
    }
  };

  // Handle deleting blog
  const handleDeleteBlog = (id: number) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  // Handle editing career
  const handleEditCareer = (id: number) => {
    const updatedPosition = prompt("Edit Career Position:");
    if (updatedPosition) {
      setCareers(careers.map(career => (career.id === id ? { ...career, position: updatedPosition } : career)));
    }
  };

  // Handle deleting career
  const handleDeleteCareer = (id: number) => {
    setCareers(careers.filter(career => career.id !== id));
  };

  // Open dialog
  const openDialog = (type: 'blog' | 'career') => {
    setDialogType(type);
    setIsDialogOpen(true);
  };

  // Close dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  // Handle adding a new blog
  const handleAddBlog = () => {
    const { title, author, date, coverImage } = newBlog;
    if (title && author && date && coverImage) {
      setBlogs([...blogs, { id: Date.now(), title, author, date, coverImage }]);
      closeDialog();
    }
  };

  // Handle adding a new career
  const handleAddCareer = () => {
    const { position, department, location } = newCareer;
    if (position && department && location) {
      setCareers([...careers, { id: Date.now(), position, department, location }]);
      closeDialog();
    }
  };

  return (
    <div className="p-4 md:py-16 md:w-[90%] lg:w-[80%]">
      <div className="flex gap-4 mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          onClick={() => setView('blog')}
        >
          Blog Listing
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          onClick={() => setView('career')}
        >
          Career Listing
        </button>
      </div>

      {view === 'blog' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Blog Listing</h2>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              onClick={() => openDialog('blog')}
            >
              Add New Blog
            </button>
          </div>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Header</th>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Author</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{blog.id}</td>
                  <td className="border px-4 py-1">
                    <img src={blog.coverImage} alt={blog.title} className="rounded-sm w-[70px] h-10 object-cover" />
                  </td>
                  <td className="border px-4 py-2">{blog.title}</td>
                  <td className="border px-4 py-2">{blog.author}</td>
                  <td className="border px-4 py-2">{blog.date}</td>
                  <td className="border px-4 py-2 flex justify-center gap-1">
                    <button
                      className="text-blue-500 mr-2"
                      onClick={() => handleEditBlog(blog.id)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteBlog(blog.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === 'career' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Career Listing</h2>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              onClick={() => openDialog('career')}
            >
              Add New Career
            </button>
          </div>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Position</th>
                <th className="border px-4 py-2">Department</th>
                <th className="border px-4 py-2">Location</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {careers.map((career) => (
                <tr key={career.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{career.id}</td>
                  <td className="border px-4 py-2">{career.position}</td>
                  <td className="border px-4 py-2">{career.department}</td>
                  <td className="border px-4 py-2">{career.location}</td>
                  <td className="border px-4 py-2 flex justify-center gap-1">
                    <button
                      className="text-blue-500 mr-2"
                      onClick={() => handleEditCareer(career.id)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteCareer(career.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!view && <p className="text-gray-500">Please select an option to view data.</p>}

      {/* Dialog for adding new blog or career */}
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 z-20">
          <DialogPanel  className="bg-white p-6 rounded shadow-lg w-full max-w-2xl lg:max-w-3xl max-h-[400px] lg:max-h-[550px] overflow-y-auto">
            <DialogTitle  className="text-xl font-semibold mb-4">
              {dialogType === 'blog' ? 'Add New Blog' : 'Add New Career'}
            </DialogTitle>
            {dialogType === 'blog' ? (
              <AddBlog
                newBlog={newBlog}
                setNewBlog={setNewBlog}
                handleAddBlog={handleAddBlog}
              />
            ) : (
              <AddCareer
                newCareer={newCareer}
                setNewCareer={setNewCareer}
                handleAddCareer={handleAddCareer}
              />
            )}
            <button
              onClick={closeDialog}
              className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}