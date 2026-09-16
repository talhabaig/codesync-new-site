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
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { CustomModal } from "../../components/ui/CustomModal";
import { CustomInput } from "../../components/ui/CustomInput";
import { CustomButton } from "../../components/ui/CustomButton";
import { ImageUploader } from "../../components/ui/ImageUploader";
import { SafeImage } from "../../components/ui/SafeImage";
import {
  TeamMember,
  TeamMemberStatus,
  CreateTeamMemberPayload,
  GetTeamMembersParams,
  UpdateTeamMemberPayload,
} from "../../../features/team/types";
import { useGetTeamMembers } from "../../../features/team/hooks/useGetTeamMembers";
import { useTeamMutations } from "../../../features/team/hooks/useTeamMutations";

const DEFAULT_MEMBER_IMAGE = "/default-member.png";

const blankTeamMember = (): CreateTeamMemberPayload => ({
  name: "",
  designation: "",
  image: "",
  displayOrder: 1,
  status: "ACTIVE",
});

export default function AdminTeam() {
  const [params, setParams] = useState<GetTeamMembersParams>({
    page: 1,
    limit: 5,
    sortBy: "displayOrder",
    sortOrder: "asc",
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
    data: members,
    meta,
    isLoading: isFetching,
    isFetching: isRefetching,
    error: fetchError,
  } = useGetTeamMembers(params);

  const {
    createTeamMember,
    updateTeamMember,
    toggleStatus,
    deleteTeamMember,
    deleteBulk,
    isCreating,
    isUpdating,
    isDeleting,
    createError,
    updateError,
  } = useTeamMutations();

  const [selected, setSelected] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState<UpdateTeamMemberPayload | null>(null);
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
      status: val === "ALL" ? undefined : (val as TeamMemberStatus),
      page: 1,
    }));
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParams((prev) => ({ ...prev, limit: Number(e.target.value), page: 1 }));
  };

  const handleEditClick = (member: TeamMember) => {
    setEditingId(member.id);
    setEditing({
      name: member.name,
      designation: member.designation,
      image: member.image || "",
      displayOrder: member.displayOrder,
      status: member.status,
    });
    setMenuOpen(null);
  };

  const saveTeamMember = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editing) return;
    if (!editing.image) {
      toast.error("Please upload a photo");
      return;
    }

    try {
      if (editingId) {
        await updateTeamMember(editingId, editing);
      } else {
        await createTeamMember(editing);
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
        await deleteTeamMember(pendingDelete.ids[0]);
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

  const updateEditing = <K extends keyof UpdateTeamMemberPayload>(
    key: K,
    value: UpdateTeamMemberPayload[K]
  ) => setEditing((item) => (item ? { ...item, [key]: value } : item));

  const allOnPageSelected =
    members.length > 0 && members.every((s) => selected.includes(s.id));
  const toggleSelected = (id: string) =>
    setSelected((items) =>
      items.includes(id) ? items.filter((i) => i !== id) : [...items, id]
    );
  const togglePageSelection = () => {
    const ids = members.map((s) => s.id);
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
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Team</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage the team members displayed on your website.
          </p>
        </div>
        <CustomButton
          type="button"
          onClick={() => {
            setEditing(blankTeamMember());
            setEditingId(null);
          }}
          className="bg-customNavy hover:bg-customNavy/90"
        >
          <FaPlus className="h-3.5 w-3.5" /> Add team member
        </CustomButton>
      </div>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search team members..."
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
              {selected.length} team member{selected.length === 1 ? "" : "s"} selected
            </span>
            <CustomButton
              type="button"
              variant="danger"
              size="sm"
              onClick={() =>
                setPendingDelete({
                  ids: selected,
                  label: `${selected.length} selected team member${selected.length === 1 ? "" : "s"}`,
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
                <th className="px-3 py-3.5 font-semibold">Member</th>
                <th className="px-3 py-3.5 font-semibold">Order</th>
                <th className="px-3 py-3.5 font-semibold">Status</th>
                <th className="w-16 px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className={`divide-y divide-gray-100 ${isRefetching ? "opacity-60" : ""}`}>
              {isFetching && members.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-14 text-center text-gray-500">
                    Loading team members...
                  </td>
                </tr>
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-14 text-center text-gray-500">
                    No team members match your filters.
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member.id} className="transition hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <input
                        aria-label={`Select ${member.name}`}
                        type="checkbox"
                        checked={selected.includes(member.id)}
                        onChange={() => toggleSelected(member.id)}
                        className="h-4 w-4 rounded border-gray-300 text-customLightBlue2 focus:ring-customLightBlue2"
                      />
                    </td>
                    <td className="max-w-0 px-3 py-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-gray-100">
                          <SafeImage
                            src={member.image}
                            fallback={DEFAULT_MEMBER_IMAGE}
                            alt={member.name}
                            className="h-full w-full object-cover"
                          />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-gray-900">{member.name}</p>
                          <p className="mt-0.5 truncate text-xs text-gray-500">
                            {member.designation}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-gray-600">
                      {member.displayOrder}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          member.status === "ACTIVE"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {member.status === "ACTIVE" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="relative px-5 py-4 text-right">
                      <div
                        ref={menuOpen === member.id ? menuRef : null}
                        className="relative inline-block text-left"
                      >
                        <button
                          aria-label={`Actions for ${member.name}`}
                          type="button"
                          onClick={() =>
                            setMenuOpen(menuOpen === member.id ? null : member.id)
                          }
                          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                        >
                          <FaEllipsisV />
                        </button>

                        {menuOpen === member.id && (
                          <div className="absolute right-0 top-11 z-10 w-48 rounded-lg border border-gray-200 bg-white p-1 text-left shadow-lg">
                            <button
                              type="button"
                              onClick={() => handleEditClick(member)}
                              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <FaEdit className="text-gray-400" /> Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setMenuOpen(null);
                                toggleStatus(member.id);
                              }}
                              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              {member.status === "ACTIVE" ? (
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
                                  ids: [member.id],
                                  label: member.name,
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
            <span>of {meta.total} team members</span>
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
          title={editingId ? "Edit team member" : "Add team member"}
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
                form="team-member-form"
                loading={isFormLoading}
                className="bg-customNavy hover:bg-customNavy/90"
              >
                {editingId ? "Save changes" : "Create team member"}
              </CustomButton>
            </>
          }
        >
          <form id="team-member-form" onSubmit={saveTeamMember} className="grid gap-4 sm:grid-cols-2">
            {formError && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 sm:col-span-2">
                {formError}
              </div>
            )}

            <CustomInput
              label="Name"
              required
              value={editing.name}
              onChange={(e) => updateEditing("name", e.target.value)}
            />
            <CustomInput
              label="Designation"
              required
              value={editing.designation}
              onChange={(e) => updateEditing("designation", e.target.value)}
            />

            <div className="sm:col-span-2">
              <ImageUploader
                label="Photo"
                value={editing.image}
                onChange={(url) => updateEditing("image", url)}
                folder="codesyncs/team"
                objectFit="cover"
                fallbackSrc={DEFAULT_MEMBER_IMAGE}
              />
              {!editing.image && (
                <p className="mt-1 text-xs text-gray-500">A Cloudinary photo URL is required.</p>
              )}
            </div>

            <CustomInput
              label="Display order"
              type="number"
              required
              min={1}
              value={editing.displayOrder}
              onChange={(e) => updateEditing("displayOrder", Number(e.target.value))}
            />

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">Status</label>
              <select
                value={editing.status}
                onChange={(e) => updateEditing("status", e.target.value as TeamMemberStatus)}
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
          title="Delete team member"
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
