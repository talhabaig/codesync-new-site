"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";
import AddBlog from "./AddBlog";
import EditBlog from "./EditBlog";
import AddCareer from "./AddCareer";
import EditCareer from "./EditCareer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faClose,
  faBlog,
  faUser,
  faCalendar,
  faBriefcase,
  faChartLine,
  faPlus,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  ColumnDef,
} from "@tanstack/react-table";

interface Blog {
  id: string;
  title: string;
  author: string;
  date: string;
  coverImage: string;
  content: string;
  createdAt: string;
}

interface Career {
  id: string;
  position: string;
  location: string;
  type: string;
  date: string;
  lastDate: string;
  totalPositions: string;
  salary: string;
  jobcontent: string;
  createdAt: string;
}

const blogColumnHelper = createColumnHelper<Blog>();
const careerColumnHelper = createColumnHelper<Career>();

export default function AdminDashboard() {
  const [view, setView] = useState<"blog" | "career">("blog");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<
    "blog" | "career" | "editBlog" | "editCareer" | null
  >(null);
  const [newBlog, setNewBlog] = useState<Omit<Blog, "id" | "createdAt">>({
    title: "",
    author: "",
    date: "",
    coverImage: "",
    content: "",
  });
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [newCareer, setNewCareer] = useState<Omit<Career, "id" | "createdAt">>({
    position: "",
    location: "",
    type: "",
    date: "",
    lastDate: "",
    totalPositions: "",
    salary: "",
    jobcontent: "",
  });
  const [editingCareer, setEditingCareer] = useState<Career | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs
  useEffect(() => {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const blogsData: Blog[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        blogsData.push({
          id: doc.id,
          title: data.title || "",
          author: data.author || "",
          date: data.date || "",
          coverImage: data.coverImage || "",
          content: data.content || "",
          createdAt: data.createdAt || "",
        } as Blog);
      });
      setBlogs(blogsData);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Fetch careers
  useEffect(() => {
    const q = query(collection(db, "careers"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const careersData: Career[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        careersData.push({
          id: doc.id,
          position: data.position || "",
          location: data.location || "",
          type: data.type || "",
          date: data.date || "",
          lastDate: data.lastDate || "",
          totalPositions: data.totalPositions || "",
          salary: data.salary || "",
          jobcontent: data.jobcontent || "",
          createdAt: data.createdAt || "",
        } as Career);
      });
      setCareers(careersData);
    });
    return unsubscribe;
  }, []);

  // Blog table columns
  const blogColumns: ColumnDef<Blog, any>[] = [
    blogColumnHelper.accessor("coverImage", {
      header: "Cover",
      cell: (info) => (
        <img
          src={info.getValue()}
          alt="cover"
          className="w-12 h-12 rounded-lg object-cover border border-gray-200"
          onError={(e) => {
            e.currentTarget.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'%3E%3C/circle%3E%3Cpolyline points='21,15 16,10 5,21'%3E%3C/polyline%3E%3C/svg%3E";
          }}
        />
      ),
    }),
    blogColumnHelper.accessor("title", {
      header: "Title",
      cell: (info) => (
        <span className="font-medium text-gray-800 line-clamp-1">
          {info.getValue()}
        </span>
      ),
    }),
    blogColumnHelper.accessor("author", {
      header: "Author",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faUser} className="text-gray-400 w-3 h-3" />
          <span className="text-gray-600">{info.getValue()}</span>
        </div>
      ),
    }),
    blogColumnHelper.accessor("date", {
      header: "Date",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faCalendar}
            className="text-gray-400 w-3 h-3"
          />
          <span className="text-gray-600">{info.getValue()}</span>
        </div>
      ),
    }),
 {
  id: "actions",
  header: () => <div className="text-center w-full">Actions</div>,
  cell: ({ row }) => (
    <div className="flex gap-3 justify-center">
      <button
        onClick={() => handleEditBlog(row.original)}
        className="text-blue-600 hover:text-blue-800 transition-colors"
        title="Edit"
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <button
        onClick={() => handleDeleteBlog(row.original)}
        className="text-red-600 hover:text-red-800 transition-colors"
        title="Delete"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  ),
}

  ];

  // Career table columns
  const careerColumns: ColumnDef<Career, any>[] = [
    careerColumnHelper.accessor("position", {
      header: "Position",
      cell: (info) => (
        <span className="font-medium text-gray-800">{info.getValue()}</span>
      ),
    }),
    careerColumnHelper.accessor("type", {
      header: "Type",
      cell: (info) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
          {info.getValue()}
        </span>
      ),
    }),
    careerColumnHelper.accessor("totalPositions", {
      header: "Positions",
      cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
    }),
    careerColumnHelper.accessor("salary", {
      header: "Salary",
      cell: (info) => (
        <span className="text-green-600 font-medium">{info.getValue()}</span>
      ),
    }),
    careerColumnHelper.accessor("date", {
      header: "Posted",
      cell: (info) => (
        <span className="text-gray-600 text-sm">{info.getValue()}</span>
      ),
    }),
    careerColumnHelper.accessor("lastDate", {
      header: "Last Date",
      cell: (info) => (
        <span className="text-red-600 text-sm">{info.getValue()}</span>
      ),
    }),
    {
  id: "actions",
  header: () => <div className="text-center w-full">Actions</div>,
  cell: ({ row }) => (
    <div className="flex gap-3 justify-center">
      <button
        onClick={() => handleEditCareer(row.original)}
        className="text-blue-600 hover:text-blue-800 transition-colors"
        title="Edit"
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <button
        onClick={() => handleDeleteCareer(row.original)}
        className="text-red-600 hover:text-red-800 transition-colors"
        title="Delete"
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

  const openDialog = (type: "blog" | "career") => {
    setDialogType(type);
    setIsDialogOpen(true);
    if (type === "blog")
      setNewBlog({
        title: "",
        author: "",
        date: "",
        coverImage: "",
        content: "",
      });
    if (type === "career")
      setNewCareer({
        position: "",
        location: "",
        type: "",
        date: "",
        lastDate: "",
        totalPositions: "",
        salary: "",
        jobcontent: "",
      });
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogType(null);
    setEditingBlog(null);
    setEditingCareer(null);
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setDialogType("editBlog");
    setIsDialogOpen(true);
  };

  const handleDeleteBlog = async (blog: Blog) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      await deleteDoc(doc(db, "blogs", blog.id));
    }
  };

  const handleEditCareer = (career: Career) => {
    setEditingCareer(career);
    setDialogType("editCareer");
    setIsDialogOpen(true);
  };

  const handleDeleteCareer = async (career: Career) => {
    if (confirm("Are you sure you want to delete this career posting?")) {
      await deleteDoc(doc(db, "careers", career.id));
    }
  };

  const handleAddBlog = async (coverImage: string) => {
    const { title, author, content } = newBlog;
    const date = new Date().toLocaleDateString("en-GB");
    await addDoc(collection(db, "blogs"), {
      title,
      author,
      content,
      date,
      coverImage,
      createdAt: serverTimestamp(),
    });
    closeDialog();
  };

  const handleAddCareer = async () => {
    const {
      position,
      location,
      type,
      lastDate,
      totalPositions,
      salary,
      jobcontent,
    } = newCareer;
    const date = new Date().toLocaleDateString("en-GB");
    await addDoc(collection(db, "careers"), {
      position,
      location,
      type,
      lastDate,
      totalPositions,
      salary,
      jobcontent,
      date,
      createdAt: serverTimestamp(),
    });
    closeDialog();
  };

  // Stats for dashboard
  const stats = {
    totalBlogs: blogs.length,
    totalCareers: careers.length,
    recentBlogs: blogs.slice(0, 3),
  };

  return (
    <>
      {loading ? (
        <div className="flex min-h-screen justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-customBlue1"></div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 xl:p-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your blog posts and career opportunities
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Total Blogs
                  </p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {stats.totalBlogs}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FontAwesomeIcon
                    icon={faBlog}
                    className="text-blue-600 w-6 h-6"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Career Openings
                  </p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {stats.totalCareers}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <FontAwesomeIcon
                    icon={faBriefcase}
                    className="text-green-600 w-6 h-6"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Recent Activity
                  </p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {stats.recentBlogs.length}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FontAwesomeIcon
                    icon={faChartLine}
                    className="text-purple-600 w-6 h-6"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setView("blog")}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  view === "blog"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <FontAwesomeIcon icon={faBlog} className="w-4 h-4" />
                Blog Management
              </button>
              <button
                onClick={() => setView("career")}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  view === "career"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <FontAwesomeIcon icon={faBriefcase} className="w-4 h-4" />
                Career Management
              </button>
            </div>

            <div className="p-6">
              {view === "blog" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        Blog Posts
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Manage and create blog content
                      </p>
                    </div>
                    <button
                      onClick={() => openDialog("blog")}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                      Add New Blog
                    </button>
                  </div>

                  {blogs.length === 0 ? (
                    <div className="text-center py-12">
                      <FontAwesomeIcon
                        icon={faBlog}
                        className="w-12 h-12 text-gray-300 mb-4"
                      />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">
                        No blog posts yet
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Get started by creating your first blog post
                      </p>
                      <button
                        onClick={() => openDialog("blog")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Create Blog Post
                      </button>
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                      <table className="min-w-full table-fixed w-full">
                        <thead className="bg-gray-50">
                          {tableInstanceBlog
                            .getHeaderGroups()
                            .map((headerGroup) => (
                              <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                  <th
                                    key={header.id}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                                  >
                                    {flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                                  </th>
                                ))}
                              </tr>
                            ))}
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {tableInstanceBlog.getRowModel().rows.map((row) => (
                            <tr
                              key={row.id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              {row.getVisibleCells().map((cell) => (
                                <td
                                  key={cell.id}
                                  className="px-6 py-4 whitespace-nowrap"
                                >
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {view === "career" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        Career Opportunities
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Manage job postings and applications
                      </p>
                    </div>
                    <button
                      onClick={() => openDialog("career")}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                      Add New Career
                    </button>
                  </div>

                  {careers.length === 0 ? (
                    <div className="text-center py-12">
                      <FontAwesomeIcon
                        icon={faBriefcase}
                        className="w-12 h-12 text-gray-300 mb-4"
                      />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">
                        No career postings yet
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Create your first job posting to attract talent
                      </p>
                      <button
                        onClick={() => openDialog("career")}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Create Job Posting
                      </button>
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                      <table className="min-w-full table-fixed w-full">
                        <thead className="bg-gray-50">
                          {tableInstanceCareer
                            .getHeaderGroups()
                            .map((headerGroup) => (
                              <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                  <th
                                    key={header.id}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                                  >
                                    {flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                                  </th>
                                ))}
                              </tr>
                            ))}
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {tableInstanceCareer.getRowModel().rows.map((row) => (
                            <tr
                              key={row.id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              {row.getVisibleCells().map((cell) => (
                                <td
                                  key={cell.id}
                                  className="px-6 py-4 whitespace-nowrap"
                                >
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Dialog */}
          <Dialog
            open={isDialogOpen}
            onClose={closeDialog}
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <DialogPanel className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogTitle className="text-xl font-semibold flex justify-between items-center p-6 border-b border-gray-200">
                  <span>
                    {dialogType === "blog" && "Add New Blog"}
                    {dialogType === "editBlog" && "Edit Blog"}
                    {dialogType === "career" && "Add New Career"}
                    {dialogType === "editCareer" && "Edit Career"}
                  </span>
                  <button
                    onClick={closeDialog}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FontAwesomeIcon icon={faClose} className="w-5 h-5" />
                  </button>
                </DialogTitle>

                <div className="p-6">
                  {dialogType === "editBlog" && editingBlog && (
                    <EditBlog
                      blogData={editingBlog}
                      handleUpdateBlog={handleAddBlog}
                    />
                  )}
                  {dialogType === "blog" && (
                    <AddBlog
                      newBlog={newBlog}
                      setNewBlog={setNewBlog}
                      handleAddBlog={handleAddBlog}
                    />
                  )}
                  {dialogType === "editCareer" && editingCareer && (
                    <EditCareer
                      careerData={editingCareer}
                      handleUpdateCareer={handleAddCareer}
                    />
                  )}
                  {dialogType === "career" && (
                    <AddCareer
                      newCareer={newCareer}
                      setNewCareer={setNewCareer}
                      handleAddCareer={handleAddCareer}
                    />
                  )}
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        </div>
      )}
    </>
  );
}
