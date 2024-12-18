import prisma from "@/utils/prismaClient";
import { CategorySchema } from "@/validation/category";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../auth/[...nextauth]/authOptions";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userSession = await getServerSession(authOptions);
  const result = CategorySchema.safeParse(body);

  if (result.success) {
    const category = await prisma.category.create({
      data: {
        title: result.data.title,
        type: result.data.type,
        userId: parseInt(userSession?.user.id, 10),
      },
    });

    return NextResponse.json({ isCreated: true, id: category.id });
  }
  return NextResponse.json({ message: result.error.message }, { status: 422 });
}

export async function GET(req: NextRequest) {
  const userSession = await getServerSession(authOptions);
  const categories = await prisma.category.findMany({
    where: { userId: parseInt(userSession?.user.id) },
  });

  return NextResponse.json(categories);
}
