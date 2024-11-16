"use client";
import EditInvoiceForm from "@/features/invoices/EditInvoiceForm";
import { useInvoices } from "@/features/invoices/invoiceQueries";
import { useParams } from "next/navigation";

const page = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useInvoices();

  if (isError) return <p>{error.message}</p>;
  if (isLoading) return <p>loading...</p>;

  const invoice: InvoiceType = data.find(
    (invoice: InvoiceType) => invoice.invoice_id === id
  );

  if (!invoice) return <p>invoice not found</p>;

  return <EditInvoiceForm invoice={invoice} />;
};

export default page;
