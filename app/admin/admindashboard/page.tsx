"use client";
import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { collection, addDoc, onSnapshot, query, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import AddBlog from "./AddBlog";
import AddCareer from "./AddCareer";
import { faEdit, faTrash, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  ColumnDef,
} from "@tanstack/react-table";

type Blog = {
  id: string;
  title: string;
  author: string;
  date: string;
  coverImage: string;
  content: string;
};

type Career = {
  id: number;
  position: string;
  department: string;
  location: string;
};

// Define column helpers for each type
const blogColumnHelper = createColumnHelper<Blog>();
const careerColumnHelper = createColumnHelper<Career>();

export default function AdminDashboard() {
  const [view, setView] = useState<"blog" | "career" | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"blog" | "career" | null>(null);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    date: "",
    coverImage: "",
    content: "",
  });
  const [newCareer, setNewCareer] = useState({
    position: "",
    department: "",
    location: "",
  });
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const [careers, setCareers] = useState<Career[]>([
    {
      id: 1,
      position: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
    },
    {
      id: 2,
      position: "Backend Developer",
      department: "Engineering",
      location: "New York",
    },
  ]);
  useEffect(() => {
    const fetchBlogs = async () => {
      const q = query(collection(db, "blogs"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const blogsData: Blog[] = [];
        querySnapshot.forEach((doc) => {
          blogsData.push({ id: doc.id, ...doc.data() } as Blog);
        });
        setBlogs(blogsData);
      });
      return unsubscribe;
    };
    fetchBlogs();
  }, []);

  // Define columns for the blog table
  const blogColumns: ColumnDef<Blog, any>[] = [
    blogColumnHelper.accessor("id", {
      header: "ID",
    }),
    blogColumnHelper.accessor("coverImage", {
      header: "Header",
      cell: (info) => (
        <img
          src={info.getValue() as string}
          alt="cover"
          className="rounded-sm w-[70px] h-10 object-cover"
        />
      ),
    }),
    blogColumnHelper.accessor("title", {
      header: "Title",
    }),
    blogColumnHelper.accessor("author", {
      header: "Author",
    }),
    blogColumnHelper.accessor("date", {
      header: "Date",
      cell: (info) => new Date(info.getValue() as string).toLocaleDateString(), 
    }),
    {
      id: 'actions',
      header: "Actions",
      cell: ({ row }: { row: { original: Blog } }) => (
        <div className="flex justify-center gap-1">
          <button
            className="text-blue-500 mr-2"
            onClick={() => handleEditBlog(row.original)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="text-red-500"
            onClick={() => handleDeleteBlog(row.original)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  // Define columns for the career table
  const careerColumns: ColumnDef<Career, any>[] = [
    careerColumnHelper.accessor("id", {
      header: "ID",
    }),
    careerColumnHelper.accessor("position", {
      header: "Position",
    }),
    careerColumnHelper.accessor("department", {
      header: "Department",
    }),
    careerColumnHelper.accessor("location", {
      header: "Location",
    }),
    {
      id: 'actions',
      header: "Actions",
      cell: ({ row }: { row: { original: Career } }) => (
        <div className="flex justify-center gap-1">
          <button
            className="text-blue-500 mr-2"
            onClick={() => handleEditCareer(row.original)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="text-red-500"
            onClick={() => handleDeleteCareer(row.original)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  const tableInstanceBlog = useReactTable({
    data: blogs,
    columns: blogColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableInstanceCareer = useReactTable({
    data: careers,
    columns: careerColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Functions for edit and delete actions
  const handleEditBlog = (blog: Blog) => {
    const updatedTitle = prompt("Edit Blog Title:", blog.title);
    if (updatedTitle) {
      setBlogs((prevBlogs) =>
        prevBlogs.map((b) => (b.id === blog.id ? { ...b, title: updatedTitle } : b))
      );
    }
  };
  const handleDeleteBlog = async (blog: Blog) => {
    try {
      await deleteDoc(doc(db, "blogs", blog.id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }  
  };

  const handleEditCareer = (career: Career) => {
    const updatedPosition = prompt("Edit Career Position:", career.position);
    if (updatedPosition) {
      setCareers((prevCareers) =>
        prevCareers.map((c) => (c.id === career.id ? { ...c, position: updatedPosition } : c))
      );
    }
  };

  const handleDeleteCareer = (career: Career) => {
    setCareers((prevCareers) => prevCareers.filter((c) => c.id !== career.id));
  };

  const openDialog = (type: "blog" | "career") => {
    setDialogType(type);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  // Handle adding a new career
  const handleAddBlog = async () => {
    const { title, author, coverImage, content } = newBlog;
    const date = new Date().toLocaleDateString();
    if (title && author && date && coverImage && content) {
      try {
        await addDoc(collection(db, "blogs"), {
          title,
          author,
          date,
          coverImage,
          content,
        });
        closeDialog();
      } catch (error) {
        console.error("Error adding blog:", error);
      }
    }
  };
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
          onClick={() => setView("blog")}
        >
          Blog Listing
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          onClick={() => setView("career")}
        >
          Career Listing
        </button>
      </div>

      {view === "blog" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Blog Listing</h2>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              onClick={() => openDialog("blog")}
            >
              Add New Blog
            </button>
          </div>
          <table className="w-full table-auto border-collapse">
            <thead>
              {tableInstanceBlog.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="border px-4 py-2 bg-gray-100">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {tableInstanceBlog.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border px-4 py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === "career" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Career Listing</h2>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              onClick={() => openDialog("career")}
            >
              Add New Career
            </button>
          </div>
          <table className="w-full table-auto border-collapse">
            <thead>
              {tableInstanceCareer.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="border px-4 py-2 bg-gray-100">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {tableInstanceCareer.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border px-4 py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
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
          <DialogPanel className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl lg:max-w-3xl max-h-[400px] lg:max-h-[550px] overflow-y-auto">
              <DialogTitle className="text-xl font-semibold">
                <div className="flex justify-between"> {dialogType === "blog" ? "Add New Blog" : "Add New Career"}
                <button
                  onClick={closeDialog}
                >
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </div>
              </DialogTitle>
              <div className="mt-4">
                {dialogType === "blog" ? (
                  <AddBlog newBlog={newBlog} setNewBlog={setNewBlog} handleAddBlog={handleAddBlog} />
                ) : (
                  <AddCareer newCareer={newCareer} setNewCareer={setNewCareer} handleAddCareer={handleAddCareer} />
                )}
              </div>
              
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
