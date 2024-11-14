import { TableRow, TableCell } from "@/components/ui/table";
import useFormattedDate from "@/hooks/useFormattedDate";
import { useRouter } from "next/navigation";

const Invoice = ({ invoice }: { invoice: InvoiceType }) => {
  const formattedDate = useFormattedDate(invoice.due_date);
  const router = useRouter();
  return (
    <TableRow onClick={() => router.push(`/invoices/${invoice.invoice_id}`)}>
      <TableCell className="font-bold">{invoice.customer_name}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>{invoice.status}</TableCell>
      <TableCell className="text-right">₱{invoice.total_amount}</TableCell>
    </TableRow>
  );
};

export default Invoice;
