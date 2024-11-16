import axiosInstance from "@/store/axiosInstance";

export const fetchInvoices = async () => {
  return (await axiosInstance.get("/api/invoices")).data;
};

export const newInvoice = async (invoice: InvoiceType) => {
  return (await axiosInstance.post("/api/invoices", invoice)).data;
};

export const editInvoice = async (id: string, invoice: InvoiceType) => {
  return (await axiosInstance.post(`/api/invoices/${id}`, invoice)).data;
};
