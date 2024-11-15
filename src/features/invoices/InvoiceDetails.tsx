"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";
import React from "react";
import { useInvoices } from "./invoiceQueries";

const InvoiceDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useInvoices();

  if (isError) return <p>{error.message}</p>;

  if (isLoading) return <p>loading...</p>;

  const invoice: InvoiceType = data.find(
    (invoice: InvoiceType) => invoice.invoice_id === id
  );

  if (!invoice) return <p>invoice not found</p>;
  console.log(invoice);

  return (
    <Card className="rounded-none mx-auto max-w-screen-md">
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className=" space-y-3 bg-base-100 p-3">
          <InvoiceDetail label="Customer Name" value={invoice.customer_name} />
          <InvoiceDetail
            label="Due Date"
            value={new Date(invoice.due_date).toLocaleString()}
          />
          <InvoiceDetail
            label="Date Created"
            value={new Date(invoice.created_at!).toLocaleString()}
          />
          <InvoiceDetail label="Customer Name" value={invoice.customer_name} />
        </div>
        <div className="flex justify-end">
          <div>
            <InvoiceAmountDetail
              label="Sub Total"
              value={invoice.subtotal?.toString()!}
            />
            <InvoiceAmountDetail label="Tax" value={invoice.tax?.toString()!} />
            <InvoiceAmountDetail
              label="Total"
              value={invoice.total_amount?.toString()!}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const InvoiceDetail = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <p className="font-semibold">{label}</p>
      <p> {value}</p>
    </div>
  );
};

const InvoiceAmountDetail = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex justify-between w-[200px]">
      <p className="font-semibold">{label}</p>
      <p> {value}</p>
    </div>
  );
};

export default InvoiceDetails;
