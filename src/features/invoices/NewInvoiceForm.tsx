"use client";
import LabeledInput from "@/components/LabeledInput";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNewInvoiceMutation } from "./invoiceMutations";
import { toast } from "sonner";
import { AxiosApiResponse } from "@/types/axiosApiResponse";
import { useRouter } from "next/navigation";

type statusesType = "Pending" | "Paid" | "Overdue" | "Cancelled";
const statuses = ["Pending", "Paid", "Overdue", "Cancelled"];

const NewInvoiceForm = () => {
  const router = useRouter();
  const {
    mutateAsync: newInvoice,
    isPending,
    isError,
    error,
    isSuccess,
  } = useNewInvoiceMutation();
  const [customerName, setCustomerName] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());
  const [status, setStatus] = useState<statusesType | "">("");
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleChange = (value: statusesType) => {
    setStatus(value);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const invoiceObj = {
      customer_name: customerName,
      due_date: dueDate!.toISOString(),
      status,
      subTotal,
      discount,
      tax,
      totalAmount,
    };
    console.log(invoiceObj);
    await newInvoice(invoiceObj);
    router.back();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success", {
        description: "New invoice added",
      });
    }
    if (isError) {
      toast.error("Error", {
        description: (error as AxiosApiResponse).response?.data?.message,
      });
    }
  }, [isSuccess, isError]);

  return (
    <form onSubmit={onSubmit}>
      {" "}
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>New Invoice</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <LabeledInput
            label="Customer Name"
            value={customerName}
            onChange={({ target }) => setCustomerName(target.value)}
          />
          <div>
            <Label htmlFor={"due-date"}>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {dueDate ? (
                    format(dueDate, "PPP")
                  ) : (
                    <span>Pick a dueDate</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor={"status"}>Status</Label>
            <Select value={status} onValueChange={handleChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem value={status} key={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <LabeledInput
            label="Sub Total"
            value={subTotal}
            type="number"
            onChange={({ target }) => setSubTotal(parseFloat(target.value))}
          />
          <LabeledInput
            label="Discount"
            value={discount}
            type="number"
            onChange={({ target }) => setDiscount(parseFloat(target.value))}
          />
          <LabeledInput
            label="Tax"
            value={tax}
            type="number"
            onChange={({ target }) => setTax(parseFloat(target.value))}
          />
          <LabeledInput
            label="Total Amount"
            value={totalAmount}
            type="number"
            onChange={({ target }) => setTotalAmount(parseFloat(target.value))}
          />
        </CardContent>
        <CardFooter>
          <Button disabled={isPending} className="w-full">
            {isPending ? (
              <>
                <Loader /> Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default NewInvoiceForm;
