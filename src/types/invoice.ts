type InvoiceType = {
  invoice_id?: string; // UUID is stored as a string in TypeScript
  customer_name: string;
  due_date: string; // Date is represented as string in ISO 8601 format
  status: string;
  subtotal?: number; // Optional since it may be null
  discount?: number; // Optional, default is 0 in SQL, but can be undefined here
  tax?: number; // Optional since it can be null
  total_amount?: number; // Optional since it may be null
  created_at?: string; // Timestamp is a string in ISO 8601 format
};
