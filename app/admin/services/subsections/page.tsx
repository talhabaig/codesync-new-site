"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { CustomModal } from "../../../components/ui/CustomModal";
import { CustomButton } from "../../../components/ui/CustomButton";
import { ActionMenu } from "../../../components/ui/ActionMenu";
import { SafeImage } from "../../../components/ui/SafeImage";
import { ServiceSubsectionForm } from "./ServiceSubsectionForm";
import {
  CreateServiceSubsectionPayload,
  GetServiceSubsectionsParams,
  ServiceSubsection,
  ServiceSubsectionStatus,
} from "../../../../features/service-subsections/types";
import { useGetServiceSubsections } from "../../../../features/service-subsections/hooks/useGetServiceSubsections";
import { useServiceSubsectionMutations } from "../../../../features/service-subsections/hooks/useServiceSubsectionMutations";
import { useGetServices } from "../../../../features/services/hooks/useGetServices";

const LOGO_FALLBACK = "/icon.png";

const blankSubsection = (serviceId = ""): CreateServiceSubsectionPayload => ({
  serviceId,
  title: "",
  logo: "",
  shortDescription: null,
  description: null,
  displayOrder: 1,
  status: "ACTIVE",
});

function AdminServiceSubsections() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialServiceId = searchParams.get("serviceId") || undefined;

  const [params, setParams] = useState<GetServiceSubsectionsParams>({
    page: 1,
    limit: 5,
    sortBy: "displayOrder",
    sortOrder: "asc",
    serviceId: initialServiceId,
  });
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const serviceId = searchParams.get("serviceId") || undefined;
    setParams((prev) => {
      if (prev.serviceId === serviceId) return prev;
      return { ...prev, serviceId, page: 1 };
    });
  }, [searchParams]);

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

  const { data: services } = useGetServices({
    getAll: true,
    limit: 100,
    sortBy: "displayOrder",
    sortOrder: "asc",
  });

  const {
    data: subsections,
    meta,
    isLoading: isFetching,
    isFetching: isRefetching,
    error: fetchError,
  } = useGetServiceSubsections(params);

  const {
    createSubsection,
    updateSubsection,
    toggleStatus,
    deleteSubsection,
    deleteBulk,
    isCreating,
    isUpdating,
    isDeleting,
    createError,
    updateError,
  } = useServiceSubsectionMutations();

  const [selected, setSelected] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [editing, setEditing] = useState<CreateServiceSubsectionPayload | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<{
    ids: string[];
    label: string;
  } | null>(null);

  const serviceTitleById = Object.fromEntries(services.map((s) => [s.id, s.title]));

  const handleServiceFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value || undefined;
    const next = new URLSearchParams(searchParams.toString());
    if (val) next.set("serviceId", val);
    else next.delete("serviceId");
    router.replace(`/admin/services/subsections${next.toString() ? `?${next}` : ""}`);
    setParams((prev) => ({ ...prev, serviceId: val, page: 1 }));
  };

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setParams((prev) => ({
      ...prev,
      status: val === "ALL" ? undefined : (val as ServiceSubsectionStatus),
      page: 1,
    }));
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParams((prev) => ({ ...prev, limit: Number(e.target.value), page: 1 }));
  };

  const handleEditClick = (item: ServiceSubsection) => {
    setEditingId(item.id);
    setEditing({
      serviceId: item.serviceId,
      title: item.title,
      logo: item.logo || "",
      shortDescription: item.shortDescription,
      description: item.description,
      displayOrder: item.displayOrder,
      status: item.status,
    });
    setMenuOpen(null);
  };

  const confirmPendingDelete = async () => {
    if (!pendingDelete) return;
    try {
      if (pendingDelete.ids.length === 1) {
        await deleteSubsection(pendingDelete.ids[0]);
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

  const allOnPageSelected =
    subsections.length > 0 && subsections.every((item) => selected.includes(item.id));
  const toggleSelected = (id: string) =>
    setSelected((items) => (items.includes(id) ? items.filter((i) => i !== id) : [...items, id]));
  const togglePageSelection = () => {
    const ids = subsections.map((item) => item.id);
    setSelected((items) =>
      allOnPageSelected ? items.filter((id) => !ids.includes(id)) : [...new Set([...items, ...ids])]
    );
  };

  const isFormLoading = isCreating || isUpdating;
  const formError = createError || updateError;
  const currentServiceTitle = params.serviceId
    ? serviceTitleById[params.serviceId]
    : undefined;

  return (
    <div className="">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            aria-label="Back to services"
            onClick={() => router.push("/admin/services")}
            className="mt-6 rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          >
            <FaArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <p className="text-sm font-medium text-customLightBlue2">Content management</p>
            <h1 className="mt-1 text-2xl font-bold text-gray-900">Service subsections</h1>
            <p className="mt-1 text-sm text-gray-500">
              {currentServiceTitle
                ? `Subsections for ${currentServiceTitle}`
                : "Manage offerings nested under each service."}
            </p>
          </div>
        </div>
        <CustomButton
          type="button"
          onClick={() => {
            setEditing(blankSubsection(params.serviceId || ""));
            setEditingId(null);
          }}
          className="bg-customNavy hover:bg-customNavy/90"
        >
          <FaPlus className="h-3.5 w-3.5" /> Add subsection
        </CustomButton>
      </div>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search subsections..."
              className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 focus:border-customLightBlue2 focus:ring-2 focus:ring-customLightBlue2/20"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={params.serviceId || ""}
              onChange={handleServiceFilter}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-customLightBlue2"
            >
              <option value="">All services</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
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
              {selected.length} subsection{selected.length === 1 ? "" : "s"} selected
            </span>
            <CustomButton
              type="button"
              variant="danger"
              size="sm"
              onClick={() =>
                setPendingDelete({
                  ids: selected,
                  label: `${selected.length} selected subsection${selected.length === 1 ? "" : "s"}`,
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
                <th className="px-3 py-3.5 font-semibold">Subsection</th>
                <th className="px-3 py-3.5 font-semibold">Order</th>
                <th className="px-3 py-3.5 font-semibold">Status</th>
                <th className="w-16 px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className={`divide-y divide-gray-100 ${isRefetching ? "opacity-60" : ""}`}>
              {isFetching && subsections.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-14 text-center text-gray-500">
                    Loading subsections...
                  </td>
                </tr>
              ) : subsections.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-14 text-center text-gray-500">
                    No subsections match your filters.
                  </td>
                </tr>
              ) : (
                subsections.map((item) => (
                  <tr key={item.id} className="transition hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <input
                        aria-label={`Select ${item.title}`}
                        type="checkbox"
                        checked={selected.includes(item.id)}
                        onChange={() => toggleSelected(item.id)}
                        className="h-4 w-4 rounded border-gray-300 text-customLightBlue2 focus:ring-customLightBlue2"
                      />
                    </td>
                    <td className="max-w-0 px-3 py-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-md bg-gray-100 p-1">
                          <SafeImage
                            src={item.logo}
                            fallback={LOGO_FALLBACK}
                            alt={item.title}
                            className="h-full w-full object-contain"
                          />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-gray-900">{item.title}</p>
                          <p className="mt-0.5 truncate text-xs text-gray-500">
                            {serviceTitleById[item.serviceId] || item.shortDescription || "—"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-gray-600">{item.displayOrder}</td>
                    <td className="whitespace-nowrap px-3 py-4">
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
                    <td className="px-5 py-4 text-right">
                      <ActionMenu
                        open={menuOpen === item.id}
                        onOpenChange={(open) => setMenuOpen(open ? item.id : null)}
                        label={`Actions for ${item.title}`}
                      >
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
                                  label: item.title,
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
            <span>of {meta.total} subsections</span>
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
          title={editingId ? "Edit subsection" : "Add subsection"}
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
                form="service-subsection-form"
                loading={isFormLoading}
                className="bg-customNavy hover:bg-customNavy/90"
              >
                {editingId ? "Save changes" : "Create subsection"}
              </CustomButton>
            </>
          }
        >
          <ServiceSubsectionForm
            formId="service-subsection-form"
            defaultValues={editing}
            services={services}
            apiError={formError}
            onSubmit={async (values) => {
              if (editingId) await updateSubsection(editingId, values);
              else await createSubsection(values);
              setEditing(null);
              setEditingId(null);
            }}
          />
        </CustomModal>
      )}

      {pendingDelete && (
        <CustomModal
          open={!!pendingDelete}
          onClose={() => !isDeleting && setPendingDelete(null)}
          title="Delete subsection"
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

export default function AdminServiceSubsectionsPage() {
  return (
    <Suspense fallback={<p className="text-sm text-gray-500">Loading subsections...</p>}>
      <AdminServiceSubsections />
    </Suspense>
  );
}
