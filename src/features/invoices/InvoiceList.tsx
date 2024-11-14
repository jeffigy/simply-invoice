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
import { CircleX, Plus } from "lucide-react";
import { AxiosApiResponse } from "@/types/axiosApiResponse";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const InvoiceList = () => {
  const router = useRouter();
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
              {(error as AxiosApiResponse).response?.data?.message}
            </AlertDescription>
          </div>
        </div>
      </Alert>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-screen-lg">
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle>Invoices</CardTitle>
        <Button
          variant={"secondary"}
          onClick={() => router.push("/invoices/new")}
        >
          <Plus />
        </Button>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default InvoiceList;
