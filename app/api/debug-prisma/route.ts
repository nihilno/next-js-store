import db from "@/lib/db"; // Change this to your actual Prisma client import path
import { NextResponse } from "next/server"; // Use 'next' if Pages Router

export async function GET() {
  try {
    const featured = await db.product.findMany({
      where: { featured: true },
      select: { id: true, name: true, featured: true }, // Add more fields if needed
    });

    const total = await db.product.count();

    return NextResponse.json({
      featured,
      featuredCount: featured.length,
      totalCount: total,
      connection: process.env.DATABASE_URL?.slice(0, 50) + "...", // Shows which DB it's using
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
