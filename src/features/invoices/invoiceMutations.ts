import { useMutation } from "@tanstack/react-query";
import { newInvoice } from "./invoiceApi";

export function useNewInvoiceMutation() {
  return useMutation({
    mutationKey: ["new invoice"],
    mutationFn: (invoice: InvoiceType) => newInvoice(invoice),
  });
}
