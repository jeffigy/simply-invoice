import axiosInstance from "@/store/axiosInstance";

export const fetchInvoices = async () => {
  return (await axiosInstance.get("/api/invoices")).data;
};

export const newInvoice = async (invoice: InvoiceType) => {
  return (await axiosInstance.post("/api/invoices", invoice)).data;
};

export const updateInvoice = async (id: string, invoice: InvoiceType) => {
  return (await axiosInstance.patch(`/api/invoices/${id}`, invoice)).data;
};

export const deleteInvoice = async (id: string | string[] | undefined) => {
  return (await axiosInstance.delete(`/api/invoices/${id}`)).data;
};
