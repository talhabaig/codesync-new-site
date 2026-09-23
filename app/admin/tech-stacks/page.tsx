"use client";

import { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
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
import { TechStackForm } from "./TechStackForm";
import {
  TechStack,
  TechStackStatus,
  TechStackCategory,
  CreateTechStackPayload,
  GetTechStacksParams,
} from "../../../features/tech-stacks/types";
import { useGetTechStacks } from "../../../features/tech-stacks/hooks/useGetTechStacks";
import { useTechStackMutations } from "../../../features/tech-stacks/hooks/useTechStackMutations";
import { TECH_STACK_CATEGORIES } from "../../../features/tech-stacks/validations";

const blankTechStack = (): CreateTechStackPayload => ({
  name: "",
  logo: "",
  category: "FRONTEND",
  description: "",
  displayOrder: 1,
  status: "ACTIVE",
});

export default function AdminTechStacks() {
  const [params, setParams] = useState<GetTechStacksParams>({
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
    data: techStacks,
    meta,
    isLoading: isFetching,
    isFetching: isRefetching,
    error: fetchError,
  } = useGetTechStacks(params);

  const {
    createTechStack,
    updateTechStack,
    toggleStatus,
    deleteTechStack,
    deleteBulk,
    isCreating,
    isUpdating,
    isDeleting,
    createError,
    updateError,
  } = useTechStackMutations();

  const [selected, setSelected] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [editing, setEditing] = useState<CreateTechStackPayload | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<{
    ids: string[];
    label: string;
  } | null>(null);

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setParams((prev) => ({
      ...prev,
      status: val === "ALL" ? undefined : (val as TechStackStatus),
      page: 1,
    }));
  };

  const handleCategoryFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setParams((prev) => ({
      ...prev,
      category: val === "ALL" ? undefined : (val as TechStackCategory),
      page: 1,
    }));
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParams((prev) => ({ ...prev, limit: Number(e.target.value), page: 1 }));
  };

  const handleEditClick = (stack: TechStack) => {
    setEditingId(stack.id);
    setEditing({
      name: stack.name,
      logo: stack.logo || "",
      category: stack.category,
      description: stack.description,
      displayOrder: stack.displayOrder,
      status: stack.status,
    });
    setMenuOpen(null);
  };

  const confirmPendingDelete = async () => {
    if (!pendingDelete) return;
    try {
      if (pendingDelete.ids.length === 1) {
        await deleteTechStack(pendingDelete.ids[0]);
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
    techStacks.length > 0 && techStacks.every((s) => selected.includes(s.id));
  const toggleSelected = (id: string) =>
    setSelected((items) =>
      items.includes(id) ? items.filter((i) => i !== id) : [...items, id]
    );
  const togglePageSelection = () => {
    const ids = techStacks.map((s) => s.id);
    setSelected((items) =>
      allOnPageSelected
        ? items.filter((id) => !ids.includes(id))
        : [...new Set([...items, ...ids])]
    );
  };

  const isFormLoading = isCreating || isUpdating;
  const formError = createError || updateError;

  return (
    <div className="">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-customLightBlue2">Content management</p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Tech Stacks</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage the technologies displayed on your website.
          </p>
        </div>
        <CustomButton
          type="button"
          onClick={() => {
            setEditing(blankTechStack());
            setEditingId(null);
          }}
          className="bg-customNavy hover:bg-customNavy/90"
        >
          <FaPlus className="h-3.5 w-3.5" /> Add tech stack
        </CustomButton>
      </div>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search tech stacks..."
              className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 focus:border-customLightBlue2 focus:ring-2 focus:ring-customLightBlue2/20"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={params.category || "ALL"}
              onChange={handleCategoryFilter}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-customLightBlue2"
            >
              <option value="ALL">All categories</option>
              {TECH_STACK_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
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
              {selected.length} tech stack{selected.length === 1 ? "" : "s"} selected
            </span>
            <CustomButton
              type="button"
              variant="danger"
              size="sm"
              onClick={() =>
                setPendingDelete({
                  ids: selected,
                  label: `${selected.length} selected tech stack${selected.length === 1 ? "" : "s"}`,
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
                <th className="px-3 py-3.5 font-semibold">Tech Stack</th>
                <th className="px-3 py-3.5 font-semibold">Category</th>
                <th className="px-3 py-3.5 font-semibold">Order</th>
                <th className="px-3 py-3.5 font-semibold">Status</th>
                <th className="w-16 px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className={`divide-y divide-gray-100 ${isRefetching ? "opacity-60" : ""}`}>
              {isFetching && techStacks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center text-gray-500">
                    Loading tech stacks...
                  </td>
                </tr>
              ) : techStacks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center text-gray-500">
                    No tech stacks match your filters.
                  </td>
                </tr>
              ) : (
                techStacks.map((stack) => (
                  <tr key={stack.id} className="transition hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <input
                        aria-label={`Select ${stack.name}`}
                        type="checkbox"
                        checked={selected.includes(stack.id)}
                        onChange={() => toggleSelected(stack.id)}
                        className="h-4 w-4 rounded border-gray-300 text-customLightBlue2 focus:ring-customLightBlue2"
                      />
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-gray-50 p-1">
                          {stack.logo ? (
                            <img
                              src={stack.logo}
                              alt={stack.name}
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <span className="text-xs text-gray-400">N/A</span>
                          )}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-gray-900">{stack.name}</p>
                          <p className="mt-0.5 truncate text-xs text-gray-500">
                            {stack.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {stack.category}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-gray-600">{stack.displayOrder}</td>
                    <td className="px-3 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          stack.status === "ACTIVE"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {stack.status === "ACTIVE" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <ActionMenu
                        open={menuOpen === stack.id}
                        onOpenChange={(open) => setMenuOpen(open ? stack.id : null)}
                        label={`Actions for ${stack.name}`}
                      >
                            <button
                              type="button"
                              onClick={() => handleEditClick(stack)}
                              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <FaEdit className="text-gray-400" /> Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setMenuOpen(null);
                                toggleStatus(stack.id);
                              }}
                              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              {stack.status === "ACTIVE" ? (
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
                                  ids: [stack.id],
                                  label: stack.name,
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
            <span>of {meta.total} tech stacks</span>
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
          title={editingId ? "Edit tech stack" : "Add tech stack"}
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
                form="tech-stack-form"
                loading={isFormLoading}
                className="bg-customNavy hover:bg-customNavy/90"
              >
                {editingId ? "Save changes" : "Create tech stack"}
              </CustomButton>
            </>
          }
        >
          <TechStackForm
            formId="tech-stack-form"
            defaultValues={editing}
            apiError={formError}
            onSubmit={async (values) => {
              if (editingId) await updateTechStack(editingId, values);
              else await createTechStack(values);
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
          title="Delete tech stack"
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
