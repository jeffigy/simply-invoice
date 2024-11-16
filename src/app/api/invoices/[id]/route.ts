import { query } from "@/lib/db";
import { isValidUUID } from "@/lib/validateId";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: invoiceId } = await params;
    const {
      customer_name,
      due_date,
      status,
      subTotal,
      discount,
      tax,
      totalAmount,
    } = await req.json();

    if (!isValidUUID(invoiceId)) {
      return NextResponse.json(
        { message: "Invoice not found" },
        { status: 404 }
      );
    }

    const foundInvoice: any = await query(
      "SELECT EXISTS (SELECT 1 FROM invoices WHERE invoice_id = $1)",
      [invoiceId]
    );

    if (!foundInvoice[0].exists) {
      return NextResponse.json(
        { message: "Invoice not found" },
        { status: 404 }
      );
    }

    const updateInvoice = await query(
      "UPDATE invoices SET customer_name = $1, due_date = $2, status = $3, subtotal = $4,  discount = $5, tax = $6, total_amount = $7 WHERE invoice_id = $8 RETURNING *",
      [
        customer_name,
        due_date,
        status,
        subTotal,
        discount,
        tax,
        totalAmount,
        invoiceId,
      ]
    );
    return NextResponse.json(updateInvoice, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server Error: " + error.message },
      { status: 500 }
    );
  }
}
