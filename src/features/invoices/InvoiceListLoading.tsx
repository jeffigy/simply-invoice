import { Skeleton } from "@/components/ui/skeleton";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

const InvoiceListLoading = () => {
  return (
    <div className="max-w-screen-md mx-auto  rounded-md p-2 shadow">
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
          {[1, 2, 3, 4, 5, 6, 8, 9, 10].map((item) => (
            <Invoice key={item} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const Invoice = () => {
  return (
    <TableRow>
      <TableCell className="font-bold">
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      </TableCell>
    </TableRow>
  );
};
export default InvoiceListLoading;
