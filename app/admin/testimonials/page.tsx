"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaEllipsisV,
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaSearch,
  FaStar,
  FaTrash,
} from "react-icons/fa";
import { CustomModal } from "../../components/ui/CustomModal";
import { CustomInput } from "../../components/ui/CustomInput";
import { CustomButton } from "../../components/ui/CustomButton";
import { ImageUploader } from "../../components/ui/ImageUploader";
import { toast } from "react-hot-toast";
import {
  Testimonial,
  TestimonialStatus,
  CreateTestimonialPayload,
  GetTestimonialsParams,
  UpdateTestimonialPayload,
} from "../../../features/testimonials/types";
import { useGetTestimonials } from "../../../features/testimonials/hooks/useGetTestimonials";
import { useTestimonialMutations } from "../../../features/testimonials/hooks/useTestimonialMutations";

const blankTestimonial = (): CreateTestimonialPayload => ({
  clientName: "",
  designation: "",
  company: "",
  photo: "",
  testimonial: "",
  rating: 5,
  displayOrder: 1,
  featured: false,
  status: "ACTIVE",
});

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-400" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <FaStar
          key={i}
          className={`h-3 w-3 ${i < rating ? "text-amber-400" : "text-gray-200"}`}
        />
      ))}
    </span>
  );
}

