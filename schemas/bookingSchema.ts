import * as yup from "yup";

export const bookingSchema = yup.object({
  reason: yup.string().required("Please select a reason"),
  name: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
});