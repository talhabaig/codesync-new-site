"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaEllipsisV,
  FaEye,
  FaEyeSlash,
  FaHome,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { ImageUploader } from "../../components/ui/ImageUploader";
import { CustomModal } from "../../components/ui/CustomModal";
import { CustomInput } from "../../components/ui/CustomInput";
import { CustomButton } from "../../components/ui/CustomButton";
import { RichTextEditor } from "../../components/ui/RichTextEditor";
import {
  Service,
  ServiceStatus,
  CreateServicePayload,
  GetServicesParams,
  UpdateServicePayload,
} from "../../../features/services/types";
import { useGetServices } from "../../../features/services/hooks/useGetServices";
import { useServiceMutations } from "../../../features/services/hooks/useServiceMutations";

const blankService = (): CreateServicePayload => ({
  title: "",
  shortDescription: "",
  description: "",
  icon: "✦",
  bannerImage: "",
  headerImage: "",
  displayOrder: 1,
  showOnHome: false,
  status: "ACTIVE",
  seoTitle: "",
  seoDescription: "",
  seoKeywords: "",
});

export default function AdminServices() {
  const [params, setParams] = useState<GetServicesParams>({
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
    data: services,
    meta,
    isLoading: isFetching,
    isFetching: isRefetching,
    error: fetchError,
  } = useGetServices(params);

  const {
    isCreating,
    isUpdating,
    isDeleting,
    createError,
    updateError,
    createService,
    updateService,
    toggleStatus,
    toggleHome,
    deleteService,
    deleteBulk,
  } = useServiceMutations();

  const [selected, setSelected] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState<UpdateServicePayload | null>(null);
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
      status: val === "ALL" ? undefined : (val as ServiceStatus),
      page: 1,
    }));
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParams((prev) => ({ ...prev, limit: Number(e.target.value), page: 1 }));
  };

  const handleEditClick = (service: Service) => {
    setEditingId(service.id);
    setEditing({
      title: service.title,
      shortDescription: service.shortDescription,
      description: service.description,
      icon: service.icon,
      bannerImage: service.bannerImage,
      headerImage: service.headerImage,
      showOnHome: service.showOnHome,
      displayOrder: service.displayOrder,
      status: service.status,
      seoTitle: service.seoTitle,
      seoDescription: service.seoDescription,
      seoKeywords: service.seoKeywords,
    });
    setMenuOpen(null);
  };

  const saveService = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editing) return;

    try {
      if (editingId) {
        await updateService(editingId, editing);
      } else {
        await createService(editing as CreateServicePayload);
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
        await deleteService(pendingDelete.ids[0]);
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

  const updateEditing = <K extends keyof UpdateServicePayload>(
    key: K,
    value: UpdateServicePayload[K]
  ) => setEditing((item) => (item ? { ...item, [key]: value } : item));

  const allOnPageSelected =
    services.length > 0 && services.every((s) => selected.includes(s.id));
  const toggleSelected = (id: string) =>
    setSelected((items) =>
      items.includes(id) ? items.filter((i) => i !== id) : [...items, id]
    );
  const togglePageSelection = () => {
    const ids = services.map((s) => s.id);
    setSelected((items) =>
      allOnPageSelected
        ? items.filter((id) => !ids.includes(id))
        : [...new Set([...items, ...ids])]
    );
  };

  const isFormLoading = isCreating || isUpdating;
  const formError = createError || updateError;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-customLightBlue2">Content management</p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Services</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage the services displayed across your website.
          </p>
        </div>
        <CustomButton
          type="button"
          onClick={() => {
            setEditing(blankService());
            setEditingId(null);
          }}
          className="bg-customNavy hover:bg-customNavy/90"
        >
          <FaPlus className="h-3.5 w-3.5" /> Add service
        </CustomButton>
      </div>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search services..."
              className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 focus:border-customLightBlue2 focus:ring-2 focus:ring-customLightBlue2/20"
            />
          </div>
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

        {fetchError && (
          <div className="border-b border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {fetchError}
          </div>
        )}

        {selected.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-100 bg-blue-50 px-4 py-3 text-sm">
            <span className="font-medium text-blue-900">
              {selected.length} service{selected.length === 1 ? "" : "s"} selected
            </span>
            <CustomButton
              type="button"
              variant="danger"
              size="sm"
              onClick={() =>
                setPendingDelete({
                  ids: selected,
                  label: `${selected.length} selected service${selected.length === 1 ? "" : "s"}`,
                })
              }
              className="bg-transparent px-2.5 py-1.5 text-red-700 hover:bg-red-100"
            >
              <FaTrash className="h-3.5 w-3.5" /> Delete selected
            </CustomButton>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-sm">
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
                <th className="px-3 py-3.5 font-semibold">Service</th>
                <th className="px-3 py-3.5 font-semibold">Order</th>
                <th className="px-3 py-3.5 font-semibold">Home</th>
                <th className="px-3 py-3.5 font-semibold">Status</th>
                <th className="w-16 px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className={`divide-y divide-gray-100 ${isRefetching ? "opacity-60" : ""}`}>
              {isFetching && services.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center text-gray-500">
                    Loading services...
                  </td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center text-gray-500">
                    No services match your filters.
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr key={service.id} className="transition hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <input
                        aria-label={`Select ${service.title}`}
                        type="checkbox"
                        checked={selected.includes(service.id)}
                        onChange={() => toggleSelected(service.id)}
                        className="h-4 w-4 rounded border-gray-300 text-customLightBlue2 focus:ring-customLightBlue2"
                      />
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-blue-50 font-semibold text-customLightBlue2">
                          {service.icon?.startsWith("http") ? (
                            <img
                              src={service.icon}
                              alt={service.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            service.icon
                          )}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-gray-900">{service.title}</p>
                          <p className="mt-0.5 truncate text-xs text-gray-500">
                            {service.shortDescription}
                          </p>
                          <p className="mt-1 truncate text-xs text-gray-400">/{service.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-gray-600">{service.displayOrder}</td>
                    <td className="px-3 py-4">
                      {service.showOnHome ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          <FaCheck className="h-2.5 w-2.5" /> Shown
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">
                          Not shown
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          service.status === "ACTIVE"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {service.status === "ACTIVE" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="relative px-5 py-4 text-right">
                      <div
                        ref={menuOpen === service.id ? menuRef : null}
                        className="relative inline-block text-left"
                      >
                        <button
                          aria-label={`Actions for ${service.title}`}
                          type="button"
                          onClick={() =>
                            setMenuOpen(menuOpen === service.id ? null : service.id)
                          }
                          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                        >
                          <FaEllipsisV />
                        </button>

                        {menuOpen === service.id && (
                          <div className="absolute right-0 top-11 z-10 w-48 rounded-lg border border-gray-200 bg-white p-1 text-left shadow-lg">
                            <button
                              type="button"
                              onClick={() => handleEditClick(service)}
                              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <FaEdit className="text-gray-400" /> Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setMenuOpen(null);
                                toggleHome(service.id);
                              }}
                              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              {service.showOnHome ? (
                                <>
                                  <FaEyeSlash className="text-gray-400" /> Hide from Home
                                </>
                              ) : (
                                <>
                                  <FaHome className="text-gray-400" /> Show on Home
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setMenuOpen(null);
                                toggleStatus(service.id);
                              }}
                              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              {service.status === "ACTIVE" ? (
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
                                  ids: [service.id],
                                  label: service.title,
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
            <span>of {meta.total} services</span>
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
          title={editingId ? "Edit service" : "Add service"}
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
                form="service-form"
                loading={isFormLoading}
                className="bg-customNavy hover:bg-customNavy/90"
              >
                {editingId ? "Save changes" : "Create service"}
              </CustomButton>
            </>
          }
        >
          <form id="service-form" onSubmit={saveService} className="grid gap-4 sm:grid-cols-2">
            {formError && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 sm:col-span-2">
                {formError}
              </div>
            )}

            <div className="sm:col-span-2">
              <CustomInput
                label="Title"
                required
                value={editing.title}
                onChange={(e) => updateEditing("title", e.target.value)}
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                Short description
              </label>
              <textarea
                required
                rows={2}
                value={editing.shortDescription}
                onChange={(e) => updateEditing("shortDescription", e.target.value)}
                className="block w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 focus:border-customLightBlue2 focus:outline-none focus:ring-2 focus:ring-customLightBlue2"
              />
            </div>

            <div className="sm:col-span-2">
              <RichTextEditor
                label="Full Description"
                content={editing.description}
                onChange={(html) => updateEditing("description", html)}
                placeholder="Write the full service description..."
              />
            </div>

            <CustomInput
              label="Icon (URL or character)"
              required
              value={editing.icon}
              onChange={(e) => updateEditing("icon", e.target.value)}
            />
            <CustomInput
              label="Display order"
              type="number"
              required
              min={1}
              value={editing.displayOrder}
              onChange={(e) => updateEditing("displayOrder", Number(e.target.value))}
            />

            <div className="sm:col-span-2">
              <ImageUploader
                label="Banner Image"
                value={editing.bannerImage}
                onChange={(url) => updateEditing("bannerImage", url)}
                folder="codesyncs/services"
              />
            </div>

            <div className="sm:col-span-2">
              <ImageUploader
                label="Header Image"
                value={editing.headerImage}
                onChange={(url) => updateEditing("headerImage", url)}
                folder="codesyncs/services"
              />
            </div>

            <CustomInput
              label="SEO Title"
              value={editing.seoTitle}
              onChange={(e) => updateEditing("seoTitle", e.target.value)}
            />
            <CustomInput
              label="SEO Keywords"
              value={editing.seoKeywords}
              onChange={(e) => updateEditing("seoKeywords", e.target.value)}
            />
            <div className="sm:col-span-2">
              <CustomInput
                label="SEO Description"
                value={editing.seoDescription}
                onChange={(e) => updateEditing("seoDescription", e.target.value)}
              />
            </div>

            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={editing.showOnHome}
                onChange={(e) => updateEditing("showOnHome", e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-customLightBlue2 focus:ring-customLightBlue2"
              />
              Show on home page
            </label>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">Status</label>
              <select
                value={editing.status}
                onChange={(e) => updateEditing("status", e.target.value as ServiceStatus)}
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
          title="Delete service"
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
            Are you sure you want to delete <span className="font-semibold">{pendingDelete.label}</span>?
            This cannot be undone.
          </p>
        </CustomModal>
      )}
    </div>
  );
}
