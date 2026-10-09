import * as yup from "yup";
import type { CreateTeamMemberPayload, TeamMemberStatus } from "./types";

export const teamMemberFormSchema: yup.ObjectSchema<CreateTeamMemberPayload> = yup.object({
  name: yup.string().trim().required("Name is required").max(80, "Name must be at most 80 characters"),
  designation: yup
    .string()
    .trim()
    .required("Designation is required")
    .max(120, "Designation must be at most 120 characters"),
  image: yup.string().trim().required("Photo is required"),
  displayOrder: yup
    .number()
    .typeError("Display order is required")
    .integer("Display order must be a whole number")
    .min(1, "Display order must be at least 1")
    .required("Display order is required"),
  status: yup.mixed<TeamMemberStatus>().oneOf(["ACTIVE", "INACTIVE"]).required("Status is required"),
});

export type TeamMemberFormValues = yup.InferType<typeof teamMemberFormSchema>;
