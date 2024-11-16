import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInvoice, newInvoice, updateInvoice } from "./invoiceApi";

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
export function useDeleteInvoiceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | string[] | undefined) => deleteInvoice(id),
    mutationKey: ["delete invoice"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });
    },
  });
}
