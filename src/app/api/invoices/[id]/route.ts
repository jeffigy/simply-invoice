import { query } from "@/lib/db";
import { isValidUUID } from "@/lib/validateId";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: {
    params: any;
  }
) {
  try {
    const invoiceId = await context.params.id;
    const body = await req.json();

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

    // const updateInvoice =
    return NextResponse.json({ message: invoiceId }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server Error: " + error.message },
      { status: 500 }
    );
  }
}
