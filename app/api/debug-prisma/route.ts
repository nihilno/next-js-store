import db from "@/lib/db"; // Update this path if needed
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const featured = await db.product.findMany({
      where: { featured: true },
      select: { id: true, name: true, featured: true },
    });

    const total = await db.product.count();

    return NextResponse.json({
      featured,
      featuredCount: featured.length,
      totalCount: total,
      connection: process.env.DATABASE_URL?.slice(0, 50) + "...",
      message: "Prisma connected successfully!",
    });
  } catch (error: unknown) {
    // Type-safe way to extract message
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        error: "Database query failed",
        details: message,
        connection: process.env.DATABASE_URL?.slice(0, 50) + "...",
      },
      { status: 500 },
    );
  }
}
