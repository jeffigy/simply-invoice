import { useQuery } from "@tanstack/react-query";
import { fetchInvoices } from "./invoiceApi";

export const useInvoices = () => {
  return useQuery({
    queryKey: ["invoices"],
    queryFn: () => fetchInvoices(),
  });
};
