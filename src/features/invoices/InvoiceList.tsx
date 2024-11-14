"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Invoice from "./Invoice";
import { useInvoices } from "./invoiceQueries";
import InvoiceListLoading from "./InvoiceListLoading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleX } from "lucide-react";
import { AxiosError } from "axios";

const InvoiceList = () => {
  const { data: invoices, isLoading, isError, error } = useInvoices();

  if (isLoading) return <InvoiceListLoading />;
  if (isError) {
    return (
      <Alert variant={"destructive"} className="  mx-auto max-w-screen-sm ">
        <div className="flex items-center gap-5">
          <CircleX className="h-4 w-4" />
          <div>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {
                (error as AxiosError<{ message: string }>).response?.data
                  ?.message
              }
            </AlertDescription>
          </div>
        </div>
      </Alert>
    );
  }

  return (
    <div className="max-w-screen-md mx-auto rounded-md p-2 border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice: InvoiceType) => (
            <Invoice key={invoice.invoice_id} invoice={invoice} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvoiceList;
