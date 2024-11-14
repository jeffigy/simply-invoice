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