export default function AdminTestimonials() {
  const [params, setParams] = useState<GetTestimonialsParams>({
    page: 1,
    limit: 5,
  });
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setParams((prev) => {
        const search = searchInput.trim() || undefined;
        if (prev.search === search) return prev;
        return { ...prev, search, page: 1 };
      });
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const {
    data: testimonials,
    meta,
    isLoading: isFetching,
    isFetching: isRefetching,
    error: fetchError,
  } = useGetTestimonials(params);

  const {
    createTestimonial,
    updateTestimonial,
    toggleStatus,
    toggleFeatured,
    deleteTestimonial,
    deleteBulk,
    isCreating,
    isUpdating,
    isDeleting,
    createError,
    updateError,
  } = useTestimonialMutations();

  const [selected, setSelected] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState<UpdateTestimonialPayload | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<{
    ids: string[];
    label: string;
  } | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setParams((prev) => ({
      ...prev,
      status: val === "ALL" ? undefined : (val as TestimonialStatus),
      page: 1,
    }));
  };

  const handleFeaturedFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setParams((prev) => ({
      ...prev,
      featured: val === "ALL" ? undefined : val === "true",
      page: 1,
    }));
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParams((prev) => ({ ...prev, limit: Number(e.target.value), page: 1 }));
  };

  const handleEditClick = (item: Testimonial) => {
    setEditingId(item.id);
    setEditing({
      clientName: item.clientName,
      designation: item.designation,
      company: item.company,
      photo: item.photo || "",
      testimonial: item.testimonial,
      rating: item.rating,
      displayOrder: item.displayOrder,
      featured: item.featured,
      status: item.status,
    });
    setMenuOpen(null);
  };

  const saveTestimonial = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editing) return;
    if (!editing.photo) {
      toast.error("Please upload a photo");
      return;
    }

    try {
      if (editingId) {
        await updateTestimonial(editingId, editing);
      } else {
        await createTestimonial(editing);
      }
      setEditing(null);
      setEditingId(null);
    } catch {
      // Toast is handled in the mutation hook
    }
  };

  const confirmPendingDelete = async () => {
    if (!pendingDelete) return;
    try {
      if (pendingDelete.ids.length === 1) {
        await deleteTestimonial(pendingDelete.ids[0]);
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

  const updateEditing = <K extends keyof UpdateTestimonialPayload>(
    key: K,
    value: UpdateTestimonialPayload[K]
  ) => setEditing((item) => (item ? { ...item, [key]: value } : item));

  const allOnPageSelected =
    testimonials.length > 0 && testimonials.every((s) => selected.includes(s.id));
  const toggleSelected = (id: string) =>
    setSelected((items) =>
      items.includes(id) ? items.filter((i) => i !== id) : [...items, id]
    );
  const togglePageSelection = () => {
    const ids = testimonials.map((s) => s.id);
    setSelected((items) =>
      allOnPageSelected
        ? items.filter((id) => !ids.includes(id))
        : [...new Set([...items, ...ids])]
    );
  };

  const isFormLoading = isCreating || isUpdating;
  const formError = createError || updateError;
  const featuredFilterValue =
    params.featured === undefined ? "ALL" : params.featured ? "true" : "false";

  return (
    <div className="">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-customLightBlue2">Content management</p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage client testimonials shown on your website.
          </p>
        </div>
        <CustomButton
          type="button"
          onClick={() => {
            setEditing(blankTestimonial());
            setEditingId(null);
          }}
          className="bg-customNavy hover:bg-customNavy/90"
        >
          <FaPlus className="h-3.5 w-3.5" /> Add testimonial
        </CustomButton>
      </div>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search testimonials..."
              className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 focus:border-customLightBlue2 focus:ring-2 focus:ring-customLightBlue2/20"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={featuredFilterValue}
              onChange={handleFeaturedFilter}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-customLightBlue2"
            >
              <option value="ALL">All visibility</option>
              <option value="true">Featured</option>
              <option value="false">Not featured</option>
            </select>
            <select
              value={params.status || "ALL"}
              onChange={handleStatusFilter}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-customLightBlue2"
            >
              <option value="ALL">All statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
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
              {selected.length} testimonial{selected.length === 1 ? "" : "s"} selected
            </span>
            <CustomButton
              type="button"
              variant="danger"
              size="sm"
              onClick={() =>
                setPendingDelete({
                  ids: selected,
                  label: `${selected.length} selected testimonial${selected.length === 1 ? "" : "s"}`,
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
              <col className="w-[7.5rem]" />
              <col className="w-28" />
              <col className="w-20" />
              <col className="w-24" />
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
                <th className="px-3 py-3.5 font-semibold">Client</th>
                <th className="px-3 py-3.5 font-semibold">Rating</th>
                <th className="px-3 py-3.5 font-semibold">Featured</th>
                <th className="px-3 py-3.5 font-semibold">Order</th>
                <th className="px-3 py-3.5 font-semibold">Status</th>
                <th className="w-16 px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className={`divide-y divide-gray-100 ${isRefetching ? "opacity-60" : ""}`}>
              {isFetching && testimonials.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-14 text-center text-gray-500">
                    Loading testimonials...
                  </td>
                </tr>
              ) : testimonials.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-14 text-center text-gray-500">
                    No testimonials match your filters.
                  </td>
                </tr>
              ) : (
                testimonials.map((item) => (
                  <tr key={item.id} className="transition hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <input
                        aria-label={`Select ${item.clientName}`}
                        type="checkbox"
                        checked={selected.includes(item.id)}
                        onChange={() => toggleSelected(item.id)}
                        className="h-4 w-4 rounded border-gray-300 text-customLightBlue2 focus:ring-customLightBlue2"
                      />
                    </td>
                    <td className="max-w-0 px-3 py-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-gray-100">
                          {item.photo ? (
                            <img
                              src={item.photo}
                              alt={item.clientName}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-xs text-gray-400">N/A</span>
                          )}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-gray-900">{item.clientName}</p>
                          <p className="mt-0.5 truncate text-xs text-gray-500">
                            {item.designation}
                            {item.company ? `, ${item.company}` : ""}
                          </p>
                          <p
                            className="mt-1 line-clamp-2 break-words text-xs text-gray-400"
                            title={item.testimonial}
                          >
                            {item.testimonial}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4">
                      <Stars rating={item.rating} />
                    </td>
                    <td className="px-3 py-4">
                      {item.featured ? (
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          Featured
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">
                          Not featured
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-4 text-gray-600">{item.displayOrder}</td>
                    <td className="px-3 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          item.status === "ACTIVE"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.status === "ACTIVE" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="relative px-5 py-4 text-right">
                      <div
                        ref={menuOpen === item.id ? menuRef : null}
                        className="relative inline-block text-left"
                      >
                        <button
                          aria-label={`Actions for ${item.clientName}`}
                          type="button"
                          onClick={() =>
                            setMenuOpen(menuOpen === item.id ? null : item.id)
                          }
                          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                        >
                          <FaEllipsisV />
                        </button>

                        {menuOpen === item.id && (
                          <div className="absolute right-0 top-11 z-10 w-52 rounded-lg border border-gray-200 bg-white p-1 text-left shadow-lg">
                            <button
                              type="button"
                              onClick={() => handleEditClick(item)}
                              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <FaEdit className="text-gray-400" /> Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setMenuOpen(null);
                                toggleFeatured(item.id);
                              }}
                              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              {item.featured ? (
                                <>
                                  <FaEyeSlash className="text-gray-400" /> Unfeature
                                </>
                              ) : (
                                <>
                                  <FaStar className="text-gray-400" /> Feature
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setMenuOpen(null);
                                toggleStatus(item.id);
                              }}
                              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              {item.status === "ACTIVE" ? (
                                <>
                                  <FaEyeSlash className="text-gray-400" /> Set Inactive
                                </>
                              ) : (
                                <>
                                  <FaEye className="text-gray-400" /> Set Active
                                </>
                              )}
                            </button>
                            <div className="my-1 h-px bg-gray-100" />
                            <button
                              type="button"
                              onClick={() => {
                                setMenuOpen(null);
                                setPendingDelete({
                                  ids: [item.id],
                                  label: item.clientName,
                                });
                              }}
                              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <FaTrash /> Delete
                            </button>
                          </div>
                        )}
                      </div>
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
            <span>of {meta.total} testimonials</span>
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
          title={editingId ? "Edit testimonial" : "Add testimonial"}
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
                form="testimonial-form"
                loading={isFormLoading}
                className="bg-customNavy hover:bg-customNavy/90"
              >
                {editingId ? "Save changes" : "Create testimonial"}
              </CustomButton>
            </>
          }
        >
          <form id="testimonial-form" onSubmit={saveTestimonial} className="grid gap-4 sm:grid-cols-2">
            {formError && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 sm:col-span-2">
                {formError}
              </div>
            )}

            <CustomInput
              label="Client name"
              required
              value={editing.clientName}
              onChange={(e) => updateEditing("clientName", e.target.value)}
            />
            <CustomInput
              label="Company"
              required
              value={editing.company}
              onChange={(e) => updateEditing("company", e.target.value)}
            />
            <div className="sm:col-span-2">
              <CustomInput
                label="Designation"
                required
                value={editing.designation}
                onChange={(e) => updateEditing("designation", e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <ImageUploader
                label="Photo"
                value={editing.photo}
                onChange={(url) => updateEditing("photo", url)}
                folder="codesyncs/testimonials"
                objectFit="cover"
              />
              {!editing.photo && (
                <p className="mt-1 text-xs text-gray-500">A Cloudinary photo URL is required.</p>
              )}
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">Testimonial</label>
              <textarea
                required
                rows={4}
                value={editing.testimonial}
                onChange={(e) => updateEditing("testimonial", e.target.value)}
                className="block w-full resize-y rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 focus:border-customLightBlue2 focus:outline-none focus:ring-2 focus:ring-customLightBlue2"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">Rating</label>
              <select
                value={editing.rating}
                onChange={(e) => updateEditing("rating", Number(e.target.value))}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 focus:border-customLightBlue2 focus:outline-none focus:ring-2 focus:ring-customLightBlue2"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} star{n === 1 ? "" : "s"}
                  </option>
                ))}
              </select>
            </div>

            <CustomInput
              label="Display order"
              type="number"
              required
              min={1}
              value={editing.displayOrder}
              onChange={(e) => updateEditing("displayOrder", Number(e.target.value))}
            />

            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={editing.featured}
                onChange={(e) => updateEditing("featured", e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-customLightBlue2 focus:ring-customLightBlue2"
              />
              Featured
            </label>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">Status</label>
              <select
                value={editing.status}
                onChange={(e) => updateEditing("status", e.target.value as TestimonialStatus)}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 focus:border-customLightBlue2 focus:outline-none focus:ring-2 focus:ring-customLightBlue2"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </form>
        </CustomModal>
      )}

      {pendingDelete && (
        <CustomModal
          open={!!pendingDelete}
          onClose={() => !isDeleting && setPendingDelete(null)}
          title="Delete testimonial"
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
