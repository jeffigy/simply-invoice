import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newInvoice, updateInvoice } from "./invoiceApi";

export function useNewInvoiceMutation() {
  return useMutation({
    mutationKey: ["new invoice"],
    mutationFn: (invoice: InvoiceType) => newInvoice(invoice),
  });
}

export function useUpdateInvoiceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, invoice }: { id: string; invoice: InvoiceType }) =>
      updateInvoice(id, invoice),
    mutationKey: ["update invoice"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });
    },
  });
}
