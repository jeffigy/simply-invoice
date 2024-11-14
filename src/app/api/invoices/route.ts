import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const invoices = await query("SELECT * FROM invoices");
    if (invoices.length === 0) {
      return NextResponse.json(
        { message: "No Invoices found" },
        { status: 404 }
      );
    }
    return NextResponse.json(invoices, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server Error: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const {
      customer_name,
      due_date,
      status,
      subTotal,
      discount,
      tax,
      totalAmount,
    } = await req.json();

    if (!customer_name || !due_date || !status) {
      return NextResponse.json(
        { message: "Customer, Due date, and status fields are required" },
        { status: 400 }
      );
    }
    const newInvoice = await query(
      "INSERT INTO invoices ( customer_name, due_date, status, subtotal, discount, tax, total_amount ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [customer_name, due_date, status, subTotal, discount, tax, totalAmount]
    );

    return NextResponse.json({ newInvoice }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server Error: " + error.message },
      { status: 500 }
    );
  }
}
