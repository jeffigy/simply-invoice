import axiosInstance from "@/store/axiosInstance";

export const fetchInvoices = async () => {
  return (await axiosInstance.get("/api/invoices")).data;
};
