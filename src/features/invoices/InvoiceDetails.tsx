"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2Icon, TrashIcon } from "lucide-react";
import Link from "next/link";

import React from "react";
import DeleteInvoiceModal from "./DeleteInvoiceModal";

const InvoiceDetails = ({ invoice }: { invoice: InvoiceType }) => {
  return (
    <Card className="rounded-none mx-auto max-w-screen-md">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Invoice Details</CardTitle>{" "}
        <div>
          <Link href={`/invoices/${invoice.invoice_id}/edit`}>
            <Button variant={"ghost"}>
              <Pencil />
            </Button>
          </Link>
          <DeleteInvoiceModal />
        </div>
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
