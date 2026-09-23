"use client";

import { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaComments,
  FaEdit,
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { CustomModal } from "../../components/ui/CustomModal";
import { CustomButton } from "../../components/ui/CustomButton";
import { ActionMenu } from "../../components/ui/ActionMenu";
import { SafeImage } from "../../components/ui/SafeImage";
import { BlogForm } from "./BlogForm";
import { BlogCommentsPanel } from "./BlogCommentsPanel";
import {
  Blog,
  BlogStatus,
  CreateBlogPayload,
  GetBlogsParams,
} from "../../../features/blogs/types";
import { useGetBlogs } from "../../../features/blogs/hooks/useGetBlogs";
import { useBlogMutations } from "../../../features/blogs/hooks/useBlogMutations";

const COVER_FALLBACK = "/icon.png";

const blankBlog = (): CreateBlogPayload => ({
  title: "",
  excerpt: "",
  coverImage: "",
  content: "",
  tags: [],
  status: "DRAFT",
});

function formatDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminBlogs() {
  const [params, setParams] = useState<GetBlogsParams>({
    page: 1,
    limit: 5,
    sortBy: "publishedAt",
    sortOrder: "desc",
  });
  const [searchInput, setSearchInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setParams((prev) => {
        const search = searchInput.trim() || undefined;
        const tag = tagInput.trim() || undefined;
        if (prev.search === search && prev.tag === tag) return prev;
        return { ...prev, search, tag, page: 1 };
      });
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput, tagInput]);

  const {
    data: blogs,
    meta,
    isLoading: isFetching,
    isFetching: isRefetching,
    error: fetchError,
  } = useGetBlogs(params);

  const {
    createBlog,
    updateBlog,
    toggleStatus,
    deleteBlog,
    deleteBulk,
    isCreating,
    isUpdating,
    isDeleting,
    createError,
    updateError,
  } = useBlogMutations();

  const [selected, setSelected] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [editing, setEditing] = useState<CreateBlogPayload | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [commentsFor, setCommentsFor] = useState<Blog | null>(null);
  const [pendingDelete, setPendingDelete] = useState<{
    ids: string[];
    label: string;
  } | null>(null);

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setParams((prev) => ({
      ...prev,
      status: val === "ALL" ? undefined : (val as BlogStatus),
      page: 1,
    }));
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParams((prev) => ({ ...prev, limit: Number(e.target.value), page: 1 }));
  };

  const handleEditClick = (blog: Blog) => {
    setEditingId(blog.id);
    setEditing({
      title: blog.title,
      excerpt: blog.excerpt,
      coverImage: blog.coverImage || "",
      content: blog.content,
      tags: blog.tags || [],
      status: blog.status,
    });
    setMenuOpen(null);
  };

  const confirmPendingDelete = async () => {
    if (!pendingDelete) return;
    try {
      if (pendingDelete.ids.length === 1) {
        await deleteBlog(pendingDelete.ids[0]);
        setSelected((prev) => prev.filter((item) => item !== pendingDelete.ids[0]));
      } else {
        await deleteBulk(pendingDelete.ids);
        setSelected([]);
      }
      setPendingDelete(null);
    } catch {
      // Toast is handled in the mutation hook
    }
  };

  const allOnPageSelected = blogs.length > 0 && blogs.every((blog) => selected.includes(blog.id));
  const toggleSelected = (id: string) =>
    setSelected((items) => (items.includes(id) ? items.filter((i) => i !== id) : [...items, id]));
  const togglePageSelection = () => {
    const ids = blogs.map((blog) => blog.id);
    setSelected((items) =>
      allOnPageSelected ? items.filter((id) => !ids.includes(id)) : [...new Set([...items, ...ids])]
    );
  };

  const isFormLoading = isCreating || isUpdating;
  const formError = createError || updateError;

  return (
    <div className="">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-customLightBlue2">Content management</p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Blogs</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage blog posts and comments shown on your website.
          </p>
        </div>
        <CustomButton
          type="button"
          onClick={() => {
            setEditing(blankBlog());
            setEditingId(null);
          }}
          className="bg-customNavy hover:bg-customNavy/90"
        >
          <FaPlus className="h-3.5 w-3.5" /> Add blog
        </CustomButton>
      </div>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search blogs..."
              className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 focus:border-customLightBlue2 focus:ring-2 focus:ring-customLightBlue2/20"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Filter by tag"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-customLightBlue2"
            />
            <select
              value={params.status || "ALL"}
              onChange={handleStatusFilter}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-customLightBlue2"
            >
              <option value="ALL">All statuses</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
            </select>
          </div>
        </div>

        {fetchError && (
          <div className="border-b border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {fetchError}
          </div>
        )}

        {selected.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-100 bg-blue-50 px-4 py-3 text-sm">
            <span className="font-medium text-blue-900">
              {selected.length} blog{selected.length === 1 ? "" : "s"} selected
            </span>
            <CustomButton
              type="button"
              variant="danger"
              size="sm"
              onClick={() =>
                setPendingDelete({
                  ids: selected,
                  label: `${selected.length} selected blog${selected.length === 1 ? "" : "s"}`,
                })
              }
              className="bg-transparent px-2.5 py-1.5 text-red-700 hover:bg-red-100"
            >
              <FaTrash className="h-3.5 w-3.5" /> Delete selected
            </CustomButton>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-left text-sm">
            <colgroup>
              <col className="w-12" />
              <col />
              <col className="w-24" />
              <col className="w-28" />
              <col className="w-16" />
            </colgroup>
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="w-12 px-5 py-3.5">
                  <input
                    aria-label="Select all"
                    type="checkbox"
                    checked={allOnPageSelected}
                    onChange={togglePageSelection}
                    className="h-4 w-4 rounded border-gray-300 text-customLightBlue2 focus:ring-customLightBlue2"
                  />
                </th>
                <th className="px-3 py-3.5 font-semibold">Post</th>
                <th className="px-3 py-3.5 font-semibold">Status</th>
                <th className="px-3 py-3.5 font-semibold">Published</th>
                <th className="w-16 px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className={`divide-y divide-gray-100 ${isRefetching ? "opacity-60" : ""}`}>
              {isFetching && blogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-14 text-center text-gray-500">
                    Loading blogs...
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-14 text-center text-gray-500">
                    No blogs match your filters.
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog.id} className="transition hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <input
                        aria-label={`Select ${blog.title}`}
                        type="checkbox"
                        checked={selected.includes(blog.id)}
                        onChange={() => toggleSelected(blog.id)}
                        className="h-4 w-4 rounded border-gray-300 text-customLightBlue2 focus:ring-customLightBlue2"
                      />
                    </td>
                    <td className="max-w-0 px-3 py-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="grid h-10 w-14 shrink-0 place-items-center overflow-hidden rounded-md bg-gray-100">
                          <SafeImage
                            src={blog.coverImage}
                            fallback={COVER_FALLBACK}
                            alt={blog.title}
                            className="h-full w-full object-cover"
                          />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-gray-900">{blog.title}</p>
                          <p className="mt-0.5 truncate text-xs text-gray-500">
                            {(blog.tags || []).join(", ") || "No tags"} · {blog.readTime || 0} min
                            read
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          blog.status === "PUBLISHED"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {blog.status === "PUBLISHED" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-gray-600">
                      {formatDate(blog.publishedAt)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <ActionMenu
                        open={menuOpen === blog.id}
                        onOpenChange={(open) => setMenuOpen(open ? blog.id : null)}
                        label={`Actions for ${blog.title}`}
                      >
                            <button
                              type="button"
                              onClick={() => handleEditClick(blog)}
                              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <FaEdit className="text-gray-400" /> Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setMenuOpen(null);
                                setCommentsFor(blog);
                              }}
                              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <FaComments className="text-gray-400" /> Comments
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setMenuOpen(null);
                                toggleStatus(blog.id);
                              }}
                              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              {blog.status === "PUBLISHED" ? (
                                <>
                                  <FaEyeSlash className="text-gray-400" /> Unpublish
                                </>
                              ) : (
                                <>
                                  <FaEye className="text-gray-400" /> Publish
                                </>
                              )}
                            </button>
                            <div className="my-1 h-px bg-gray-100" />
                            <button
                              type="button"
                              onClick={() => {
                                setMenuOpen(null);
                                setPendingDelete({
                                  ids: [blog.id],
                                  label: blog.title,
                                });
                              }}
                              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <FaTrash /> Delete
                            </button>
                      </ActionMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-3.5 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            Show
            <select
              value={params.limit}
              onChange={handleLimitChange}
              className="rounded border border-gray-300 px-2 py-1 text-sm text-gray-700"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span>of {meta.total} blogs</span>
          </div>
          <div className="flex items-center gap-3">
            <span>
              Page {meta.page} of {Math.max(meta.totalPages, 1)}
            </span>
            <div className="flex gap-1">
              <CustomButton
                aria-label="Previous page"
                type="button"
                variant="secondary"
                size="sm"
                disabled={meta.page <= 1 || isRefetching}
                onClick={() => setParams((prev) => ({ ...prev, page: (prev.page || 1) - 1 }))}
                className="border-gray-300 p-2"
              >
                <FaChevronLeft className="h-3 w-3" />
              </CustomButton>
              <CustomButton
                aria-label="Next page"
                type="button"
                variant="secondary"
                size="sm"
                disabled={meta.page >= meta.totalPages || isRefetching}
                onClick={() => setParams((prev) => ({ ...prev, page: (prev.page || 1) + 1 }))}
                className="border-gray-300 p-2"
              >
                <FaChevronRight className="h-3 w-3" />
              </CustomButton>
            </div>
          </div>
        </div>
      </section>

      {editing && (
        <CustomModal
          open={!!editing}
          onClose={() => {
            if (isFormLoading) return;
            setEditing(null);
            setEditingId(null);
          }}
          title={editingId ? "Edit blog" : "Add blog"}
          size="lg"
          footer={
            <>
              <CustomButton
                type="button"
                variant="secondary"
                onClick={() => {
                  setEditing(null);
                  setEditingId(null);
                }}
                disabled={isFormLoading}
              >
                Cancel
              </CustomButton>
              <CustomButton
                type="submit"
                form="blog-form"
                loading={isFormLoading}
                className="bg-customNavy hover:bg-customNavy/90"
              >
                {editingId ? "Save changes" : "Create blog"}
              </CustomButton>
            </>
          }
        >
          <BlogForm
            formId="blog-form"
            defaultValues={editing}
            apiError={formError}
            onSubmit={async (values) => {
              if (editingId) await updateBlog(editingId, values);
              else await createBlog(values);
              setEditing(null);
              setEditingId(null);
            }}
          />
        </CustomModal>
      )}

      {commentsFor && (
        <CustomModal
          open={!!commentsFor}
          onClose={() => setCommentsFor(null)}
          title={`Comments · ${commentsFor.title}`}
          size="lg"
          footer={
            <CustomButton type="button" variant="secondary" onClick={() => setCommentsFor(null)}>
              Close
            </CustomButton>
          }
        >
          <BlogCommentsPanel blogId={commentsFor.id} />
        </CustomModal>
      )}

      {pendingDelete && (
        <CustomModal
          open={!!pendingDelete}
          onClose={() => !isDeleting && setPendingDelete(null)}
          title="Delete blog"
          size="sm"
          footer={
            <>
              <CustomButton
                type="button"
                variant="secondary"
                onClick={() => setPendingDelete(null)}
                disabled={isDeleting}
              >
                Cancel
              </CustomButton>
              <CustomButton
                type="button"
                variant="danger"
                loading={isDeleting}
                onClick={confirmPendingDelete}
              >
                Delete
              </CustomButton>
            </>
          }
        >
          <p className="text-sm text-gray-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{pendingDelete.label}</span>? This cannot be undone.
          </p>
        </CustomModal>
      )}
    </div>
  );
}
