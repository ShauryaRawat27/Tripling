import connectToDatabase from "@/lib/mongodb.js"
import { NextResponse } from "next/server";

export async function GET() {
    try {
      await connectToDatabase();
      return NextResponse.json({ message: "MongoDB Connected Successfully!" });
    } catch (error) {
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }
  }