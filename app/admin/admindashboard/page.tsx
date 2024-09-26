"use client";
import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { collection, addDoc, onSnapshot, query, deleteDoc, doc, updateDoc, serverTimestamp, orderBy } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import AddBlog from "./AddBlog";
import EditBlog from "./EditBlog";
import AddCareer from "./AddCareer";
import EditCareer from "./EditCareer";
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
  createdAt: string;
};

type Career = {
  id: string;
  position: string;
  location: string;
  type: string;
  date: string;
  lastDate:string;
  totalPositions:string;
  salary:string;
  createdAt:string;
};

// Define column helpers for each type
const blogColumnHelper = createColumnHelper<Blog>();
const careerColumnHelper = createColumnHelper<Career>();

export default function AdminDashboard() {
  const [view, setView] = useState<"blog" | "career" | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"blog" | "career" | "editBlog" | "editCareer" | null>(null);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    date: "",
    coverImage: "",
    content: "",
  });
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null); 
  const [newCareer, setNewCareer] = useState({
    position: "",
    location: "",
    type:"",
    date:"",
    lastDate:"",
    totalPositions:"",
    salary:"",
    createdAt:"",
  });
  const [editingCareer, setEditingCareer] = useState<Career | null>(null); 
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [careers, setCareers] = useState<Career[]>([]);
  
  useEffect(() => {
    const fetchBlogs = async () => {
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const blogsData: Blog[] = [];
        querySnapshot.forEach((doc) => {
          blogsData.push({ id: doc.id, ...doc.data() } as Blog);
        });
        blogsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setBlogs(blogsData);
      });
      return unsubscribe;
    };
    fetchBlogs();
  }, []);
  useEffect(() => {
    const fetchCareers = async () => {
      const q = query(collection(db, "careers"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const careersData: Career[] = [];
        querySnapshot.forEach((doc) => {
          careersData.push({ id: doc.id, ...doc.data() } as Career);
        });
        careersData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setCareers(careersData);
      });
      return unsubscribe;
    };
    fetchCareers();
  }, []);

  // Define columns for the blog table
  const blogColumns: ColumnDef<Blog, any>[] = [
    
    blogColumnHelper.accessor("coverImage", {
      header: "Header",
      cell: (info) => (
        <div className="flex justify-center">
          <img
            src={info.getValue() as string}
            alt="cover"
            className="rounded-sm w-[70px] h-10 object-cover"
          />
        </div>
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
    careerColumnHelper.accessor("position", {
      header: "Position",
    }),
    careerColumnHelper.accessor("type", {
      header: "Type",
    }),
    careerColumnHelper.accessor("totalPositions", {
      header: "No. of Positions",
    }),
    careerColumnHelper.accessor("salary", {
      header: "Salary",
    }),
    careerColumnHelper.accessor("date", {
      header: "Date", 
    }),
    careerColumnHelper.accessor("lastDate", {
      header: "Last Date", 
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

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setDialogType("editBlog");
    setIsDialogOpen(true);
  };
  const handleDeleteBlog = async (blog: Blog) => {
    try {
      await deleteDoc(doc(db, "blogs", blog.id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }  
  };

  const handleEditCareer = (career: Career) => {
    setEditingCareer(career);
    setDialogType("editCareer");
    setIsDialogOpen(true);
  };

  const handleDeleteCareer = async (career: Career) => {
    try {
      await deleteDoc(doc(db, "careers", career.id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    } 
  };
  const handleUpdateBlog = async (updatedBlog: Blog) => {
    if (editingBlog) {
      try {
        await updateDoc(doc(db, "blogs", editingBlog.id), updatedBlog);
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Error updating blog:", error);
      }
    }
  };
  const handleUpdateCareer = async (updatedCareer: Career) => {
    if (editingCareer) {
      try {
        await updateDoc(doc(db, "careers", editingCareer.id), updatedCareer);
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Error updating blog:", error);
      }
    }
  };

  const openDialog = (type: "blog" | "career") => {
    setDialogType(type);
    setIsDialogOpen(true);
    if (type === "blog") {
      setNewBlog({
        title: "",
        author: "",
        date: "",
        coverImage: "",
        content: "",
      });
    }
    if (type === "career"){
      setNewCareer({
        position: "",
        date: "",
        type: "",
        location: "",
        lastDate:"",
        totalPositions:"",
        salary:"",
        createdAt:"",
      });
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingBlog(null);
    setEditingCareer(null);
  };
  const handleAddBlog = async (coverImageUrl: string) => {
    const { title, author, content } = newBlog;
    const date = new Date().toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    if (title && author && date && coverImageUrl && content) {
      try {
        await addDoc(collection(db, "blogs"), {
          title,
          author,
          date,
          coverImage: coverImageUrl,
          content,
          createdAt: serverTimestamp(),
        });
        closeDialog();
      } catch (error) {
        console.error("Error adding blog:", error);
      }
    }
  };
  const handleAddCareer = async () => {
    const { position, location, type, lastDate, totalPositions, salary } = newCareer;
    const date = new Date().toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    if (position && location && type && date && lastDate && totalPositions && salary) {
      try {
        await addDoc(collection(db, "careers"), {
          position,
          date,
          location,
          type,
          lastDate,
          totalPositions,
          salary,
          createdAt: serverTimestamp(),
        });
        closeDialog();
      } catch (error) {
        console.error("Error adding blog:", error);
      }
    }
  };

  return (
    <div className="p-4 md:py-16 xl:py-24 md:w-[90%] lg:w-[80%] 3xl:min-h-[700px]">
      <div className="3xl:container 3xl:mx-auto">
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

        <Dialog open={isDialogOpen} onClose={closeDialog}>
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4 z-20">
            <DialogPanel className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl lg:max-w-3xl max-h-[400px] lg:max-h-[550px] overflow-y-auto">
                <DialogTitle className="text-xl font-semibold">
                  <div className="flex justify-between">
                    {dialogType === "blog" && "Add New Blog"}
                    {dialogType === "career" && "Add New Career"}
                    {dialogType === "editBlog" && "Edit Blog"}
                    {dialogType === "editCareer" && "Edit Career"}
                  <button
                    onClick={closeDialog}
                  >
                    <FontAwesomeIcon icon={faClose} />
                  </button>
                </div>
                </DialogTitle>
                <div className="mt-4">
                  {dialogType === "editBlog" && editingBlog ? (
                    <EditBlog blogData={editingBlog} handleUpdateBlog={handleUpdateBlog} />
                  ) : dialogType === "blog" ? (
                    <AddBlog newBlog={newBlog} setNewBlog={setNewBlog} handleAddBlog={handleAddBlog} />
                  ) : dialogType === "editCareer" ? (
                    <EditCareer careerData={editingCareer} handleUpdateCareer={handleUpdateCareer} />
                  ) : (
                    <AddCareer newCareer={newCareer} setNewCareer={setNewCareer} handleAddCareer={handleAddCareer} />
                  )}
                </div>
                
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
